import React from 'react';

class Footer extends React.Component {
	constructor() {
    super();
  }

	render() {
		return (
      <footer className="py-1 bg-dark">
        <div className="footer-container">
          <p className="m-0 text-center text-white">Copyright &copy; 2017 - UniNorte - CMS Noticias </p>
        </div>
      </footer>);
	}

}

export default Footer;

