// Function to update the astronaut count display
function updateAstronautCount(count) {
    const countElement = document.getElementById('astronaut-count');
    if (count === 'loading') {
        countElement.textContent = 'Loading...';
        countElement.classList.add('loading');
    } else {
        countElement.textContent = count;
        countElement.classList.remove('loading');
        
        // Update the subtitle text with spaces only after loading is complete
        const subtitle = document.querySelector('h2');
        if (subtitle) {
            subtitle.innerHTML = `
                <span>currently</span>
                <span>in orbit</span>
            `;
        }
    }
}

// Get astronaut data from JSON
async function getAstronautData() {
    updateAstronautCount('loading');
    
    try {
        const response = await fetch('./astronauts.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && Array.isArray(data.people)) {
            const count = data.people.length;
            console.log('Successfully loaded astronaut data from JSON');
            
            // Remove any existing footnote
            document.querySelector('.footnote')?.remove();
            
            // Add success footnote with formatted date, time, and timezone
            const footnote = document.createElement('div');
            footnote.className = 'footnote';
            
            const date = new Date(data.timestamp);
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const formattedTime = date.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'shortOffset'
            });
            const finalString = `Data from ${formattedDate} at ${formattedTime}`;
            footnote.textContent = finalString;
            document.body.appendChild(footnote);
            
            updateAstronautCount(count);
            createAstronautElements(data.people);
            return;
        } else {
            throw new Error('Invalid data format');
        }
    } catch (error) {
        console.error('Error loading astronaut data:', error);
        
        // Remove any existing footnote
        document.querySelector('.footnote')?.remove();
        
        // Add error footnote
        const footnote = document.createElement('div');
        footnote.className = 'footnote';
        footnote.textContent = 'Error loading astronaut data';
        document.body.appendChild(footnote);
        
        updateAstronautCount(0);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Remove any existing header elements
    document.querySelectorAll('h1, .header-container').forEach(el => el.remove());
    
    // Create header container
    const headerContainer = document.createElement('div');
    headerContainer.className = 'header-container';
    
    // Create and add title
    const title = document.createElement('h1');
    title.textContent = 'ASTRONAUTS IN SPACE';
    headerContainer.appendChild(title);
    
    // Create and add subtitle
    const subtitle = document.createElement('div');
    subtitle.className = 'subtitle';
    subtitle.innerHTML = `
        Click on an astronaut to learn more!<br>
        Click on the number to view the full list
    `;
    headerContainer.appendChild(subtitle);
    
    document.body.appendChild(headerContainer);
    
    // Create container for astronauts
    const container = document.createElement('div');
    container.id = 'astronaut-container';
    container.className = 'astronaut-container';
    document.body.appendChild(container);
    
    // Start getting astronaut data
    getAstronautData();
});

// Add debounced resize handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Keep track of current astronauts
let currentAstronauts = [];

function createUniqueFloatParameters() {
    // Random movement range between 2px and 8px
    const range = 2 + Math.random() * 6;
    
    // Random angle for movement direction
    const angle = Math.random() * Math.PI * 2;
    
    // Calculate movement coordinates using trigonometry
    return {
        x1: Math.cos(angle) * range,
        y1: Math.sin(angle) * range,
        x2: Math.cos(angle + Math.PI * 0.5) * range,
        y2: Math.sin(angle + Math.PI * 0.5) * range,
        x3: Math.cos(angle + Math.PI) * range,
        y3: Math.sin(angle + Math.PI) * range,
        duration: 3 + Math.random() * 4, // Random duration between 3-7s
        delay: Math.random() * -5 // Random start delay
    };
}

// Move getFlagEmoji function outside of createAstronautElements
function getFlagEmoji(countryName) {
    const countryFlags = {
        'Russia': '🇷🇺',
        'United States': '🇺🇸',
        'China': '🇨🇳',
        'Japan': '🇯🇵',
        'Germany': '🇩🇪',
        'France': '🇫🇷',
        'Italy': '🇮🇹',
        'Canada': '🇨🇦',
        'United Kingdom': '🇬🇧'
    };
    return countryFlags[countryName] || '🚀';
}

