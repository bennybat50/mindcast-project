import React from 'react'
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import ManageInterest from '../components/ManageInterest';
import CheckAdmin from '../components/CheckAdmin';

const InterestPage = () => {
  return (
    <div className="d-flex">
      <CheckAdmin/>  
    <Sidebar />

    <div style={{ width: 100 + "%" }}>
        <NavBar />
        <ManageInterest className="p-3"/>
    </div>
</div>
  )
}

export default InterestPage