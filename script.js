// API constants
const BASE_URL = 'http://api.open-notify.org/astros.json';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const API_URL = CORS_PROXY + encodeURIComponent(BASE_URL);

// Add rotation constant
const MAX_ROTATION = 360; // Maximum rotation in degrees

// Add animation constants
const FLOAT_SPEED = 0.001;
const FLOAT_AMPLITUDE = 15;

// Move this to the top of the file, before any other calculations
function isMobile() {
    return window.innerWidth <= 768 || 
           navigator.userAgent.match(/iPhone|iPad|iPod|Android/i);
}

// Update viewport handling to be more reliable
function getViewportDimensions() {
    if (isMobile()) {
        // Get actual mobile viewport size, ignoring address bar
        const vw = Math.min(window.innerWidth, document.documentElement.clientWidth);
        const vh = window.innerHeight; // Use window.innerHeight for mobile
        return { 
            width: vw, 
            height: vh, 
            allowScroll: true 
        };
    } else {
        // Desktop viewport
        return { 
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            allowScroll: false
        };
    }
}

// Function to create astronaut elements
function createAstronautElements(astronauts) {
    const container = document.getElementById('astronaut-container');
    container.innerHTML = '';
    
    const viewport = getViewportDimensions();
    const isMobileView = isMobile(); // Get current state
    const numAstronauts = astronauts.length;
    
    // Calculate sizes based on current viewport
    const baseSize = isMobileView ? 20 : 80;
    const headerSafeZone = isMobileView ? 60 : 100;
    const centerSafeZone = isMobileView ? 90 : 200;
    
    // Different sizing strategies for mobile and desktop
    const maxAstronautsPerRow = Math.ceil(Math.sqrt(numAstronauts + 4));
    const minDimension = Math.min(viewport.width, viewport.height);
    
    // Different sizing strategies for mobile and desktop
    const dynamicSize = isMobileView 
        ? Math.min(baseSize, Math.min(
            viewport.width / (maxAstronautsPerRow * 4),
            viewport.height / (maxAstronautsPerRow * 4)
          ))
        : Math.min(baseSize, viewport.height / (maxAstronautsPerRow * 2));
    
    // Update CSS based on device type
    document.body.style.overflow = viewport.allowScroll ? 'auto' : 'hidden';
    
    // Tighter spacing for narrow screens
    const spacing = isMobileView 
        ? dynamicSize * 1.01  // Extremely tight spacing
        : baseSize * 1.2;
    
    // Smaller safe zones for narrow screens
    const safeCenterZone = isMobileView 
        ? Math.min(60, minDimension / 6) + dynamicSize
        : centerSafeZone + baseSize;
    
    const safeHeaderZone = isMobileView 
        ? Math.min(30, viewport.height / 15)
        : headerSafeZone;
    
    const centerX = viewport.width / 2;
    const centerY = viewport.height / 2;
    const occupiedSpaces = [];
    const activeAstronauts = [];
    
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
        
        // Add extra padding for rotation and movement
        const rotationPadding = dynamicSize * 2; // Account for rotation space
        
        // Find a valid position
        let validPosition = false;
        let x, y;
        let attempts = 0;
        
        while (!validPosition && attempts < 100) {
            // Keep astronauts further from edges
            x = rotationPadding + Math.random() * (viewport.width - rotationPadding * 2);
            y = rotationPadding + Math.random() * (viewport.height - rotationPadding * 2);
            
            // Update boundary check to be more strict
            const isBoundaryOverlap = 
                x < rotationPadding || 
                x > viewport.width - rotationPadding ||
                y < rotationPadding || 
                y > viewport.height - rotationPadding;
            
            // Update overlap checks
            const isHeaderOverlap = y < (safeHeaderZone + rotationPadding);
            const isCenterOverlap = Math.hypot(x - centerX, y - centerY) < 
                (safeCenterZone + rotationPadding);
            
            const isAstronautOverlap = occupiedSpaces.some(space => {
                const distance = Math.hypot(x - space.x, y - space.y);
                return distance < (spacing + dynamicSize / 2);
            });

            validPosition = !isHeaderOverlap && !isCenterOverlap && 
                           !isAstronautOverlap && !isBoundaryOverlap;
            
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
    const countElement = document.getElementById('astronaut-count');
    if (count === 'loading') {
        countElement.textContent = 'Loading...';
        countElement.classList.add('loading');
    } else {
        countElement.textContent = count;
        countElement.classList.remove('loading');
    }
}

// Update the getAstronautData function to create astronauts
async function getAstronautData() {
    updateAstronautCount('loading');
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
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
        const fallbackCount = 6;
        updateAstronautCount(fallbackCount);
        createAstronautElements(Array(fallbackCount).fill({ name: 'Astronaut' }));
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    getAstronautData();
});

// Add resize handler
window.addEventListener('resize', () => {
    // Recalculate astronauts on resize
    getAstronautData();
}); 