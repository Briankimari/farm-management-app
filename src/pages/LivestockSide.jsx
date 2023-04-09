import {  Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import Post from './Post';
import axios from 'axios';
import View from './View';
import Vertinary from './Vertinary';




const LivestockSide = ({ setChildId}) => {
 const posts=useSelector((state)=> state.posts);
 const [doctor, setDoctor] = useState([]);
 const [openModal, setOpenModal] =useState(false)
  
 
 useEffect(()=> {
  getdoctors();
 }, []);

 
// get assets
 const getdoctors = async () => {
  const response = await axios.get('http://localhost:5000/doctors');
  setDoctor(response.data);
 };

  console.log(posts);
  return (
    
    <div style={{display:'block'}}>

      <article className='panel is-danger'>
      <p className='panel-heading'>Vertinary Calender</p>
      <p className='panel-tabs'>
      <Link style={{color:'greenyellow',textDecoration:'none'}}> Animals details</Link>
     <Link style={{color:'greenyellow',textDecoration:'none'}}>Doctors Details </Link>
      <Link onClick={()=> setOpenModal(true)} className=''  style={{color:'greenyellow',textDecoration:'none'}}>Doctors Form</Link>
    
      </p>
      <div className='panel-block'>
      <p className='control has-icons-left'>
        <input className='input is-danger' type='text' placeholder='Search Animal' />
        <span className='icon is-left'> 
        <i className='fas fa-search' aria-hidden="true"> <AiOutlineSearch/> </i>     
        </span>
          <div className='' >
          <Vertinary open={openModal} onClose={()=> setOpenModal(false)}/>
      </div>
      </p>
    
      </div>
       
      
  {posts.map((post)=> (
     <Grid container item key={post._id} >
   <Post post={post} setChildId={setChildId}/>
   
   </Grid>
  ))}
 
      </article>
    
    </div>
     
    
  );
}

export default LivestockSide;
