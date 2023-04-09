import {  Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';

  

const View = ({open,onClose}) => {
  
  const [doctors, setDoctor] = useState([]);
   const posts=useSelector((state)=> state.posts);
     const [openDetails,setOpenDetails]= useState(false)

 useEffect(()=> {
  getdoctors();
 }, []);


  console.log(posts);
 
// get assets
 const getdoctors = async () => {
  const response = await axios.get('http://localhost:5000/doctors');
  setDoctor(response.data);
 };

if(!open) return null
  return (
   
    <article className='panel is-warning'>
    <p className='panel-heading'>Animal Med Details</p>
    <p className='panel-tabs'>
    <div style={{display:'block'}}>
    {doctors.map((doctor,index)=>(
      <div key={doctor._id}>
      
      <label style={{marginLeft:'20%'}} className='label'>Doctor's Name:</label>
      <div className=' contol' style={{marginLeft:'1rem'}}>
      <textarea disabled className='input is-medium is-warning ' style={{color:'rebeccapurple'}}>{doctor.doctor}</textarea>
      
      </div>
       <label style={{marginLeft:'20%'}} className='label'>Description:</label>
      <div className=' contol' style={{marginLeft:'1rem'}}>
      <textarea disabled className='input is-medium is-warning ' style={{color:'rebeccapurple'}}>{doctor.description}</textarea>
       
      </div>
         <label style={{marginLeft:'20%'}} className='label'>Date Due:</label>
      <div className=' contol' style={{marginLeft:'1rem'}}>
      <Typography  disabled className='input is-warning is-medium ' style={{color:'rebeccapurple'}}>{doctor.dueDate}</Typography>
      
      </div>
        <label style={{marginLeft:'20%'}} className='label'>Event:</label>
      <div className=' contol' style={{marginLeft:'1rem'}}>
      <Typography  disabled className='input is-warning is-medium ' style={{color:'rebeccapurple'}}>No Event happened</Typography>
      
      </div>
    
      </div>
    ))}
      </div>
    
    </p>
      <button onClick={onClose} className='button is-link ' style={{width:'60%',marginLeft:'20%'}}>close</button>
    </article>
    
  );
}

export default View;
