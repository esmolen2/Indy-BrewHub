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
				console.log(allBrews);
		})
	}

	setGoogle(google) {
		this.setState({google})
	}

	setMap(map) {
		this.setState({map})
	}

	setInfoWindow(infoWindow) {
		this.setState({infoWindow})
	}

	openInfoWindow(marker) {
		FoursquareAPI.pourBrew(marker.id).then((brew) => {
			this.setState({...this.state.infoWindow, [marker]: marker});
			this.state.infoWindow.setContent(`
				<div class="infowindow">
					<h3>${brew.name}</h3>
					<img src="${brew.bestPhoto.prefix}height200${brew.bestPhoto.suffix}">
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
		}).catch((res) => {
			this.setState({...this.state.infoWindow, [marker]: marker});
			this.state.infoWindow.setContent(`
				<div class="infowindow">
					<h3>${marker.title}</h3>
					<p class="error">
						Sorry, more details on this brewery are not currently available.
					</p>
				</div>
			`);
			this.state.infoWindow.open(this.state.map, marker);
		})
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
					setMap = {this.setMap.bind(this)}
					infoWindow = {this.state.infoWindow}
					setInfoWindow = {this.setInfoWindow.bind(this)}
					openInfoWindow = {this.openInfoWindow.bind(this)}
				/>
				<ListPanel
					breweries = {this.state.allBrews}
					markers = {this.state.markers}
					google = {this.state.google}
					openInfoWindow = {this.openInfoWindow.bind(this)}
				/>
			</div>
		);
	}
}

export default App;
