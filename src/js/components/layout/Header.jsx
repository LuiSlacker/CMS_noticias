import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="nav-link navbar-brand" to='/'>CMS Noticias</Link>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              {this.props.user.isAdmin &&
              <li className="nav-item">
                <Link className="nav-link" to='/admin'>Admin</Link>
              </li>
              }
              {this.props.user.isEditor &&
              <li className="nav-item">
                <Link className="nav-link" to='/dashboard'>Dashboard</Link>
              </li>
              }
              {!this.props.user._id &&
              <li className="nav-item">
                <Link className="nav-link" to='/login'>Login</Link>
              </li>
              }
              {!this.props.user._id &&
              <li className="nav-item">
                <Link className="nav-link" to='/signup'>Signup</Link>
              </li>
              }
              {this.props.user._id &&
              <li className="nav-item">
                <a className="nav-link" href='api/users/logout'>Logout</a>
              </li>
              }
            </ul>
          </div>
        </div>
      </nav>);
  }
}

export default withRouter(Header);

