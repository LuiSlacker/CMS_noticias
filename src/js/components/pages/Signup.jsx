import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import * as UserService from '../../services/user-service';
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText, FormGroup, Label, Input } from 'reactstrap';
import { NotificationManager } from 'react-notifications';

class Signup extends React.Component {
	constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSignup(evt) {
    evt.preventDefault();
    UserService.signup(this.state.username, this.state.password, this.state.email)
      .then((user) => {
        this.props.setUser(user);
        this.props.history.push('/');
        NotificationManager.success('Signed up con éxito', 'Èxito')
      }).catch(err => console.log(err));
  }

	render() {
		return (
      <article>
        <div className='signup-wrapper'>
          <Card>
            <CardHeader>Signup</CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  value={this.state.username}
                  onChange={this.handleChange}
                  id="username"
                  name="username"/>
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChange}
                  id="email"
                  name="email"/>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  id="password"
                  name="password"/>
              </FormGroup>
              <Button onClick={this.handleSignup}>Signup</Button>
            </CardBody>
          </Card>
        </div>
      </article>);
	}

}

export default withRouter(Signup);

