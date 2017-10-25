
import React from 'react';
import {createUser} from './../../helpers.jsx';
import {withRouter} from "react-router-dom";
import MetaTags from 'react-meta-tags';

class SignUp extends React.Component {

  constructor () {
    super();
    this.state = {
      name: 'Luis',
      email: 'l.goohsen@gmail.com',
      password: 'giwlud!!',
      password2: 'giwlud!!',
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password !== this.state.password2) {
      this.setState({ message: 'Passwords must match! Try again!' });
      return;
    }

    createUser(this.state.name, this.state.email, this.state.password)
    .then((user) => {
      console.log(user);
      //this.props.isAuthenticated();
      this.props.history.push("/");
    })
    .catch((error) => {
      this.setState({message: error.message});
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
	
	render() {
		return (
    <article>
      <MetaTags>
				<title>Forum</title>
				<meta id='meta-description' name='description' content='Simple Forum to share and comment posts. This is an UniNorte project' />
			</MetaTags>
      <h2>SignUp</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            Name   
            <input 
              value={this.state.name}    
              onChange={this.handleChange} 
              name="name"    
              type="text" 
              className="form-control"
              placeholder="Jon Doe"/>
            <br />
            Email   
            <input 
              value={this.state.email}    
              onChange={this.handleChange} 
              name="email"    
              type="email" 
              className="form-control"
              placeholder="email@domain.com"/>
            <br />
            Password    
            <input 
              value={this.state.password}     
              onChange={this.handleChange} 
              name="password"    
              type="password" 
              className="form-control"
              placeholder="password" />
            <br />
            Repeat Password    
            <input 
              value={this.state.password2}     
              onChange={this.handleChange} 
              name="password2"    
              type="password" 
              className="form-control"
              placeholder="password2" />
            <br />
            <button className='btn btn-primary'>Signup</button>
          </div>
          </form>
          <p>
          {
            this.state.message === '' ? '' : this.state.message
          }
          </p>
    </article>);
	}
}

export default withRouter(SignUp);
