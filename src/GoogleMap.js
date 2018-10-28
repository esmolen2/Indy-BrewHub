/*global google*/

import React, { Component } from 'react'
import './App.css'

class GoogleMap extends Component {

	// Promise-based approach to calling Google Maps API based on StackOverflow post linked below
	// https://stackoverflow.com/questions/48493960/using-google-map-in-react-component

	getGoogleMaps() {
	    // If we haven't already defined the promise, define it
	    if (!this.googleMapsPromise) {
	    	this.googleMapsPromise = new Promise((resolve) => {
	        	// Add a global handler for when the API finishes loading
	        	window.resolveGoogleMapsPromise = () => {
	          		// Resolve the promise
	          		resolve(google);

	          		// Tidy up
	          		delete window.resolveGoogleMapsPromise;
	        	};

	        	// Load the Google Maps API
	        	const script = document.createElement("script");
	        	const API = 'AIzaSyDA_I44D_hAqdydXLPcGs0mRvui6gg5HuU';
	        	script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
	        	script.async = true;
	        	document.body.appendChild(script);
	      	});
	    }

	    // Return a promise for the Google Maps API
	    return this.googleMapsPromise;
	}

	mapMarkers() {
		const bounds = new google.maps.LatLngBounds();

		this.props.markers.forEach((marker) => {
			marker.setMap(this.props.map)
			bounds.extend(marker.position);
		})

		this.props.map.fitBounds(bounds);
	}

	componentWillMount() {
		// Start Google Maps API loading since we know we'll soon need it
		this.getGoogleMaps();
	}

  	componentDidMount() {
    	// Once the Google Maps API has finished loading, initialize the map
		this.getGoogleMaps().then((google) => {
			this.props.setGoogle(google);

			const indy = {lat: 39.768563, lng: -86.158018};
			const map = new google.maps.Map(document.getElementById('map'), {
				zoom: 14,
				center: indy
			});

			const infoWindow = new google.maps.InfoWindow({
				maxWidth: 300
			});
			this.props.setInfoWindow(infoWindow);
			const openInfoWindow = this.props.openInfoWindow.bind(this);
			const closeListPanel = this.props.closeListPanel.bind(this);

			this.props.breweries.forEach((brewery) => {
				const marker = new google.maps.Marker({
					position: {
						lat: brewery.location.lat,
						lng: brewery.location.lng
					},
					id: brewery.id,
					title: brewery.name,
					alt: brewery.name
				});

				marker.addListener('click', function() {
					closeListPanel();
					openInfoWindow(marker);
				});

				this.props.markers.push(marker);
			});

			this.props.setMapState(map);

			this.mapMarkers();
		});
  	}

  	render() {
    	return (
			<div id="map" role="application" aria-label="Breweries Map"></div>
    	)
  	}
}

export default GoogleMap;
