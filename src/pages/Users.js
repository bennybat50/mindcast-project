import React from 'react'
import CreateUsers from '../components/CreateUsers'
import NavBar from '../components/NavBar'
import Sidebar from "../components/Sidebar";
import CheckAdmin from '../components/CheckAdmin';


const Users = () => {
    return (
        <div className="d-flex">
            <CheckAdmin />
            <Sidebar />

            <div style={{ width: 100 + "%" }}>
                <NavBar />
                <CreateUsers className="p-3" />
            </div>
        </div>
    )
}

export default Users