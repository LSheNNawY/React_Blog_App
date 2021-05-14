import React from 'react';

const FooterComponent = () => {
    return (
        <footer className="main-footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="logo">
                            <h6 className="text-white">Bloggy website</h6>
                        </div>
                        <div className="contact-details">
                            <p>Egypt</p>
                            <p>Phone: (020) 1154866462</p>
                            <p>Email: <a href="mailto:info@company.com">devshennawy.com</a></p>
                            <ul className="social-menu">
                                <li className="list-inline-item">
                                    <a href="https://www.linkedin.com/in/lshennawy" target="_blank" rel="noopener noreferrer">
                                        <i className="fa fa-linkedin"></i>
                                     </a>
                                 </li>
                                <li className="list-inline-item">
                                    <a href="https://www.github.com/lshennawy" target="_blank" rel="noopener noreferrer">
                                        <i className="fa fa-github"></i>
                                     </a>
                                 </li>
                                <li className="list-inline-item">
                                    <a href="https://www.twitter.com/l_shennawy" target="_blank" rel="noopener noreferrer">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4">
                    </div>
                </div>
            </div>
            <div className="copyrights">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <p>&copy; 2021. All rights reserved. Blogy.</p>
                        </div>
                        <div className="col-md-6 text-right">
                            <p>Template By <a href="https://bootstrapious.com/p/bootstrap-carousel"
                                              className="text-white">Bootstrapious</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
