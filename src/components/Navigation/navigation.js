import React, { useEffect, useState } from 'react'
import brian from '../../images/brian.jpg'
import styled from '@emotion/styled'
import { menuItem } from './menuItems'
import axios from 'axios';

function Navigation({active,setActive}) {
   const [postImage,setPostImage] = useState([]);
    const [ profile, setProfiles] =useState([]);

    useEffect(()=>{
getProfile();
getImages();
    },[])

// get user 
const getProfile= async()=>{
  const response= await axios.get('https://farm-management-api.onrender.com/profile');
  setProfiles(response.data);
  
};

// get image
const getImages =async () => {
  const response = await axios.get('https://farm-management-api.onrender.com/uploads');
  setPostImage(response.data);
}


  return (
    <NavStyled className='box'>
    <div className='user-con'>
    {postImage.map((get)=> (
      <div>
      
         <img src={get.myImage} alt='farmer' />
         {profile.map((user)=> (
          <div>
            <div className='text'>
        <h3 className='is-capital'>{user.firstName} {user.lastName}</h3>
        <p className='label'>Your Earnings</p>

      </div>
          </div>
         ))}
    
      </div>
    ))}
   
 
    </div>
    <div className='menu-items'>
      <ul>
      {menuItem.map(item=>(
        <li key={item.id} onClick={()=>setActive(item.id)}
        className={active === item.id ? 'active': ''}
        >
          {item.icon}
          <span>{item.title}</span>

        </li>
      ))}
      
      </ul>
    </div>
</NavStyled>
  )
}

const NavStyled= styled.nav`
padding:1rem 1rem;
width:300px;
height:105vh;
background: rgba(252, 246,249,0.78);
border: 3px solid #fffff;
backdrop-filter:blur(4.5px);
border-radius: 30px;
display:flex;
flex-direction:column;
justify-content:space-between;
gap:1rem;
margin-right:2rem;


.user-con{
  height:100px;
  display:flex;
  align-items:center;
  gap:1rem;
  img{
    width:80px;
    height:80px;
    border-radius:50%;
    object-fit:cover;
    background:#fcf6f9;
    border: 2px solid #ffffff;
    padding:.2rem;
    box-shadow:0px 1px 17px rgba(0,0,0,0.66);
  }
}
  h3{
    color:rgba(34,34,96,1)
  }
  p{
    color:rgba(34,34,96,.6)
  }
  .menu-items{
    flex: 1;
    display:flex;
    flex-direction:column;
    li{
      display:grid;
      grid-template-columns:40px auto;
      align-items:center;
      font-weight:500;
      cursor:pointer;
      transition:all .4s ease-in-out;
      color:rgba(34,34,96,.6);
      padding-left:1rem;
      position:relative;
      margin:2.5rem 0
    }
  }
  .active{
     color:rgba(34,344,96,1) !important;
     i{
       color:rgba(34,34,96,1) !important;
     }
     &::before{
      
      position:'absolute';
      top:0;
      width:4px;
      left:0;
      background:#222260;
      border-radius:0 10px 10px 0



     }
  }

`;

export default Navigation