import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import * as NoticeService from '../../services/notices-service';

class Home extends React.Component {
	constructor() {
    super();

    this.state =  {
      notices: [],
    }
  }

  componentDidMount() {
    NoticeService.getAllForOnePage('59fb6132126e1c1d13c1df25')
      .then(notices => this.setState({ notices }))
  }

	render() {
		return (
      <article>
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item active">About</li>
          </ol>

          <div className="row">
            <div className="col-lg-4 col-sm-6 portfolio-item">
              <Link className="nav-link reset" to='/noticia'>
                <div className="card h-100">
                  <img className="card-img-top" src="http://placehold.it/700x400" alt="" />
                  <div className="card-body">
                    <h4 className="card-title">Project One</h4>
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-sm-6 portfolio-item">
              <div className="card h-100">
                <a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt="" /></a>
                <div className="card-body">
                  <h4 className="card-title">
                    <a href="#">Project Two</a>
                  </h4>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 portfolio-item">
              <div className="card h-100">
                <a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt="" /></a>
                <div className="card-body">
                  <h4 className="card-title">
                    <a href="#">Project Three</a>
                  </h4>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos quisquam, error quod sed cumque, odio distinctio velit nostrum temporibus necessitatibus et facere atque iure perspiciatis mollitia recusandae vero vel quam!</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 portfolio-item">
              <div className="card h-100">
                <a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt="" /></a>
                <div className="card-body">
                  <h4 className="card-title">
                    <a href="#">Project Four</a>
                  </h4>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 portfolio-item">
              <div className="card h-100">
                <a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt="" /></a>
                <div className="card-body">
                  <h4 className="card-title">
                    <a href="#">Project Five</a>
                  </h4>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 portfolio-item">
              <div className="card h-100">
                <a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt="" /></a>
                <div className="card-body">
                  <h4 className="card-title">
                    <a href="#">Project Six</a>
                  </h4>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>);
	}

}

export default withRouter(Home);

