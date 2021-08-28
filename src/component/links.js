import React from 'react'
import {
    Link
} from 'react-router-dom';
export default function Links() {
    return (

        <nav>
            <ul>
                <li>
                    <Link to="/">Sign Out</Link>
                </li>
                <li>
                    <Link to="/profile">My Profile</Link>
                </li>
                <li>
                    <Link to="/dashboard">My Dashboard</Link>
                </li>

            </ul>
        </nav>

    )
}
