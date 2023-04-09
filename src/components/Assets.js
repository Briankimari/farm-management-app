import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import AddAsset from './AddAsset';
import { dateFormat } from '../utils/date';
import Layout from '../layout/Layout';
import { toast } from 'react-toastify';
import Loader from './loader/Loader';


const Assets = () => {
 const [assets, setAsset] = useState([]);
 const [isLoading, setIsLoading]= useState();

 useEffect(()=> {
  getAssets();
 }, []);
// get assets
 const getAssets = async () => {
  const response = await axios.get('https://farm-management-api.onrender.com/assets');
  setAsset(response.data);
 };

// delete assets
const deleteAsset = async (id) => {
  setIsLoading(true)
  try {
    await axios.delete(`https://farm-management-api.onrender.com/assets/${id}`);
    getAssets();
    toast.success("Asset deleted successfuly")
    setIsLoading(false)
  } catch (error) {
    console.log(error);
    setIsLoading(false)
    toast.error("error while deleting..!!,try deleting again")
  }
};

  return (
    <Layout>
    <div className='columns mt-5 is-max-desktop box  is-widescreen ' >
   {isLoading && <Loader/>}
    <div className='column is-fullwidth px-2 '>
      <Link to='/add'  className='button is-success' style={{textDecoration:'none'}}>
        Add Asset
      </Link>
   
      <table className='table  is-striped contained
       is-hoverable text-strong
       is-fullwidth mt-2 '>
        <thead > 
          <tr >
            <th  className='has-text-danger-dark'>No</th>
            <th  className='has-text-danger-dark'>Asset</th>
            <th  className='has-text-danger-dark'>Name</th>
            <th  className='has-text-danger-dark'>Value</th>
            <th  className='has-text-danger-dark'>Description</th>
            <th  className='has-text-danger-dark'>Date</th>
            <th  className='has-text-success'>Action</th>
          </tr>
        </thead>

        <tbody className='has-text-weight-semibold is-family-sans-serif'>
          {assets.map((asset,index) => (
            <tr key={asset._id}>
              <td>{index +1}</td>
               <td  className='has-text-info'>{asset.asset}</td>
                <td className='has-text-primary'>{asset.name}</td>
                <td className='has-text-danger'>{asset.value}</td>
                <td className='has-text-warning 
                bulma-ltr-position-mixin-parent
                '>{asset.description}</td>
                <td className='has-text-success-dark'>{dateFormat(asset.date)}</td>
                <Link to={`/edit/${asset._id}`} style={{textDecoration:'none'}} className='button is-info is-small mr-1'>
                Edit
                </Link>
                <button className='button is-danger is-small'  onClick={()=> deleteAsset(asset._id)}>
                Delete
                </button>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
        
    </div>
    </Layout>
  );
}

export default Assets;
