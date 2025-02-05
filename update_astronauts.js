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
        
        const stations = [];
        
        // Process the hierarchical structure
        $('.navbox-inner').each((_, navbox) => {
            // 1. Find Space Stations
            $(navbox).find('.navbox-group').each((_, group) => {
                const $group = $(group);
                const stationLink = $group.find('a').first();
                
                // Only process if it's a space station
                if (!stationLink.text().toLowerCase().includes('space station')) return;
                
                const stationInfo = {
                    name: stationLink.text().replace(/\s+space\s+station/i, '').trim(),
                    expedition: extractExpedition($group.text()),
                    spaceflights: []
                };
                
                // 2. Find Spaceflights within this station
                const crewTable = $group.closest('tr').find('.navbox-list table');
                crewTable.find('.navbox-group').each((_, vehicleGroup) => {
                    const $vehicleGroup = $(vehicleGroup);
                    const spaceflight = {
                        name: $vehicleGroup.text().trim(),
                        crew: []
                    };
                    
                    // 3. Find Crew Members for this spaceflight
                    const crewList = $vehicleGroup.closest('tr').find('ul li');
                    crewList.each((_, crewItem) => {
                        const $crew = $(crewItem);
                        const astronautLink = $crew.find('a').last();
                        spaceflight.crew.push({
                            name: astronautLink.text(),
                            country: $crew.find('.flagicon a').attr('title') || 'Unknown',
                            wikipedia: 'https://en.wikipedia.org' + (astronautLink.attr('href') || '')
                        });
                    });
                    
                    stationInfo.spaceflights.push(spaceflight);
                });
                
                // 4. Flatten the structure for output
                stationInfo.spaceflights.forEach(flight => {
                    flight.crew.forEach(crew => {
                        stations.push({
                            name: crew.name,
                            country: crew.country,
                            wikipedia: crew.wikipedia,
                            station: stationInfo.name,
                            expedition: stationInfo.expedition,
                            spaceflight: getSpaceflightType(flight.name)
                        });
                    });
                });
            });
        });

        const jsonData = {
            people: stations,
            number: stations.length,
            message: "success",
            timestamp: new Date().toISOString(),
            source: "Wikipedia:People currently in space"
        };

        fs.writeFileSync("astronauts.json", JSON.stringify(jsonData, null, 2));
        console.log("✅ astronauts.json updated successfully!");
        console.log(`Found ${stations.length} astronauts currently in space`);
        
        return jsonData;

    } catch (error) {
        console.error("❌ Error fetching data:", error);
        return null;
    }
}

function extractExpedition(text) {
    const match = text.match(/Expedition\s*(\d+)/i);
    return match ? `Expedition ${match[1]}` : 'Current Mission';
}

function getSpaceflightType(vehicleName) {
    if (vehicleName.includes('Soyuz')) return 'Soyuz MS';
    if (vehicleName.includes('SpaceX') || vehicleName.includes('Crew Dragon')) return 'SpaceX Crew';
    if (vehicleName.includes('Shenzhou')) return 'Shenzhou';
    if (vehicleName.includes('Starliner')) return 'Starliner';
    return 'Unknown';
}

// Run the function if called directly
if (require.main === module) {
    updateAstronauts();
}

module.exports = updateAstronauts;
