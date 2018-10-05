import React, { Component } from 'react'
import './App.css'
import HeaderBar from './HeaderBar.js'
import GoogleMap from './GoogleMap.js'
import * as FoursquareAPI from './FoursquareAPI.js'

class App extends Component {
	state = {
		breweries: []
	}

	componentDidMount() {
		FoursquareAPI.getBreweries().then((breweries) => {
				this.setState({breweries})
		})
	}

	render() {
		return (
			<div className="App">
				<HeaderBar />
				<GoogleMap
					breweries = {this.state.breweries}
				/>
			</div>
		);
	}
}

export default App;
