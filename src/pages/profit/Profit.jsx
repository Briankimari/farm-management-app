import React, { useEffect, useState } from 'react';
import { download } from '../../utils/Icon';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';

const Profit = () => {
   const [expenses,setExpense] = useState([]);
  const [incomes, setIncome] = useState([]);
 const [liabilities, setLiability] = useState([]);
 
   useEffect(()=>{
    getIncome();
    getExpense();
    getLiability();
   }, []);

   
   const getIncome= async () => {
    const response= await axios.get('http://localhost:5000/get-incomes');
    setIncome(response.data); 
    console.log(response.data);
   }

    const getExpense= async () => {
    const response= await axios.get('http://localhost:5000/get-expenses');
    setExpense(response.data); 
    console.log(response.data);
   }

   const getLiability= async () => {
    const response= await axios.get('http://localhost:5000/get-liability');
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
            });
            return totalLiability;
    }
  const totalLoss=()=>{
   return totalExpense() + totalLiability()
  }

      const totalIncome =()=> {
        let totalIncome =0;
            incomes.forEach((income)=> {
                totalIncome = totalIncome + income.amount
            });
            return totalIncome;
    }
 let PercentageProfit=fullBalance() *100;
     PercentageProfit /= totalIncome() ;
  
  let PercentageLoss= totalLoss() *100 
      PercentageLoss /= totalIncome()

   


    console.log('total',totalIncome());
    
  return (
    <div>
       <article className='panel is-warning'>
      <p className='panel-heading' style={{color:'white'}}>Percentage Profit and Loss </p>
      <p className='panel-tabs'>
     <Link style={{textDecoration:'none'}}>Percentages</Link>
    
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
                 Percentage profit 
               <p style={{marginLeft:'90px',color:'orange'}}>
                {Math.trunc(PercentageProfit)}
                 %
               </p>
             
                 </span>


          </p>
         
        </div>
          <div className='panel-block'>
          <p>
                <span style={{display:'flex'}}>
                 Percentage Loss
               <p style={{marginLeft:'90px',color:'red'}}>
                {Math.trunc(PercentageLoss)}
                 %
               </p>
              
                 </span>


          </p>
         
        </div>
        <div className='panel-block'>
          <p style={{marginLeft:'50px',}}>
               <Button style={{
              
               }} className='button is-link'>{download}&#160; Download Summary</Button>
               

          </p>
     
        </div>
      
      
     </article>
    </div>
  );
}

export default Profit;
