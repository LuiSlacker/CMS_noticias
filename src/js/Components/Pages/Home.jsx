import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

class Home extends React.Component {
	constructor() {
    super();
  }

	render() {
		return (
					<div>
						<h3> Something here </h3>
					</div>
			);
	}

}

export default withRouter(Home);