function createAstronautElements(astronauts) {
    currentAstronauts = astronauts;
    const container = document.getElementById('astronaut-container');
    container.innerHTML = '';
    
    const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    
    // Get all boundaries first to ensure they exist
    const header = document.querySelector('.header-container').getBoundingClientRect();
    const circle = document.querySelector('.astronaut-counter').getBoundingClientRect();
    const footnote = document.querySelector('.footnote');
    
    // Initial astronaut size calculation
    let baseAstronautSize = Math.min(viewport.width, viewport.height) * 0.08;
    const minAstronautSize = Math.min(viewport.width, viewport.height) * 0.03; // Minimum size
    
    function attemptPlacement(currentSize) {
        const placedAstronauts = [];
        let allPlaced = true;
        
        // Safe zones with padding
        const safeZones = [
            {
                // Header zone with reduced padding
                x: 0,
                y: header.top,
                width: viewport.width,
                height: header.height + (currentSize * 0.8) // Changed from 0.5 back to 0.8
            },
            {
                // Circle zone
                x: circle.left - currentSize,
                y: circle.top - currentSize,
                width: circle.width + (currentSize * 2),
                height: circle.height + (currentSize * 2)
            }
        ];
        
        // Add footnote zone if it exists
        if (footnote) {
            const footnoteBounds = footnote.getBoundingClientRect();
            safeZones.push({
                x: 0,
                y: footnoteBounds.top - (currentSize * 0.7), // Reduced from 1.0
                width: viewport.width,
                height: viewport.height - footnoteBounds.top + (currentSize * 0.7) // Reduced from 1.0
            });
        }
        
        function isValidPosition(x, y) {
            const padding = currentSize;
            const bannerHeight = 40;
            const sidePadding = currentSize * 1.5;
            const topPadding = padding + bannerHeight;
            
            // Check viewport boundaries
            if (x < sidePadding || x > viewport.width - sidePadding ||
                y < topPadding || y > viewport.height - padding) {
                return false;
            }
            
            // Check safe zones
            for (const zone of safeZones) {
                const extraPadding = currentSize * 0.5;
                if (x > zone.x - extraPadding && 
                    x < zone.x + zone.width + extraPadding &&
                    y > zone.y - extraPadding && 
                    y < zone.y + zone.height + extraPadding) {
                    return false;
                }
            }
            
            // Check other astronauts
            for (const placed of placedAstronauts) {
                const distance = Math.hypot(x - placed.x, y - placed.y);
                if (distance < currentSize * 2.5) {
                    return false;
                }
            }
            
            return true;
        }
        
        function findValidPosition(attempts = 200) {
            while (attempts > 0) {
                const padding = currentSize;
                const bannerHeight = 40;
                const sidePadding = currentSize * 2;
                const topPadding = padding + bannerHeight;
                
                const x = sidePadding + (Math.random() * (viewport.width - (sidePadding * 2)));
                const y = topPadding + (Math.random() * (viewport.height - topPadding - padding));
                
                if (isValidPosition(x, y)) {
                    return { x, y };
                }
                attempts--;
            }
            return null;
        }
        
        // Try to place all astronauts
        astronauts.forEach((astronaut, index) => {
            const position = findValidPosition();
            if (!position) {
                allPlaced = false;
                return false; // Exit forEach early
            }
            placedAstronauts.push(position);
        });
        
        return { success: allPlaced, positions: placedAstronauts };
    }
    
    // Try placing astronauts with progressively smaller sizes
    let currentSize = baseAstronautSize;
    let placementResult;
    
    while (currentSize >= minAstronautSize) {
        placementResult = attemptPlacement(currentSize);
        if (placementResult.success) break;
        currentSize *= 0.9; // Reduce size by 10%
    }
    
    // If we couldn't place all astronauts even at minimum size
    if (!placementResult.success) {
        const footnote = document.querySelector('.footnote');
        if (footnote) {
            footnote.textContent += ' (Not all astronauts could be displayed due to space constraints)';
        }
    }
    
    // Modify the astronaut creation part
    placementResult.positions.forEach((position, index) => {
        const astronaut = astronauts[index];
        
        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'astronaut-wrapper';
        wrapper.style.left = `${position.x}px`;
        wrapper.style.top = `${position.y}px`;
        
        // Create info card
        const infoCard = document.createElement('div');
        infoCard.className = 'astronaut-info-card';
        
        // Add a data attribute to link the card with its astronaut
        const cardId = `astronaut-card-${index}`;
        infoCard.dataset.cardId = cardId;
        wrapper.dataset.cardId = cardId;
        
        // Always position above astronaut
        infoCard.classList.add('point-down');
        
        // Create card content
        infoCard.innerHTML = `
            <div class="info-content">
                <a href="${astronaut.wikipedia}" target="_blank" class="astronaut-name">
                    ${astronaut.name}
                </a>
                <div class="info-row">
                    <span class="flag">${getFlagEmoji(astronaut.country)}</span>
                    <span class="country">${astronaut.country}</span>
                </div>
                <div class="info-row">
                    <span class="label">Station:</span>
                    <span>${astronaut.station}</span>
                </div>
                <div class="info-row">
                    <span class="label">Mission:</span>
                    <span>${astronaut.expedition}</span>
                </div>
                <div class="info-row">
                    <span class="label">Spacecraft:</span>
                    <span>${astronaut.spaceflight}</span>
                </div>
            </div>
        `;

        // Add the float animation parameters to the card
        const floatParams = createUniqueFloatParameters();
        wrapper.style.setProperty('--move-x1', `${floatParams.x1}px`);
        wrapper.style.setProperty('--move-y1', `${floatParams.y1}px`);
        wrapper.style.setProperty('--move-x2', `${floatParams.x2}px`);
        wrapper.style.setProperty('--move-y2', `${floatParams.y2}px`);
        wrapper.style.setProperty('--move-x3', `${floatParams.x3}px`);
        wrapper.style.setProperty('--move-y3', `${floatParams.y3}px`);
        wrapper.style.setProperty('--float-duration', `${floatParams.duration}s`);
        wrapper.style.setProperty('--float-delay', `${floatParams.delay}s`);
        
        // Copy the same animation parameters to the card
        infoCard.style.setProperty('--move-x1', `${floatParams.x1}px`);
        infoCard.style.setProperty('--move-y1', `${floatParams.y1}px`);
        infoCard.style.setProperty('--move-x2', `${floatParams.x2}px`);
        infoCard.style.setProperty('--move-y2', `${floatParams.y2}px`);
        infoCard.style.setProperty('--move-x3', `${floatParams.x3}px`);
        infoCard.style.setProperty('--move-y3', `${floatParams.y3}px`);
        infoCard.style.setProperty('--float-duration', `${floatParams.duration}s`);
        infoCard.style.setProperty('--float-delay', `${floatParams.delay}s`);
        
        const astronautDiv = document.createElement('div');
        astronautDiv.className = 'astronaut';
        
        const astronautImg = document.createElement('img');
        astronautImg.src = './images/astronaut.svg';
        astronautImg.alt = astronaut.name || 'Astronaut';
        astronautImg.className = 'astronaut-icon';
        
        if (index < Math.floor(astronauts.length / 2)) {
            astronautImg.style.transform = 'scaleX(-1)';
        }
        
        const rotation = Math.random() * 360;
        astronautDiv.style.setProperty('--rotation', `${rotation}deg`);
        astronautDiv.style.width = `${currentSize}px`;
        astronautDiv.style.height = `${currentSize}px`;
        
        wrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Remove any existing open cards
            document.querySelectorAll('.astronaut-info-card').forEach(card => {
                card.classList.remove('visible');
                card.style.opacity = '0';
                card.style.visibility = 'hidden';
            });
            
            // Get the astronaut's position and viewport dimensions
            const rect = wrapper.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const cardWidth = 220;
            const cardHeight = 180;
            const margin = 10;
            const topThreshold = cardHeight + margin;
            
            // Calculate the center position of the astronaut
            const astronautCenter = rect.left + (rect.width / 2);
            
            // Initially position card centered on astronaut
            let leftPosition = astronautCenter - (cardWidth / 2);
            let pointDownOffset = 0;
            
            // Adjust if card would be outside viewport on the left
            if (leftPosition < margin) {
                pointDownOffset = astronautCenter - (margin + (cardWidth / 2));
                leftPosition = margin;
            }
            // Adjust if card would be outside viewport on the right
            else if (leftPosition + cardWidth > viewportWidth - margin) {
                leftPosition = viewportWidth - cardWidth - margin;
                pointDownOffset = astronautCenter - (leftPosition + (cardWidth / 2));
            }
            
            // Check if we should show the card below the astronaut
            const showBelow = rect.top < topThreshold;
            
            // Position the card
            infoCard.style.left = `${leftPosition}px`;
            if (showBelow) {
                infoCard.style.top = `${rect.bottom + 50}px`; // Reduced from 50px to 30px
                infoCard.classList.remove('point-down');
                infoCard.classList.add('point-up');
            } else {
                infoCard.style.top = `${rect.top - (cardHeight + 1)}px`; // Reduced from 50px to 30px
                infoCard.classList.remove('point-up');
                infoCard.classList.add('point-down');
            }
            
            // Update pointer position if needed
            if (pointDownOffset !== 0) {
                infoCard.style.setProperty('--pointer-offset', `${pointDownOffset}px`);
            } else {
                infoCard.style.removeProperty('--pointer-offset');
            }
            
            // Show the card
            infoCard.classList.add('visible');
            infoCard.style.opacity = '1';
            infoCard.style.visibility = 'visible';
        });
        
        // Add close button to the card
        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '×';
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            infoCard.classList.remove('visible');
            infoCard.style.opacity = '0';
            infoCard.style.visibility = 'hidden';
        });

        // Add close button to the card content
        infoCard.querySelector('.info-content').insertAdjacentElement('afterbegin', closeButton);
        
        // Add click handler to the info card to prevent closing when clicking inside it
        infoCard.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the body click handler from firing
        });
        
        astronautDiv.appendChild(astronautImg);
        wrapper.appendChild(astronautDiv);
        container.appendChild(wrapper);
        document.body.appendChild(infoCard); // Append card to body instead
    });
}

