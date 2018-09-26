import React, { Component } from 'react'
import './App.css'
import HeaderBar from './HeaderBar.js'
import GoogleMap from './GoogleMap.js'
import * as FoursquareAPI from './FoursquareAPI.js'

class App extends Component {

	componentDidMount() {
		FoursquareAPI.getBreweries()
	}

	render() {
		return (
			<div className="App">
				<HeaderBar />
				<GoogleMap />
			</div>
		);
	}
}

export default App;
