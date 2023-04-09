import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
import { Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import useStyles from './CardStyles'
import { useDispatch, useSelector } from 'react-redux';
import  BorderColorIcon  from '@mui/icons-material/BorderColor';
import { deletePost } from '../../actions/siblings';
const Post = ({post,setChildId}) => {
    const [siblings,setSibling]= useState([]);
    const posts=useSelector((state)=> state.posts);
    const classes= useStyles(); 
    const dispatch=useDispatch();

useEffect(()=>{
    getSiblings();
},[]);
console.log(posts);

// get siblings
const getSiblings=async()=> {
    const response=await axios.get('http://localhost:5000/siblings');
    setSibling(response.data);
};

  return (
    <section style={{display:''}}>
      <Card className='--width-100 ' >
      <div >
      {siblings.map((child,index)=>(
        <a className='box'>
        <CardMedia className='image is-128x128' image={child.selectFiles} />
      <CardContent>
        <div className='is-danger --ml' >
       <label className='label' variant='h6' style={{textDecoration:'none'}}>{child.sibling}</label>
        <div >
            <label className='label' variant='h6'>{child.sex}</label> </div>
            <label className='label ' variant='h6'>{child.age}</label>
           
        
       </div>
      </CardContent>

      
        <div className='' >
          <Tooltip title='edit'  >
            <Button style={{textDecoration:'none',marginLeft:'3%'}} className='button is-primary '
             size='large'
              onClick={()=> setChildId(post)}>
              <BorderColorIcon
              fontSize='default' />
              
            </Button>
            </Tooltip>
             <CardActions>
              <Tooltip title='delete'>
            <Button style={{color:''}} className='button is-danger' onClick={()=> dispatch(deletePost)}>
            <DeleteIcon  />
            
            </Button>
            </Tooltip>
            </CardActions>
            </div>
          
            

          
        </a>
      ))}
      </div> 
      
      </Card>
    </section>
  );
}

export default Post;
