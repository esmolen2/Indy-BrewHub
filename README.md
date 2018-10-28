# The Indy BrewHub
This is a single page application that uses Google Maps and venue data from Foursquare to provide a detailed listing of breweries in the Downtown Indianapolis area. The application was completed as part of the Neighborhood Map project within Udacity's Frontend Web Developer Nanodegree program.

## How to Use
* Click on the "View List of Breweries" tab on the left side of the screen to open a full list of breweries available in the application.
* Click on any of breweries in the list panel or any of the markers shown on the map to display details about the brewery, including: name, image, Foursquare rating, address, and website.
* Filter the list of breweries and map markers by searching by name for a particular brewery in the side panel search field.

## How to Run

### Run in Developer Mode
1. [Download](https://github.com/esmolen2/Indy-BrewHub/archive/master.zip) or [clone](https://github.com/esmolen2/Indy-BrewHub.git) this repository
2. Run ```npm install``` in the working directory
3. Install all dependancies (See Dependancies section below).
4. Run ```npm start``` to initialize the application.
5. Open http://localhost:3000/ in your browser to view the application.

Please note that the service worker for this application will not register in developer mode. To register the service worker and cache the application, run the application in production mode (see below).

### Run in Production Mode
If you wish to cache the application via service worker, run the application in production mode via the steps below
1. [Download](https://github.com/esmolen2/Indy-BrewHub/archive/master.zip) or [clone](https://github.com/esmolen2/Indy-BrewHub.git) this repository
2. Run ```npm install``` in the working directory
3. Install all dependancies (See Dependancies section below)
4. Run ```npm run build``` to build a production version of the application.
5. Install necessary server dependancies by running ```npm install -g serve```
6. Run ```serve -s build``` to initialize the application in production mode.
5. Open http://localhost:5000/ in your browser to view the application.

## Dependancies
1. escape-string-regexp
2. sort-by

To install these dependancies, navigate to the working directory and run ```npm install --save escape-string-regexp sort-by```.

## Resources
* General: Udacity Front End Web Developer Nanodegree program lessons, projects, mentors, and forums!
* Map: [Google Maps API](https://cloud.google.com/maps-platform/)
* Map initialization: [Stack Overflow user Tremby](https://stackoverflow.com/questions/48493960/using-google-map-in-react-component)
* Brewery Data: [Foursquare](https://foursquare.com/)
* React: This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
