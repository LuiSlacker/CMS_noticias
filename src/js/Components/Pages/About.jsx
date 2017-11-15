import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { Media } from 'reactstrap';
import MetaDefault from '../helper/meta.jsx';

class About extends React.Component {
	constructor(props) {
    super(props);
  }

	render() {
		return (
        <article>
          <MetaDefault />
          <div>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to='/'>Home</Link>
              </li>
              <li className="breadcrumb-item active">About</li>
            </ol>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <h2> Developed by </h2><br/>
              <div className="col-lg-12 aboutMedia">
                <Media>
                  <Media left href="https://github.com/mateodaza">
                    <img src="https://avatars3.githubusercontent.com/u/18689480" alt="Generic placeholder image" height="42" width="42"/>
                  </Media>
                  <Media body>
                    <Media heading>
                      <a href="https://github.com/mateodaza"> Mateo Daza </a>
                    </Media>
                  </Media>
                </Media>

                <Media>
                  <Media left href="https://github.com/LuiSlacker">
                    <img src="https://avatars1.githubusercontent.com/u/6152940" alt="Generic placeholder image" height="42" width="42"/>
                  </Media>
                  <Media body>
                    <Media heading>
                      <a href="https://github.com/LuiSlacker"> Ludwig Goohsen </a>
                    </Media>
                  </Media>
                </Media>

                <Media>
                  <Media left href="https://github.com/JoaoRacedo">
                    <img src="https://avatars0.githubusercontent.com/u/20033179" alt="Generic placeholder image" height="42" width="42"/>
                  </Media>
                  <Media body>
                    <Media heading>
                      <a href="https://github.com/JoaoRacedo"> Sebastian Racedo </a>
                    </Media>
                  </Media>
                </Media>
              </div>
            </div>
          </div>
        </article>
     );
	}

}

export default withRouter(About);

