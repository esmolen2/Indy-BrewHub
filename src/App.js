import React, { Component } from 'react'
import './App.css'
import HeaderBar from './HeaderBar.js'
import GoogleMap from './GoogleMap.js'
import * as FoursquareAPI from './FoursquareAPI.js'

class App extends Component {
	state = {
		allBrews: []
	}

	componentDidMount() {
		FoursquareAPI.getBreweries().then((allBrews) => {
				console.log(allBrews)
				this.setState({allBrews})
		})
	}

	render() {
		return (
			<div className="App">
				<HeaderBar />
				<GoogleMap
					breweries = {this.state.allBrews}
				/>
			</div>
		);
	}
}

export default App;
