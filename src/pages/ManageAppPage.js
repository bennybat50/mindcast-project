import React from 'react'
import CreateUsers from '../components/CreateUsers'
import NavBar from '../components/NavBar'
import Sidebar from "../components/Sidebar";
import ManageApp from '../components/ManageApp';


const ManageAppPage = () => {
    return (
        <div className="d-flex">
    <Sidebar />

    <div style={{ width: 100 + "%" }}>
        <NavBar />
        <ManageApp className="p-3"/>
    </div>
</div>
    )
}

export default ManageAppPage