
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';

import Home from './pages/Home.jsx';
import SingleNotice from './pages/SingleNotice.jsx';
import Admin from './pages/Admin.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import { NotificationContainer } from 'react-notifications';

class Main extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      user: {},
    }
  }

  setUser(user) {
    this.setState({
      user,
      isAuthenticated: true,
    })
  }

	render() {
		return (<main>
		<Router>
			<div>
        <Header user={this.state.user}/>
				<div className='container main-container'>
					<Route path="/" exact component={Home}/>
          <Route path="/paginas/:pageUid/noticias/:noticeUid" component={SingleNotice}/>

          <Route
            path="/signup"
            exact
            render= {props => <Signup setUser={this.setUser.bind(this)} /> }
          />
          <Route
            path="/login"
            exact
            render= {props => <Login setUser={this.setUser.bind(this)} /> }
          />

          <Route path="/admin" exact component={Admin}/>
          <Route
            path="/dashboard"
            exact
            render= {props => <Dashboard user={this.state.user} /> }
          />

				</div>
			</div>
		</Router>

    <Footer />
    <NotificationContainer />
		</main>);
	}
}

export default Main;
