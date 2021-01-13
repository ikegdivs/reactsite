import React, { Component } from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import logo from './assets/images/logo.svg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion?</NavbarBrand>
          </div>
        </Navbar>
        <Menu />
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }
}

export default App;
