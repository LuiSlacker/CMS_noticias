import React from 'react';

class Footer extends React.Component {
	constructor() {
    super();
  }

	render() {
		return (
      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">Copyright &copy; 2017  - CMS Noticias </p>
        </div>
      </footer>);
	}

}

export default Footer;

