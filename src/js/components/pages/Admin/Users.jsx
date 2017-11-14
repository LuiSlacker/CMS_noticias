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
import * as PagesService from '../../../services/pages-service';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class User extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      users: [],
      pagesOptions: [],
      newUsername: '',
      newUserEmail: '',
      selectedPages: [],
      selectedUser: '',
    }
  }

  componentDidMount() {
    Promise.all([
      UserService.getAll(),
      PagesService.getAll(),
    ]).then(([users, pages]) => {
      this.setState({
        users,
        pagesOptions: this.populateMultiSelectOptions(pages),
      });
    });
  }

  populateMultiSelectOptions(pages) {
    return pages.map(page => ({
      value: page._id,
      label: page.name,
    }));
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

  updateUserData() {
    UserService.updateAssignedPages(this.state.selectedUser, this.state.selectedPages)
      .then(() => NotificationManager.success('Pagina guardado con éxito', 'Exito'))
      .catch(() => NotificationManager.error(err.response.data.Error.message, 'Error al guardar'));
  }

  fetchAssignedPages(userId) {
    UserService.fetchAssignedPageIds(userId)
      .then((assignedPages) => this.setState({
        selectedPages: assignedPages,
        selectedUser: userId,
      }));
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
                  <tr key={index} onClick={() => this.fetchAssignedPages.bind(this)(user._id)}>
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
            {this.state.selectedUser !== ''
            ? <div>
                <FormGroup>
                  <Select
                    multi={true}
                    name="form-field-name"
                    value={this.state.selectedPages}
                    options={this.state.pagesOptions}
                    onChange={val => this.setState({ selectedPages: val })}
                  />
                </FormGroup>
                <Button onClick={this.updateUserData.bind(this)}>Update</Button>
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

