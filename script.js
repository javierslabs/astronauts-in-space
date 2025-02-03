// API constants
const BASE_URL = 'http://api.open-notify.org/astros.json';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const API_URL = CORS_PROXY + encodeURIComponent(BASE_URL);

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

// Get astronaut data from API
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
        updateAstronautCount(6); // Fallback count
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
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

function createAstronautElements(astronauts) {
    currentAstronauts = astronauts; // Store for resize events
    const container = document.getElementById('astronaut-container');
    container.innerHTML = '';
    
    const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    
    // Get header and circle boundaries
    const header = document.querySelector('h1').getBoundingClientRect();
    const circle = document.querySelector('.astronaut-counter').getBoundingClientRect();
    
    // Calculate astronaut size based on viewport
    const astronautSize = Math.min(viewport.width, viewport.height) * 0.08;
    
    // Safe zones with padding
    const safeZones = [
        {
            // Header zone - only around the header itself
            x: 0,
            y: header.top,
            width: viewport.width,
            height: header.height
        },
        {
            // Circle zone
            x: circle.left - astronautSize,
            y: circle.top - astronautSize,
            width: circle.width + (astronautSize * 2),
            height: circle.height + (astronautSize * 2)
        }
    ];
    
    // Track placed astronauts
    const placedAstronauts = [];
    
    function isValidPosition(x, y) {
        // Add padding to viewport boundaries
        const padding = astronautSize;
        if (x < padding || x > viewport.width - padding ||
            y < padding || y > viewport.height - padding) {
            return false;
        }
        
        // Check safe zones
        for (const zone of safeZones) {
            if (x > zone.x - astronautSize && x < zone.x + zone.width + astronautSize &&
                y > zone.y - astronautSize && y < zone.y + zone.height + astronautSize) {
                return false;
            }
        }
        
        // Check other astronauts with increased spacing
        for (const placed of placedAstronauts) {
            const distance = Math.hypot(x - placed.x, y - placed.y);
            if (distance < astronautSize * 2) { // Increased spacing
                return false;
            }
        }
        
        return true;
    }
    
    function findValidPosition(attempts = 200) { // Increased attempts
        while (attempts > 0) {
            // Add padding to placement area
            const padding = astronautSize;
            const x = padding + (Math.random() * (viewport.width - (padding * 2)));
            const y = padding + (Math.random() * (viewport.height - (padding * 2)));
            
            if (isValidPosition(x, y)) {
                return { x, y };
            }
            attempts--;
        }
        return null;
    }
    
    // Place astronauts
    astronauts.forEach((astronaut, index) => {
        const position = findValidPosition();
        if (!position) return;
        
        const astronautDiv = document.createElement('div');
        astronautDiv.className = 'astronaut';
        
        const astronautImg = document.createElement('img');
        astronautImg.src = 'https://www.svgrepo.com/show/24715/astronaut-ingravity.svg';
        astronautImg.alt = astronaut.name || 'Astronaut';
        astronautImg.className = 'astronaut-icon';
        
        if (index < Math.floor(astronauts.length / 2)) {
            astronautImg.style.transform = 'scaleX(-1)';
        }
        
        const rotation = Math.random() * 360;
        
        astronautDiv.style.position = 'absolute';
        astronautDiv.style.left = `${position.x}px`;
        astronautDiv.style.top = `${position.y}px`;
        astronautDiv.style.width = `${astronautSize}px`;
        astronautDiv.style.height = `${astronautSize}px`;
        astronautDiv.style.transform = `rotate(${rotation}deg)`;
        
        // Add click handler for banner
        astronautDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Remove any existing banners
            document.querySelectorAll('.astronaut-banner').forEach(b => b.remove());
            
            // Create new banner
            const banner = document.createElement('div');
            banner.className = 'astronaut-banner';
            banner.textContent = astronaut.name || 'Name unavailable';
            
            // Position banner above astronaut
            const rect = astronautDiv.getBoundingClientRect();
            banner.style.position = 'fixed';
            banner.style.left = `${rect.left + (rect.width / 2)}px`;
            banner.style.top = `${rect.top - 15}px`;
            banner.style.transform = `translateX(-50%) rotate(0deg)`;
            
            document.body.appendChild(banner);
        });
        
        astronautDiv.appendChild(astronautImg);
        container.appendChild(astronautDiv);
        
        placedAstronauts.push(position);
    });
}

// Update resize handler to reposition banners
window.addEventListener('resize', debounce(() => {
    if (currentAstronauts.length > 0) {
        // Remove existing banners
        document.querySelectorAll('.astronaut-banner').forEach(b => b.remove());
        createAstronautElements(currentAstronauts);
    }
}, 250));

// Add click handler to close all banners when clicking anywhere
document.body.addEventListener('click', (e) => {
    if (!e.target.closest('.astronaut')) {
        document.querySelectorAll('.astronaut-banner').forEach(b => b.remove());
    }
}); 