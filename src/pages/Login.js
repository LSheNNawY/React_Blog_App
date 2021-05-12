import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";

import {authFormValidation} from "../helpers/formValidation"
import NavbarComponent from "../components/NavbarComponent";

const ajaxLogin = async (email, password) => {
    const data = await (await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify({email, password})
    })).json()
    return data
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({email: '', password: ''});
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const [loggingError, setLoggingError] = useState('')
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault()
        if (authFormValidation(setErrors, email, password)) {
            setLoading(true)
            try {
                const userData = await ajaxLogin(email, password)
                setLoading(false)
                if (userData.userId) {
                    setUser(userData)
                    const expirationTime = new Date().getTime() + parseInt(process.env.REACT_APP_LOCAL_STORAGE_TTL)
                    localStorage.setItem('user', JSON.stringify({
                        "userId": userData.userId,
                        "firstName": userData.firstName,
                        "lastName": userData.lastName,
                        "email": userData.email,
                        "expireAt": expirationTime
                    }));
                    history.push('/');
                } else {
                    setLoggingError('Wrong credentials!');
                }

            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <NavbarComponent />
                </div>
            </div>
            <div className="container mt-5">
                <div className="row py-5 mt-4 align-items-center">
                    <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                        <img src={`${process.env.REACT_APP_URL}/img/login.svg`} alt=""
                             className="img-fluid mb-3 d-none d-md-block"/>
                        <h1>Start your session</h1>
                    </div>

                    <div className="col-md-7 col-lg-6 ml-auto">
                        {loggingError ? <h6 className="text-danger pb-3">{loggingError}</h6> : ''}
                        <form action="#">
                            <div className="row">
                                <div className="input-group col-lg-12 mb-4">
                                    <div className="input-group-prepend">
                                        <span
                                            className={`input-group-text bg-white px-4 border-md border-right-0 ${errors.email !== '' && errors.email !== 'valid' ? "border-danger" : ""}`}>
                                            <i className="fa fa-envelope text-muted">
                                            </i>
                                        </span>
                                    </div>
                                    <input id="email" type="email" name="email"
                                           className={`form-control bg-white border-left-0 border-md ${errors.email !== '' && errors.email !== 'valid' ? "is-invalid" : ""}`}
                                           onChange={(e) => setEmail(e.target.value)} placeholder="Email Address"/>
                                    {errors.email !== '' && errors.email !== 'valid' ?
                                        <h6 className='invalid-feedback'>{errors.email}</h6> : null}
                                </div>

                                <div className="input-group col-lg-12 mb-4">
                                    <div className="input-group-prepend">
                                        <span
                                            className={`input-group-text bg-white px-4 border-md border-right-0 ${errors.password !== '' && errors.password !== 'valid' ? "border-danger" : ""}`}>
                                            <i className="fa fa-lock text-muted">

                                            </i>
                                        </span>
                                    </div>
                                    <input id="password" type="password" name="password" placeholder="Password"
                                           onChange={(e) => setPassword(e.target.value)}
                                           className={`form-control bg-white border-left-0 border-md ${errors.password !== '' && errors.password !== 'valid' ? "is-invalid" : ""}`}/>
                                    {errors.password !== '' && errors.password !== 'valid' ?
                                        <h6 className='invalid-feedback'>{errors.password}</h6> : null}
                                </div>

                                <div className="form-group col-lg-12 mx-auto mb-0">
                                    <a href="#" onClick={(e) => handleLogin(e)}
                                       className='btn btn-primary btn-block py-2'>
                                        {
                                            loading ? <>
                                                    <span className="spinner-border spinner-border-sm m-1"></span>
                                                    <span className='font-weight-bold text-white'>Loading...</span>
                                                </> :
                                                <span className="font-weight-bold text-white">Login</span>
                                        }

                                    </a>
                                </div>


                                <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                                    <div className="border-bottom w-100 ml-5">
                                    </div>
                                    <span className="px-2 small text-muted font-weight-bold text-muted">OR</span>
                                    <div className="border-bottom w-100 mr-5">

                                    </div>
                                </div>

                                <div className="text-center w-100">
                                    <p className="text-muted font-weight-bold">
                                        Not a member? <Link to="/register" className="text-primary ml-2">Register</Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;
