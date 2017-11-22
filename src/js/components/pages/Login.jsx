import React from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { Card, Button, CardHeader, CardBody, FormGroup, Label, Input } from 'reactstrap';
import * as UserService from '../../services/user-service';
import MetaDefault from '../helper/meta.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleBtnClick(evt) {
    evt.preventDefault();
    UserService.login(this.state.email, this.state.password)
      .then((data) => {
        NotificationManager.success('Logged in successfully!', 'Success');
        this.props.setUser(data.user);
        localStorage.setItem('user_token', data.token);
        this.props.history.push('/');
      }).catch(() => NotificationManager.error('Login failed!', 'Error'));
  }

  render() {
    return (
      <article>
        <MetaDefault />
        <div className='login-wrapper'>
          <Card>
            <CardHeader>Login</CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="username">Email</Label>
                <Input
                  type="email"
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
              <Button onClick={this.handleBtnClick}>Login</Button>
            </CardBody>
          </Card>
        </div>
      </article>);
  }
}

export default withRouter(Login);

