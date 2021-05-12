import React from 'react';

const AsideComponent = () => {
    return (
        <aside className="col-lg-4">
            <div className="widget latest-posts">
                <header>
                    <h3 className="h6">Latest Posts</h3>
                </header>
                <div className="blog-posts">
                    <a href="#">
                        <div className="item d-flex align-items-center">
                            <div className="image"><img src="img/small-thumbnail-1.jpg" alt="..."
                                                        className="img-fluid"/>
                            </div>
                            <div className="title"><strong>Alberto Savoia Can Teach You About</strong>
                                <div className="d-flex align-items-center">
                                    <div className="views"><i className="icon-eye"></i> 500</div>
                                    <div className="comments"><i className="icon-comment"></i>12</div>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="#">
                        <div className="item d-flex align-items-center">
                            <div className="image"><img src="img/small-thumbnail-2.jpg" alt="..."
                                                        className="img-fluid"/>
                            </div>
                            <div className="title"><strong>Alberto Savoia Can Teach You About</strong>
                                <div className="d-flex align-items-center">
                                    <div className="views"><i className="icon-eye"></i> 500</div>
                                    <div className="comments"><i className="icon-comment"></i>12</div>
                                </div>
                            </div>
                        </div>
                    </a><a href="#">
                    <div className="item d-flex align-items-center">
                        <div className="image"><img src="img/small-thumbnail-3.jpg" alt="..."
                                                    className="img-fluid"/>
                        </div>
                        <div className="title"><strong>Alberto Savoia Can Teach You About</strong>
                            <div className="d-flex align-items-center">
                                <div className="views"><i className="icon-eye"></i> 500</div>
                                <div className="comments"><i className="icon-comment"></i>12</div>
                            </div>
                        </div>
                    </div>
                </a></div>
            </div>
            <div className="widget categories">
                <header>
                    <h3 className="h6">Categories</h3>
                </header>
                <div className="item d-flex justify-content-between"><a href="#">Growth</a><span>12</span></div>
                <div className="item d-flex justify-content-between"><a href="#">Local</a><span>25</span></div>
                <div className="item d-flex justify-content-between"><a href="#">Sales</a><span>8</span></div>
                <div className="item d-flex justify-content-between"><a href="#">Tips</a><span>17</span></div>
                <div className="item d-flex justify-content-between"><a href="#">Local</a><span>25</span></div>
            </div>
            <div className="widget tags">
                <header>
                    <h3 className="h6">Tags</h3>
                </header>
                <ul className="list-inline">
                    <li className="list-inline-item"><a href="#" className="tag">#Business</a></li>
                    <li className="list-inline-item"><a href="#" className="tag">#Technology</a></li>
                    <li className="list-inline-item"><a href="#" className="tag">#Fashion</a></li>
                    <li className="list-inline-item"><a href="#" className="tag">#Sports</a></li>
                    <li className="list-inline-item"><a href="#" className="tag">#Economy</a></li>
                </ul>
            </div>
        </aside>
    );
};

export default AsideComponent;
