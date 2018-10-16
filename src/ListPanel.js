import React, { Component } from 'react'
import './App.css'
import * as FoursquareAPI from './FoursquareAPI.js'

class ListPanel extends Component {
	togglePanelView() {
		const listPanel = document.querySelector('.list-panel');
		listPanel.classList.toggle('open');

		const wording = document.querySelector('.wording');
		wording.classList.toggle('view');
		wording.classList.toggle('close');
	}


	render() {
		return (
			<div className="list-panel">
				<div className="full-list">
					<p>St. Joseph Brewery & Public House</p>
					<p>Fountain Square Brewing Company</p>
					<p>Rock Bottom Restaurant & Brewery</p>
					<p>Test</p>
					<p>Test</p>
					<p>Test</p>
					<p>Test</p>
					<p>Test</p>
					<p>Test</p>
					<p>Test</p>
					<p>Test</p>
					<p>Test</p>
					<p>Test</p>
					<p>Test</p>
					<p>Test</p>
					<p>Test</p>
					<p>Test</p>
					<p>Test</p>
					<p>Test</p>
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
