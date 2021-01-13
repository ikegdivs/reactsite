import React, { Component } from 'react';
import { Media } from 'reactstrap';
//import logo from '../assets/images/logo.svg';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';

class Topics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTopic: null
        }
    }

    onTopicSelect(topic) {
        this.setState({ selectedTopic: topic});
    }

    renderTopic(topic) {
        if (topic != null)
            return(
                <Card>
                    <CardImg top src={topic.image} alt={topic.name} />
                    <CardBody>
                      <CardTitle>{topic.name}</CardTitle>
                      <CardText>{topic.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    render() {
        const topicsSet = this.props.topics.map((topic) => {
            return (
              <div  className="col-12 col-md-5 m-1">
                <Card key={topic.id}
                  onClick={() => this.onTopicSelect(topic)}>
                  <CardImg width="100%" src={topic.image} alt={topic.name} />
                  <CardImgOverlay>
                      <CardTitle>{topic.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {topicsSet}
                </div>
                <div className="row">
                  <div  className="col-12 col-md-5 m-1">
                    {this.renderTopic(this.state.selectedTopic)}
                  </div>
                </div>
            </div>
        );
    }
}

export default Topics;