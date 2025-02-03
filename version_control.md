# Version Control Log

## Version 2 (Current)

### v2.0.0 - Security Updates
**Date:** [Current Date]

#### Changes:
- Updated API URLs from HTTP to HTTPS for enhanced security
  - Changed primary API URL to use HTTPS
  - Updated CORS proxy backup URL to use HTTPS
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Before
const DIRECT_API_URL = 'http://api.open-notify.org/astros.json';
const BACKUP_API_URL = CORS_PROXY + 'http://api.open-notify.org/astros.json';

// After
const DIRECT_API_URL = 'https://api.open-notify.org/astros.json';
const BACKUP_API_URL = CORS_PROXY + 'https://api.open-notify.org/astros.json';
```

#### Commit Message:
"Updated API URLs to use HTTPS for security"

### v2.0.1 - API Access Fix
**Date:** [Current Date]

#### Changes:
- Updated CORS handling for better API access
  - Switched to corsproxy.io as CORS proxy
  - Simplified API call logic
  - Added URL encoding for proxy requests
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Before
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const BACKUP_API_URL = CORS_PROXY + 'https://api.open-notify.org/astros.json';

// After
const CORS_PROXY = 'https://corsproxy.io/?';
const BACKUP_API_URL = CORS_PROXY + encodeURIComponent('https://api.open-notify.org/astros.json');
```

#### Commit Message:
"Fixed API access with updated CORS proxy"

### v2.0.2 - API Reliability Fix
**Date:** [Current Date]

#### Changes:
- Improved API reliability
  - Switched to allorigins.win as CORS proxy
  - Added proper request headers
  - Enhanced error handling
  - Added debug logging
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Before
const CORS_PROXY = 'https://corsproxy.io/?';
const BACKUP_API_URL = CORS_PROXY + encodeURIComponent('https://api.open-notify.org/astros.json');

// After
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const BACKUP_API_URL = CORS_PROXY + encodeURIComponent(DIRECT_API_URL);
```

#### Commit Message:
"Enhanced API reliability with improved CORS handling"

### v2.0.3 - API Connection Enhancement
**Date:** [Current Date]

#### Changes:
- Further improved API connectivity
  - Switched to JSONProxy service
  - Added multiple fallback attempts
  - Enhanced error logging
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Before
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const BACKUP_API_URL = CORS_PROXY + encodeURIComponent(DIRECT_API_URL);

// After
const CORS_PROXY = 'https://jsonp.afeld.me/?url=';
const BACKUP_API_URL = CORS_PROXY + encodeURIComponent(DIRECT_API_URL);
```

#### Commit Message:
"Improved API connectivity with enhanced fallback system"

### v2.0.4 - API Simplification
**Date:** [Current Date]

#### Changes:
- Simplified API handling
  - Removed CORS proxy attempts
  - Using direct API call only
  - Cleaned up error handling
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Before
const DIRECT_API_URL = 'https://api.open-notify.org/astros.json';
const CORS_PROXY = 'https://jsonp.afeld.me/?url=';
const BACKUP_API_URL = CORS_PROXY + encodeURIComponent(DIRECT_API_URL);

// After
const API_URL = 'https://api.open-notify.org/astros.json';
```

#### Commit Message:
"Simplified API handling for better performance"

### v2.0.5 - API Protocol Fix
**Date:** [Current Date]

#### Changes:
- Reverted API URL to HTTP
  - Changed from HTTPS back to HTTP
  - Removed unnecessary complexity
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Before
const API_URL = 'https://api.open-notify.org/astros.json';

// After
const API_URL = 'http://api.open-notify.org/astros.json';
```

#### Commit Message:
"Reverted API to HTTP for better compatibility"

### v2.0.6 - CORS Proxy Implementation
**Date:** [Current Date]

#### Changes:
- Added Heroku CORS proxy
  - Using cors-anywhere.herokuapp.com
  - Added Origin header
  - Maintained error handling
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Before
const API_URL = 'http://api.open-notify.org/astros.json';

// After
const BASE_URL = 'http://api.open-notify.org/astros.json';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const API_URL = CORS_PROXY + BASE_URL;
```

#### Commit Message:
"Added Heroku CORS proxy for API access"

### v2.0.7 - Alternative CORS Solution
**Date:** [Current Date]

#### Changes:
- Switched to allorigins.win CORS proxy
  - Added response parsing for wrapped content
  - Updated error handling for new format
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Before
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const API_URL = CORS_PROXY + BASE_URL;

// After
const CORS_PROXY = 'https://api.allorigins.win/get?url=';
const API_URL = CORS_PROXY + encodeURIComponent(BASE_URL);
```

