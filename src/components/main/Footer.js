import React from 'react';

import version from '../../version.json';

export default () => {
    
    return (
        <footer className="text-center page-footer dark">
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <h5>Get started</h5>
                        <ul>
                            <li><a target="_top" href={process.env.NODE_ENV === "production" ? "https://ermiry.com/" : "http://localhost.com/"}>
                                Home</a></li>
                            <li><a target="_top" href={process.env.NODE_ENV === "production" ? "https://ermiry.com/register" : "http://localhost.com/register"}>
                                Sign Up</a></li>
                            <li><a target="_top" href={process.env.NODE_ENV === "production" ? "https://ermiry.com/login" : "http://localhost.com/login"}>
                                Login</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-3">
                        <h5>About</h5>
                        <ul>
                            <li><a target="_top" href={process.env.NODE_ENV === "production" ? "https://ermiry.com/about" : "http://localhost.com/about"}>
                                About Us</a></li>
                            <li><a target="_top" href={process.env.NODE_ENV === "production" ? "https://ermiry.com/contact" : "http://localhost.com/contact"}>
                                Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-3">
                        <h5>Support</h5>
                        <ul>
                            <li><a target="_top" href={process.env.NODE_ENV === "production" ? "https://ermiry.com/faq" : "http://localhost.com/faq"}>
                                FAQ</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-3">
                        <h5>Legal</h5>
                        <ul>
                            <li><a target="_top" href={process.env.NODE_ENV === "production" ? "https://ermiry.com/privacy-policy" : "http://localhost.com/privacy-policy"}>
                                Privacy Policy</a></li>
                            <li><a target="_top" href={process.env.NODE_ENV === "production" ? "https://ermiry.com/cookies-policy" : "http://localhost.com/cookies-policy"}>
                                Cookies Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <p>Copyright &copy; { new Date().getFullYear() } Ermiry - { version.version_name } - { version.version_date }</p>
            </div>
        </footer>
    );

};