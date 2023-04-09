import React, { useEffect, useState } from 'react';
import './index.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Avatar, Tooltip, Typography } from '@mui/material';

const Profile = () => {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
 const [ profile, setProfiles] =useState([]);
  const [postImage,setPostImage] = useState([]);
  const dispatch= useDispatch();
  const navigate=useNavigate();


  
    useEffect(()=> { 
      getImages();
        getProfile();
    },[]);
// get user 
const getProfile= async()=>{
  const response= await axios.get('https://farm-management-api.onrender.com:5000/profile');
  setProfiles(response.data);
  
};

// get image
const getImages =async () => {
  const response = await axios.get('https://farm-management-api.onrender.com/uploads');
  setPostImage(response.data);
}

 
  return (
    <div className='flex flex-col dropDownProfile'>
      <ul className='flex-col gap-4  '>
   <Link to="/profile"  style={{textDecoration:'none'}} >

    <div style={{marginBottom:'20px',marginLeft:'70px'}} className='image is-64x64 '>
      {postImage.map((get)=> (
        <span style={{cursor:'pointer'}}>
         <Avatar className='' alt="Profile Img" src={get.myImage} />
        </span>
  ))}
   </div>
   
   </Link>   

    <Link style={{textDecoration:'none'}}> 
   <div style={{marginBottom:'20px',textDecoration:''}} className='--ml '>
        {profile.map((user) => (
          <Typography
           sx={{ml:'0.5rem',fontSize:'1.8rem',fontWeight:'bolder'}} 
            className="is-underlined is-family-sans-serif --farm  "variant='h6'>
                   {user.farmName} 
                        
                   
              </Typography>
          ))}

   </div>
    </Link>   
   <NavLink to="/homepage" style={{textDecoration:'none'}}><li className='box button is-danger'>LogOut</li></NavLink>     
      </ul>
    </div>
  );
}

export default Profile;
