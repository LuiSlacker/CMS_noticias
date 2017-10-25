import React from 'react';
import moment from 'moment';
import { getPost, saveComment, deletePost, isUserPostOwner, isLoggedIn } from './../../helpers.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import MetaTags from 'react-meta-tags';

class Post extends React.Component {
	constructor() {
		super();

		this.state = {
			post: {},
			comments: [],
			comment: '',
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		getPost(this.props.match.params.uid, post => this.setState({ post }));
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}
	
	handleSubmit(e) {
		e.preventDefault();
		this.setState({ comment: '' })
		saveComment(this.props.match.params.uid, this.state.comment);
	}

	handleDelete() {
		deletePost(this.props.match.params.uid)
			.then(() => this.props.history.push("/"))
			.catch(console.error);
	}



	render() {
		return (<section>
		<article className='panel panel-primary'>
			<MetaTags>
				<title>{this.state.post.title}</title>
				<meta id='meta-description' name='description' content={this.state.post.description} />
			</MetaTags>
			<div className='panel-heading'>{this.state.post.title}<span className='pull-right'>{moment(this.state.post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span></div>
			<div className='panel-body'>
				<div className='row'>
					<div className='col-md-1'>
						<img src={this.state.post.user_avatar} className='profilepic avatar' alt='profile image' /><br />
						<span style={{marginLeft: '2.6em'}}>{this.state.post.username}</span>
					</div>
					<div className='col-md-11'>{this.state.post.description}</div>
				</div>
				{isLoggedIn() && isUserPostOwner(this.state.post.user_uid) && <button className='btn btn-danger pull-right' onClick={this.handleDelete}>Delete Post</button>}
			</div>
		</article>

		<div className='comments-list'>
			{ this.state.post.comments && Object.values(this.state.post.comments).map((comment, index) =>
				<article key={index} className='panel panel-warning'>
				<div className="panel-heading">{comment.user_name}<span className='pull-right'>{moment(comment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span></div>
				<div className="panel-body">{comment.comment}</div>
				</article>
			)}


			{isLoggedIn() && 
			<div>
				<h4>Add comment</h4>
				<form onSubmit={this.handleSubmit}>
					<div className='form-group'>
						<textarea 
							className="form-control"
							value={this.state.comment}     
							onChange={this.handleChange} 
							name="comment"    
							placeholder="Comment" />
						<br />
						<button className='btn btn-primary'>Save</button>
					</div>
				</form>
			</div>}
		</div>
		</section>);
	}

}

export default withRouter(Post);

