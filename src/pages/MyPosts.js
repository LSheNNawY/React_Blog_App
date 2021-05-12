import React, {useEffect, useState} from 'react';
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import PostComponent from "../components/PostComponent";
import {useHistory} from "react-router-dom";

const MyPosts = () => {

    const [posts, setPosts] = useState([]);
    const history = useHistory()

    const getPosts = () => {
        return posts.map((post) => (
            <PostComponent data={post} key={post['_id']}/>)
        )
    }

    useEffect(() => {
        const userData = JSON.parse(window.localStorage.getItem('user'));
        if (userData) {
            fetch(`${process.env.REACT_APP_API_URL}/myposts`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'Application/json'
                }
            }).then(res => res.json()).then(data => {
                setPosts(data);
            })
        } else {
            history.push("/");
        }
    }, [])

    return (

        <div>
            <NavbarComponent/>
            <div className="container">
                <div className="row justify-content-center">
                    <main className="posts-listing col-lg-12">
                        <div className="container">
                            <h1 className='text-center mb-5'>My posts</h1>
                            <div className="row">
                                { getPosts() }
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <FooterComponent/>
        </div>
    );
};

export default MyPosts;