#### Commit Message:
"Implemented more reliable CORS proxy solution"

### v2.0.8 - Layout Improvement
**Date:** [Current Date]

#### Changes:
- Added safe zones for header and counter
  - Prevented astronauts from overlapping with title
  - Maintained clear space around counter circle
  - Added header safe zone check
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Added new safe zone constant
const headerSafeZone = 100;

// Added new overlap check
const isHeaderOverlap = y < headerSafeZone;

// Updated position validation
if (!isCenterOverlap && !isHeaderOverlap && !isAstronautOverlap) {
    validPosition = true;
    occupiedSpaces.push({ x, y });
}
```

#### Commit Message:
"Improved layout with header safe zone"

### v2.1.0 - Astronaut Names Feature
**Date:** [Current Date]

#### Changes:
- Added astronaut name tooltips
  - Shows name on hover/touch
  - Sleek semi-transparent design
  - Touch device support
  - Smooth animations
  - Files modified: `script.js`, `style.css`

#### Technical Details:
- Added name tooltip HTML structure
- Added CSS for tooltip styling and animations
- Added touch event handling
- Updated API data handling to use astronaut names

#### Commit Message:
"Added astronaut name tooltips with touch support"

### v2.1.1 - Name Display Enhancement
**Date:** [Current Date]

#### Changes:
- Improved astronaut name display
  - Names always appear upright
  - Ensured unique name assignment
  - Added wrapper for better positioning
  - Files modified: `script.js`, `style.css`

#### Technical Details:
```javascript
// Added wrapper to keep names upright
tooltipWrapper.style.transform = `rotate(${-rotation}deg)`;
// Ensure unique name assignment
nameTooltip.textContent = astronauts[i % astronauts.length].name;
```

#### Commit Message:
"Enhanced astronaut name display with upright orientation"

### v2.1.2 - Animation Fix
**Date:** [Current Date]

#### Changes:
- Fixed astronaut animation
  - Restored gentle floating motion
  - Removed directional movement
  - Simplified animation calculation
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Before
const angleInRadians = (astronaut.rotation - 90) * (Math.PI / 180);
const offsetX = Math.cos(angleInRadians) * Math.sin(floatTime) * FLOAT_AMPLITUDE;
const offsetY = Math.sin(angleInRadians) * Math.sin(floatTime) * FLOAT_AMPLITUDE;

// After
const floatY = Math.sin(floatTime) * FLOAT_AMPLITUDE;
```

#### Commit Message:
"Fixed astronaut animation for smoother movement"

### v2.1.3 - Animation Removal
**Date:** [Current Date]

#### Changes:
- Removed animation temporarily
  - Made astronauts stationary
  - Kept rotation and scale
  - Simplified position handling
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Before
const floatTime = Date.now() * FLOAT_SPEED + astronaut.floatOffset;
const floatY = Math.sin(floatTime) * FLOAT_AMPLITUDE;

// After
// Static positioning only
```

#### Commit Message:
"Temporarily removed animation for stability"

### v2.1.4 - Animation Complete Removal
**Date:** [Current Date]

#### Changes:
- Completely removed animation system
  - Removed requestAnimationFrame
  - Single position update
  - Fixed continuous movement issue
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Before
if (activeAstronauts.length > 0) {
    requestAnimationFrame(updateAstronautPositions);
}

// After
if (activeAstronauts.length > 0) {
    updateAstronautPositions(); // Single call
}
```

#### Commit Message:
"Removed animation system for static display"

### v2.1.5 - Simplified Display
**Date:** [Current Date]

