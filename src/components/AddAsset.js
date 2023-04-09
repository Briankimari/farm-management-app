import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Loader from './loader/Loader';
import {Box,Typography,useTheme,useMediaQuery} from '@mui/material';

const AddAsset = () => {
  const [asset, setAsset] = useState( 'select');
   const [name, setName] = useState( '');
    const [value, setValue] = useState( '');
     const [description, setDescription] = useState( '');
      const [date, setDate] = useState( '');
       const [isLoading, setIsLoading] = useState(false);
        const navigate= useNavigate();
         const theme= useTheme();
         const isNonMobileScreens= useMediaQuery("(min-width: 1000px)");
 
      const saveAsset = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
          await axios.post('https://farm-management-api.onrender.com/assets',{
            asset,name,value,description,date
          });
          toast.success("Asset added successfuly")
          navigate('/assets')
          setIsLoading(false)
        } catch (error) {
          console.log(error);
       toast.error(error.message)
        }
      } 
  return (
    <div className='columns mt-2 '>
    {isLoading && <Loader/>}
      <div className='column is-fullwidth'> 
     <Box width="100%"
     sx={{backgroundColor:'grey'}} backgroundColor={theme.palette.background.alt} p="1rem 6%" textAlign='center'>
       <Typography 
    fontWeight="bold"
    fontSize="32px"
    color="primary">
      Add Farm Asset
    </Typography>
      </Box>
        <form onSubmit={saveAsset}>
        
          <div className='field'>
          <label className='label'>Asset</label>
          <div className='control'>
           <div className='select is-fullwidth is-primary'>
           <select  value={asset} onChange={(e)=> setAsset(e.target.value)}>
           <option disabled value='Select'>Select</option>
            <option value='Tractor'>Tractor</option>
            <option value='machine'>Machine</option>
            <option value='weigher'>Weigher</option>
            <option value='cash'>Farm-Cash</option>
            <option value='feed'>Feeds inventory</option>
            <option value='land'>Farmland</option>
            <option value='prepaid-expenses'>Prepaid Expenses</option>
             <option value='equipments'>Equipments</option>
            <option value='buildings'>Buildings</option>   
           <option value='market'>Market Livestock</option>  
              <option value='others'>Others</option> 
           </select>
           
           </div>
         </div>
         
          </div>

           <div className='field'>
          <label className='label'>Asset Name</label>
          <div className='control '>
            <input type='text' className='input is-primary ' value={name} onChange={(e) => setName(e.target.value)} placeholder='Harvestor'/>
                     
         </div>
         
          </div>

           <div className='field'>
          <label className='label '>Value(Ksh)</label>
          <div className='control'>
            <input type='currency'  className='input is-primary' value={value} onChange={(e) => setValue(e.target.value)} placeholder='Assets Cost eg.1.2 million'/>
                     
         </div>
         
          </div>

           <div className='field'>
          <label className='label'>Asset Description</label>
          <div className='control is-loading is-hoverable'>
            <textarea type='text'  className='textarea is-primary  ' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='used for harvesting'/>
                     
         </div>
         
          </div>

             <div className='field'>
          <label className='label'>Date Of Purchase</label>
          <div className='control'>
            <input type='date'  className='input is-primary' value={date} onChange={(e) => setDate(e.target.value)} />
                     
         </div>
         
          </div>
        <div className='field'>
        <div className='control'>
          <button type='submit' className='button is-danger'>
           Save
          </button>
        </div>
        
        </div>
        
        </form>
      
      </div>
       
    </div>
  );
}

export default AddAsset;
