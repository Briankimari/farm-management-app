import React, { useState } from 'react';
import './index.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Profile = () => {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const dispatch= useDispatch();
  const navigate=useNavigate()
  const logout=()=>{
    dispatch({type:'LOGOUT'})
    navigate('/homepage')
    setUser(null);

  }
  return (
    <div className='flex flex-col dropDownProfile'>
      <ul className='flex-col gap-4  '>
   <Link to="/profile"  style={{textDecoration:'none'}} > <li style={{marginBottom:'20px',textDecoration:''}} className='box button is-primary'>User Profile</li></Link>    
    <Link style={{textDecoration:'none'}}> <li style={{marginBottom:'20px'}} className='box is-link button'>Settings</li></Link>   
   <NavLink to="/homepage" onClick={logout} style={{textDecoration:'none'}}><li className='box button is-danger'>LogOut</li></NavLink>     
      </ul>
    </div>
  );
}

export default Profile;
