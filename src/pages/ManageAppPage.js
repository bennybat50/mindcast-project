import React from 'react'
import CreateUsers from '../components/CreateUsers'
import NavBar from '../components/NavBar'
import Sidebar from "../components/Sidebar";
import ManageApp from '../components/ManageApp';
import CheckAdmin from '../components/CheckAdmin';


const ManageAppPage = () => {
    return (
        <div className="d-flex">
            <CheckAdmin/>  
            <Sidebar />

            <div style={{ width: 100 + "%" }}>
                <NavBar />
                <ManageApp className="p-3" />
            </div>
        </div>
    )
}

export default ManageAppPage