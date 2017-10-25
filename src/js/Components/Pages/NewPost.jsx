
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import MetaTags from 'react-meta-tags';

import {saveNewPost} from './../../helpers.jsx';


class NewPost extends React.Component {
    constructor () {
        super();
        this.state = {
          title: 'My title',
          description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
          message:'',
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
    
    handleSubmit(e) {
      e.preventDefault();
      saveNewPost(this.state.title, this.state.description)
        .then(() => {
          this.props.history.push("/");
        })
        .catch((error) => {
          this.setState({ message: error.message });
        });
    }
      
	render() {
		return (
      <article>
		    <h2>Create new post</h2>
        <MetaTags>
          <title>Forum</title>
          <meta id='meta-description' name='description' content='Simple Forum to share and comment posts. This is an UniNorte project' />
        </MetaTags>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            Title   
            <input 
              value={this.state.title}    
              onChange={this.handleChange} 
              name="title"
              type="text" 
              className="form-control"
              placeholder="Title"/>
            <br />
            Description    
            <textarea 
              value={this.state.description}     
              onChange={this.handleChange} 
              name="description"
              cols='50'
              className="form-control"
              placeholder="Description" />
            <br />
            <button className='btn btn-primary'>Save</button>
          </div>
        </form>
        {
          this.state.message == '' ? '' : <p>{this.state.message}</p>
        }
		  </article>);
	}
}

export default NewPost;

