// Update API constants
const DIRECT_API_URL = 'http://api.open-notify.org/astros.json';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const BACKUP_API_URL = CORS_PROXY + 'http://api.open-notify.org/astros.json';

// Animation constants
const FLOAT_AMPLITUDE = 20; // pixels for floating animation
const FLOAT_SPEED = 0.001; // speed of floating animation

// Store active astronauts
let activeAstronauts = [];

// Function to fetch astronaut data
async function getAstronautData() {
    try {
        const response = await fetch(DIRECT_API_URL);
        if (!response.ok) {
            throw new Error('Direct API failed');
        }
        const data = await response.json();
        updateAstronautCount(data.number);
    } catch (firstError) {
        console.log('Direct API failed, trying with CORS proxy...');
        try {
            const response = await fetch(BACKUP_API_URL);
            if (!response.ok) {
                throw new Error('Proxy API failed');
            }
            const data = await response.json();
            updateAstronautCount(data.number);
        } catch (secondError) {
            console.error('Both API attempts failed:', firstError, secondError);
            const fallbackCount = 6;
            console.log('Using fallback count:', fallbackCount);
            updateAstronautCount(fallbackCount);
        }
    }
}

// Function to update the astronaut count display
function updateAstronautCount(count) {
    document.getElementById('astronaut-count').textContent = count;
    createAstronautElements(count);
}

// Update astronaut positions
function updateAstronautPositions() {
    activeAstronauts.forEach(astronaut => {
        const angleInRadians = (astronaut.rotation - 90) * (Math.PI / 180);
        const floatTime = Date.now() * FLOAT_SPEED + astronaut.floatOffset;
        
        const offsetX = Math.cos(angleInRadians) * Math.sin(floatTime) * FLOAT_AMPLITUDE;
        const offsetY = Math.sin(angleInRadians) * Math.sin(floatTime) * FLOAT_AMPLITUDE;
        
        // Apply transformations, handling the flip
        astronaut.element.style.transform = `
            translate(${astronaut.x + offsetX}px, ${astronaut.y + offsetY}px)
            rotate(${astronaut.rotation}deg)
            scale(${astronaut.scale})
        `;
        
        // The image flip is handled separately on the img element
    });
    
    requestAnimationFrame(updateAstronautPositions);
}

// Create astronaut elements
function createAstronautElements(count) {
    const container = document.getElementById('astronaut-container');
    container.innerHTML = '';
    activeAstronauts = [];
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const safeZone = 200;
    const astronautSize = 90;
    const flipCount = Math.floor(count / 2); // Handle odd numbers by flooring
    
    const occupiedSpaces = [];
    
    for (let i = 0; i < count; i++) {
        const astronautDiv = document.createElement('div');
        astronautDiv.className = 'astronaut';
        
        const astronautImg = document.createElement('img');
        astronautImg.src = 'https://www.svgrepo.com/show/24715/astronaut-ingravity.svg';
        astronautImg.alt = 'Floating astronaut';
        astronautImg.className = 'astronaut-icon';
        
        // Flip the first half of astronauts
        const isFlipped = i < flipCount;
        if (isFlipped) {
            astronautImg.style.transform = 'scaleX(-1)';
        }
        
        let x, y;
        let attempts = 0;
        let validPosition = false;
        
        while (!validPosition && attempts < 100) {
            x = Math.random() * (window.innerWidth - astronautSize);
            y = Math.random() * (window.innerHeight - astronautSize);
            
            // Check if position overlaps with center safe zone
            const isCenterOverlap = Math.abs(x - centerX) < safeZone && 
                                  Math.abs(y - centerY) < safeZone;
            
            // Check if position overlaps with other astronauts
            const isAstronautOverlap = occupiedSpaces.some(space => {
                const distance = Math.sqrt(
                    Math.pow(space.x - x, 2) + 
                    Math.pow(space.y - y, 2)
                );
                return distance < astronautSize;
            });
            
            if (!isCenterOverlap && !isAstronautOverlap) {
                validPosition = true;
                occupiedSpaces.push({ x, y });
            }
            
            attempts++;
        }
        
        if (!validPosition) {
            console.log(`Could only place ${i} astronauts without overlap`);
            break;
        }
        
        // Set initial styles
        astronautDiv.style.position = 'absolute';
        astronautDiv.style.left = '0';
        astronautDiv.style.top = '0';
        
        // Random rotation and scale
        const rotation = Math.random() * 360;
        const scale = 0.9 + Math.random() * 0.2;
        
        astronautDiv.appendChild(astronautImg);
        container.appendChild(astronautDiv);
        
        // Add to active astronauts
        activeAstronauts.push({
            element: astronautDiv,
            x: x,
            y: y,
            rotation: rotation,
            scale: scale,
            floatOffset: Math.random() * Math.PI * 2,
            isFlipped: isFlipped
        });
    }
    
    // Start the animation
    if (activeAstronauts.length > 0) {
        requestAnimationFrame(updateAstronautPositions);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    getAstronautData();
}); 