#### Changes:
- Removed astronaut visualization
  - Kept counter functionality
  - Removed astronaut creation
  - Simplified display logic
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Simplified to just update the count
function updateAstronautCount(count) {
    document.getElementById('astronaut-count').textContent = count;
}
```

#### Commit Message:
"Simplified to counter-only display"

### v2.2.0 - Fresh Start
**Date:** [Current Date]

#### Changes:
- Clean slate for astronaut implementation
  - Removed all previous astronaut-related code
  - Kept core API and counter functionality
  - Prepared for new implementation
  - Files modified: `script.js`

#### Technical Details:
- Removed unused constants and functions
- Kept essential API handling
- Maintained counter display
- Ready for new astronaut visualization

#### Commit Message:
"Reset for fresh astronaut implementation"

### v2.2.1 - Static Astronaut Implementation
**Date:** [Current Date]

#### Changes:
- Added static astronaut placement
  - Random positioning with overlap prevention
  - Safe zones for header and center circle
  - Screen boundary awareness
  - Files modified: `script.js`

#### Technical Details:
- Added position validation logic
- Implemented overlap detection
- Added safety margins
- Screen-fitting placement

#### Commit Message:
"Implemented static astronaut placement"

### v2.2.2 - Screen Boundary Fix
**Date:** [Current Date]

#### Changes:
- Fixed screen boundary issues
  - Added rotation padding
  - Stricter boundary checks
  - Adjusted safe zones
  - Better edge detection
  - Files modified: `script.js`

#### Technical Details:
```javascript
const rotationPadding = dynamicSize * 2;

const isBoundaryOverlap = 
    x < rotationPadding || 
    x > viewport.width - rotationPadding ||
    y < rotationPadding || 
    y > viewport.height - rotationPadding;
```

#### Commit Message:
"Fixed astronauts appearing outside screen"

### v2.2.3 - Astronaut Orientation
**Date:** [Current Date]

#### Changes:
- Added astronaut orientation variety
  - Mirrored half of the astronauts
  - Added random rotation
  - Maintained position logic
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Mirror half of astronauts
const isFlipped = index < Math.floor(astronauts.length / 2);
if (isFlipped) {
    astronautImg.style.transform = 'scaleX(-1)';
}

// Random rotation
const rotation = Math.random() * MAX_ROTATION;
```

#### Commit Message:
"Added astronaut mirroring and random rotation"

### v2.2.4 - API Response Fix
**Date:** [Current Date]

#### Changes:
- Added detailed API response logging
  - Added raw response logging
  - Added parsed data logging
  - Added count verification
  - Files modified: `script.js`

#### Technical Details:
```javascript
console.log('Raw API Response:', wrapper);
console.log('Parsed Data:', data);
console.log('Number of astronauts:', count);
```

#### Commit Message:
"Added API response debugging"

### v2.2.5 - JSON Parsing Fix
**Date:** [Current Date]

#### Changes:
- Fixed JSON parsing for API response
  - Handled double-escaped JSON
  - Removed escape characters
  - Corrected astronaut count
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Before
const data = JSON.parse(wrapper.contents);

// After
const data = JSON.parse(wrapper.contents.replace(/\\/g, ''));
```

#### Commit Message:
"Fixed JSON parsing to show correct astronaut count"

### v2.2.6 - API Fix Success
**Date:** [Current Date]

#### Changes:
- Fixed API endpoint and parsing
  - Changed CORS proxy endpoint from /get to /raw
  - Simplified JSON parsing
  - Removed wrapper handling
  - Successfully showing all 12 astronauts
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Before
const CORS_PROXY = 'https://api.allorigins.win/get?url=';
const wrapper = await response.json();
const data = JSON.parse(wrapper.contents);

// After
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const data = await response.json(); // Direct JSON parse
```

#### Commit Message:
"Fixed API endpoint for correct astronaut count"

### v2.2.7 - Vertical Animation
**Date:** [Current Date]

#### Changes:
- Added vertical floating animation
  - Gentle up/down movement
  - Maintained rotation angles
  - Preserved spacing rules
  - Individual float offsets
  - Files modified: `script.js`

#### Technical Details:
```javascript
const FLOAT_SPEED = 0.001;
const FLOAT_AMPLITUDE = 15;

// Animation calculation
const floatY = Math.sin(Date.now() * FLOAT_SPEED + astronaut.floatOffset) * FLOAT_AMPLITUDE;

// Transform with animation
translate(${astronaut.x}px, ${astronaut.y + floatY}px)
```

#### Commit Message:
"Added smooth vertical floating animation"

### v2.2.8 - Rotation-Based Animation
**Date:** [Current Date]

#### Changes:
- Updated floating animation to follow rotation
  - Movement parallel to astronaut orientation
  - Trigonometric calculations for offset
  - Maintained spacing and boundaries
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Convert rotation to radians
const angleInRadians = (astronaut.rotation - 90) * (Math.PI / 180);

