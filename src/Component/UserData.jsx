import React from 'react'
import { CgProfile } from "react-icons/cg";
import "bootstrap/dist/css/bootstrap.min.css";
const UserData = () => {
  return (
    
    <div className='sidebar-container p-5  text-center w-50' style={{ color: 'white', backgroundColor: '041C32' }}>

        <div className='Sidebar-header'>
          <h1><i><CgProfile /></i></h1>
        </div>
        <div className='sidebar-nav'>
          <div><a>Name</a></div>
          <div><a>Email</a></div>
          
        </div>
        
      </div>
  )
}

export default UserData; 
