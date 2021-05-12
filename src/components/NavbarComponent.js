import React, {useCallback, useEffect, useState} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';

const NavbarComponent = () => {
    const history = useHistory();
    const pathName = useLocation().pathname;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const [searchText, setSearchText] = useState('');


    const handleLogout = useCallback(async () => {
        const data = await (await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
            method: 'POST',
            credentials: 'include',
        })).json()

        if (data.msg) {
            setUser(null)
            localStorage.clear()
            history.push("/")
        }
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(searchText)
    }

    useEffect(() => {
        const now = new Date().getTime();
        if (user !== null) {
            if (now >= user.expireAt) {
                setUser(null)
                window.localStorage.clear()
            }
        }

    })

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <div className="navbar-header d-flex align-items-center justify-content-between">
                    <Link to="/" className="navbar-brand"><i className="fa fa-2x fa-newspaper-o"></i> Blogy</Link>
                    <button type="button" data-toggle="collapse" data-target="#navbarcollapse"
                            aria-controls="navbarcollapse" aria-expanded="false" aria-label="Toggle navigation"
                            className="navbar-toggler"><span></span><span></span><span></span></button>
                </div>
                <div id="navbarcollapse" className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/" className={`nav-link ${pathName === '/' ? 'active' : ''}`}>
                                <i className="fa fa-home"></i> Home
                            </Link>
                        </li>
                        {
                            user !== null ?
                                <>
                                    <li className="nav-item">
                                        <Link to="/followings"
                                              className={`nav-link ${pathName === '/followings' ? 'active' : ''}`}>
                                            <i className="fa fa-group"></i> People you follow
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/myposts"
                                              className={`nav-link ${pathName === '/myposts' ? 'active' : ''}`}>
                                            <i className="fa fa-newspaper-o"></i> My posts
                                        </Link>
                                    </li>
                                </> : ''
                        }
                        {
                            user !== null ?
                                <>
                                    <li className="nav-item">
                                        <Link to="/posts/create"
                                              className={`nav-link ${pathName === '/posts/create' ? 'active' : ''}`}>
                                            <i className="fa fa-plus-circle"></i> New Post
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="navbar-text">
                                            <Link to={"/"} className="search-btn">
                                                <i className="icon-search-1"></i>
                                            </Link>
                                        </div>
                                    </li>
                                </>
                                : ''
                        }


                        {
                            user !== null ?
                                <span className="d-md-flex">
                                    <li className="nav-item">
                                        <Link to="/profile"
                                              className={`nav-link ${pathName === '/profile' ? 'active' : ''}`}>
                                           <i className="fa fa-user"></i> Profile
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href='#' className="nav-link" onClick={handleLogout}>Logout <i
                                            className="fa fa-sign-out"></i></a>
                                    </li>
                                </span>

                                :
                                <li className="nav-item"><Link to="/login" className="nav-link">Login</Link>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
