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
  - Added padding to prevent cutoff
  - Adjusted position calculation
  - Ensured astronauts stay in view
  - Files modified: `script.js`

#### Technical Details:
```javascript
// Added padding to position calculation
const padding = ASTRONAUT_SIZE;
x = padding + Math.random() * (window.innerWidth - ASTRONAUT_SIZE - padding * 2);
y = padding + Math.random() * (window.innerHeight - ASTRONAUT_SIZE - padding * 2);
```

#### Commit Message:
"Fixed astronaut screen boundary issues"

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