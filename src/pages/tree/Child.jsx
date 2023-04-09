import React, { useState } from 'react';
import { AiFillFileAdd, AiOutlineFolderView, AiOutlineFundView, AiTwotoneFileImage } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Child = (open,close) => {
  const [openBox,setOpenBox]=useState(false);
  if(!open) return null
  return (
    <div className='container ' style={{marginTop:'10%'}}>
    <div className='--card --center-all --btn:hover'>
    <h4 className='panel-block '>
       View Siblings
    </h4>
    <button  style={{height:'20vh',width:'100%'}}onClick={()=>setOpenBox(true)} className='button is-warning'>
    <Link to='/siblings'>
    <AiTwotoneFileImage
    style={{color:'white',height:'100px'}}  size={95}/>
    </Link>
    
   
    </button>
     <p style={{color:'brown'}} className='help'>click to view animal family tree</p>
      </div>
    </div>
  );
}

export default Child;
