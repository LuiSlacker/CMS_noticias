import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

class Header extends React.Component {
	constructor() {
    super();
  }

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
            {/* //TODO remove admin, dashboard when user management is implemented */}


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
            {/* <li className="nav-item">
              <a className="nav-link" href="contact.html">Contact</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownPortfolio" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Portfolio
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownPortfolio">
                <a className="dropdown-item" href="portfolio-1-col.html">1 Column Portfolio</a>
                <a className="dropdown-item" href="portfolio-2-col.html">2 Column Portfolio</a>
                <a className="dropdown-item" href="portfolio-3-col.html">3 Column Portfolio</a>
                <a className="dropdown-item" href="portfolio-4-col.html">4 Column Portfolio</a>
                <a className="dropdown-item" href="portfolio-item.html">Single Portfolio Item</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Blog
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                <a className="dropdown-item" href="blog-home-1.html">Blog Home 1</a>
                <a className="dropdown-item" href="blog-home-2.html">Blog Home 2</a>
                <a className="dropdown-item" href="blog-post.html">Blog Post</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Other Pages
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                <a className="dropdown-item" href="full-width.html">Full Width Page</a>
                <a className="dropdown-item" href="sidebar.html">Sidebar Page</a>
                <a className="dropdown-item" href="faq.html">FAQ</a>
                <a className="dropdown-item" href="404.html">404</a>
                <a className="dropdown-item" href="pricing.html">Pricing Table</a>
              </div>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>);
	}

}

export default withRouter(Header);

