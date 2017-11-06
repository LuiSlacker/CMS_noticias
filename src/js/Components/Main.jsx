
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import Header from './layout/Nav.jsx';
import Footer from './layout/Footer.jsx';

import Home from './pages/Home.jsx';
import SingleNotice from './pages/SingleNotice.jsx';
import Admin from './pages/Admin.jsx';
import Dashboard from './pages/Dashboard.jsx';


class Main extends React.Component {
	render() {
		return (<main>
		<Router>
			<div>
        <Header />
				<div className='container main-container'>
					<Route path="/" exact component={Home}/>
          <Route path="/admin" exact component={Admin}/>
          <Route path="/dashboard" exact component={Dashboard}/>

          <Route path="/paginas/:pageUid/noticias/:noticeUid" component={SingleNotice}/>
				</div>
			</div>
		</Router>

    <Footer />
		</main>);
	}
}

export default Main;