// Update resize handler to reposition banners and close info cards
window.addEventListener('resize', debounce(() => {
    // Close all info cards
    document.querySelectorAll('.astronaut-info-card').forEach(card => {
        card.classList.remove('visible');
        card.style.opacity = '0';
        card.style.visibility = 'hidden';
    });
    
    // Reposition astronauts if needed
    if (currentAstronauts.length > 0) {
        document.querySelectorAll('.astronaut-banner').forEach(b => b.remove());
        createAstronautElements(currentAstronauts);
    }
}, 250));

// Update the body click handler at the bottom of the file
document.body.addEventListener('click', () => {
    document.querySelectorAll('.astronaut-info-card').forEach(card => {
        card.classList.remove('visible');
        card.style.opacity = '0';
        card.style.visibility = 'hidden';
    });
});

// Create modal elements
const modalBackdrop = document.createElement('div');
modalBackdrop.className = 'modal-backdrop';

const astronautList = document.createElement('div');
astronautList.className = 'astronaut-list';

document.body.appendChild(modalBackdrop);
document.body.appendChild(astronautList);

// Add click handler to astronaut count
document.getElementById('astronaut-count').addEventListener('click', () => {
    // Sort astronauts by name
    const sortedAstronauts = [...currentAstronauts].sort((a, b) => 
        a.name.localeCompare(b.name)
    );
    
    // Create list HTML
    astronautList.innerHTML = `
        <h1 class="list-title">ASTRONAUTS IN SPACE</h1>
        <button class="list-close-button">×</button>
        ${sortedAstronauts.map((astronaut, index) => `
            <div class="list-item">
                <div class="list-item-header">
                    <span class="astronaut-number">${index + 1}.</span>
                    <span class="flag">${getFlagEmoji(astronaut.country)}</span>
                    <a href="${astronaut.wikipedia}" 
                       target="_blank" 
                       class="astronaut-name"
                       onclick="event.stopPropagation()">
                        ${astronaut.name}
                    </a>
                </div>
                <div class="list-item-content">
                    <div class="list-item-details">
                        <div>Station: ${astronaut.station}</div>
                        <div>Mission: ${astronaut.expedition}</div>
                        <div>Spacecraft: ${astronaut.spaceflight}</div>
                    </div>
                </div>
            </div>
        `).join('')}
    `;
    
    // Add click handler for the close button
    const listCloseButton = astronautList.querySelector('.list-close-button');
    listCloseButton.addEventListener('click', (e) => {
        e.stopPropagation();
        modalBackdrop.classList.remove('visible');
        astronautList.classList.remove('visible');
    });

    // Add click handlers for list items
    const listItems = astronautList.querySelectorAll('.list-item');
    listItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Collapse all other items
            listItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('expanded');
                }
            });
            // Toggle clicked item
            item.classList.toggle('expanded');
        });
    });
    
    // Show modal and list
    modalBackdrop.classList.add('visible');
    astronautList.classList.add('visible');
});

