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

		// Open and close the side panel containing the list of breweries
		fullList.classList.toggle('open');
		viewMore.classList.toggle('open');

		// Accessibility notification of when side panel is open or closed
		let expanded = viewMore.getAttribute('aria-expanded');
		if(expanded === 'true') {
			viewMore.setAttribute('aria-expanded', 'false');
		} else {
			viewMore.setAttribute('aria-expanded', 'true');
		}

		// Change the wording of the button to open/close panel accordingly, i.e. "View List" when panel closed vs. "Close List" when panel opened
		const wording = document.querySelector('.wording');
		wording.classList.toggle('view');
		wording.classList.toggle('close');

		// If the side list panel is closed, remove the search input and list buttons from the page's tab order. If the side list panel is open, add the search input and list buttons to the page's tab order.
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

		// Cycle through the array of map markers for the match of the brewery clicked in the list, open its infowindow and make the marker bounce twice on the map. Close the side list panel if the screen is small.
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
		this.props.infoWindow.close(); // If an infowindow is open, close it when typing out a search
		this.setState({query: query.trim()});
	}

	render() {
		const {markers} = this.props
		const {query} = this.state

		// If there is a search being performed, look for breweries that match the search, otherwise use the full list of breweries
		let showingBreweries
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')

			showingBreweries = markers.filter((marker) => match.test(marker.title))

			// Hide map markers of breweries that don't fit the search criteria
			markers.forEach((marker) => {
				marker.setVisible(false);
				if(match.test(marker.title)) {
					marker.setVisible(true)
				}
			})

		}	else {
			// If no search is being made, show all breweries in the list and markers on the map
			markers.forEach((marker) => {
				marker.setVisible(true);
			})
			showingBreweries = markers
		}

		// Remove the list buttons from the page's tab order if the side list panel is closed. Add to the page's tab order if the panel is open
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

		// Sort brewery list alphabetically by brewery name
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
