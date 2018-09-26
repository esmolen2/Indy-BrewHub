import React, { Component } from 'react';
import './App.css';

class HeaderBar extends Component {
  render() {
    return (
      <div className="header-bar">
		  <img src="/img/beer_logo_yellow.svg" alt="" />
		  <h1>Indy BrewHub</h1>
      </div>
    );
  }
}

export default HeaderBar;
