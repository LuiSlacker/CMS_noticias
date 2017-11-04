
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
import SingleNotice from './pages/SingleNotice.jsx';

import Home from './pages/Home.jsx';


class Main extends React.Component {
	render() {
		return (<main>
		<Router>
			<div>
        <Header />
				<div className='container'>
					<Route path="/" exact component={Home}/>

          <Route path="/noticia" component={SingleNotice}/>
				</div>
			</div>
		</Router>

    <Footer />
		</main>);
	}
}

export default Main;
