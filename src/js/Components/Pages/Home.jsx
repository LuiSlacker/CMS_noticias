import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import * as NoticeService from '../../services/notices-service';
import * as PagesService from '../../services/pages-service';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import MetaDefault from '../helper/meta.jsx';

class Home extends React.Component {
	constructor(props) {
    super(props);

    this.state =  {
      pages: [],
      notices: [],
    }

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    PagesService.getAll()
      .then(pages => {
        NoticeService.getAllForOnePage(pages[0]._id)
        .then(notices => this.setState({
          pages,
          notices,
          activePage: pages[0]._id,
        }));
      });
  }

  toggle(activePage) {
    if (this.state.activePage !== activePage) {
      NoticeService.getAllForOnePage(activePage)
        .then(notices => this.setState({ notices, activePage }));
    }
  }

	render() {
		return (
      <article>
        <MetaDefault />
        <div className="homepage">
          <Nav tabs>
            {this.state.pages.map((page, index) =>
              <NavItem key={index}>
                <NavLink
                  className={this.state.activePage === page._id ? 'active': '' }
                  onClick={() => { this.toggle(page._id); }}
                >
                {page.name}
                </NavLink>
              </NavItem>
            )}
          </Nav>

          <TabContent activeTab={this.state.activePage}>
            {this.state.pages.map((page, index) =>
              <TabPane key={index} tabId={page._id}>
                <Row>
                  {this.state.notices.length > 0
                  ? this.state.notices.map((notice, index) =>
                      <div key={index} className="col-lg-4 col-sm-6 portfolio-item">
                        <Link className="nav-link reset" to={`paginas/${this.state.activePage}/noticias/${notice._id}`}>
                          <div className="card h-100">
                            <img className="card-img-top" src={notice.imageUrl} alt="Noticia Image" />
                            <div className="card-body">
                              <h4 className="card-title">{notice.title}</h4>
                            </div>
                          </div>
                        </Link>
                      </div>)
                  : <Col><div>This Page does not include noticias!</div></Col>}
                </Row>
              </TabPane>
            )}
          </TabContent>
        </div>
      </article>);
	}

}

export default withRouter(Home);

