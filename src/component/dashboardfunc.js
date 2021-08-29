import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import dataService from '../services/data'
import Links from './links';
import { yupResolver } from '@hookform/resolvers';
import * as Yup from 'yup';

export default function DashboardFunc() {
    const username = /^[a-z0-9\s]+$/i
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validationSchema = Yup.object().shape({
        profile: Yup.array().of(
            Yup.object().shape({
                name: Yup.string()
                    .required('Name is required')
                    .matches(username, 'Name must be alpha numeric'),
                email: Yup.string()
                    .required('Email is required')
                    .email('Email is invalid'),
                contact_number: Yup.string()
                    .required('Contact Number is required').nullable()
                    .matches(phoneRegExp, 'Contact Number is not valid')
                    .min(10).max(10, 'Contact Number must be 10 characters'),
                gender: Yup.string().required('Gender field is required').nullable(),
            })
        )
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { handleSubmit, control, errors,getValues } = useForm(formOptions);
    const [dashBoard, setDashBoard] = useState([]);

    useEffect(() => {
        fillUserData()
    }, [])

    const fillUserData = () => {
        if (dashBoard.length === 0) {
            const userProf = dataService.getDashBoard()
            userProf.then((data) => {
                if (typeof data !== 'undefined' && data !== null) {
                    let i = 1;
                    data.forEach(element => {
                        element.id = i
                        i++;
                    });
                    setDashBoard(data)
                }
            })
        }
    }

    const onSubmit = data => console.log(data);
    console.log(errors, 'errors')

    function addNewProfile() {
        let newId = dashBoard.length ? Math.max(...dashBoard.map(x => x.id)) + 1 : 1;
        let newData = {
            name: '', email: '',
            contact_number: '',
            gender: '',
            id: newId
        }
        setDashBoard([...dashBoard, newData])
    }

    function removeProfile(index) {
        setDashBoard([...dashBoard.slice(0, index), ...dashBoard.slice(index + 1)]);
    }

    const handleInputChange = (event, index, inputPropName) => {
        const data=getValues()
        console.log(data,'data')
        const newDashBoard = dashBoard;
        newDashBoard[index].name = event.target.value
        setDashBoard(newDashBoard);

    }
    return (

        <div>
            <Links />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card m-3" style={{ textAlign: "center" }}>
                    <h5 className="card-header">My Dashboard </h5>
                    {/* <form onSubmit={() => { }}> */}
                    <div className="card-body">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email Address</th>
                                    <th>Contact Number</th>
                                    <th>Gender</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {typeof dashBoard !== 'undefined' && dashBoard.length > 0 ? (
                                    dashBoard.map((user, index) => {
                                        const { email, name, contact_number, gender, id } = user;
                                        return (
                                            <tr key={`${id}`} >
                                                <td>
                                                    <Controller
                                                        control={control}
                                                        defaultValue={name}
                                                        name={`profile[${index}]name`}
                                                        rules={{ required: true }}
                                                        render={({ onChange }) => (
                                                            <input type="input" value={name}
                                                                name={`profile[${index}]name`}
                                                                onChange={(e) => { handleInputChange(e, index, "name") }}
                                                                className={`form-control ${errors.profile?.[index]?.name ? 'is-invalid' : ''}`}
                                                            />
                                                        )}
                                                    />
                                                    <div className="invalid-feedback">{errors.profile?.[index]?.name?.message}</div>


                                                </td>
                                                <td>
                                                    <Controller
                                                        control={control}
                                                        name={`profile[${index}]email`}
                                                        defaultValue={email}
                                                        render={({ onChange }) => (
                                                            <input type="input" value={email}
                                                                name={`profile[${index}]email`}
                                                                onChange={(e) => { handleInputChange(e, index, "email") }}
                                                                className={`form-control ${errors.profile?.[index]?.email ? 'is-invalid' : ''}`}
                                                            />
                                                        )}
                                                    />
                                                    <div className="invalid-feedback">{errors.profile?.[index]?.email?.message}</div>
                                                </td>
                                                <td>
                                                    <Controller
                                                        control={control}
                                                        name={`profile[${index}]contact_number`}
                                                        defaultValue={contact_number}
                                                        render={({ onChange }) => (
                                                            <input type="input" value={contact_number}
                                                                name={`profile[${index}]contact_number`}
                                                                onChange={(e) => { handleInputChange(e, index, "contact_number") }}
                                                                className={`form-control ${errors.profile?.[index]?.contact_number ? 'is-invalid' : ''}`}
                                                            />
                                                        )}
                                                    />
                                                    <div className="invalid-feedback">{errors.profile?.[index]?.contact_number?.message}</div>
                                                </td>
                                                <td>

                                                    <Controller
                                                        control={control}
                                                        name={`profile[${index}]gender`}
                                                        defaultValue={gender}
                                                        render={({ field }) => (
                                                            <select name="gender" id={`gender${id}`} value={gender}
                                                                name={`profile[${index}]gender`}
                                                                onChange={(e) => { handleInputChange(e, index, "gender") }}
                                                                className={`form-control ${errors.profile?.[index]?.gender ? 'is-invalid' : ''}`}
                                                            >
                                                                <option value=""></option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>

                                                        )}
                                                    />
                                                    <div className="invalid-feedback">{errors.profile?.[index]?.gender?.message}</div>


                                                </td>
                                                <td>
                                                    {id === 1 && <button onClick={() => { addNewProfile() }} className="btn btn-sm btn-primary "> Add</button>}
                                                    {id !== 1 && <button onClick={() => { removeProfile(index) }} className="btn btn-sm btn-danger btn-delete-user"> Delete</button>}
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={4}>No users found</td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* </form> */}
                </div>
                <input type="submit" />
            </form>
        </div>







    );
}
