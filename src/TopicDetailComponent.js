import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, 
          CardTitle, Breadcrumb, BreadcrumbItem, Media, Button,
          Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from './baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

function RenderTopic({topic}) {
  return(
    <div className="col-12 col-md-5 m-1">
      <FadeTransform
          in
          transformProps={{
              exitTransform: 'scale(0.5) translateY(-50%)'
          }}>
      <Card>
          <CardImg top src={baseUrl + topic.image} alt={topic.name} />
          <CardBody>
              <CardTitle>{topic.name}</CardTitle>
              <CardText>{topic.description}</CardText>
          </CardBody>
      </Card>
      </FadeTransform>
    </div>
  )
}

function RenderComments({comments, postComment, topicId}) {
  if (comments != null)
  return(
    <div className="col-12 col-md-5 m-1">
      <h4>comments</h4>
      <ul className="list-unstyled">
      <Stagger in>
        {comments.map((comment) => {
          return (
              <Fade in>
              <li key={comment.id}>
              <p>{comment.comment}</p>
              <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', 
                    { year: 'numeric', month: 'short', day: '2-digit'}
                    ).format(new Date(Date.parse(comment.date)))}</p>
              </li>
              </Fade>
            );
        })}
      </Stagger>
      </ul>
      <CommentForm topicId={topicId} postComment={postComment} />
    </div>
  );
  else
  return(
    <div></div>
  )
}

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.topicId, values.rating, values.author, values.comment);
  }

  render() {
    return(
      <div>
        <Button outline onClick={this.toggleModal}><span className=""></span></Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.isModalOpen} >
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit} >
              <Row className="form-group">
                <Col>
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select model=".rating" id="rating">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="author">Your Names</Label>
                  <Control.text model=".author" id="author"
                      placeholder="Your Name" className="dsf" 
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}/>
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        minLength: 'Must be greater than 3 characters',
                        maxLength: 'Must be less than 15 characters'
                      }}
                    />
                </Col>
              </Row>
              <Button type="submit" className="bg-primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const TopicDetail = (props) => {
  if(props.isLoading){
    return(
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if(props.errMess){
    return(
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
  else if(props.topic != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.topic.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12"></div>
            <h3>{props.topic.name}</h3>
            <hr />
        </div>
      <div className="row">
        <RenderTopic topic={props.topic} />
        <RenderComments comments={props.comments} 
          postComment={props.postComment}
          topicId={props.topic.id}
          />
        </div>
      </div>
    );
    else
    return(
      <div></div>
    )
}

export default TopicDetail;