// Calculate directional offset
const floatAmount = Math.sin(Date.now() * FLOAT_SPEED + astronaut.floatOffset) * FLOAT_AMPLITUDE;
const offsetX = Math.cos(angleInRadians) * floatAmount;
const offsetY = Math.sin(angleInRadians) * floatAmount;
```

#### Commit Message:
"Added rotation-based directional movement"

### v2.2.9 - Mobile Layout Fix
**Date:** [Current Date]

#### Changes:
- Improved mobile layout
  - Responsive sizing for astronauts
  - Adjusted safe zones for small screens
  - Better viewport handling
  - Files modified: `script.js`

#### Technical Details:
```javascript
const ASTRONAUT_SIZE = Math.min(80, window.innerWidth / 8);
const CENTER_SAFE_ZONE = Math.min(200, window.innerWidth / 3);
const spacing = isMobile() ? ASTRONAUT_SIZE * 1.5 : ASTRONAUT_SIZE * 1.2;
```

#### Commit Message:
"Improved mobile layout and responsiveness"

### v2.2.10 - Loading State Enhancement
**Date:** [Current Date]

#### Changes:
- Improved loading state display
  - Smaller "Loading..." text
  - Added fade effect
  - Better circle fit
  - Files modified: `script.js`, `style.css`

#### Technical Details:
```css
#astronaut-count.loading {
    font-size: 2rem;
    opacity: 0.7;
    font-weight: 300;
}
```

#### Commit Message:
"Enhanced loading state visualization"

### v2.2.11 - Mobile Optimization
**Date:** [Current Date]

#### Changes:
- Optimized mobile experience
  - Removed unnecessary CORS fallback
  - Improved mobile detection
  - Adjusted astronaut sizing
  - Reduced safe zones for small screens
  - Files modified: `script.js`

#### Technical Details:
```javascript
const ASTRONAUT_SIZE = Math.min(60, window.innerWidth / 10);
const CENTER_SAFE_ZONE = Math.min(150, window.innerWidth / 3);

function isMobile() {
    return window.innerWidth <= 768 || 
           navigator.userAgent.match(/iPhone|iPad|iPod|Android/i);
}
```

#### Commit Message:
"Optimized layout for mobile devices"

### v2.2.12 - Mobile Size Optimization
**Date:** [Current Date]

#### Changes:
- Optimized element sizes for mobile
  - Reduced circle size
  - Smaller astronaut icons
  - Adjusted text scaling
  - Tighter spacing rules
  - Files modified: `script.js`, `style.css`

#### Technical Details:
```css
@media (max-width: 768px) {
    .astronaut-counter {
        width: 180px;
        height: 180px;
    }
    #astronaut-count {
        font-size: 3.5rem;
    }
}
```
```javascript
const ASTRONAUT_SIZE = isMobile() ? 50 : 80;
const CENTER_SAFE_ZONE = isMobile() ? 120 : 200;
```

#### Commit Message:
"Optimized element sizes for mobile display"

### v2.2.13 - Loading Text Fix
**Date:** [Current Date]

#### Changes:
- Fixed loading text size
  - Reduced loading text size
  - Better circle fit
  - Mobile size adjustment
  - Files modified: `style.css`

#### Technical Details:
```css
#astronaut-count.loading {
    font-size: 1.8rem;
}

@media (max-width: 768px) {
    #astronaut-count.loading {
        font-size: 1.2rem;
    }
}
```

#### Commit Message:
"Fixed loading text size for better fit"

### v2.2.14 - Mobile Layout Enhancement
**Date:** [Current Date]

#### Changes:
- Further reduced mobile sizes
  - Much smaller circle (140px)
  - Smaller astronaut icons (40px)
  - Reduced safe zones
  - Adjusted all text sizes
  - Files modified: `script.js`, `style.css`

#### Technical Details:
```css
@media (max-width: 768px) {
    .astronaut-counter {
        width: 140px;
        height: 140px;
    }
    .astronaut-icon {
        width: 40px;
        height: 40px;
    }
}
```
```javascript
const ASTRONAUT_SIZE = isMobile() ? 40 : 80;
const CENTER_SAFE_ZONE = isMobile() ? 100 : 200;
```

#### Commit Message:
"Significantly reduced element sizes for mobile"

### v2.2.15 - Mobile Overlap Fix
**Date:** [Current Date]

#### Changes:
- Fixed mobile overlap issues
  - Added proper z-index layering
  - Improved circle safe zone calculation
  - Tighter spacing on mobile
  - Better distance checking
  - Files modified: `script.js`, `style.css`

#### Technical Details:
```css
.astronaut-counter {
    z-index: 10;
}
.astronaut {
    z-index: 1;
}
```
```javascript
const CENTER_SAFE_ZONE = isMobile() ? 90 : 200;
const isCenterOverlap = Math.hypot(x - centerX, y - centerY) < CENTER_SAFE_ZONE;
```

#### Commit Message:
"Fixed mobile overlap and layering issues"

### v2.2.16 - Mobile Viewport Fix
**Date:** [Current Date]

#### Changes:
- Fixed mobile viewport handling
  - Prevented page scrolling
  - Dynamic astronaut sizing
  - Viewport-aware spacing
  - Adjusted safe zones
  - Files modified: `script.js`, `style.css`

#### Technical Details:
```javascript
const dynamicSize = isMobile() ? 
    Math.min(40, Math.min(viewportWidth / maxAstronautsPerRow, viewportHeight / 6)) : 
    ASTRONAUT_SIZE;

