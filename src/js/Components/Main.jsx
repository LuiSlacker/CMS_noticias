
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import Home from './Pages/Home.jsx';


class Main extends React.Component {
	render() {
		return (<main>
		<Router>
			<div>
				<h3> CMS NOTICIAS</h3>
				<div className='custom-container'>
					<Route path="/" exact component={Home}/>
				</div>
			</div>
		</Router>

		</main>);
	}
}

export default Main;
