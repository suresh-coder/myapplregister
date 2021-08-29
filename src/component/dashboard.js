import React from 'react'

import dataService from '../services/data'
import Links from './links';
export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { dashboard: [] }
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    componentDidMount() {
        this.fillUserData()
    }


    fillUserData() {
        const { dashboard } = this.state
        if (dashboard.length === 0) {
            console.log('dsadasd')
            const userProf = dataService.getDashBoard()
            userProf.then((data) => {
                if (typeof data !== 'undefined' && data !== null) {
                    let i = 1;
                    data.forEach(element => {
                        element.id = i
                        i++;
                    });
                    console.log(data, 'data')
                    this.setState({ dashboard: data })
                    console.log(this.state)
                }
            })
        }
    }

    addNewProfile = () => {
        const { dashboard } = this.state
        let newId = dashboard.length ? Math.max(...dashboard.map(x => x.id)) + 1 : 1;
        let newData = {
            name: '', email: '', contact_number: '',
            gender: '',
            id: newId
        }
        this.setState({ dashboard: [...dashboard, newData] })
        console.log(this.state)
    }

    handleInputChange = (event, index, inputPropName) => {
        const { dashboard } = this.state
        let newState = dashboard
        console.log(newState[index][inputPropName], ' newState[index][inputPropName]')
        newState[index][inputPropName] = event.target.value;
        console.log(newState, 'newState')
        this.setState({ dashboard: newState })
    }


    render() {
        const { dashboard } = this.state
        return (
            <div>
                <Links />
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
                                    {typeof dashboard !== 'undefined' && dashboard.length > 0 ? (
                                        dashboard.map((user, index) => {
                                            const { email, name, contact_number, gender, id } = user;
                                            return (
                                                <tr key={`${id}`} >
                                                    <td><input name="name" id={`name${id}`} type="text" value={name} onChange={(e) => { this.handleInputChange(e, index, "name") }} /></td>
                                                    <td><input name="email" id={`email${id}`} type="text" value={email} onChange={(e) => { this.handleInputChange(e, index, "email") }} /></td>
                                                    <td><input name="contact_number" id={`contact_number${id}`} type="text" value={contact_number} onChange={(e) => { this.handleInputChange(e, index, "contact_number") }} /></td>
                                                    <td>
                                                        <select name="gender" id={`gender${id}`} value={gender} onChange={(e) => { this.handleInputChange(e, index, "gender") }} >
                                                            <option value=""></option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        {id === 1 && <button onClick={() => { this.addNewProfile() }} className="btn btn-sm btn-primary "> Add</button>}
                                                        {id !== 1 && <button className="btn btn-sm btn-danger btn-delete-user"> Delete</button>}
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
            </div>
        )
    }
}
