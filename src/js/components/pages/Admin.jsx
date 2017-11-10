import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import * as PagesService from '../../services/pages-service';
import * as UserService from '../../services/user-service';
import { Form, FormGroup, Label, Input, Table, TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import MetaDefault from '../helper/meta.jsx';

class Admin extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      pages: [],
      activeTab: '1',
      newPaginaName: '',
      newUsername: '',
      newUserEmail: '',
    }
    this.fetchAllPages = this.fetchAllPages.bind(this);
  }

  componentDidMount() {
    this.fetchAllPages();
  }

  fetchAllPages() {
    PagesService.getAll()
    .then(pages => this.setState({ pages }));
  }

  toggle(activeTab) {
    if (this.state.activeTab !== activeTab) {
      this.setState({ activeTab });
    }
  }

  handleBtnClick(evt) {
    evt.preventDefault();
    PagesService.persistOne(this.state.newPaginaName)
      .then(() => {
        NotificationManager.success('Pagina guardado con éxito', 'Exito')
        this.fetchAllPages();
        this.setState({ newPaginaName: '' })
      }).catch(err => NotificationManager.error(err.response.data.Error.message, 'Error al guardar'));
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
      <article>
        <MetaDefault />
        <Nav tabs>
          <NavItem>
            <NavLink
              className={this.state.activeTab === '1' ? 'active': '' }
              onClick={() => { this.toggle('1').bind(this); }}
            >
            Usarios
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.activeTab === '2' ? 'active': '' }
              onClick={() => { this.toggle('2').bind(this); }}
            >
            Páginas
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId='1'>
            <Row>
              <Col sm='6'>
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>isValidated</th>
                    </tr>
                  </thead>
                  <tbody>

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
          </TabPane>
          <TabPane tabId='2'>
            <Row>
              <Col sm='6'>
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.pages.map((page, index) =>
                      <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{page.name}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Col>
              <Col sm='6'>
              <h4>Add new Página</h4>
              <Form>
                <FormGroup>
                  <Label for="name">Nombre</Label>
                  <Input
                    type="text"
                    value={this.state.newPaginaName}
                    onChange={(evt) => this.setState({ newPaginaName: evt.target.value })}
                    id="name"
                    placeholder="Nombre" />
                </FormGroup>
                <Button onClick={this.handleBtnClick}>Submit</Button>
              </Form>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </article>);
	}

}

export default withRouter(Admin);

