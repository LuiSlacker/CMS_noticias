import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

class SingleNoticia extends React.Component {
	constructor() {
    super();
  }

	render() {
		return (
      <article>
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to='/'>Home</Link>
            </li>
            <li className="breadcrumb-item active">Noticia</li>
          </ol>
        </div>

        <div className="row">
            <div className="col-lg-6">
              <img className="img-fluid rounded mb-4" src="http://placehold.it/750x450" alt="" />
            </div>
            <div className="col-lg-6">
              <h2>Noticia Title</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed voluptate nihil eum consectetur similique? Consectetur, quod, incidunt, harum nisi dolores delectus reprehenderit voluptatem perferendis dicta dolorem non blanditiis ex fugiat.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe, magni, aperiam vitae illum voluptatum aut sequi impedit non velit ab ea pariatur sint quidem corporis eveniet. Odit, temporibus reprehenderit dolorum!</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam? Aut, in eum facere corrupti necessitatibus perspiciatis quis?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam? Aut, in eum facere corrupti necessitatibus perspiciatis quis?</p>
            </div>
        </div>
      </article>);
	}

}

export default withRouter(SingleNoticia);

