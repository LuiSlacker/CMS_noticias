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
      username: '',
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
    UserService.login(this.state.username, this.state.password)
      .then((user) => {
        NotificationManager.success('Logged in successfully!', 'Success');
        this.props.setUser(user);
        this.props.history.push('/');
      }).catch(err => console.log(err));
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
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  value={this.state.username}
                  onChange={this.handleChange}
                  id="username"
                  name="username"/>
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

