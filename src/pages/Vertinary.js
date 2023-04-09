import { Checkbox } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { AiFillBackward, AiFillCloseCircle, AiOutlineCheck, AiOutlineUser } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import './PostLivestock.jsx' 
  
const Vertinary = ({open,onClose}) => {
  
     const [doctor,SetDoctor] = useState('');
     const [dueDate,SetDueDate] = useState('');
     const [description,SetDescription] = useState('');
     const [event,SetEvent] = useState(''); 
     const [question,SetQuestion] = useState(''); 
     const navigate=useNavigate();
     
     const saveDoctor =async (e)=> {
      e.preventDefault();
       try {
          await axios.post('https://farm-management-api.onrender.com/doctors',{
            doctor,dueDate,description,event,question
          });
          navigate('/livestockside')
        } catch (error) {
          console.log(error);
        }
     }
     if(!open) return null
  return (
    
    <div style={{border:'3px solid red',borderRadius:'15px'}} className=' is-family-sans-serif mt-1 is-responsive overlay  overlay '>
    <div className='modalContainer'>
    
    
    
    <Link to='/livestockside'>
    <p onClick={onClose} className=''style={{float:'right',color:'red'}}><AiFillCloseCircle/></p>
    <AiFillBackward size={30} style={{cursor:'alias',color:'orange',textDecoration:'none'}}/>
    </Link>
    <div className='content'>
    <header className='modal-card-head'>
     <h3 className='has-text-primary  text-strong modal-card-title'>
       Vertinary Details
       </h3>
    </header>
     <div className='modal-card-body'>
       <form onSubmit={saveDoctor} >
        <div className='field mt-4'>
         <label className='label'>Doctor's Name</label>
         <div className='control has-icons-left has-icons-right'>
         <input className='input is-success' type='text' placeholder='Dr Brian' value={doctor} required onChange={(e)=> SetDoctor(e.target.value)}/>
         <span className='icon is-small is-left'>
         <i className='fas fa-user'>
         <AiOutlineUser/>
         </i>
         </span>  
          <span className='icon is-small is-right'>
         <i className='fas fa-check'>
         <AiOutlineCheck/>
         </i>
         </span>              
         </div>
         <p className='help is-success'>Please,enter a valid name</p>
       
       </div>

       <div className='field'>
       <label className='label'>Date Due</label>
       <div className='control'>
       <input type='date' className='input is-success' required value={dueDate} onChange={(e)=> SetDueDate(e.target.value)}/>
       </div>
       <p className='help is-success '>Please, Select correct Due date </p>
       </div>

       <div className='field'>
       <label className='label'>Description</label>
       <div className='contorl '>
       <textarea className='textarea is-success  is-loading is-hoverable' required placeholder='e.g immunization, service birth'value={description} onChange={(e)=> SetDescription(e.target.value)} />
       </div>
       <p className='help is-success'>Please,give a short summarized Description</p>
       </div>

       <div className='field'>
       <div className='control'>
       <label className='checkbox'>
       <input type='checkbox' required value={event} onChange={(e)=> SetEvent(e.target.value)} /> 
       Eny event happened
       </label>
       
       </div>
       
       </div>

         <div className='field '>
       <div className='control'>
       <label className='radio'>
       <input type='radio' name='question' value={question} required onChange={(e)=> SetQuestion(e.target.value)}/> 
                Yes
       </label>
        <label className='radio '>
       <input  type='radio' name='question' value={question} required onChange={(e)=> SetQuestion(e.target.value)}/> 
                No
       </label>
       
       </div>
       
       </div>
        <div className='field is-grouped '>
        <div className='control'>
        <button type='submit' className='button is-danger '>Submit</button>
        
        </div>
        
        </div>
        </form>
        </div>
        </div>
        </div>
    </div>
    
  );
}

export default Vertinary;
