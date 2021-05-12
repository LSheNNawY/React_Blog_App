import React, {useEffect, useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link, useHistory, useParams} from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import {addNewPostValidation} from "../helpers/formValidation"

const updatePostAjax = async (postData, slug) => {
    const data = await (await fetch(`${process.env.REACT_APP_API_URL}/posts/${slug}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(postData)
    })).json()
    return data
}

const UpdatePost = () => {
        const {slug} = useParams();
        const history = useHistory();
        const [id, setId] = useState(0);
        const [title, setTitle] = useState('');
        const [body, setBody] = useState('');
        const [tags, setTags] = useState('');
        const [image, setImage] = useState('');
        const [preview, setPreview] = useState('');
        const [errors, setErrors] = useState({});
        const [loading, setLoading] = useState(false);
        const [successMsg, setSuccessMsg] = useState(false);

        const notify = (message, type) => toast(message, {
            onClose: () => history.push('/myposts'),
            type: type === 'success' ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })


        const handleSubmit = async (e) => {
            e.preventDefault();

            const data = {title, body, tags, id}

            if (addNewPostValidation(setErrors, title, body, tags, image)) {
                setLoading(true);

                try {
                    if (image) {
                        const toBase64 = file => new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = error => reject(error);
                        });

                        data.image = await toBase64(image)
                    }

                    setLoading(false)
                    const postData = await updatePostAjax(data, slug);
                    if (postData._id || postData.n > 0) {
                        setSuccessMsg(true);
                        setTitle("");
                        setBody("");
                        setTags("");
                        setImage("");
                        setPreview("");
                        e.target.reset()
                        notify("💥 Post created successfully", 'success');

                    }
                } catch (err) {
                    setSuccessMsg(true)
                    notify("💥 Error updating post, please try again later", 'error');
                }
            } else {
                console.log(errors)
            }
        }

        useEffect(() => {
            const userData = JSON.parse(window.localStorage.getItem('user'));
            if (userData) {
                // setUser(userData);
                fetch(`${process.env.REACT_APP_API_URL}/posts/${slug}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'Application/json'
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        if (userData.userId === data.post.owner._id) {
                            setTitle(data.post.title)
                            setId(data.post._id)
                            setBody(data.post.body)
                            setTags(data.post.tags)
                        } else
                            history.push('/')

                    }).catch(err => {
                    console.log(err)
                })
            } else {
                history.push("/");
            }


        }, [])

        return (
            <div>
                <NavbarComponent/>

                <div className="container mt-1" style={{"minHeight": window.screen.height / 2}}>
                    <div className="row py-5 mt-1 align-items-center">
                        <div className="col-12">
                            {successMsg ? <ToastContainer/> : null}
                        </div>
                        <div className="col-md-7 col-lg-6 m-auto">
                            <h3 className="mb-5 text-center text-black-50">Update Post</h3>

                            <form action="#" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="input-group col-lg-12 mb-4">
                                        <input id="title" type="text" name="title" value={title}
                                               className={`form-control bg-white border-md ${errors.title && errors.title !== '' && errors.title !== 'valid' ? 'is-invalid' : ''}`}
                                               onChange={(e) => setTitle(e.target.value)} placeholder="Post title"/>

                                        {errors.title !== '' && errors.title !== 'valid' ?
                                            <h6 className='invalid-feedback'>{errors.title}</h6> : null}
                                    </div>

                                    <div className="input-group col-lg-12 mb-4">
                                    <textarea id="body" type="text" name="body" placeholder="Post Body" value={body}
                                              onChange={(e) => setBody(e.target.value)}
                                              className={`form-control bg-white border-md ${errors.title && errors.body !== '' && errors.body !== 'valid' ? 'is-invalid' : ''}`}>
                                    </textarea>
                                        {errors.body !== '' && errors.body !== 'valid' ?
                                            <h6 className='invalid-feedback'>{errors.body}</h6> : null}
                                    </div>

                                    <div className="input-group col-lg-12 mb-4">
                                        <input id="tags" type="text" name="tags" placeholder="Post Tags" value={tags}
                                               onChange={(e) => setTags(e.target.value)}
                                               className={`form-control bg-white border-md ${errors.title && errors.tags !== '' && errors.tags !== 'valid' ? 'is-invalid' : ''}`}/>
                                        {errors.body !== '' && errors.body !== 'valid' ?
                                            <h6 className='invalid-feedback'>{errors.tags}</h6> : null}
                                    </div>

                                    <div className="input-group col-lg-12 mb-1">
                                        <input id="image" type="file" name="image"
                                               accept=".png, .jpg, .jpeg"
                                               className={`form-control border-md pb-5`}
                                               onChange={(e) => {
                                                   setImage(e.target.files[0])
                                                   setPreview(URL.createObjectURL(e.target.files[0]))
                                               }}
                                        />

                                    </div>
                                    {image !== '' ?
                                        < div className="col-lg-12 mb-4">
                                            < img src={preview} className="img-thumbnail" alt="image"/>
                                        </div> : ''
                                    }

                                    <div className="form-group col-lg-12 mx-auto mb-0">
                                        <button type='submit'
                                                className='btn btn-primary btn-block py-2'>
                                            {
                                                loading ? <>
                                                        <span className="spinner-border spinner-border-sm m-1"></span>
                                                        <span className='font-weight-bold text-white'>Loading...</span>
                                                    </> :
                                                    <span className="font-weight-bold text-white">Update</span>
                                            }

                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <FooterComponent/>
            </div>
        );
    }
;

export default UpdatePost;
