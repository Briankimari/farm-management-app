import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams,  } from 'react-router-dom';
import { toast } from "react-toastify";
import Loader from './loader/Loader';



const EditAsset = () => {
const [asset, setAsset] = useState( 'Select');
const [name, setName] = useState( '');
const [value, setValue] = useState( '');
const [description, setDescription] = useState( '');
const [date, setDate] = useState( '');
const {id} = useParams();
const navigate= useNavigate();
const [isLoading, setIsLoading] = useState(false);

useEffect(()=> {
    getAssetById();

},[]);

const getAssetById= async () => {
    const response = await axios.get(`http://localhost:5000/assets/${id}`);
    setAsset( response.data.asset);
    setName( response.data.name);
    setValue( response.data.value);
    setDescription( response.data.description);
    setDate( response.data.date);

}; 
const updateAsset = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
        await axios.patch(`http://localhost:5000/assets/${id}`, {
             asset,name,value,description,date
        });
        toast.success("Asset Updated Successfuly")
        navigate('/assets');
        setIsLoading(false)
    } catch (error) {
        console.log(error);
           toast.error(error.message)
    }
}

  return (
   <div className='columns mt-2 box'>
   { isLoading && <Loader/>}
      <div className='column is-fullwidth'>
        <form onSubmit={updateAsset}>
           <div className='field'>
          <label className='label'>Asset</label>
          <div className='control'>
           <div className='select is-fullwidth'>
           <select value={asset} onChange={(e)=> setAsset(e.target.value)}>
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
          <div className='control'>
            <input type='text' className='input' value={name} onChange={(e) => setName(e.target.value)} placeholder='Harvestor'/>
                     
         </div>
         
          </div>

           <div className='field'>
          <label className='label'>Value(Ksh)</label>
          <div className='control'>
            <input type='currency'  className='input ' value={value} onChange={(e) => setValue(e.target.value)} placeholder='Assets Cost eg.1.2 million'/>
                     
         </div>
         
          </div>

           <div className='field'>
          <label className='label'>Asset Description</label>
          <div className='control'>
          <textarea type='text'  className='textarea is-primary ' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='used for harvesting'/>
                     
         </div>
         
          </div>

             <div className='field'>
          <label className='label'>Date Of Purchase</label>
          <div className='control'>
            <input type='date'  className='input ' value={date} onChange={(e) => setDate(e.target.value)} />
                     
         </div>
         
          </div>
        <div className='field'>
        <div className='control'>
          <button type='submit' className='button is-success'>
           Update
          </button>
        </div>
        
        </div>
        
        </form>
      
      </div>
       
    </div>
  );
}

export default EditAsset;
