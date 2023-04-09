import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ExpenseForm from './ExpenseForm';
import ExpenseItem from './expenseItem/ExpenseItem';
 
function Expense() {
   const [expenses, setExpense] = useState([]);
    
   useEffect(()=>{
    getExpense();
   }, []);

   const getExpense= async () => {
    const response= await axios.get('http://localhost:5000/get-expenses');
    setExpense(response.data); 
    console.log(response.data);
   }
   
   const totalExpense=()=> {
        let totalExpense =0;
            expenses.forEach((expense)=> {
                totalExpense = totalExpense + expense.amount
            })
            return totalExpense;
    }
    console.log('total',totalExpense()   );
  return (
    <ExpenseStyled>
    
  
      <div className='income-content --flex-dir-column'>
      
             <div className='form-container'>
               <h1 className=''>Farm Expenses</h1>
            <ExpenseForm/>
        </div>
       
        <div className='incomes'>
          <h2 className='total-income'>Total Expenditure: <span>Kshs,{totalExpense()}</span></h2>
            {expenses.map((expense)=> {
                const {_id,title,amount,date,category,type,description} =expense;
                    return <ExpenseItem
                        key={_id}
                        id={_id}
                        amount={amount}
                        title={title}
                        description={description}
                        date={date}
                        type={type}
                        category={category}
                        indicatorColor="green"
                    />
            })}
        </div>
       
      </div>

      
    </ExpenseStyled>
  )
}
const ExpenseStyled= styled.div`
display:flex;
overflow: auto;
.total-income{
  display:flex;
  justify-content: center;
  align-items:center;
  background: #FCF6F9;
  border: 2px solid #FFFFFF;
  box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
  border-radius: 20px;
  padding: 1rem;
  margin: 1rem 0;
  font-size:2rem;
  gap: .5rem;
    span{
      font-size: 2.5rem;
      font-weight: 800;
       color:#42AD00 ;


    }
  

}
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex:1;
      
         
        }
    }
`;

export default Expense
