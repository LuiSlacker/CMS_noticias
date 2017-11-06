import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import * as PagesService from '../../services/pages-service';
import * as NoticesService from '../../services/notices-service';
import { Form, FormGroup, Label, Input, Table, TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import { NotificationManager } from 'react-notifications';

class Dashboard extends React.Component {
	constructor() {
    super();

    this.state = {
      pages: [],
      activeTab: '1',
      noticiaTitle: '',
      noticiaText: '',
      imageUrl: '',
      selectedPageId: '',
    }

    this.toggle = this.toggle.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    PagesService.getAll()
      .then(pages => this.setState({
        pages,
        selectedPageId: pages[0]._id,
      }));
  }

  toggle(activeTab) {
    if (this.state.activeTab !== activeTab) {
      this.setState({ activeTab });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSelectChange(select) {
    this.setState({ selectedPageId: select.currentTarget.selectedOptions[0].value })
  }

  handleBtnClick(evt) {
    evt.preventDefault();
    NoticesService.persistOne(this.state.selectedPageId, {
      title: this.state.noticiaTitle,
      text: this.state.noticiaText,
      imageUrl: this.state.imageUrl
    }).then(() => {
      NotificationManager.success('Noticia guardado con éxito', 'Exito')
      this.setState({
        noticiaTitle: '',
        noticiaText: '',
        imageUrl:'',
        selectedPageId: '',
      })
    }).catch(err =>  {
      NotificationManager.error(err.response.data.Error.message, 'Error al guardar')
    });
  }

	render() {
		return (
      <article>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={this.state.activeTab === '1' ? 'active': '' }
              onClick={() => { this.toggle('1'); }}
            >
            Edición
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.activeTab === '2' ? 'active': '' }
              onClick={() => { this.toggle('2'); }}
            >
            Noticias
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId='1'>
            <Row>

            </Row>
          </TabPane>
          <TabPane tabId='2'>
              <h4>Nueva Noticia</h4>
              <Form>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    value={this.state.noticiaTitle}
                    onChange={this.handleChange}
                    name='noticiaTitle'
                    id="title"
                    placeholder="Nueva noticia title" />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="textarea"
                    value={this.state.noticiaText}
                    onChange={this.handleChange}
                    name='noticiaText'
                    rows='8'
                    id="text"
                    placeholder="Noticia text" />
                </FormGroup>
                <FormGroup>
                  <Label for="url">URL de imagen</Label>
                  <Input
                    type="text"
                    value={this.state.imageUrl}
                    onChange={this.handleChange}
                    name='imageUrl'
                    id="url"
                    placeholder="http://placehold.it/700x400" />
                </FormGroup>
                <FormGroup>
                  <Label for="pagesSelect">Página</Label>
                  <Input type="select" name="selectedPage" id="pagesSelect" onChange={this.handleSelectChange}>
                    {this.state.pages.map((page, index) =>
                      <option key={index} value={page._id}>{page.name}</option>
                    )}
                  </Input>
                </FormGroup>
                <Button onClick={this.handleBtnClick}>Submit</Button>
              </Form>
          </TabPane>
        </TabContent>
      </article>);
	}

}

export default withRouter(Dashboard);

