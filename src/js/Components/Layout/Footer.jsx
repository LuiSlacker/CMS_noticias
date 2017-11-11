import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

class Footer extends React.Component {
	constructor() {
    super();
  }

	render() {
		return (
      <footer className="py-1 bg-dark">
        <div className="footer-container">
          <Link to='/about'> <p className="m-0 text-center text-white">About</p></Link>
          <p className="m-0 text-center text-white">Copyright &copy; 2017 - UniNorte</p>
        </div>
      </footer>);
	}

}

export default Footer;

