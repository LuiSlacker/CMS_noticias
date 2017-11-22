import React from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { Form, FormGroup, Label, Input, Table, Button, Row, Col } from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as UserService from '../../../services/user-service';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      newUsername: '',
      newUserEmail: '',
      selectedPages: [],
      selectedUser: '',
    };
  }

  componentDidMount() {
    this.fetchUsers.bind(this)();
  }

  fetchUsers() {
    UserService.getAll()
      .then(users => this.setState({ users }));
  }

  persistNewUser() {
    UserService.createNewUser(this.state.newUsername, this.state.newUserEmail)
      .then(() => {
        this.setState({
          newUsername: '',
          newUserEmail: '',
        });
        NotificationManager.success('User saved successfully', 'Success');
        this.fetchUsers.bind(this)();
      })
      .catch(console.error);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  updateUserData() {
    UserService.updateAssignedPages(this.state.selectedUser, this.state.selectedPages)
      .then(() => NotificationManager.success('Page saved successfully!', 'Success'))
      .catch(err => NotificationManager.error(err.response.data.Error.message, 'Error while saving.'));
  }

  handleTableUserClick(userId) {
    UserService.fetchAssignedPageIds(userId)
      .then(assignedPages => this.setState({
        selectedPages: assignedPages,
        selectedUser: userId,
      }));
  }

  toggleUserState() {
    UserService.toggleUserState(this.state.selectedUser)
      .then(() => {
        this.fetchUsers.bind(this)();
        NotificationManager.success('User state updated successfully!', 'Success');
      })
      .catch(() => NotificationManager.error('User state update failed!', 'Error while saving.'));
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
                  <th>Verified</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user, index) =>
                  <tr key={index} onClick={() => this.handleTableUserClick.bind(this)(user._id)}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.isEditor ? 'Editor' : 'Admin'}</td>
                    <td>{user.isVerified ? '✅' : '🚫'}</td>
                    <td>{user.isActive ? '✅' : '🚫'}</td>
                  </tr>)}
              </tbody>
            </Table>
          </Col>
          <Col sm='6'>
            {this.state.selectedUser !== ''
              ? <div>
                <FormGroup>
                  <Select
                    multi={true}
                    name="form-field-name"
                    value={this.state.selectedPages}
                    options={this.props.pageOptions}
                    onChange={val => this.setState({ selectedPages: val })}
                  />
                </FormGroup>
                <Button onClick={this.updateUserData.bind(this)}>Update</Button>
                <Button color="danger" style={{ marginLeft: '1em' }} onClick={this.toggleUserState.bind(this)}>Toggle State</Button>
              </div>
              : 'Select a user to assign pages.'
            }
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

