import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import MetaDefault from '../helper/meta.jsx';
import Pages from './Admin/Pages.jsx';
import Users from './Admin/Users.jsx';
import * as PagesService from '../../services/pages-service';

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: [],
      activeTab: '1',
    };
  }

  componentDidMount() {
    this.fetchAndSetAllPagesOptions.bind(this)();
  }

  fetchAndSetAllPagesOptions() {
    PagesService.getAll()
      .then(pages => this.setState({ pages }));
  }

  populateMultiSelectOptions(pages) {
    return pages.map(page => ({
      value: page._id,
      label: page.name,
    }));
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
              className={this.state.activeTab === '1' ? 'active' : '' }
              onClick={() => { this.toggle('1'); }}
            >
            Usarios
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.activeTab === '2' ? 'active' : '' }
              onClick={() => { this.toggle('2'); }}
            >
            Páginas
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId='1'>
            <Users
              pageOptions={this.populateMultiSelectOptions(this.state.pages)}/>
          </TabPane>
          <TabPane tabId='2'>
            <Pages
              pages={this.state.pages}
              updatePages={this.fetchAndSetAllPagesOptions.bind(this)}
            />
          </TabPane>
        </TabContent>
      </article>);
  }
}

export default withRouter(Admin);

