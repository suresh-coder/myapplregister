import React, { useState, useEffect } from 'react'

import dataService from '../services/data'
import Links from './links';
export default function Dashboard() {


    const [userDashboard, setDashboard] = useState({});

    useEffect(() => {
        const userProf = dataService.getDashBoard()
        userProf.then((data) => {
            if (typeof data !== 'undefined' && data !== null) {
                setDashboard(data)
            }

        })
    }, []);

    console.log(userDashboard, 'userData')

    return (
        <div>
            <Links />
            <div className="card m-3" style={{textAlign: "center" }}>
                <h5 className="card-header">My Dashboard </h5>
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
                            {userDashboard.length > 0 ? (
                                userDashboard.map((user, index) => {
                                    const { email, name, contact_number, gender } = user;
                                    return (
                                        <tr key={`${user}${index}`} >
                                            <td>{name}</td>
                                            <td>{email}</td>
                                            <td>{contact_number}</td>
                                            <td>{gender}</td>
                                            <td>
                                                <button>Delete</button>
                                                <button>Edit</button>
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
            </div>

        </div >
    )
}
