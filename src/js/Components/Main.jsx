
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import Header from './Layout/Header.jsx';
import Footer from './Layout/Footer.jsx';

import SignUp from './Pages/SignUp.jsx';
import Login from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';
import UserProfile from './Pages/UserProfile.jsx';
import NewPost from './Pages/NewPost.jsx';
import Post from './Pages/Post.jsx';

class Main extends React.Component {
	render() {
		return (<main>
		<Router>
			<div>
				<Header />
				<div className='custom-container'>
					<Route path="/" exact component={Home}/>

					<Route path="/signup" component={SignUp}/>
					<Route path="/login" component={Login}/>
					
					<Route path="/profile" component={UserProfile}/>

					<Route path="/newpost" component={NewPost}/>
					<Route path="/posts/:uid" component={Post}/>
				</div>
			</div>
		</Router>
		
		
		<Footer />
		</main>);
	}
}

export default Main;
