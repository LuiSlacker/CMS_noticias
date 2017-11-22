import React from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { Card, Button, CardHeader, CardBody, FormGroup, Label, Input } from 'reactstrap';
import * as UserService from '../../services/user-service';
import MetaDefault from '../helper/meta.jsx';

class ForgotPassword extends React.Component {
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
    UserService.forgotPassword(this.state.email)
      .then(() => {
        NotificationManager.success('Check your mails', 'Success');
        this.props.history.push('/');
      }).catch(() => NotificationManager.error('Reset failed!', 'Error'));
  }

  render() {
    return (
      <article>
        <MetaDefault />
        <div className='login-wrapper'>
          <Card>
            <CardHeader>Reset Password</CardHeader>
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
              <Button onClick={this.handleBtnClick}>Request Email</Button>
            </CardBody>
          </Card>
        </div>
      </article>);
  }
}

export default withRouter(ForgotPassword);

