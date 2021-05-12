import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import {formatDate} from '../helpers/generalFunctions'
import PostComponent from "../components/PostComponent";

const getUserData = async () => {
    const userData = await (await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'Application/json'
        }
    })).json()
    return userData
}

const Profile = () => {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [profileData, setProfileData] = useState({});

    const getPosts = () => {
        if (user.posts) {

            const data = user.posts.map((post) => {
                post.owner = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    avatar: user.avatar
                }
                return post
            })

            return data.map((post) => (
                <PostComponent data={post} key={post['_id']}/>)
            )
        }
    }

    useEffect(() => {
        const fetUserData = async () => {
            try {
                const userData = await getUserData();
                if (userData) {
                    if (userData.error)
                        history.push('/login')
                    else {
                        setUser(userData)
                    }
                } else
                    console.log("No data")
            } catch (err) {
                console.log(err)
            }
        }

        fetUserData();
    }, [])
    return (
        <div>
            <NavbarComponent/>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <img src={`/img/${user.avatar}`} alt="" className="img rounded-circle w-25 img-thumbnail"/>
                    </div>
                    <div className="col-md-12 text-center">
                        <h4 className="mt-2">{user.firstName} {user.lastName}</h4>
                        <p>Member since {formatDate(user.created_at)}</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <main className="posts-listing col-md-12 m-auto">
                    <div className="container">
                        <div className="row">
                            {getPosts()}
                        </div>
                    </div>
                </main>
            </div>


            <FooterComponent/>
        </div>
    );
};

export default Profile;
