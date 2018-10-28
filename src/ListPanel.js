import React, { Component } from 'react'
import './App.css'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListPanel extends Component {
	state = {
		query: ''
	}

	togglePanelView() {
		const fullList = document.querySelector('.full-list');
		const viewMore = document.querySelector('.view-more');
		fullList.classList.toggle('open');
		viewMore.classList.toggle('open');

		let expanded = viewMore.getAttribute('aria-expanded');
		if(expanded === 'true') {
			viewMore.setAttribute('aria-expanded', 'false');
		} else {
			viewMore.setAttribute('aria-expanded', 'true');
		}

		const wording = document.querySelector('.wording');
		wording.classList.toggle('view');
		wording.classList.toggle('close');

		const brewList = document.getElementById('brewery-list').childNodes;
		const brewerySearch = document.querySelector('.brewery-search');
		if(viewMore.classList.contains('open')) {
			brewerySearch.setAttribute('tabindex', 0);
			brewList.forEach((brewery) => {
				brewery.setAttribute('tabindex', 0)
			})
		} else {
			brewerySearch.setAttribute('tabindex', -1);
			brewList.forEach((brewery) => {
				brewery.setAttribute('tabindex', -1)
			})
		}
	}

	highlightMarker(event) {
		const google = this.props.google;
		const openInfoWindow = this.props.openInfoWindow.bind(this);
		const closeListPanel = this.props.closeListPanel.bind(this);
		this.props.markers.forEach((marker) => {
			if(marker.id === event.target.id) {
				closeListPanel();
				openInfoWindow(marker);
				marker.setAnimation(google.maps.Animation.BOUNCE);
				setTimeout(function(){ marker.setAnimation(null); }, 1000);
			}
		});
	}

	updateQuery(query) {
		this.props.infoWindow.close();
		this.setState({query: query.trim()});
	}

	render() {
		const {markers} = this.props
		const {query} = this.state
		let showingBreweries
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')

			showingBreweries = markers.filter((marker) => match.test(marker.title))

			markers.forEach((marker) => {
				marker.setVisible(false);
				if(match.test(marker.title)) {
					marker.setVisible(true)
				}
			})

		}	else {
			markers.forEach((marker) => {
				marker.setVisible(true);
			})
			showingBreweries = markers
		}

		if (document.querySelector('.view-more')) {
			if (document.querySelector('.view-more').classList.contains('open')) {
				showingBreweries.forEach((brewery) => {
					brewery.tabIndex = 0;
				})
			} else {
				showingBreweries.forEach((brewery) => {
					brewery.tabIndex = -1;
				})
			}
		}

		showingBreweries.sort(sortBy('title'))

		return (
			<div className="list-panel">
				<button className="view-more" aria-expanded="false" onClick={this.togglePanelView}>
					<p className="wording view"><br></br>List of</p>
					<img src="/img/beer_logo_yellow.svg" alt="breweries" />
				</button>
				<div className="full-list">
					<div className="filter">
						<h2>Filter</h2>
						<input type="text" className="brewery-search" placeholder="Search Name" aria-label="Search Brewery Name" tabIndex="-1" onChange={(event) => this.updateQuery(event.target.value)}></input>
					</div>
					<ul id="brewery-list" aria-label="Brewery List">
						{showingBreweries.map((brewery) => (
							<li key={brewery.id} id={brewery.id} role="button" tabIndex={brewery.tabIndex} onKeyPress={this.highlightMarker.bind(this)} onClick={this.highlightMarker.bind(this)}>
								{brewery.title}
							</li>
						))}
					</ul>
				</div>
			</div>
		)
	}
}

export default ListPanel;
