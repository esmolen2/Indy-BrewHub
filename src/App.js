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
		google: {}
	}

	componentDidMount() {
		FoursquareAPI.getBreweries().then((allBrews) => {
				console.log(allBrews)
				this.setState({allBrews})
		})
	}

	setGoogle(google) {
		this.setState({google})
	}

	render() {
		return (
			<div className="App">
				<HeaderBar />
				<GoogleMap
					breweries = {this.state.allBrews}
					markers = {this.state.markers}
					setGoogle = {this.setGoogle.bind(this)}
				/>
				<ListPanel
					breweries = {this.state.allBrews}
					markers = {this.state.markers}
					google = {this.state.google}
				/>
			</div>
		);
	}
}

export default App;
