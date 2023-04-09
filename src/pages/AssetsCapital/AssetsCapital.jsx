import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AiFillEye, AiOutlineSearch } from 'react-icons/ai';
import './index.css'
import {  money } from '../../utils/Icon';
import Layout from '../../layout/Layout';


const ProfitLoss = () => {
   const [assets, setAsset] = useState([]);
    const [liabilities, setLiability] = useState([]);


  useEffect(()=> {
  getAssets();
   getLiability();
 }, []);

// get assets
 const getAssets = async () => {
  const response = await axios.get('http://localhost:5000/assets');
  setAsset(response.data);
 };
//  get liability
   const getLiability= async () => {
    const response= await axios.get('http://localhost:5000/get-liability');
    setLiability(response.data); 
    console.log(response.data);
   } 

   
const totalLiability =()=> {
        let totalLiability =0;
            liabilities.forEach((liability)=> {
                totalLiability = totalLiability + liability.amount
            })
            return totalLiability;
    }

 const totalAssetAmount=()=>{
  let totalAssetAmount=0;
    assets.forEach((amount)=>{
      totalAssetAmount= totalAssetAmount + amount.value
    })
    return totalAssetAmount;
 }

  const totalCapital =()=> {
      return totalAssetAmount() - totalLiability()
    }
console.log('totalAsset', totalAssetAmount());

  return (
    <Layout>
    <section className="row" >
      
     <article className='panel is-link column' >
      <p className='panel-heading' style={{color:'white'}}>Farm's Assets</p>
      <p className='panel-tabs'>
       
     <Link to='/assets' style={{textDecoration:'none'}}> <AiFillEye/> </Link>
      <Link to='/assets' style={{textDecoration:'none'}}> View Full Assets List </Link>
  
      </p>
      <div className='panel-block'>
        <p className='control has-icons-left'>
           <input className='input is-warning' type='text' placeholder='Search Posted Asset ' />
       <span className='icon is-left'> 
        <i className='fas fa-search' aria-hidden="true"> <AiOutlineSearch/> </i>     
        </span>
        </p> 

        </div>
        <div className='panel-block'>
          <table className='table  
      is-hoverable text-strong
      is-fullwidth mt-2 '>
       <thead > 
         <tr >
           <th></th>
          
           <th>Assets Posted</th>
           <th >Amount Posted</th>
           
         </tr>
       </thead>

       <tbody className='has-text-weight-semibold is-family-sans-serif'>
         {assets.map((asset,index) => (
           <tr key={asset._id}>
             <td>{index +1}.</td>
               
               <td className='has-text-primary'>{asset.name}</td>
               <td className='has-text-link'>{asset.value}</td>
                
               
           </tr>
         ))}
       </tbody>
     </table>
        
        </div>
       <div>
        <div className='amount-con column'>
         <p> Total Asset </p>  
            <p style={{color:'green'}}>
             {money} {totalAssetAmount()}
            
            </p>
          </div>
          
        </div>
        
     </article>
   

     <div className='column'>
      <article className='panel is-link'>
      <p className='panel-heading' style={{color:'white'}}>Farm's Capital </p>
      <p className='panel-tabs'>
     <Link style={{textDecoration:'none'}}> <AiFillEye/></Link>
      <Link style={{textDecoration:'none'}}>View All related Capital</Link>
   
      </p>
      <div className='panel-block'>
        <p className='control has-icons-left'>
           <input className='input is-warning' type='text' placeholder='Search Capital' />
       <span className='icon is-left'> 
        <i className='fas fa-search' aria-hidden="true"> <AiOutlineSearch/> </i>     
        </span>
        </p> 

        </div>
       <div className='panel-block '>
          <p>
                <span  style={{display:'flex'}}>
                 Actuared Capital
               <p className='is-underlined' style={{marginLeft:'130px',color:'green'}}>Tota Amount</p>
               
                 </span>


          </p>
        </div>
          <div className=' amount-con '>
        <p>Total Capital </p> 
            <p style={{color:'green'}}>
          
             {money} {totalCapital()}
            </p>
              
        </div>
     
     </article>
     </div>

    
<div className='box colum'>
<h2 className='earning-title '>Min <span>Asset</span>Max</h2>
          <div   className='salary-item column'>
          <p style={{color:'orange'}}>
          {Math.min(...assets.map(item => item.value))}
          </p>
            <p style={{color:'red'}}>
              {Math.max(...assets.map(item => item.value))}
          </p>
          </div>
           </div>
    </section>
</Layout>
  )
}



export default ProfitLoss
