import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import * as NoticesService from '../../../services/notices-service';
import { Form, FormGroup, Label, Input, Table, Button, Row, Col } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import TinyMCE from 'react-tinymce';
import * as UserService from '../../../services/user-service';

class User extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      users: [],
      newUsername: '',
      newUserEmail: '',
    }
  }

  componentDidMount() {
    UserService.getAll()
      .then(users => this.setState({ users }));
  }

  persistNewUser(evt) {
    UserService.createNewUser(this.state.newUsername, this.state.newUserEmail)
      .then()
      .catch(console.error);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

	render() {
		return (
      <div>
        <Row>
          <Col sm='6'>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>isValidated</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user, index)  =>
                  <tr key={index}>
                    <td>{index +1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.isEditor ? 'Editor': 'Admin'}</td>
                    <td>false</td>
                  </tr>)}
              </tbody>
            </Table>
          </Col>
          <Col sm='6'>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Add new user</h4>
            <Form>
              <FormGroup>
                <Label for="newUsername">Nombre</Label>
                <Input
                  type="text"
                  value={this.state.newUsername}
                  onChange={this.handleChange.bind(this)}
                  id="newUsername"
                  name="newUsername"/>
              </FormGroup>
              <FormGroup>
                <Label for="newUserEmail">Email</Label>
                <Input
                  type="text"
                  value={this.state.newUserEmail}
                  onChange={this.handleChange.bind(this)}
                  name="newUserEmail"
                  id="newUserEmail"/>
              </FormGroup>
              <Button onClick={this.persistNewUser.bind(this)}>Submit</Button>
            </Form>
          </Col>
        </Row>
      </div>);
	}

}

export default withRouter(User);

