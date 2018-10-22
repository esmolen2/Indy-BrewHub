import React, { Component } from 'react'
import './App.css'

class ListPanel extends Component {
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
		this.props.markers.some((marker) => {
			if(marker.id === event.target.id) {
				openInfoWindow(marker);
				marker.setAnimation(google.maps.Animation.BOUNCE);
				setTimeout(function(){ marker.setAnimation(null); }, 1000);
			}
		});
	}

	render() {
		return (
			<div className="list-panel">
				<div className="full-list">
					<ul>
						{this.props.breweries.map((brewery) => (
							<li key={brewery.id} id={brewery.id} onClick={this.highlightMarker.bind(this)}>
								{brewery.name}
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
