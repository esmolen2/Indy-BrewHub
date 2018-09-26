import React, { Component } from 'react';
import './App.css';
import HeaderBar from './HeaderBar.js';
import GoogleMap from './GoogleMap.js';

class App extends Component {
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
