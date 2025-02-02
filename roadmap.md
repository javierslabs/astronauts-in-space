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