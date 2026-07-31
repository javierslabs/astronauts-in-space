const fs = require('fs');
const cheerio = require('cheerio');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function updateAstronauts() {
    const url = "https://en.wikipedia.org/w/api.php?action=parse&page=Template:People_currently_in_space&format=json&origin=*";

    try {
        const response = await fetch(url);
        const data = await response.json();
        const content = data.parse.text['*'];
        const $ = cheerio.load(content);

        const people = [];
        const seen = new Set();

        // Scope to the actual "People currently in space" navbox only.
        // The parsed page also includes documentation / other navboxes.
        const $mainNavbox = findPeopleInSpaceNavbox($);
        if (!$mainNavbox.length) {
            throw new Error('Could not find "People currently in space" navbox');
        }

        // Top-level destination rows only (ISS, Tiangong, future stations,
        // free-flying missions, etc.) — not nested vehicle rows.
        $mainNavbox.children('tbody').children('tr').each((_, row) => {
            const $row = $(row);
            const $destinationGroup = $row.children('th.navbox-group');
            if (!$destinationGroup.length) return;

            const destination = getDestinationInfo($, $destinationGroup);
            const $list = $row.children('td.navbox-list');
            if (!$list.length) return;

            const spaceflights = extractSpaceflights($, $list);

            spaceflights.forEach(flight => {
                flight.crew.forEach(crew => {
                    const key = (crew.wikipedia || crew.name).toLowerCase();
                    if (!crew.name || seen.has(key)) return;
                    seen.add(key);

                    // For free-flying missions with no nested vehicle row,
                    // fall back to the destination/mission name as spacecraft.
                    const vehicleLabel = flight.name === 'Direct'
                        ? destination.name
                        : flight.name;

                    people.push({
                        name: crew.name,
                        country: crew.country,
                        wikipedia: crew.wikipedia,
                        station: destination.name,
                        expedition: destination.expedition,
                        spaceflight: getSpaceflightType(vehicleLabel)
                    });
                });
            });
        });

        const jsonData = {
            people,
            number: people.length,
            message: "success",
            timestamp: new Date().toISOString(),
            source: "Wikipedia:People currently in space"
        };

        fs.writeFileSync("astronauts.json", JSON.stringify(jsonData, null, 2));
        console.log("✅ astronauts.json updated successfully!");
        console.log(`Found ${people.length} astronauts currently in space`);
        return jsonData;

    } catch (error) {
        console.error("❌ Error fetching data:", error);
        return null;
    }
}

function findPeopleInSpaceNavbox($) {
    let $match = $();
    $('.navbox-inner').each((_, navbox) => {
        const title = $(navbox).find('> tbody > tr > th.navbox-title').first().text().toLowerCase();
        if (title.includes('people currently in space')) {
            $match = $(navbox);
            return false;
        }
    });
    return $match;
}

function getDestinationInfo($, $group) {
    const $link = $group.find('a').first();
    const rawName = ($link.text() || $group.text() || '').trim();
    // Prefer the destination link text; strip a trailing "space station"
    // so "International Space Station" stays "International" for the UI.
    const name = rawName
        .replace(/\s*\([^)]*expedition[^)]*\)\s*/i, '')
        .replace(/\s+space\s+station$/i, '')
        .trim() || 'Unknown';

    return {
        name,
        expedition: extractExpedition($group.text())
    };
}

/**
 * Extract vehicle/crew groups from a destination's list cell.
 * Supports:
 * 1) Nested child navbox (station → vehicles → crew) — current ISS/Tiangong
 * 2) Direct crew list under the destination (free-flying mission / shuttle)
 */
function extractSpaceflights($, $list) {
    const spaceflights = [];
    const $subgroup = $list.find('> div > table.navbox-subgroup, > table.navbox-subgroup').first();

    if ($subgroup.length) {
        $subgroup.find('> tbody > tr').each((_, vehicleRow) => {
            const $vehicleRow = $(vehicleRow);
            const $vehicleGroup = $vehicleRow.children('th.navbox-group');
            if (!$vehicleGroup.length) return;

            const vehicleName = ($vehicleGroup.find('a').first().text() || $vehicleGroup.text() || '').trim();
            const crew = extractCrew($, $vehicleRow.children('td.navbox-list'));
            if (crew.length) {
                spaceflights.push({ name: vehicleName || 'Unknown', crew });
            }
        });
        return spaceflights;
    }

    // No nested vehicles — crew listed directly under the destination
    const crew = extractCrew($, $list);
    if (crew.length) {
        spaceflights.push({ name: 'Direct', crew });
    }
    return spaceflights;
}

function extractCrew($, $listCell) {
    const crew = [];
    $listCell.find('ul li').each((_, item) => {
        const $item = $(item);
        const $astronautLink = $item.find('a').last();
        const name = ($astronautLink.text() || '').trim();
        if (!name) return;

        const href = $astronautLink.attr('href') || '';
        crew.push({
            name,
            country: $item.find('.flagicon a').attr('title') || 'Unknown',
            wikipedia: href.startsWith('http') ? href : `https://en.wikipedia.org${href}`
        });
    });
    return crew;
}

function extractExpedition(text) {
    let match = text.match(/Expedition\s*(\d+)/i);
    if (match) return `Expedition ${match[1]}`;

    match = text.match(/(\d+)(?:st|nd|rd|th)\s+expedition/i);
    if (match) return `Expedition ${match[1]}`;

    return 'Current Mission';
}

function getSpaceflightType(vehicleName) {
    if (!vehicleName) return 'Unknown';
    if (vehicleName.includes('Soyuz')) return 'Soyuz MS';
    if (vehicleName.includes('SpaceX') || vehicleName.includes('Crew Dragon')) return 'SpaceX Crew';
    if (vehicleName.includes('Shenzhou')) return 'Shenzhou';
    if (vehicleName.includes('Starliner')) return 'Starliner';
    // Unknown vehicle types: keep the Wikipedia label so the UI stays useful
    return vehicleName.trim();
}

if (require.main === module) {
    updateAstronauts();
}

module.exports = updateAstronauts;
