import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { Media, FormGroup, Label, Input, Card, CardBody, Button } from 'reactstrap';

class Comments extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      comment: ''
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

	render() {
      return (
      <div className="commentsBox">
          <h2> Comments </h2><br/>
          {
            // Map with all comments from api
          }
          <Media>
            <Media left>
              <img src="https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png" 
                  alt="Generic placeholder image" height="42" width="42"/>
            </Media>
            <Media body>
              <Media heading>
                <h4> Example Comment </h4>
              </Media>
              <p> Content </p>
            </Media>
          </Media>

          <br/>
          <Card>
            <CardBody>
            <FormGroup>
              <Label for="comment"> Say something! </Label>
              <Input
                type="text"
                value={this.state.comment}
                onChange={this.handleChange}
                id="comment"
                name="comment"/>
            </FormGroup>
            <Button> Submit </Button>
            </CardBody>
          </Card>
      </div>);
	}

}

export default Comments;

