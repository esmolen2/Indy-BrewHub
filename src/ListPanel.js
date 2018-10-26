import React, { Component } from 'react'
import './App.css'
import escapeRegExp from 'escape-string-regexp'

class ListPanel extends Component {
	state = {
		query: ''
	}

	togglePanelView() {
		const fullList = document.querySelector('.full-list');
		const viewMore = document.querySelector('.view-more');
		fullList.classList.toggle('open');
		viewMore.classList.toggle('open');

		const wording = document.querySelector('.wording');
		wording.classList.toggle('view');
		wording.classList.toggle('close');
	}

	highlightMarker(event) {
		const google = this.props.google;
		const openInfoWindow = this.props.openInfoWindow.bind(this);
		this.props.markers.forEach((marker) => {
			if(marker.id === event.target.id) {
				openInfoWindow(marker);
				marker.setAnimation(google.maps.Animation.BOUNCE);
				setTimeout(function(){ marker.setAnimation(null); }, 1000);
			}
		});
	}

	updateQuery(query) {
		this.setState({query: query.trim()});
	}

	render() {
		const {markers, map} = this.props
		const {query} = this.state
		let showingBreweries
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')

			showingBreweries = markers.filter((marker) => match.test(marker.title))

			markers.forEach((marker) => {
				marker.setMap(map)

				if(!match.test(marker.title)) {
					marker.setMap(null)
				}
			})
			console.log('query');

		}	else {
			markers.forEach((marker) => {
				marker.setMap(map)
			})
			showingBreweries = markers
			console.log('no query')
		}

		return (
			<div className="list-panel">
				<div className="full-list">
					<div className="filter">
						<h2>Filter</h2>
						<input type="text" placeholder="Search Name" onChange={(event) => this.updateQuery(event.target.value)}></input>
					</div>
					<ul>
						{showingBreweries.map((brewery) => (
							<li key={brewery.id} id={brewery.id} onClick={this.highlightMarker.bind(this)}>
								{brewery.title}
							</li>
						))}
					</ul>
				</div>
				<div className="view-more" onClick={this.togglePanelView}>
					<p className="wording view"><br></br>List of</p>
					<img src="/img/beer_logo_yellow.svg" alt="breweries" />
				</div>
			</div>
		)
	}
}

export default ListPanel;
