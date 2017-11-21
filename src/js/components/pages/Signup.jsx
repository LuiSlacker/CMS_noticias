import React from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { Card, Button, CardHeader, CardBody, FormGroup, Label, Input } from 'reactstrap';
import MetaDefault from '../helper/meta.jsx';
import * as UserService from '../../services/user-service';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
    };

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
        NotificationManager.success('Signed up successfully.', 'Success');
      }).catch(err => console.log(err));
  }

  render() {
    return (
      <article>
        <MetaDefault />
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

