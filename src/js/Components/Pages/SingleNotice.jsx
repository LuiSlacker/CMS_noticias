import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import * as NoticeService from '../../services/notices-service';
import SocialShare from '../Layout/SocialShare.jsx';
import MetaTags from 'react-meta-tags';

class SingleNoticia extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      notice: {},
    }
  }

  componentDidMount() {
    NoticeService.getOneById(this.props.match.params.pageUid, this.props.match.params.noticeUid)
      .then(notice => this.setState({ notice }));
  }

  setContent(){
    return {__html: unescape(this.state.notice.text)};
  }

	render() {
		return (
      <article>
        <MetaTags>
            <title>{this.state.notice.title}</title>
            <meta name="description" content={this.state.notice.summary} />
        </MetaTags>
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to='/'>Home</Link>
            </li>
            <li className="breadcrumb-item active">{this.state.notice.title}</li>
          </ol>
        </div>

        <div className="row">
            <div className="col-lg-6">
              <img className="img-fluid rounded mb-4" src={this.state.notice.imageUrl} alt="Noticia Image" />
              <SocialShare notice={this.state.notice}/>
            </div>
            <div className="col-lg-6">
              <h2>{this.state.notice.title}</h2>
              <div dangerouslySetInnerHTML={this.setContent()} />
            </div>
        </div>
      </article>);
	}

}

export default withRouter(SingleNoticia);

