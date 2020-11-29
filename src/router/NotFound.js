import React from 'react';

import Navbar from '../components/main/Navbar';
import Footer from '../components/main/Footer';

export default () => {
	return (
		<div>
			<Navbar />
			<div className="register-area d-flex">
				<div className="register-side-content bg-img not-found-bg"></div>

				<div className="register-content-wrapper d-flex align-items-center">
					<div className="register-content">
						<h1 className="main-red font-72px">Not Found!</h1>
						<hr></hr>
						<h6 className="main-blue font-24px">We couldn't find any results for your search. Try again.</h6>
						<br></br>
						<br></br>
						<a className="m-btn m-btn-theme m-btn-radius btn-lg w-100" target="_top"
							href="/">Back to Jeeves</a>
						<br></br>
						<br></br>
						<a className="m-btn m-btn-theme m-btn-radius btn-lg w-100" target="_top" 
							href={process.env.NODE_ENV === "production" ? 
							"https://ermiry.com" : "http://localhost.com"}>Back to Ermiry</a>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};