const safeCenterZone = isMobile() ? Math.min(90, viewportHeight / 4) : CENTER_SAFE_ZONE + ASTRONAUT_SIZE;
```

#### Commit Message:
"Fixed mobile viewport to prevent scrolling"

### v2.2.17 - Mobile Layout Refinement
**Date:** [Current Date]

#### Changes:
- Refined mobile layout calculations
  - Added viewport dimension helper
  - Dynamic sizing based on astronaut count
  - Improved overlap detection
  - Added boundary checks
  - Files modified: `script.js`

#### Technical Details:
```javascript
const viewport = getViewportDimensions();
const dynamicSize = isMobile() 
    ? Math.min(30, Math.min(
        viewport.width / (maxAstronautsPerRow * 1.5), 
        viewport.height / (maxAstronautsPerRow * 1.5)
      ))
    : ASTRONAUT_SIZE;
```

#### Commit Message:
"Refined mobile layout calculations and spacing"

### v2.2.18 - Mobile Size Adjustment
**Date:** [Current Date]

#### Changes:
- Adjusted mobile astronaut sizing
  - Much smaller astronauts (25px max)
  - Tighter spacing (1.05x)
  - Reduced safe zones
  - Better distribution
  - Files modified: `script.js`

#### Technical Details:
```javascript
const dynamicSize = isMobile() 
    ? Math.min(25, Math.min(
        viewport.width / (maxAstronautsPerRow * 2), 
        viewport.height / (maxAstronautsPerRow * 2)
      ))
    : ASTRONAUT_SIZE;

const spacing = isMobile() 
    ? dynamicSize * 1.05
    : ASTRONAUT_SIZE * 1.2;
```

#### Commit Message:
"Fixed mobile astronaut sizing and spacing"

### v2.2.19 - Mobile Size Stability
**Date:** [Current Date]

#### Changes:
- Fixed mobile size transition issues
  - Added minimum viewport dimensions
  - More conservative base sizing
  - Consistent size calculations
  - Extremely tight spacing
  - Files modified: `script.js`

#### Technical Details:
```javascript
const minWidth = 320;  // Minimum width for mobile
const minHeight = 480; // Minimum height for mobile

const baseSize = isMobile() ? 20 : ASTRONAUT_SIZE;
const dynamicSize = isMobile() 
    ? Math.min(baseSize, Math.min(
        viewport.width / (maxAstronautsPerRow * 3),
        viewport.height / (maxAstronautsPerRow * 3)
      ))
    : ASTRONAUT_SIZE;
```

#### Commit Message:
"Fixed mobile size transition glitches"

### v2.2.20 - Circle Overlap Fix
**Date:** [Current Date]

#### Changes:
- Fixed circle overlap issues
  - Increased circle safe zone
  - Added rotation safe zone
  - More strict overlap detection
  - Added size buffer
  - Files modified: `script.js`

#### Technical Details:
```javascript
const safeCenterZone = isMobile() 
    ? Math.min(80, Math.min(viewport.width, viewport.height) / 4) + dynamicSize
    : CENTER_SAFE_ZONE + ASTRONAUT_SIZE;

const rotationSafeZone = Math.hypot(x - centerX, y - centerY) < 
    (safeCenterZone + dynamicSize * 1.5);
