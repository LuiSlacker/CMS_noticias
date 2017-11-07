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
import TinyMCE from 'react-tinymce';

class Dashboard extends React.Component {
	constructor() {
    super();

    this.state = {
      pages: [],
      notices: [],
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
    this.handleSetNoticeState = this.handleSetNoticeState.bind(this);
  }

  componentDidMount() {
    Promise.all([
      NoticesService.getAllForOneUser('<add userId once we have users>'),
      PagesService.getAll(),
    ]).then(([notices, pages]) => {
      this.setState({
        notices,
        pages,
        selectedPageId: pages[0]._id,
      });
    });
  }

  toggle(activeTab) {
    if (this.state.activeTab !== activeTab) {
      this.setState({ activeTab });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSelectChange(select) {
    this.setState({ selectedPageId: select.currentTarget.selectedOptions[0].value })
  }

  handleSetNoticeState(evt, notice) {
    notice.active = evt.currentTarget.selectedOptions[0].value;
    evt.currentTarget.value = notice.active;
    NoticesService.updateOne(notice)
      .then(() => {
        NotificationManager.success('Estado cambiado con éxito', 'Exito');
        NoticesService.getAllForOneUser('<add userId once we have users>')
          .then((notices) => this.setState({ notices }));
      })
  }

  handleBtnClick(evt) {
    evt.preventDefault();
    NoticesService.persistOne(this.state.selectedPageId, {
      title: this.state.noticiaTitle,
      text: this.state.noticiaText,
      imageUrl: this.state.imageUrl
    }).then(() => {
      NotificationManager.success('Noticia guardado con éxito', 'Exito');
      this.setState({
        noticiaTitle: '',
        noticiaText: '',
        imageUrl:'',
        selectedPageId: '',
      })
    }).catch(err => NotificationManager.error(err.response.data.Error.message, 'Error al guardar'));
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
              <h5>Crear nueva noticia</h5>
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
                <TinyMCE
                  content={this.state.noticiaText}
                  name='noticiaText'
                  onChange={(evt, editor) => this.setState({ noticiaText: editor.getContent() })}
                  onKeyup={(evt, editor) => this.setState({ noticiaText: editor.getContent() })}
                  config={{
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | styleselect',
                    plugins: '',
                    statusbar: false,
                    menubar: false,
                  }}
                />
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
          <TabPane tabId='2'>
            <Row>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Titulo</th>
                    <th>Página</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.notices.map((notice, index) =>
                    <tr key={index}>
                      <th>{index+1}</th>
                      <td>{notice.title}</td>
                      <td>{notice.page ? notice.page.name: '-'}</td>
                      <td>
                        <select name="noticeStateSelect" value={notice.active} id="noticeStateSelect" onChange={(evt) => this.handleSetNoticeState(evt, notice)}>
                            <option value='true'>Habilitado</option>
                            <option value='false'>Inhabilitado</option>
                        </select>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Row>
          </TabPane>
        </TabContent>
      </article>);
	}

}

export default withRouter(Dashboard);

