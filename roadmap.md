# Astronauts in Space Web App Roadmap

This document provides a simple guide to building a web app that displays the current number of astronauts in space using the Open Notify API. The app will also feature a fun animation of astronauts bouncing around the page.

## Tools & Technologies

### Languages:
- **HTML**: For the structure of the web page.
- **CSS**: For styling and animations.
- **JavaScript**: For fetching data from the API and adding interactivity.

### Libraries & APIs:
- **Open Notify API**: To get the number of astronauts currently in space.
- **CSS Animation**: For the astronaut bouncing effect.
- **Vanilla JS**: For simplicity, no need for external JS libraries.

## Steps to Build the Web App

### Step 1: Set Up the Project Folder Structure

1. Create a folder for your project, e.g., `astronauts-in-space`.
2. Inside this folder, create the following files:
   - `index.html`
   - `style.css`
   - `script.js`

### Step 2: Build the HTML Structure

1. Open `index.html`.
2. Create the basic structure for an HTML document.
3. Add a `div` to display the astronaut count and an area where the astronauts will appear.
4. Set up a container for the astronauts.

### Step 3: Style the Page with CSS
Open style.css

Add some basic styling for the page.
Create the astronaut animation using @keyframes in CSS.
Use absolute positioning to make astronauts move around.

### Step 4: Fetch Astronaut Data Using the Open Notify API

Open script.js.
Use JavaScript's fetch() function to get data from the Open Notify API.
Parse the JSON response and display the number of astronauts in the page.

### Step 5: Test the Application

Open the index.html file in a browser.
Ensure the following:
The number of astronauts is displayed.
The astronaut images appear and bounce around.

## How to Make Changes

### Local Development
1. Make changes to your files in your code editor
2. Test changes locally by opening index.html in browser

### Version Control Steps
1. **Check Status**
   ```bash
   git status
   ```
   Shows which files you've modified

2. **Stage Changes**
   ```bash
   # For specific files:
   git add script.js
   git add style.css
   
   # Or for all changes:
   git add .
   ```

3. **Commit Changes**
   ```bash
   # Use descriptive messages
   git commit -m "Added new feature: astronaut rotation"
   ```

4. **Push to GitHub**
   ```bash
   git push
   ```

### Best Practices
1. **Make Focused Commits**
   - Each commit should represent one logical change
   - Use clear commit messages describing what changed

2. **Use Branches for New Features**
   ```bash
   # Create and switch to new branch
   git checkout -b feature-name
   
   # After changes:
   git add .
   git commit -m "Added new feature"
   git push -u origin feature-name
   ```

3. **Stay Updated**
   ```bash
   # Before starting new work:
   git pull
   ```

4. **Track History**
   ```bash
   # View commit history
   git log
   ```