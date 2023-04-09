import { CardMedia, Divider} from '@mui/material';

import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSelector } from "react-redux";




import axios from 'axios';
import View from './View';
import { Link } from 'react-router-dom';


const Post = ({post,setCurrentId},open) => {
 
  const [ setDoctor] = useState([]);
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
   
    <div>
        <a style={{display:'flex'}}>
    
       <a className='panel-block ' >
       <Link to='/box'>
       <CardMedia  className='image is-64x64 ' image={post.selectedFiles} />

       </Link>
             
      </a>
      
      <Divider/>
      <a >
        
      <label className='label' style={{marginLeft:'1rem',marginTop:'2rem'}} >  {post.creator}</label>
            <label className='label' style={{marginLeft:'1rem',marginTop:'2rem'}} > {post.dueDate}</label>
  
      </a>
       <button onClick={()=>setOpenDetails(true)}
            style={{marginLeft:'2rem',marginTop:'2rem',}} className='button is-danger is-small'>View Details </button>
        <a > 
        
      </a>
      <a >
      </a>
      
     

    </a>
    <div>
      <View  open={openDetails} onClose={()=>setOpenDetails(false)} />
        
    </div>
   <Link to='/livestock' className='button is-primary is-small'
   style={{textDecoration:'none',borderRadius:'5%'}}>Parent's Profile</Link>
      </div>

  );
}

export default Post;
