const fs = require('fs');
const fetch = require('node-fetch'); // Needed for GitHub Actions
const { JSDOM } = require('jsdom');  // Helps parse Wikipedia's HTML

async function updateAstronauts() {
    const url = "https://en.wikipedia.org/w/api.php?action=parse&page=Template:People_currently_in_space&format=json&origin=*";

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Parse the Wikipedia content
        const dom = new JSDOM(data.parse.text["*"]);
        const doc = dom.window.document;

        // Select the table rows containing astronaut data
        let rows = doc.querySelectorAll("table tbody tr");

        let astronauts = [];

        rows.forEach(row => {
            let columns = row.querySelectorAll("td");

            if (columns.length >= 5) {
                let nameElement = columns[1].querySelector("b a"); // Astronaut name
                let missionElement = columns[2]; // Mission name
                let craftElement = columns[3]; // Spacecraft name
                let nationalityElement = columns[4].querySelector("a"); // Nationality

                if (nameElement && missionElement && craftElement && nationalityElement) {
                    astronauts.push({
                        name: nameElement.textContent.trim(),
                        wikipedia: "https://en.wikipedia.org" + nameElement.getAttribute("href"), // Wikipedia link
                        mission: missionElement.textContent.trim(),
                        craft: craftElement.textContent.trim(),
                        nationality: nationalityElement.textContent.trim(),
                    });
                }
            }
        });

        // Save the data as JSON
        const jsonData = {
            astronauts,
            updated: new Date().toISOString()
        };

        fs.writeFileSync("astronauts.json", JSON.stringify(jsonData, null, 2));
        console.log("✅ astronauts.json updated successfully!");
    } catch (error) {
        console.error("❌ Error fetching data:", error);
    }
}

// Run the function
updateAstronauts();
