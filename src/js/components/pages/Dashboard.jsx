import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import { Form, FormGroup, Label, Input, Table, TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import MetaDefault from '../helper/meta.jsx';
import NewNotice from './Dashboard/NewNotice.jsx';
import NoticeList from './Dashboard/NoticeList.jsx';
import * as NoticesService from '../../services/notices-service';

class Dashboard extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      notices: [],
    }
  }

  componentDidMount() {
    this.fetchNoticesForOneUser.bind(this)();
  }

  fetchNoticesForOneUser() {
    NoticesService.getAllForOneUser(this.props.user._id)
    .then(notices => this.setState({ notices }));
  }

  toggle(activeTab) {
    if (this.state.activeTab !== activeTab) {
      this.setState({ activeTab });
    }
  }

	render() {
		return (
      <article>
        <MetaDefault />
        <Nav tabs>
          <NavItem>
            <NavLink
              className={this.state.activeTab === '1' ? 'active': '' }
              onClick={() => { this.toggle('1') }}
            >
            Edición
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.activeTab === '2' ? 'active': '' }
              onClick={() => { this.toggle('2') }}
            >
            Noticias
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId='1'>
            <NewNotice
              user={this.props.user}
              updateNoticeList={this.fetchNoticesForOneUser.bind(this)}
              setActiveTab={ (tab) => this.setState({ activeTab: tab })}/>
          </TabPane>
          <TabPane tabId='2'>
            <NoticeList user={this.props.user} notices={this.state.notices} />
          </TabPane>
        </TabContent>
      </article>);
	}

}

export default withRouter(Dashboard);

