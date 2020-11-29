import React, { Component } from 'react';

// my components
import Navbar from './Navbar';
import Footer from './Footer';

class Header extends Component {

	render () {
		return (
		<section id="design" className="section">
			<div className="container">
				<div className="row align-items-center">
					<div className="col-lg-6 text-center">
						<img src={process.env.PUBLIC_URL + '/jeeves.png'} title="Jeeves Logo" alt="Jeeves Logo" />
					</div>
					<div className="col-lg-6">
						<div className="p-70px-l md-p-0px-l md-m-30px-t">
							<h2 className="font-w-600 font-100px md-font-80px sm-font-70px main-blue">Jeeves</h2>
							<p className="font-24px">
							Tiny Pocket is a minimalistic mobile app that helps you keep track of your expenses and organize them by different categories.
							</p>
							<h2 className="main-dark-blue">Live your life smarter with us!</h2>
						</div>
					</div>
				</div>
			</div>
		</section>
		);
	}

}

class Landing extends Component {
  
	render () {
		return (
			<div>
				<Navbar />

				<Header />

				<Footer />
			</div>
		);
	}
}

export default Landing;