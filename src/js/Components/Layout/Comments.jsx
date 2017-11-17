import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { Media, FormGroup, Label, Input, Card, CardBody, Button } from 'reactstrap';
import * as NoticesService from '../../services/notices-service';
import { NotificationManager } from 'react-notifications';

class Comments extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      comments: [],
      comment: '',
      name: '',
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.noticeId != undefined) this.fetchAllComments.bind(this)(nextProps.noticeId);
  }

  fetchAllComments(noticeId) {
    NoticesService.getAllComments(noticeId)
      .then(comments => this.setState({ comments }))
      .catch(console.error);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleClick() {
    NoticesService.persistComment(this.props.noticeId, {
      author: this.state.name,
      content: this.state.comment,
    }).then(() => {
      NotificationManager.success('Comment saved successfully.', 'Success');
      this.fetchAllComments.bind(this)(this.props.noticeId);
      this.setState({ name: '', comment: '' });
    }).catch(() => NotificationManager.error('Failed to save comment', 'Error'));
  }

	render() {
      return (
      <div className="commentsBox">
          <h2>Comments</h2>
          {this.state.comments.map((comment, index) =>
            <Media key={index}>
              <Media body>
                <Media heading>
                  <strong>{comment.author}</strong>
                </Media>
                <p>{comment.content}</p>
              </Media>
            </Media>
          )}

          <br/>
          <Card>
            <CardBody>
              <FormGroup>
                <Label for="name">Your name:</Label>
                <Input
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange.bind(this)}
                  id="name"
                  name="name"/>
              </FormGroup>
              <FormGroup>
                <Label for="comment">Say something!</Label>
                <Input
                  type="text"
                  value={this.state.comment}
                  onChange={this.handleChange.bind(this)}
                  id="comment"
                  name="comment"/>
              </FormGroup>
              <Button onClick={this.handleClick.bind(this)}>Submit</Button>
            </CardBody>
          </Card>
      </div>);
	}

}

export default Comments;

