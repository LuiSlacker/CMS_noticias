import React from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { Card, Button, CardHeader, CardTitle, CardSubtitle, CardBody, FormGroup, Label, Input } from 'reactstrap';
import MetaDefault from '../helper/meta.jsx';
import * as UserService from '../../services/user-service';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      token: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }
  componentDidMount() {
    const parsedUrl = new URL(window.location.href);
    const token = parsedUrl.searchParams.get('token');
    UserService.getUserInfoForToken(token)
      .then(user => this.setState({
        username: user.username,
        email: user.email,
        token,
      }));
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSignup(evt) {
    evt.preventDefault();
    UserService.signup(this.state.password, this.state.token)
      .then((user) => {
        this.props.setUser(user);
        this.props.history.push('/');
        NotificationManager.success('Signed up successfully.', 'Success');
      }).catch(() => NotificationManager.error('Sign in failed!', 'Error'));
  }

  render() {
    return (
      <article>
        <MetaDefault />
        <div className='signup-wrapper'>
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardSubtitle>Please set up a password for the new account!</CardSubtitle>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="username">Username: </Label>
                <strong>{this.state.username}</strong>
              </FormGroup>
              <FormGroup>
                <Label for="email">Email: </Label>
                <strong>{this.state.email}</strong>
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

