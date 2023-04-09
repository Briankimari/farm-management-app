import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import Chart from '../charts/Chart';
import { money } from '../../utils/Icon';
import axios from 'axios';
import History from '../../transactionHistory/History';
import Layout from '../../layout/Layout';

function DashBoard() {
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
            })
            return totalLiability;
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
   
    <DashboardStyled className='row'>
     
    <h1> All Farm Transactions</h1>
    <div className='stats-con column'>
      <div className='chart-con column'>
        <Chart/>
        <div className='amount-con column'>
          <div className='income'>
            Total Income
            <p>
             {money} {totalIncome()}
            
            </p>
          </div>
          <div className='expenses column'>
            Total Expenditure
            <p>
             {money} {totalExpense()}
            
            </p>
          </div>

           <div className='income column'>
            Total Liability
            <p>
             {money} {totalLiability()}
            
            </p>
          </div>

          <div className='balance column'>
          <h2>Tatal Balance</h2>
           <p>
             {money} {fullBalance()}
            
            </p>
          </div>
        </div>
        </div>
        <div className='history-con column'>
          <History/>
                   
        </div>
    </div>
    </DashboardStyled>
  )
}
const DashboardStyled= styled.div`
*{
  box-sizing: border-box;
}
.stats-con {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
    .chart-con{
      grid-column: 1 / 4;
      height: 400px;
        .amount-con{
          display: grid;
          grid-template-columns:repeat(4, 1fr);
          gap: 2rem;
          margin-top: 2rem;
            .income, .expenses{
              grid-column: span 2;
               
                 }
                   .income, .expenses, .balance{
                  background: #FCF6F9;
                  border: 2px solid #FFFFFF;
                  box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
                  border-radius: 20px;
                  padding: 1rem;
                    font-size: 1.5rem;
                  
                   p{
                  
                    font-weight: 100;
                      color: green;
                   }
            }
            .balance{
              grid-column: 1/4;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items:center;
              p{
                color: green;
                opacity: 0.6;
                font-size: .2.5rem;
              }
            }
        }
       

    }
     .history-con{
          grid-column: 4/ 6;
          h2{
            margin: 1rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .earning-title{
            font-size: 1.2rem;
              span{
                font-size: 1.8rem;
              }
          }
          .salary-item{
                 display:flex;
                 background: #FCF6F9;
                  border: 2px solid #FFFFFF;
                  box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
                  border-radius: 20px;
                  padding: 1rem;
                  align-items: center;
                 justify-content: space-between;
                  p{
                    font-weight: 600;
                    font-size: 1.6rem;
                  }
          }
        }
}
`;

export default DashBoard
