import React from 'react'
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import Content from '../components/Contents';
import CheckAdmin from '../components/CheckAdmin';

const ContentPage = () => {
    return (
        <div className="d-flex">
            <CheckAdmin/>  
            <Sidebar />
            <div style={{ width: 100 + "%" }}>
                <NavBar />
                <Content className="p-3" />
            </div>
        </div>)
}

export default ContentPage