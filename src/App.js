import React, { Component } from 'react';
import './App.css';

import CountryGame from './containers/CountryGame/CountryGame.js';
import Header from './containers/Header/Header.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <CountryGame />
      </div>
    )
  }
}


export default App;
