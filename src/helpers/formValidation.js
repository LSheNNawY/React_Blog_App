// validate email address
const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const authFormValidation = (setErrors, email, password, firstName = undefined, lastName = undefined, gender = undefined) => {
    let errors = {};
    if (email === '')
        errors.email = 'Email is required';
    else if (!validateEmail(email))
        errors.email = 'Invalid email address';
    else
        errors.email = 'valid'


    if (password === '')
        errors.password = 'Password is required';
    else if (password.length < 6)
        errors.password = "Password must not be less than 6";
    else
        errors.password = 'valid';


    if (firstName === '') {
        console.log(firstName)
        errors.firstName = 'First name is required';
    } else
        errors.firstName = 'valid';


    if (lastName === '')
        errors.lastName = "Last name is required";
    else
        errors.lastName = 'valid'

    if (gender === '')
        errors.gender = "Gender is required";
    else
        errors.gender = 'valid';

    setErrors(errors);

    if (firstName === undefined)
        return errors.email === 'valid' && errors.password === 'valid';

    return errors.email === 'valid' && errors.password === 'valid' && errors.firstName === 'valid' && errors.lastName === 'valid' && errors.gender === 'valid';
}

const addNewPostValidation = (setErrors, title, body, tags, image, type) => {
    let errors = {};

    if (title === '')
        errors.title = 'Post title is required';
    else if (title.length < 4)
        errors.title = 'Post title must not be less than 4 characters';
    else
        errors.title = 'valid'


    if (body === '')
        errors.body = 'Post body is required';
    else if (body.length < 10 || body.length < 100)
        errors.body = 'Post body must not be less than 100 character';
    else
        errors.body = 'valid'

    if (tags === '')
        errors.tags = 'Post tags are required';
    else
        errors.tags = 'valid';

    if (type === "new") {
        if (image === '')
            errors.image = 'Post image is required';
        else
            errors.image = 'valid'
    } else
        errors.image = 'valid'

    setErrors(errors);

    return errors.title === 'valid' && errors.body === 'valid' && errors.tags === 'valid' && errors.image === 'valid';

}

module.exports = {authFormValidation, validateEmail, addNewPostValidation}
