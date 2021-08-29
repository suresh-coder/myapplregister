import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";

export default function Register() {

    const username = /^[a-z0-9\s]+$/i
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    // Registration form validation
    const validationSchema = Yup.object().shape({
        userName: Yup.string()
            .required('User Name is required')
            .matches(username, 'User Name must be alpha numeric')
        ,
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        contactNumber: Yup.string()
            .required('Contact Number is required').nullable()
            .matches(phoneRegExp, 'Contact Number is not valid')
            .min(10).max(10, 'Contact Number must be 10 characters'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        gender: Yup.string().required('Gender field is required').nullable(),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    let history = useHistory();

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        // display form data on success
        console.log(data, 'data')
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        return false;
    }

    function login() {
        history.push('/')
    }

    return (
        <div className="card m-3" style={{ textAlign: "center" }}>
            <h5 className="card-header">User Registration </h5>

            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>User Name</label>
                            <input name="userName" type="text" ref={register} className={`form-control ${errors.userName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.userName?.message}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Email Address</label>
                            <input name="email" type="text" ref={register}  className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>

                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <label>Contact Number</label>
                            <input name="contactNumber" type="text" ref={register}  className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.contactNumber?.message}</div>
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Gender</label>

                            <span className="radio-span">Male</span>
                            <input name="gender" type="radio" value={0} ref={register}  id="genderMale" className={`form-check-input ${errors.gender ? 'is-invalid' : ''}`} />
                            <span className="radio-span">Female</span>
                            <input name="gender" type="radio" value={1} ref={register}  id="genderFemale" className={`form-check-input ${errors.gender ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.gender?.message}</div>
                        </div>

                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <label>Password</label>
                            <input name="password" type="password" ref={register}  className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                    </div>


                    <div className="form-group" style={{ float: "right" }}>
                        <button type="submit" className="btn btn-primary mr-1">Register</button>
                        <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button>
                    </div>
                    <div className="form-group" style={{ float: "left" }}>
                        <button type="button" onClick={() => login()} className="btn btn-primary">Sign In</button>

                    </div>


                </form>
            </div>
        </div>
    )
}

