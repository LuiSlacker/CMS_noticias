import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { Form, FormGroup, Label, Input, Table, Button, Row, Col } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import * as NoticesService from '../../../services/notices-service';

class NoticeList extends React.Component {

  handleSetNoticeState(evt, notice) {
    notice.active = evt.currentTarget.selectedOptions[0].value;
    evt.currentTarget.value = notice.active;
    NoticesService.updateOne(notice)
      .then(() => {
        NotificationManager.success('Estado cambiado con éxito', 'Exito');
        NoticesService.getAllForOneUser(this.props.user._id)
          .then(notices => this.setState({ notices }));
      })
  }

	render() {
		return (
      <div>
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
              {this.props.notices.map((notice, index) =>
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
      </div>);
	}

}

export default withRouter(NoticeList);

