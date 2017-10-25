import React from 'react';
import { getAllPosts, getLatestComments, getMostCommentedPosts } from './../../helpers.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import moment from 'moment';
import MetaTags from 'react-meta-tags';

class Home extends React.Component {
	constructor() {
    super();
    this.state = {
      posts: [],
      latestComments: [],
      mostCommentedPosts: [],
    };
    
    this.openPost = this.openPost.bind(this);
  }
  
  componentDidMount() {
    getAllPosts(posts => this.setState({ posts }));
    getMostCommentedPosts(mostCommentedPosts => this.setState({ mostCommentedPosts }));
    getLatestComments(latestComments => this.setState({ latestComments }));
  }

  openPost(uid) {
    this.props.history.push(`/posts/${uid}`);
  }

	render() {
		return (<section>
    <div className='row wrapper' style={{marginLeft: 0}}>
      <MetaTags>
				<title>Forum</title>
				<meta id='meta-description' name='description' content='Simple Forum to share and comment posts. This is an UniNorte project' />
			</MetaTags>
      <div className='col-md-6'><h4>Posts</h4></div>
      <div className='col-md-6'><h4>Most-commented posts</h4></div>
    </div>
    <div>
      <div className='post-list col-md-6'>
        {this.state.posts.map((post, index) =>
        <article className='panel panel-primary' key={index} onClick={() => this.openPost(post.uid)}>
          <div className="panel-heading">{post.title}<span className='pull-right'>{moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span></div>
          <div className="panel-body">{post.description}</div>
        </article>
        )}
      </div>
      
      <aside className='col-md-6'>
        <div className='top-commented-posts'>
          {this.state.mostCommentedPosts.map((post, index) =>
            <article className='panel panel-primary' key={index} onClick={() => this.openPost(post.uid)}>
            <div className="panel-heading">{post.title} - {post.comment_counter} comments<span className='pull-right'>{moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span></div>
            <div className="panel-body">{post.description}</div>
            </article>
          )}
        </div>

        <h4>Latest comments</h4>
        <div className='latest-comments'>
          {this.state.latestComments.map((comment, index) =>
            <article className='panel panel-warning'key={index}>
            <div className="panel-heading">{comment.user_name}<span className='pull-right'>{moment(comment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span></div>
            <div className="panel-body">{comment.comment}</div>
            </article>
          )}
        </div>
      </aside>
    </div>
		</section>);
	}

}

export default withRouter(Home);

