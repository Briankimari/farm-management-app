import { Button} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { download } from '../utils/Icon';
import './index.css'
import Profit from './profit/Profit';
import Layout from '../layout/Layout';



const ProfitLoss = () => {
    const [expenses,setExpense] = useState([]);
  const [incomes, setIncome] = useState([]);
 const [liabilities, setLiability] = useState([]);
 
   useEffect(()=>{
    getIncome();
    getExpense();
    getLiability();
   }, []);

   
   const getIncome= async () => {
    const response= await axios.get('https://farm-management-api.onrender.com/get-incomes');
    setIncome(response.data); 
    console.log(response.data);
   }

    const getExpense= async () => {
    const response= await axios.get('https://farm-management-api.onrender.com/get-expenses');
    setExpense(response.data); 
    console.log(response.data);
   }

   const getLiability= async () => {
    const response= await axios.get('https://farm-management-api.onrender.com/get-liability');
    setLiability(response.data); 
    console.log(response.data);
   } 

  const totalExpense=()=> {
        let totalExpense =0;
            expenses.forEach((expense)=> {
                totalExpense = totalExpense + expense.amount
            })
            return totalExpense;
    }
    const totalBalance =()=> {
      return totalIncome() - totalExpense()
    }
    const fullBalance =()=>{
      return totalBalance() - totalLiability() 
    }
const totalLiability =()=> {
        let totalLiability =0;
            liabilities.forEach((liability)=> {
                totalLiability = totalLiability + liability.amount
            })
            return totalLiability;
    }
  const loss=()=>{
   return totalExpense() + totalLiability()
  }
   
  
    const totalIncome =()=> {
        let totalIncome =0;
            incomes.forEach((income)=> {
                totalIncome = totalIncome + income.amount
            })
            return totalIncome;
    }

    console.log('total',totalIncome());
  return (
    <Layout>
    
    <section className="row" >
      
     <article className='panel is-warning column' >
      <p className='panel-heading' style={{color:'white'}}>Calculated Farm's Profit </p>
      <p className='panel-tabs'>
     <Link style={{textDecoration:'none'}}>Assets</Link>
     <Link style={{textDecoration:'none'}}>Liabilities</Link>
     <Link style={{textDecoration:'none'}}>Expenses</Link>
      </p>
      <div className='panel-block'>
        <p className='control has-icons-left'>
           <input className='input is-warning' type='text' placeholder='Search Capital ' />
       <span className='icon is-left'> 
        <i className='fas fa-search' aria-hidden="true"> <AiOutlineSearch/> </i>     
        </span>
        </p> 

        </div>
        <div className='panel-block'>
          <p>
                <span style={{display:'flex'}}>
                 Total Incomes
               <p style={{marginLeft:'127px',color:'orange'}}> {totalIncome()}</p>
               
                 </span>


          </p>
         
        </div>
          <div className='panel-block'>
          <p>
                <span style={{display:'flex'}}>
                 Total Liabilies
               <p style={{marginLeft:'130px',color:'green'}}> {totalLiability()}</p>
               
                 </span>


          </p>
        </div>
         <div className='panel-block'>
          <p>
                <span style={{display:'flex'}}>
                 Total Expenses
               <p style={{marginLeft:'110px',color:'red'}}> {totalExpense()}</p>
               
                 </span>


          </p>
        </div>
      
      
     </article>
   

     <div className='column'>
      <article className='panel is-warning'>
      <p className='panel-heading' style={{color:'white'}}>Profit And Loss </p>
      <p className='panel-tabs'>
     <Link style={{textDecoration:'none'}}> Profit and loss</Link>
   
      </p>
      <div className='panel-block'>
        <p className='control has-icons-left'>
           <input className='input is-warning' type='text' placeholder='Search Profits' />
       <span className='icon is-left'> 
        <i className='fas fa-search' aria-hidden="true"> <AiOutlineSearch/> </i>     
        </span>
        </p> 

        </div>
        <div className='panel-block'>
         <p>
                <span style={{display:'flex'}}>
                 Total profit
               <p style={{marginLeft:'165px',color:'orange'}}> +{fullBalance()}</p>
               
                 </span>


          </p>
         
        </div>
          <div className='panel-block'>
          <p>
                <span style={{display:'flex'}}>
                 Total Loss
               <p style={{marginLeft:'170px',color:'red'}}> -{loss()}</p>
               
                 </span>


          </p>
        </div>
         <div className='panel-block'>
          <p style={{marginLeft:'70px',}}>
               <Button style={{
              
               }} className='button is-primary is-hoverble'>{download} &#160; Download Transactions</Button>
               

          </p>
     
        </div>
         
      
      
     </article>
     </div>

     <div className='column'>
      <Profit/>
     </div>
<div className='box colum'>
<h2 className='earning-title '>Min <span>Income</span>Max</h2>
          <div className='salary-item column'>
          <p>
            {Math.min(...incomes.map(item => item.amount))}
          </p>
            <p>
            {Math.max(...incomes.map(item => item.amount))}
          </p>
          </div>
         <h2 className='earning-title'>Min <span>Expenditure</span>Max</h2>

           <div className='salary-item'>
          <p>
            {Math.min(...expenses.map(item => item.amount))}
          </p>
            <p>
            {Math.max(...expenses.map(item => item.amount))}
          </p>
          </div>
           <h2 className='earning-title'>Min <span>Liability</span>Max</h2>

           <div className='salary-item'>
          <p>
            {Math.min(...liabilities.map(item => item.amount))}
          </p>
            <p>
            {Math.max(...liabilities.map(item => item.amount))}
          </p>
          </div>
        </div>

   

    </section>
    </Layout>

  )
}



export default ProfitLoss