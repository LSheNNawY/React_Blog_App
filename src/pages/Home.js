import React from 'react';
import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
import PostsListComponent from "../components/PostsListComponent";

const Home = () => {
    return (
        <div>
            <NavbarComponent/>
            <div className="container" style={{minHeight: window.screen.height / 2}}>
                <div className="row">
                    <PostsListComponent/>
                </div>
            </div>
            <FooterComponent/>
        </div>
    );
};

export default Home;
