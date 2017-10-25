
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import {isLoggedIn, logout, getCurrentUser} from './../../helpers.jsx';

class Header extends React.Component {

	constructor() {
		super();
		this.state = {
			username: '',
		};

		this.handleLogout = this.handleLogout.bind(this);
	}

	componentDidMount() {
		isLoggedIn() && getCurrentUser((dbUser, authUser) =>  {
			console.log('asdasd' + dbUser);
			this.setState({ username: dbUser.name })
		});
	}

	handleLogout() {
		logout().then(() => {
			this.props.history.push("/");
		});
	}

	render() {
		return (<header>
			<div className='row' style={{width: '100%'}}>
				<div className='col-md-2'>
					<Link to='/' style={{color: '#E2E2E4'}}><h3 className='resetH3'>Forum App</h3></Link>
				</div>
				<div className='col-md-10'>
					{isLoggedIn()
						? <div>
								<ul style={{float: 'left'}}>
									<li><Link to='/newpost'>New Post</Link></li>
									<li><Link to='/profile'>User Profile</Link></li>
								</ul>
								<button className='btn btn-link pull-right' style={{color: '#E2E2E4'}} onClick={this.handleLogout}>Logout</button>
							</div>
						: <ul>
								<li><Link to='/login'>Login</Link></li>
								<li><Link to='/signup'>Signup</Link></li>
							</ul>
					}
				</div>
			</div>
		
		
		</header>);
	}
}

export default withRouter(Header);
