
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import {login, checkToken} from './../../helpers.jsx';


class Login extends React.Component {
    constructor () {
        super();
        this.state = {
          email: 'l.goohsen@gmail.com',
          password: 'giwlud!!',
          message:'',
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
    
    handleSubmit(e) {
      e.preventDefault();
      login(this.state.email, this.state.password)
        .then((user) => {
          console.log(user);
          this.props.history.push("/");
        })
        .catch((error) => {
          this.setState({ message: error.message });
        });
    }
      
	render() {
		return (
      <article>
        <MetaTags>
          <title>Forum</title>
          <meta id='meta-description' name='description' content='Simple Forum to share and comment posts. This is an UniNorte project' />
			  </MetaTags>
		   <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
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
            <button className='btn btn-primary'>Login</button>
          </div>
        </form>
        {
          this.state.message == '' ? '' : <p>{this.state.message}</p>
        }
		  </article>);
	}
}

export default withRouter(Login);

