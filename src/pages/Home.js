import React from 'react';
import FooterComponent from "../components/FooterComponent";
import AsideComponent from "../components/AsideComponent";
import NavbarComponent from "../components/NavbarComponent";
import PostsListComponent from "../components/PostsListComponent";

const Home = () => {
    return (
        <div>
            <NavbarComponent/>
            <div className="container">
                <div className="row">
                    <PostsListComponent/>
                    {/*<AsideComponent/>*/}
                </div>
            </div>
            <FooterComponent/>
        </div>
    );
};

export default Home;
