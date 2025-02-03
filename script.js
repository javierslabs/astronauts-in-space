// API constants
const BASE_URL = 'http://api.open-notify.org/astros.json';
const CORS_PROXY = 'https://proxy.cors.sh/';
const API_URL = CORS_PROXY + BASE_URL;

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
    
    const BASE_URL = 'http://api.open-notify.org/astros.json';
    
    // Try allorigins first
    try {
        const allOriginsProxy = 'https://api.allorigins.win/raw?url=';
        const response = await fetch(allOriginsProxy + encodeURIComponent(BASE_URL));
        const data = await response.json();
        
        if (data && Array.isArray(data.people)) {
            const count = data.people.length;
            console.log('Success with allorigins proxy');
            // Remove any existing footnote
            document.querySelector('.footnote')?.remove();
            // Add success footnote
            const footnote = document.createElement('div');
            footnote.className = 'footnote';
            footnote.textContent = 'Data obtained successfully';
            document.body.appendChild(footnote);
            updateAstronautCount(count);
            createAstronautElements(data.people);
            return;
        }
    } catch (error) {
        console.log('allorigins proxy failed:', error);
        
        // Try other proxies in sequence
        const backupProxies = [
            'https://corsproxy.io/?',
            'https://api.codetabs.com/v1/proxy?quest=',
            'https://proxy.cors.sh/'
        ];
        
        for (const proxy of backupProxies) {
            try {
                const response = await fetch(proxy + encodeURIComponent(BASE_URL));
                const data = await response.json();
                
                if (data && Array.isArray(data.people)) {
                    const count = data.people.length;
                    console.log('Success with backup proxy:', proxy);
                    updateAstronautCount(count);
                    createAstronautElements(data.people);
                    return;
                }
            } catch (error) {
                console.log(`Failed with proxy ${proxy}:`, error);
                continue;
            }
        }
    }
    
    // If all proxies fail, use fallback data
    console.error('All proxies failed. Using fallback data');
    const fallbackData = {
        people: Array(11).fill().map(() => ({
            name: 'Name unavailable'
        }))
    };
    updateAstronautCount(fallbackData.people.length);
    createAstronautElements(fallbackData.people);

    // Add footnote for fallback data
    const footnote = document.createElement('div');
    footnote.className = 'footnote';
    footnote.textContent = 'All proxies failed. Using fallback data';
    document.body.appendChild(footnote);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Create and add subtitle
    const subtitle = document.createElement('div');
    subtitle.className = 'subtitle';
    subtitle.textContent = 'Click on any astronaut to know their names!';
    document.body.appendChild(subtitle);
    
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

function createAstronautElements(astronauts) {
    currentAstronauts = astronauts; // Store for resize events
    const container = document.getElementById('astronaut-container');
    container.innerHTML = '';
    
    const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    
    // Get header, subtitle, circle and footnote boundaries
    const header = document.querySelector('h1').getBoundingClientRect();
    const subtitle = document.querySelector('.subtitle').getBoundingClientRect();
    const circle = document.querySelector('.astronaut-counter').getBoundingClientRect();
    
    // Calculate astronaut size based on viewport
    const astronautSize = Math.min(viewport.width, viewport.height) * 0.08;
    
    // Safe zones with padding
    const safeZones = [
        {
            // Header and subtitle zone
            x: 0,
            y: header.top,
            width: viewport.width,
            height: subtitle.bottom - header.top
        },
        {
            // Circle zone
            x: circle.left - astronautSize,
            y: circle.top - astronautSize,
            width: circle.width + (astronautSize * 2),
            height: circle.height + (astronautSize * 2)
        }
    ];
    
    // Add footnote zone if footnote exists
    const footnote = document.querySelector('.footnote');
    if (footnote) {
        const footnoteBounds = footnote.getBoundingClientRect();
        safeZones.push({
            // Footnote zone
            x: 0,
            y: footnoteBounds.top - astronautSize,
            width: viewport.width,
            height: viewport.height - footnoteBounds.top + astronautSize
        });
    }
    
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
        
        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'astronaut-wrapper';
        wrapper.style.left = `${position.x}px`;
        wrapper.style.top = `${position.y}px`;
        
        // Add unique floating parameters
        const floatParams = createUniqueFloatParameters();
        wrapper.style.setProperty('--move-x1', `${floatParams.x1}px`);
        wrapper.style.setProperty('--move-y1', `${floatParams.y1}px`);
        wrapper.style.setProperty('--move-x2', `${floatParams.x2}px`);
        wrapper.style.setProperty('--move-y2', `${floatParams.y2}px`);
        wrapper.style.setProperty('--move-x3', `${floatParams.x3}px`);
        wrapper.style.setProperty('--move-y3', `${floatParams.y3}px`);
        wrapper.style.setProperty('--float-duration', `${floatParams.duration}s`);
        wrapper.style.setProperty('--float-delay', `${floatParams.delay}s`);
        
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
        astronautDiv.style.setProperty('--rotation', `${rotation}deg`);
        astronautDiv.style.width = `${astronautSize}px`;
        astronautDiv.style.height = `${astronautSize}px`;
        
        // Add click handler for banner
        wrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Remove any existing banners
            document.querySelectorAll('.astronaut-banner').forEach(b => b.remove());
            
            // Create new banner
            const banner = document.createElement('div');
            banner.className = 'astronaut-banner';
            banner.textContent = astronaut.name || 'Name unavailable';
            
            wrapper.appendChild(banner);
        });
        
        astronautDiv.appendChild(astronautImg);
        wrapper.appendChild(astronautDiv);
        container.appendChild(wrapper);
        
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