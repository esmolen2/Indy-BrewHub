import React, { Component } from 'react'
import './App.css'
import HeaderBar from './HeaderBar.js'
import GoogleMap from './GoogleMap.js'
import ListPanel from './ListPanel.js'
import * as FoursquareAPI from './FoursquareAPI.js'

class App extends Component {
	state = {
		allBrews: [],
		markers: [],
		google: {},
		map: {},
		infoWindow: {}
	}

	componentDidMount() {
		FoursquareAPI.getBreweries().then((allBrews) => {
			this.setState({allBrews})
		}).catch((e) => {
			alert('Uh oh! There currently seems to be a problem retrieving breweries from this area. Please try again later.')
		})
	}

	setGoogle(google) {
		this.setState({google})
	}

	setMapState(map) {
		this.setState({map})
	}

	setInfoWindow(infoWindow) {
		this.setState({infoWindow})
	}

	openInfoWindow(marker) {
		FoursquareAPI.pourBrew(marker.id).then((brew) => {
			this.setState({...this.state.infoWindow, [marker]: marker});
			// Foursquare's Best Photo does not include any descriptors useful for alt text
			this.state.infoWindow.setContent(`
				<div class="infowindow">
					<h3 class="infowindow-header" tabIndex="-1">${brew.name}</h3>
					<img src="${brew.bestPhoto.prefix}height200${brew.bestPhoto.suffix}" alt="${brew.name}'s Best Photo from Foursquare">
					<div class="details">
						<div class="rating">
							<h4>Rating</h4>
							<p class="rating-number" style="color: #${brew.ratingColor};">${brew.rating ? brew.rating : 'None'}</p>
						</div>
						<div class="address-website">
							<div class="address">
								<h4>Address</h4>
								<p>${brew.location.address}</p>
								<p>${brew.location.formattedAddress[1]}</p>
							</div>
							<div class="website">
								${brew.url ? `<a href="${brew.url}" target="_blank">Visit Website</a>` : ""}
							</div>
						</div>
					</div>
					<p class="citation">*All details and images provided by Foursquare</p>
				</div>
			`);
			this.state.infoWindow.open(this.state.map, marker);

			// Set focus in infowindow after opening said infowindow
			setTimeout(function() {
				const header = document.querySelector('.infowindow-header');
				header.focus();
			}, 0)
		}).catch((res) => {
			this.setState({...this.state.infoWindow, [marker]: marker});
			this.state.infoWindow.setContent(`
				<div class="infowindow">
					<h3 class="infowindow-header" tabIndex="-1">${marker.title}</h3>
					<p class="error">
						Sorry, more details on this brewery are not currently available.
					</p>
				</div>
			`);
			this.state.infoWindow.open(this.state.map, marker);

			// Set focus in infowindow after opening said infowindow
			setTimeout(function() {
				const header = document.querySelector('.infowindow-header');
				header.focus();
			}, 0)
		})
	}

	closeListPanel() {
		const fullList = document.querySelector('.full-list');
		const viewMore = document.querySelector('.view-more');

		// Close the list panel when an infowindow opens only when the screen is too small to fit both panel and window comfortably
		if(window.innerWidth < 768 && fullList.classList.contains('open')) {
			fullList.classList.remove('open');
			viewMore.classList.remove('open');

			// Change the wording of the button to open/close panel accordingly, i.e. "View List" when panel closed vs. "Close List" when panel opened
			const wording = document.querySelector('.wording');
			wording.classList.toggle('view');
			wording.classList.toggle('close');
		}
	}

	render() {
		return (
			<div className="App">
				<HeaderBar />
				<GoogleMap
					breweries = {this.state.allBrews}
					markers = {this.state.markers}
					setGoogle = {this.setGoogle.bind(this)}
					map = {this.state.map}
					setMapState = {this.setMapState.bind(this)}
					setInfoWindow = {this.setInfoWindow.bind(this)}
					openInfoWindow = {this.openInfoWindow.bind(this)}
					closeListPanel = {this.closeListPanel}
				/>
				<ListPanel
					markers = {this.state.markers}
					google = {this.state.google}
					infoWindow = {this.state.infoWindow}
					openInfoWindow = {this.openInfoWindow.bind(this)}
					closeListPanel = {this.closeListPanel}
				/>
			</div>
		);
	}
}

export default App;
