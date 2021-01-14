import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Topics from './TopicComponent';
import TopicDetail from './TopicDetailComponent';
import { TOPICS } from './topics';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        topics: TOPICS,
        selectedTopic: null
    };
  }

  onTopicSelect(topicId) {
    this.setState({ selectedTopic: topicId});
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">The Divs: Almost Funny -</NavbarBrand>
          </div>
        </Navbar>
        <Topics topics={this.state.topics} onClick={(topicId) => this.onTopicSelect(topicId)} />
        <TopicDetail topic={this.state.topics.filter((topic) => topic.id === this.state.selectedTopic)[0]} />
      </div>
    );
  }
}

export default Main;

