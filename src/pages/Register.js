import React, {useState} from 'react';
import '../styles/register.css'
import {Link, useHistory} from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";

const {authFormValidation} = require('../helpers/formValidation')

const ajaxRegister = async (firstName, lastName, email, gender, password) => {
    const data = await (await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify({firstName, lastName, email, gender, password})
    })).json()
    return data
}


const Register = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState({email: '', password: '', firstName: '', lastName: '', gender: ''});
    const [serverError, setServerError] = useState(false);
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault()
        if (authFormValidation(setErrors, email, password, firstName, lastName, gender)) {
            setLoading(true)
            try {
                const userData = await ajaxRegister(firstName, lastName, email, gender, password)
                setLoading(false)
                if (userData._id) {
                    history.push('/login');
                } else {
                    setServerError(true)
                }

            } catch (err) {
                setLoading(false);
            }
        }

    }


    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <NavbarComponent/>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row py-5 mt-4 align-items-center">
                    <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                        <img src={`${process.env.REACT_APP_URL}/img/login.svg`} alt=""
                             className="img-fluid mb-3 d-none d-md-block"/>
                        <h1>Create an Account</h1>
                    </div>

                    <div className="col-md-7 col-lg-6 ml-auto">
                        {serverError ? <h5 className='text-danger mb-5'>Server Error, please try again later</h5> : ''}
                        <form action="#" onSubmit={handleRegister}>
                            <div className="row">

                                <div className="input-group col-lg-12 mb-4">
                                    <div className="input-group-prepend">
                                        <span
                                            className={`input-group-text bg-white px-4 border-md border-right-0 ${errors.firstName !== '' && errors.firstName !== 'valid' ? "border-danger" : ""}`}>
                                            <i className="fa fa-user text-muted">
                                            </i>
                                        </span>
                                    </div>
                                    <input id="firstName" type="text" name="firstName"
                                           className={`form-control bg-white border-left-0 border-md ${errors.firstName !== '' && errors.firstName !== 'valid' ? "is-invalid" : ""}`}
                                           onChange={(e) => setFirstName(e.target.value)} placeholder="First Name"/>
                                    {errors.firstName !== '' && errors.firstName !== 'valid' ?
                                        <h6 className='invalid-feedback'>{errors.firstName}</h6> : null}
                                </div>

                                <div className="input-group col-lg-12 mb-4">
                                    <div className="input-group-prepend">
                                        <span
                                            className={`input-group-text bg-white px-4 border-md border-right-0 ${errors.lastName !== '' && errors.lastName !== 'valid' ? "border-danger" : ""}`}>
                                            <i className="fa fa-user text-muted">
                                            </i>
                                        </span>
                                    </div>
                                    <input id="lastName" type="text" name="lastName"
                                           className={`form-control bg-white border-left-0 border-md ${errors.lastName !== '' && errors.lastName !== 'valid' ? "is-invalid" : ""}`}
                                           onChange={(e) => setLastName(e.target.value)} placeholder="Last Name"/>
                                    {errors.lastName !== '' && errors.lastName !== 'valid' ?
                                        <h6 className='invalid-feedback'>{errors.lastName}</h6> : null}
                                </div>

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
                                            className={`input-group-text bg-white px-4 border-md border-right-0 ${errors.gender !== '' && errors.gender !== 'valid' ? "border-danger" : ""}`}>
                                            <i className="fa fa-users text-muted">
                                            </i>
                                        </span>
                                    </div>
                                    <select id="gender" name="gender"
                                            className={`form-control bg-white border-left-0 border-md ${errors.gender !== '' && errors.gender !== 'valid' ? "is-invalid" : ""}`}
                                            onChange={(e) => setGender(e.target.value)} placeholder="Gender">
                                        <option value="">-- Gender --</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    {errors.gender !== '' && errors.gender !== 'valid' ?
                                        <h6 className='invalid-feedback'>{errors.gender}</h6> : null}
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
                                    <button className="btn btn-primary btn-block py-2" onClick={handleRegister}>
                                        {
                                            loading ? <>
                                                    <span className="spinner-border spinner-border-sm m-1"></span>
                                                    <span className='font-weight-bold text-white'>Loading...</span>
                                                </> :
                                                <span className="font-weight-bold text-white">Create your account</span>
                                        }
                                    </button>
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
                                        Already Registered? <Link to="/login" className="text-primary ml-2">Login</Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Register;
