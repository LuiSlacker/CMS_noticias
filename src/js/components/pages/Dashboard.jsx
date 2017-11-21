import React from 'react';
import { withRouter } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import MetaDefault from '../helper/meta.jsx';
import NewNotice from './Dashboard/NewNotice.jsx';
import NoticeList from './Dashboard/NoticeList.jsx';
import NewPoll from './Dashboard/NewPoll.jsx';
import * as NoticesService from '../../services/notices-service';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      notices: [],
    };
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
              className={this.state.activeTab === '1' ? 'active' : '' }
              onClick={() => { this.toggle('1'); }}
            >
            New News-Entry
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.activeTab === '2' ? 'active' : '' }
              onClick={() => { this.toggle('2'); }}
            >
            News-list
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.activeTab === '3' ? 'active' : '' }
              onClick={() => { this.toggle('3'); }}
            >
            New poll
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId='1'>
            <NewNotice
              user={this.props.user}
              updateNoticeList={this.fetchNoticesForOneUser.bind(this)}
              setActiveTab={tab => this.setState({ activeTab: tab })}/>
          </TabPane>
          <TabPane tabId='2'>
            <NoticeList user={this.props.user} notices={this.state.notices} />
          </TabPane>
          <TabPane tabId='3'>
            <NewPoll
              user={this.props.user}
              notices={this.state.notices} />
          </TabPane>
        </TabContent>
      </article>);
  }
}

export default withRouter(Dashboard);

