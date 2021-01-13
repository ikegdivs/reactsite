import React, { Component } from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './TopicComponent';
import { TOPICS } from './topics';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: TOPICS
    };
  }

  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">The Divs: Almost Funny</NavbarBrand>
          </div>
        </Navbar>
        <Menu topics={this.state.topics} />
      </div>
    );
  }
}

export default App;
