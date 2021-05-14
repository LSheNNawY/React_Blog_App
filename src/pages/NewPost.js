import React, {useEffect, useState} from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import {addNewPostValidation} from "../helpers/formValidation"
import {toBase64, notify} from "../helpers/generalFunctions";

const addNewPostAjax = async postData => {
    const data = await (await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(postData)
    })).json()
    return data
}

const NewPost = () => {
        const history = useHistory();
        const [title, setTitle] = useState('');
        const [body, setBody] = useState('');
        const [tags, setTags] = useState('');
        const [image, setImage] = useState('');
        const [preview, setPreview] = useState('');
        const [errors, setErrors] = useState({});
        const [loading, setLoading] = useState(false);
        const [successMsg, setSuccessMessage] = useState(false);


        const handleSubmit = async (e) => {
            e.preventDefault();

            if (addNewPostValidation(setErrors, title, body, tags, image, "new")) {
                setLoading(true);
                const data = {title, body, tags,}

                try {
                    if (image)
                        data.image = await toBase64(image)

                    const postData = await addNewPostAjax(data);
                    if (postData._id) {
                        setLoading(false)
                        setSuccessMessage(true);
                        setTitle("");
                        setBody("");
                        setTags("");
                        setImage("");
                        setPreview("");
                        e.target.reset()
                        notify("💥 Post created successfully", 'success');
                    } else
                        setLoading(false)

                } catch (err) {
                    setLoading(false);
                    notify("💥 Error creating post, please try again later", 'error');
                }
            }
        }

        useEffect(() => {
            const userData = JSON.parse(window.localStorage.getItem('user'));
            if (!userData) {
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
                            <h3 className="mb-5 text-center text-black-50">New Post</h3>

                            <form action="#" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="input-group col-lg-12 mb-4">
                                        <input id="title" type="text" name="title"
                                               className={`form-control bg-white border-md ${errors.title && errors.title !== '' && errors.title !== 'valid' ? 'is-invalid' : ''}`}
                                               onChange={(e) => setTitle(e.target.value)} placeholder="Post title"/>

                                        {errors.title !== '' && errors.title !== 'valid' ?
                                            <h6 className='invalid-feedback'>{errors.title}</h6> : null}
                                    </div>

                                    <div className="input-group col-lg-12 mb-4">
                                    <textarea id="body" type="text" name="body" placeholder="Post Body"
                                              onChange={(e) => setBody(e.target.value)}
                                              className={`form-control bg-white border-md ${errors.body && errors.body !== '' && errors.body !== 'valid' ? 'is-invalid' : ''}`}>
                                    </textarea>
                                        {errors.body !== '' && errors.body !== 'valid' ?
                                            <h6 className='invalid-feedback'>{errors.body}</h6> : null}
                                    </div>

                                    <div className="input-group col-lg-12 mb-4">
                                        <input id="tags" type="text" name="tags" placeholder="Post Tags"
                                               onChange={(e) => setTags(e.target.value)}
                                               className={`form-control bg-white border-md ${errors.tags && errors.tags !== '' && errors.tags !== 'valid' ? 'is-invalid' : ''}`}/>
                                        {errors.tags !== '' && errors.tags !== 'valid' ?
                                            <h6 className='invalid-feedback'>{errors.tags}</h6> : null}
                                    </div>

                                    <div className="input-group col-lg-12 mb-4">
                                        <input id="image" type="file" name="image"
                                               accept=".png, .jpg, .jpeg"
                                               className={`form-control border-md pb-5 ${errors.image && errors.image !== '' && errors.image !== 'valid' ? 'is-invalid' : ''}`}
                                               onChange={(e) => {
                                                   setImage(e.target.files[0])
                                                   setPreview(URL.createObjectURL(e.target.files[0]))
                                               }}
                                        />
                                        {errors.image !== '' && errors.image !== 'valid' ?
                                            <h6 className='invalid-feedback'>{errors.image}</h6> : null}
                                    </div>
                                    {image !== '' ?
                                        < div className="col-lg-12 mb-4">
                                            < img src={preview} className="img-thumbnail" alt=""/>
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
                                                    <span className="font-weight-bold text-white">Post</span>
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

export default NewPost;
