import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import MetaDefault from '../helper/meta.jsx';
import Poll from '../layout/Poll.jsx';
import * as NoticeService from '../../services/notices-service';
import * as PagesService from '../../services/pages-service';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: [],
      notices: [],
      poll: {},
      activePage: '',
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    PagesService.getAll()
      .then(pages => Promise.all([
        pages,
        NoticeService.getAllForOnePage(pages[0]._id),
        this.fetchPoll.bind(this)(pages[0]._id),
      ]))
      .then(([pages, notices]) => this.setState({
        pages,
        notices,
        activePage: pages[0]._id,
      }));
  }

  fetchPoll(pageId) {
    PagesService.getPoll(pageId || this.state.activePage)
      .then(poll => this.setState({ poll }))
      .catch(console.error);
  }

  toggle(activePage) {
    if (this.state.activePage !== activePage) {
      Promise.all([
        NoticeService.getAllForOnePage(activePage),
        PagesService.getPoll(activePage),
      ]).then(([notices, poll]) => this.setState({
        notices,
        activePage,
        poll,
      }));
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
                  className={this.state.activePage === page._id ? 'active' : '' }
                  onClick={() => { this.toggle(page._id); }}
                >
                  {page.name}
                </NavLink>
              </NavItem>)}
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
                              <p className="card-text">{notice.summary}</p>
                            </div>
                          </div>
                        </Link>
                      </div>)
                    : <Col><div>This Page does not include noticias!</div></Col>}
                </Row>
                {this.state.poll.question !== undefined &&
                  <div className="pollBox">
                    <Poll
                      poll={this.state.poll}
                      activePage={this.state.activePage}
                      fetchPoll={this.fetchPoll.bind(this)}/>
                  </div>
                }
              </TabPane>)}
          </TabContent>
        </div>
      </article>);
  }
}

export default withRouter(Home);

