import React, { useEffect, useState } from 'react'
import dataService from '../services/data'
import Links from './links';
export default function UserProfile() {

    const [userData, setuserData] = useState({});

    useEffect(() => {
        const userProf = dataService.getUserProfile()
        userProf.then((data) => {
            if (typeof data !== 'undefined' && data !== null) {
                setuserData(data)
            }
        })
    }, []);

    console.log(userData, 'userData')
    return (
        <>
            <Links />

            <div className="card m-3" style={{ width: 650, textAlign: "center" }}>
                <h5 className="card-header">My profile </h5>
                <div className="card-body">
                    {typeof userData !== 'undefined' && userData !== null ?
                        <>
                            <div>
                                <div className="content-div">User Name:<span className="content-span">{userData.name}</span></div>
                            </div>
                            <div>
                                <div className="content-div">Email Address:<span className="content-span">{userData.email}</span></div>
                            </div>
                            <div>
                                <div className="content-div">Contact Number:<span className="content-span">{userData.contact_number}</span></div>
                            </div>
                            <div>
                                <div className="content-div">Gender:<span className="content-span">{userData.gender}</span></div>
                            </div>
                        </> :
                        ''}
                </div>

            </div>
        </>
    )
}