```

#### Commit Message:
"Fixed astronaut overlap with center circle"

### v2.2.21 - Narrow Screen Fix
**Date:** [Current Date]

#### Changes:
- Fixed narrow screen layout issues
  - More aggressive size reduction
  - Minimum dimension based sizing
  - Tighter spacing constraints
  - Adjusted safe zones
  - Files modified: `script.js`

#### Technical Details:
```javascript
const minDimension = Math.min(viewport.width, viewport.height);
const baseSize = isMobile() 
    ? Math.min(20, minDimension / (maxAstronautsPerRow * 3))
    : ASTRONAUT_SIZE;

const dynamicSize = isMobile() 
    ? Math.min(baseSize, Math.min(
        viewport.width / (maxAstronautsPerRow * 4),
        viewport.height / (maxAstronautsPerRow * 4)
      ))
    : ASTRONAUT_SIZE;
```

#### Commit Message:
"Fixed astronaut sizing for narrow screens"

### v2.2.22 - Scroll Behavior Update
**Date:** [Current Date]

#### Changes:
- Updated scroll behavior
  - Enabled mobile scrolling
  - Prevented desktop scrolling
  - Device-specific sizing
  - Viewport optimization
  - Files modified: `script.js`

#### Technical Details:
```javascript
function getViewportDimensions() {
    if (isMobile()) {
        return { 
            width: vw, 
            height: vh, 
            allowScroll: true 
        };
    } else {
        return { 
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            allowScroll: false
        };
    }
}
```

#### Commit Message:
"Updated scroll behavior for mobile and desktop"

### v2.2.23 - Mobile Detection Fix
**Date:** [Current Date]

#### Changes:
- Fixed mobile detection timing
  - Moved viewport check to top
  - Dynamic constant calculation
  - Added resize handler
  - More reliable mobile detection
  - Files modified: `script.js`

#### Technical Details:
```javascript
window.addEventListener('resize', () => {
    getAstronautData();
});

function getViewportDimensions() {
    if (isMobile()) {
        const vw = Math.min(window.innerWidth, document.documentElement.clientWidth);
        const vh = window.innerHeight;
        return { width: vw, height: vh, allowScroll: true };
    }
    // ...
}
```

#### Commit Message:
"Fixed mobile detection and viewport handling"

### v2.2.24 - Resize Handler Fix
**Date:** [Current Date]

#### Changes:
- Fixed resize behavior
  - Added debounce to resize handler
  - Prevented rapid recalculations
  - Smoother screen size transitions
  - Files modified: `script.js`

#### Technical Details:
```javascript
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

window.addEventListener('resize', debounce(() => {
    getAstronautData();
}, 250));
```

#### Commit Message:
"Fixed screen resize handling with debounce"

### v2.2.25 - Small Screen Size Fix
**Date:** [Current Date]

#### Changes:
- Fixed small screen sizing
  - More aggressive size reduction
  - Maximum 15px on mobile
  - Proportional to screen size
  - Tighter spacing rules
  - Files modified: `script.js`

#### Technical Details:
```javascript
const baseSize = isMobileView 
    ? Math.min(15, minDimension / (maxAstronautsPerRow * 5))
    : Math.min(80, minDimension / (maxAstronautsPerRow * 2));

const spacing = isMobileView 
    ? baseSize * 1.2
    : baseSize * 1.5;
```

#### Commit Message:
"Fixed astronaut sizing for very small screens"

### v2.2.26 - Grid Layout Implementation
**Date:** [Current Date]

#### Changes:
- Redesigned astronaut positioning
  - Grid-based layout
  - Automatic spacing calculation
  - Better center circle avoidance
  - Organized distribution
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Calculate grid dimensions
const rows = Math.ceil(Math.sqrt(numAstronauts));
const cols = Math.ceil(numAstronauts / rows);

// Calculate grid spacing
const xSpacing = viewport.width / (cols + 1);
const ySpacing = viewport.height / (rows + 1);
```

#### Commit Message:
"Implemented grid-based astronaut layout"

### v2.2.27 - Static Grid Layout
**Date:** [Current Date]

#### Changes:
- Implemented static grid layout
  - Removed all animations
  - Fixed grid positioning
  - Golden angle rotation
  - Simplified code
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Calculate grid layout
const rows = Math.ceil(Math.sqrt(numAstronauts));
const cols = Math.ceil(numAstronauts / rows);

