import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";

export default function Login() {
    // Registration form validation
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    let history = useHistory();

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        // display form data on success
        if (data.email.toString().toUpperCase() === "ABC@GMAIL.COM" && data.password === "abc") {
            history.push('/dashboard')
        } else {
            alert('Invalid email and password.')
            reset()
        }
        return false;
    }

    function openRegister() {
        history.push('/register')
    }

    return (
        <div className="card m-3" style={{ textAlign: "center" }}>
            <h5 className="card-header">Log In</h5>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Email Address</label>
                            <input name="email" type="text" ref={register} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <label>Password</label>
                            <input name="password" type="password" ref={register} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                    </div>
                    <div className="form-group" style={{ float: "right" }}>
                        <button type="button" onClick={openRegister} className="btn btn-secondary mr-1">Register</button>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>



    );
}