// Close modal when clicking outside
modalBackdrop.addEventListener('click', () => {
    modalBackdrop.classList.remove('visible');
    astronautList.classList.remove('visible');
});

// Prevent clicks inside list from closing modal
astronautList.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Add credits section after the footnote
const creditsButton = document.createElement('div');
creditsButton.className = 'credits-button';
creditsButton.textContent = 'Credits and more';

const creditsBackdrop = document.createElement('div');
creditsBackdrop.className = 'credits-backdrop';

const creditsPanel = document.createElement('div');
creditsPanel.className = 'credits-panel';
creditsPanel.innerHTML = `
    <div class="credits-content">
        <h3>Sources</h3>
        <div class="sources-group">
            <a href="https://en.wikipedia.org/wiki/Template:People_currently_in_space" 
               target="_blank">Wikipedia</a>
            <span class="separator">•</span>
            <a href="https://www.svgrepo.com" 
               target="_blank">SVG Repo</a>
        </div>
        
        <h3>Connect</h3>
        <div class="links-group">
            <a href="https://x.com/callme528437" 
               target="_blank">Twitter/X</a>
        </div>

        <h3>Support</h3>
        <div class="sources-group">
            <a href="https://venmo.com/u/JavierMBustamante" 
               target="_blank">Venmo</a>
            <span class="separator">•</span>
            <a href="https://revolut.me/javiereyi" 
               target="_blank">Revolut</a>
        </div>
    </div>
`;

document.body.appendChild(creditsButton);
document.body.appendChild(creditsBackdrop);
document.body.appendChild(creditsPanel);

// Add click handler
creditsButton.addEventListener('click', () => {
    creditsPanel.classList.toggle('visible');
    creditsBackdrop.classList.toggle('visible');
    creditsButton.classList.toggle('active');
});

// Close credits when clicking backdrop
creditsBackdrop.addEventListener('click', () => {
    creditsPanel.classList.remove('visible');
    creditsBackdrop.classList.remove('visible');
    creditsButton.classList.remove('active');
}); 