// Static rotation using golden angle
const rotation = (index * 137.5) % 360;
```

#### Commit Message:
"Switched to static grid-based layout"

### v2.2.28 - Spacing and Scroll Fix
**Date:** [Current Date]

#### Changes:
- Fixed astronaut spacing and scroll
  - Minimum spacing enforcement
  - Enabled scrolling on all devices
  - Fixed grid calculations
  - Dynamic container height
  - Files modified: `script.js`

#### Technical Details:
```javascript
const minSpacing = isMobileView ? 50 : 100;
const cols = Math.floor(viewport.width / minSpacing);
const ySpacing = minSpacing * 1.5;

const containerHeight = ySpacing * (rows + 1);
document.getElementById('astronaut-container').style.height = 
    `${containerHeight}px`;
```

#### Commit Message:
"Fixed astronaut spacing and enabled scrolling"

### v2.2.29 - Grid Distribution Fix
**Date:** [Current Date]

#### Changes:
- Improved astronaut distribution
  - Full viewport height utilization
  - Even vertical spacing
  - Better grid centering
  - Minimum container height
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Calculate spacing to use full viewport height
const ySpacing = viewport.height / (rows + 1);
const yMargin = (viewport.height - (ySpacing * (rows - 1))) / 2;

// Update container to use full viewport
container.style.height = '100vh';
container.style.minHeight = '600px';
```

#### Commit Message:
"Fixed astronaut distribution across viewport"

### v2.2.30 - Overlap Prevention
**Date:** [Current Date]

#### Changes:
- Improved grid system to prevent overlaps
  - Increased minimum spacing
  - Fixed grid calculations
  - Guaranteed separation between astronauts
  - Better center circle avoidance
  - Files modified: `script.js`

#### Technical Details:
```javascript
const minSpacing = isMobileView ? 80 : 150;
const xSpacing = viewport.width / (cols + 1);
const ySpacing = minSpacing * 1.5;

// Ensure minimum container height
const totalHeight = ySpacing * (rows + 1);
container.style.minHeight = `${Math.max(totalHeight, viewport.height)}px`;
```

#### Commit Message:
"Implemented strict spacing to prevent overlaps"

### v2.2.31 - Resize Safe Zone Fix
**Date:** [Current Date]

#### Changes:
- Fixed resize overlap issues
  - Pre-calculated safe positions
  - Fixed center safe zone
  - Position shuffling
  - Better position validation
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Calculate valid positions avoiding center
const positions = [];
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const x = (viewport.width * (col + 1)) / (cols + 1);
        const y = minSpacing + (row * ySpacing);
        
        const distanceToCenter = Math.hypot(x - centerX, y - centerY);
        if (distanceToCenter > centerSafeZone) {
            positions.push({ x, y });
        }
    }
}
```

#### Commit Message:
"Fixed resize overlap with pre-calculated positions"

### v2.2.32 - Grid Layout with Circle Fix
**Date:** [Current Date]

#### Changes:
- Fixed center circle visibility
  - Restored circle styles
  - Maintained grid layout
  - Proper circle dimensions
  - Mobile responsiveness
  - Files modified: `style.css`

#### Technical Details:
```css
.astronaut-counter {
    background-color: rgba(0, 0, 0, 0.7);
    border: 2px solid #ffffff;
    border-radius: 50%;
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
}
```

#### Commit Message:
"Fixed center circle visibility while maintaining grid layout"

### v2.2.33 - Text Alignment Fix
**Date:** [Current Date]

#### Changes:
- Fixed text alignment issues
  - Fixed header overlap
  - Centered circle text
  - Added header background
  - Adjusted spacing
  - Files modified: `style.css`

#### Technical Details:
```css
h1 {
    position: fixed;
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 1rem;
}

