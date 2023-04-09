import React, { useState } from 'react';
import { AiFillFileAdd, AiOutlineFolderView } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Structure from './tree/Structure';
import View from './View';

const Box = (open,close) => {
  const [openBox,setOpenBox]=useState(false);
  if(!open) return null
  return (
    <div className='container '>
    <div className='--card --center-all --btn:hover'>
    <h4 className='panel-block '>
  Animal Family tree
    </h4>
    <button  style={{height:'20vh',width:'100%'}}onClick={()=>setOpenBox(true)} className='button is-danger'>
    <Link to='/structure'>
    <AiOutlineFolderView 
    style={{color:'white',height:'100px'}}  size={95}/>
    </Link>
    
   
    </button>
     <p style={{color:'brown'}} className='help'>click to view animal family tree</p>
      </div>
    </div>
  );
}

export default Box;
