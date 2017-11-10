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
import * as PagesService from '../../../services/pages-service';

class NewNotice extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      pages: [],
      noticiaTitle: '',
      noticiaSummary: '',
      noticiaText: '',
      imageUrl: '',
      selectedPageId: '',
    }
  }

  componentDidMount() {
    PagesService.getAll()
      .then(pages => this.setState({
        pages,
        selectedPageId: pages[0]._id,
      }));
  }

  handleSelectChange(select) {
    this.setState({ selectedPageId: select.currentTarget.selectedOptions[0].value })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleBtnClick(evt) {
    evt.preventDefault();
    NoticesService.persistOne(this.state.selectedPageId, {
      title: this.state.noticiaTitle,
      summary: this.state.noticiaSummary,
      text: this.state.noticiaText,
      imageUrl: this.state.imageUrl,
      user: this.props.user._id,
    }).then(() => {
      NotificationManager.success('Noticia guardado con éxito', 'Exito');
      this.setState({
        noticiaTitle: '',
        noticiaSummary: '',
        noticiaText: '',
        imageUrl:'',
        selectedPageId: '',
      })
      this.props.updateNoticeList();
      this.props.setActiveTab('2');
    }).catch(err => NotificationManager.error(err.response.data.Error.message, 'Error al guardar'));
  }

	render() {
		return (
      <div>
        <h5>Crear nueva noticia</h5>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              value={this.state.noticiaTitle}
              onChange={this.handleChange.bind(this)}
              name='noticiaTitle'
              id="title"
              placeholder="Nueva noticia title" />
          </FormGroup>
          <FormGroup>
            <Label for="resumen">Resumen</Label>
            <Input
              type="text"
              value={this.state.noticiaSummary}
              onChange={this.handleChange.bind(this)}
              name='noticiaSummary'
              id="resumen"
              placeholder="Nueva noticia resumen" />
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
              onChange={this.handleChange.bind(this)}
              name='imageUrl'
              id="url"
              placeholder="http://placehold.it/700x400" />
          </FormGroup>
          <FormGroup>
            <Label for="pagesSelect">Página</Label>
            <Input type="select" name="selectedPage" id="pagesSelect" onChange={this.handleSelectChange.bind(this)}>
              {this.state.pages.map((page, index) =>
                <option key={index} value={page._id}>{page.name}</option>
              )}
            </Input>
          </FormGroup>
          <Button onClick={this.handleBtnClick.bind(this)}>Submit</Button>
        </Form>
    </div>);
	}

}

export default withRouter(NewNotice);

