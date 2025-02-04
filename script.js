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

// Get astronaut data from API
async function getAstronautData() {
    updateAstronautCount('loading');
    
    const BASE_URL = 'http://api.open-notify.org/astros.json';
    
    // List of CORS proxies with their specific URL formats
    const proxyConfigs = [
        {
            name: 'corsproxy.io',
            url: 'https://corsproxy.io/?',
            format: (url) => `${proxyConfigs[0].url}${encodeURIComponent(url)}`
        },
        {
            name: 'cors.sh',
            url: 'https://proxy.cors.sh/',
            format: (url) => `${proxyConfigs[1].url}${url}`
        },
        {
            name: 'allorigins',
            url: 'https://api.allorigins.win/raw?url=',
            format: (url) => `${proxyConfigs[2].url}${encodeURIComponent(url)}`
        }
    ];
    
    // Try each proxy
    for (const proxy of proxyConfigs) {
        try {
            console.log(`Trying ${proxy.name}...`);
            const response = await fetch(proxy.format(BASE_URL));
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data && Array.isArray(data.people)) {
                const count = data.people.length;
                console.log(`Success with ${proxy.name}`);
                
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
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            console.log(`Failed with ${proxy.name}:`, error.message);
            continue;
        }
    }
    
    // If all proxies fail, use fallback data
    console.error('All proxies failed. Using fallback data');
    const fallbackData = {
        people: [
            { craft: "ISS", name: "Oleg Kononenko" },
            { craft: "ISS", name: "Nikolai Chub" },
            { craft: "ISS", name: "Tracy Caldwell Dyson" },
            { craft: "ISS", name: "Matthew Dominick" },
            { craft: "ISS", name: "Michael Barratt" },
            { craft: "ISS", name: "Jeanette Epps" },
            { craft: "ISS", name: "Alexander Grebenkin" },
            { craft: "ISS", name: "Butch Wilmore" },
            { craft: "ISS", name: "Sunita Williams" },
            { craft: "Tiangong", name: "Li Guangsu" },
            { craft: "Tiangong", name: "Li Cong" },
            { craft: "Tiangong", name: "Ye Guangfu" }
        ],
        number: 12,
        message: "success"
    };
    
    // Remove any existing footnote
    document.querySelector('.footnote')?.remove();
    
    // Add fallback footnote with timestamp
    const footnote = document.createElement('div');
    footnote.className = 'footnote';
    footnote.textContent = 'All proxies failed. Using fallback data from February 3, 2024';
    document.body.appendChild(footnote);
    
    updateAstronautCount(fallbackData.people.length);
    createAstronautElements(fallbackData.people);
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
    subtitle.textContent = 'Click on any astronaut to know their names!';
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
                // Header zone with padding of 1.5 times astronaut size below
                x: 0,
                y: header.top,
                width: viewport.width,
                height: header.height + (currentSize * 1.5) // Changed to 1.5 times astronaut size
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
                y: footnoteBounds.top - currentSize,
                width: viewport.width,
                height: viewport.height - footnoteBounds.top + currentSize
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
                const sidePadding = currentSize * 1.5;
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
    
    // Create astronaut elements with final positions
    placementResult.positions.forEach((position, index) => {
        const astronaut = astronauts[index];
        
        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'astronaut-wrapper';
        wrapper.style.left = `${position.x}px`;
        wrapper.style.top = `${position.y}px`;
        
        // Rest of the astronaut creation code remains the same
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
        astronautDiv.style.width = `${currentSize}px`;
        astronautDiv.style.height = `${currentSize}px`;
        
        wrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.astronaut-banner').forEach(b => b.remove());
            const banner = document.createElement('div');
            banner.className = 'astronaut-banner';
            banner.textContent = astronaut.name || 'Name unavailable';
            wrapper.appendChild(banner);
        });
        
        astronautDiv.appendChild(astronautImg);
        wrapper.appendChild(astronautDiv);
        container.appendChild(wrapper);
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