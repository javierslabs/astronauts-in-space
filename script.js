// API constants
const BASE_URL = 'http://api.open-notify.org/astros.json';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const API_URL = CORS_PROXY + encodeURIComponent(BASE_URL);

// Constants for layout
const ASTRONAUT_SIZE = 80; // Size of astronaut in pixels
const HEADER_SAFE_ZONE = 100; // Space from top for header
const CENTER_SAFE_ZONE = 200; // Space around center circle

// Add rotation constant
const MAX_ROTATION = 360; // Maximum rotation in degrees

// Add animation constants
const FLOAT_SPEED = 0.001;
const FLOAT_AMPLITUDE = 15;

// Function to create astronaut elements
function createAstronautElements(astronauts) {
    const container = document.getElementById('astronaut-container');
    container.innerHTML = '';
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const occupiedSpaces = [];
    
    const activeAstronauts = []; // Store astronaut data for animation
    
    astronauts.forEach((astronaut, index) => {
        const astronautDiv = document.createElement('div');
        astronautDiv.className = 'astronaut';
        
        const astronautImg = document.createElement('img');
        astronautImg.src = 'https://www.svgrepo.com/show/24715/astronaut-ingravity.svg';
        astronautImg.alt = 'Astronaut';
        astronautImg.className = 'astronaut-icon';
        
        // Mirror half of the astronauts
        const isFlipped = index < Math.floor(astronauts.length / 2);
        if (isFlipped) {
            astronautImg.style.transform = 'scaleX(-1)';
        }
        
        // Random rotation
        const rotation = Math.random() * MAX_ROTATION;
        
        // Find a valid position
        let validPosition = false;
        let x, y;
        let attempts = 0;
        
        while (!validPosition && attempts < 100) {
            // Add padding to keep astronauts fully in view
            const padding = ASTRONAUT_SIZE;
            x = padding + Math.random() * (window.innerWidth - ASTRONAUT_SIZE - padding * 2);
            y = padding + Math.random() * (window.innerHeight - ASTRONAUT_SIZE - padding * 2);
            
            // Check header overlap
            const isHeaderOverlap = y < HEADER_SAFE_ZONE;
            
            // Check center circle overlap
            const isCenterOverlap = Math.abs(x - centerX) < CENTER_SAFE_ZONE && 
                                  Math.abs(y - centerY) < CENTER_SAFE_ZONE;
            
            // Check other astronauts overlap
            const isAstronautOverlap = occupiedSpaces.some(space => {
                const distance = Math.sqrt(
                    Math.pow(space.x - x, 2) + 
                    Math.pow(space.y - y, 2)
                );
                return distance < ASTRONAUT_SIZE * 1.2;
            });
            
            validPosition = !isHeaderOverlap && !isCenterOverlap && !isAstronautOverlap;
            
            if (validPosition) {
                occupiedSpaces.push({ x, y });
            }
            attempts++;
        }
        
        if (validPosition) {
            // Store astronaut data for animation
            activeAstronauts.push({
                element: astronautDiv,
                x: x,
                y: y,
                rotation: rotation,
                floatOffset: Math.random() * 1000 // Random starting point
            });

            // Initial position
            updateAstronautPosition(activeAstronauts[activeAstronauts.length - 1]);
            astronautDiv.appendChild(astronautImg);
            container.appendChild(astronautDiv);
        }
    });

    // Start animation
    if (activeAstronauts.length > 0) {
        animateAstronauts(activeAstronauts);
    }
}

// Function to update a single astronaut's position
function updateAstronautPosition(astronaut) {
    // Convert rotation to radians and adjust for transform coordinate system
    const angleInRadians = (astronaut.rotation - 90) * (Math.PI / 180);
    
    // Calculate offset based on rotation angle
    const floatAmount = Math.sin(Date.now() * FLOAT_SPEED + astronaut.floatOffset) * FLOAT_AMPLITUDE;
    const offsetX = Math.cos(angleInRadians) * floatAmount;
    const offsetY = Math.sin(angleInRadians) * floatAmount;
    
    // Apply transform with rotated movement
    astronaut.element.style.transform = `
        translate(${astronaut.x + offsetX}px, ${astronaut.y + offsetY}px)
        rotate(${astronaut.rotation}deg)
    `;
}

// Animation loop
function animateAstronauts(astronauts) {
    astronauts.forEach(updateAstronautPosition);
    requestAnimationFrame(() => animateAstronauts(astronauts));
}

// Function to update the astronaut count display
function updateAstronautCount(count) {
    document.getElementById('astronaut-count').textContent = count;
}

// Update the getAstronautData function to create astronauts
async function getAstronautData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json(); // Direct JSON parse, no wrapper needed
        console.log('API Response:', data);
        
        if (data && Array.isArray(data.people)) {
            const count = data.people.length;
            console.log('Number of astronauts:', count);
            updateAstronautCount(count);
            createAstronautElements(data.people);
        } else {
            throw new Error('Invalid data format');
        }
    } catch (error) {
        console.error('API call failed. Error:', error);
        console.error('Error details:', error.message);
        const fallbackCount = 6;
        console.log('Using fallback count:', fallbackCount);
        updateAstronautCount(fallbackCount);
        createAstronautElements(Array(fallbackCount).fill({ name: 'Astronaut' }));
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    getAstronautData();
}); 