.astronaut-counter {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
```

#### Commit Message:
"Fixed header overlap and circle text alignment"

### v2.2.34 - Header Overlap Fix
**Date:** [Current Date]

#### Changes:
- Fixed header overlap with circle
  - Adjusted header positioning
  - Reduced padding and margins
  - Better mobile text handling
  - Improved spacing
  - Files modified: `style.css`

#### Technical Details:
```css
h1 {
    top: 1rem;
    padding: 0.5rem;
    white-space: nowrap;
}

@media (max-width: 768px) {
    h1 {
        font-size: 1rem;
        padding: 0.3rem;
        top: 0.5rem;
        width: auto;
        min-width: 200px;
        max-width: 90%;
    }
}
```

#### Commit Message:
"Fixed header overlap with circle on small screens"

### v2.2.35 - Circle Text Resize Fix
**Date:** [Current Date]

#### Changes:
- Fixed circle text resizing
  - Responsive font sizing
  - Text container constraints
  - Better text wrapping
  - Dynamic spacing
  - Files modified: `style.css`

#### Technical Details:
```css
h2 {
    font-size: min(0.9rem, calc(100% - 0.2rem));
    max-width: 90%;
    word-wrap: break-word;
}

#astronaut-count {
    font-size: min(5rem, calc(100vw / 12));
}
```

#### Commit Message:
"Fixed circle text resizing for small screens"

### v2.2.36 - Header Spacing Fix
**Date:** [Current Date]

#### Changes:
- Fixed header spacing
  - Added header height variables
  - Consistent spacing below header
  - Better mobile adaptation
  - Proper content flow
  - Files modified: `style.css`

#### Technical Details:
```css
:root {
    --header-height: 4rem;
    --mobile-header-height: 3rem;
}

.astronaut-container {
    margin-top: var(--header-height);
}
```

#### Commit Message:
"Fixed astronaut positioning below header"

### v2.2.37 - Scattered Layout
**Date:** [Current Date]

#### Changes:
- Implemented scattered astronaut layout
  - Random position selection
  - Strict safe zone enforcement
  - Better space utilization
  - Grid-based scatter
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Create grid with more cells than needed
const gridCols = Math.floor(viewport.width / minSpacing);
const gridRows = Math.ceil((viewport.height - headerSafeZone) / minSpacing);

// Validate positions against safe zones
const distanceToCircle = Math.hypot(x - circleSafeZone.x, y - circleSafeZone.y);
if (distanceToCircle > circleSafeZone.radius + baseSize) {
    positions.push({ x, y });
}
```

#### Commit Message:
"Implemented scattered astronaut layout with safe zones"

### v2.2.38 - Z-Index Fix
**Date:** [Current Date]

#### Changes:
- Fixed z-index stacking
  - Proper layer hierarchy
  - Increased circle safe zone
  - Stricter position validation
  - No overlap with circle
  - Files modified: `style.css`, `script.js`

#### Technical Details:
```css
h1 { z-index: 30; }
.astronaut-counter { z-index: 20; }
.astronaut { z-index: 15; }
.astronaut-container { z-index: 10; }
```

#### Commit Message:
"Fixed z-index to prevent astronauts appearing behind circle"

### v2.2.39 - Overlap Prevention Enhancement
**Date:** [Current Date]

#### Changes:
- Enhanced overlap prevention
  - Increased minimum spacing
  - More positioning attempts
  - Stricter validation
  - Better padding
  - Files modified: `script.js`

#### Technical Details:
```javascript
const minDistance = baseSize * 3; // Increased spacing
const maxAttempts = 1000; // More attempts

const isValidPosition = 
    distanceToCircle > circleSafeZone.radius &&
    !positions.some(pos => 
        Math.hypot(x - pos.x, y - pos.y) < minDistance
    );
```

#### Commit Message:
"Enhanced astronaut spacing and overlap prevention"

### v2.2.40 - Grid Layout Restructure
**Date:** [Current Date]

#### Changes:
- Implemented CSS Grid layout
  - Responsive column system
  - Better astronaut distribution
  - Improved collision prevention
  - Structured cell positioning
  - Files modified: `style.css`, `script.js`

#### Technical Details:
```css
.astronaut-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    place-items: center;
}
```

#### Commit Message:
"Restructured layout using CSS Grid for better distribution"

### v2.2.41 - Random Grid Placement
**Date:** [Current Date]

#### Changes:
- Added random positioning within grid
  - Random offsets within cells
  - Maintained grid structure
  - Position shuffling
  - Better distribution
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Add random offset within cell
const randomX = (Math.random() - 0.5) * (cellWidth * 0.5);
const randomY = (Math.random() - 0.5) * (cellHeight * 0.5);

// Calculate base position plus random offset
const x = (col + 0.5) * cellWidth + randomX;
const y = (row + 0.5) * cellHeight + randomY;
```

#### Commit Message:
"Added random positioning within grid structure"

---

## Version 1 (Original)

### v1.0.0 - Initial Release
**Date:** [Original Release Date]

#### Features:
- Real-time astronaut count from Open Notify API
- Minimalist black and white design
- Circular counter display
- Dynamic astronaut visualizations
- Direction-based floating animations
- Alternating astronaut orientations
- Responsive design 