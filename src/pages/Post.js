import React, {useEffect, useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useParams, useHistory, Link} from "react-router-dom";

import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";

import {formatDate, formatTags} from '../helpers/generalFunctions'

const Post = () => {
    const {slug} = useParams();
    const history = useHistory()
    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const [following, setFollowing] = useState(false);
    const [deleted, setDeleted] = useState(false)

    const loggedUser = JSON.parse(window.localStorage.getItem('user'));

    const notify = (message, type) => toast(message, {
        onClose: () => {
            if (type === 'success')
                history.push('/')
        },
        type: type === 'success' ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

    const follow = (type) => {
        fetch(`${process.env.REACT_APP_API_URL}/follow`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({follower: loggedUser.userId, followed: post.owner._id, type: type})
        }).then(res => res.json()).then(data => {
            if (data.ok)
                setFollowing(!following)
        })
    }


    const checkOwner = () => {
        return ((post.owner && loggedUser && loggedUser.userId === post.owner._id))
    }

    const checkFollowing = () => {
        if ((post.owner && loggedUser && loggedUser.userId !== post.owner._id)) {
            if (following) {
                return (
                    <div className="d-flex align-items-center flex-wrap ml-5">
                        <div className="date">
                            <button onClick={() => follow("unfollow")}
                                    className='btn btn-sm btn-outline-warning rounded'>
                                <i className="fa fa-user-times"></i>Unfollow
                            </button>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="d-flex align-items-center flex-wrap ml-5">
                        <div className="date">
                            <button onClick={() => follow("follow")} className='btn btn-sm btn-outline-success rounded'>
                                <i className="fa fa-user-plus"></i>Follow
                            </button>
                        </div>
                    </div>
                )
            }
        }
    }

    const handleDelete = () => {
        const confirm = window.confirm("Are you sure?");

        if (confirm) {
            fetch(`${process.env.REACT_APP_API_URL}/posts/${slug}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'Application/json'
                }
            }).then(res => res.json())
                .then(data => {
                    setDeleted(true);
                    notify('💥 Post deleted successfully', 'success')
                }).catch(error => {
                setDeleted(true);
                notify('❌ Error deleting post', 'error')
            });
        }
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/posts/${slug}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'Application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.post) {
                    setPost(data.post)
                    setUser(data.user)

                    if (data.user.followings.indexOf(data.post.owner._id) !== -1)
                        setFollowing(true);

                } else
                    history.push('/')

            }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div>
            <NavbarComponent/>
            <div className="container">
                {deleted ? <ToastContainer/> : null}
                <div className="row justify-content-around">
                    <main className="post blog-post col-lg-10">
                        <div className="container">
                            <div className="post-single">
                                <div className="post-thumbnail"><img
                                    src={post.image ? `${process.env.REACT_APP_API_URL}/uploads/${post.image}` : '/img/blog-post-3.jpeg'}
                                    alt="..."
                                    className="img-fluid" style={{ maxHeight: '32rem' }}/>
                                </div>
                                <div className="post-details">
                                    <div className="post-meta d-flex justify-content-between">
                                        <div className="category"><a>{formatTags(post.tags)}</a></div>
                                    </div>
                                    <div className="title">
                                        <span>{formatDate(post.created_at)}</span>
                                    </div>
                                    <h1>{post.title}</h1>
                                    <div className="post-footer d-flex align-items-center flex-column flex-sm-row">
                                        <a href="#" className="author d-flex align-items-center flex-wrap">
                                            <div className="avatar">
                                                <img src={post.owner && `/img/${post.owner.avatar}`} alt="..."
                                                     className="img-fluid"/></div>
                                            <div className="title">
                                                <span>{post.owner && `${post.owner.firstName} ${post.owner.lastName}`}</span>
                                            </div>
                                        </a>
                                        {
                                            checkOwner() ? (<div className="controls text-right">
                                                <Link to={`/${post.slug}/edit`} className="btn btn-sm btn-warning m-1">
                                                    <i className="fa fa-pencil"></i>
                                                </Link>
                                                <button className="btn btn-sm btn-danger m-1" onClick={handleDelete}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </div>) : null
                                        }

                                        {checkFollowing()}

                                    </div>
                                    <div className="post-body">
                                        <p className="lead">{post.body}</p>

                                    </div>
                                    {/*<div className="post-tags"><a href="#" className="tag">#Business</a><a href="#"*/}
                                    {/*                                                                       className="tag">#Tricks</a><a*/}
                                    {/*    href="#" className="tag">#Financial</a><a href="#" className="tag">#Economy</a>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <FooterComponent/>
        </div>
    );
};

export default Post;
