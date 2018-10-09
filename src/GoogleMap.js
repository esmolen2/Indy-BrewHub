/*global google*/

import React, { Component } from 'react';
import './App.css';

class GoogleMap extends Component {
	state = {
		map: {},
		markers: []
	}

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

		this.state.markers.forEach((marker) => {
			marker.setMap(this.state.map)
			bounds.extend(marker.position);
		})

		this.state.map.fitBounds(bounds);
	}

	openInfoWindow(marker, infoWindow) {
		infoWindow.marker = marker;
		infoWindow.setContent('<div>' + marker.id + '</div>');
		infoWindow.open(this.state.map, marker);
	}

	componentWillMount() {
		// Start Google Maps API loading since we know we'll soon need it
		this.getGoogleMaps();
	}

  	componentDidMount() {
    	// Once the Google Maps API has finished loading, initialize the map
		this.getGoogleMaps().then((google) => {
			const indy = {lat: 39.768563, lng: -86.158018};
			const map = new google.maps.Map(document.getElementById('map'), {
				zoom: 14,
				center: indy
			});

			const infoWindow = new google.maps.InfoWindow();
			const openInfoWindow = this.openInfoWindow.bind(this)

			this.props.breweries.forEach((brewery) => {
				const marker = new google.maps.Marker({
					position: {
						lat: brewery.location.lat,
						lng: brewery.location.lng
					},
					id: brewery.id,
					title: brewery.name
				});

				marker.addListener('click', function() {
					openInfoWindow(marker, infoWindow);
				});

				this.state.markers.push(marker);
			});

			this.setState({map});

			this.mapMarkers();
		});
  	}

  	render() {
    	return (
			<div id="map"></div>
    	)
  	}
}

export default GoogleMap;
