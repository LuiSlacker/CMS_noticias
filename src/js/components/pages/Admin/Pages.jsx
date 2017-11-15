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
import * as PagesService from '../../../services/pages-service';
import moment from 'moment';

class Pages extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      newPaginaName: '',
    }
  }

  handleBtnClick(evt) {
    evt.preventDefault();
    PagesService.persistOne(this.state.newPaginaName)
      .then(() => {
        NotificationManager.success('Pagina guardado con éxito', 'Exito')
        this.props.updatePages();
        this.setState({ newPaginaName: '' })
      }).catch(err => NotificationManager.error(err.response.data.Error.message, 'Error al guardar'));
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

	render() {
		return (
      <Row>
        <Col sm='6'>
          <Table striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Created at</th>
                <th>Updated at</th>
              </tr>
            </thead>
            <tbody>
              {this.props.pages.map((page, index) =>
                <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{page.name}</td>
                  <td>{moment(page.createdAt).format('MMM Do YYYY')}</td>
                  <td>{moment(page.updatedAt).format('MMM Do YYYY')}</td>
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
          <Button onClick={this.handleBtnClick.bind(this)}>Submit</Button>
        </Form>
        </Col>
      </Row>);
	}

}

export default withRouter(Pages);

