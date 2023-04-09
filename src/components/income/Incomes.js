import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/Global';
import Form from './form/Form';
import axios from 'axios';
import IncomeItem from './incomeItems/IncomeItem';
 
function Incomes() {
   const [incomes, setIncome] = useState([]);
    
   useEffect(()=>{
    getIncome();
   }, []);

   const getIncome= async () => {
    const response= await axios.get('https://farm-management-api.onrender.com/get-incomes');
    setIncome(response.data); 
    console.log(response.data);
   }
   
   const totalIncome =()=> {
        let totalIncome =0;
            incomes.forEach((income)=> {
                totalIncome = totalIncome + income.amount
            })
            return totalIncome;
    }
    console.log('total',totalIncome()   );
  return (
    <IncomeStyled>
   
  
      <div className='income-content'>
      
             <div className='form-container'>
               <h1 className=''>Incomes</h1>
            <Form/>
        </div> 
       
        <div className='incomes'>
          <h2 className='total-income'>Total Income: <span>Kshs,{totalIncome()}</span></h2>
            {incomes.map((income)=> {
                const {_id,type,title,amount,date,category,description} =income;
                    return <IncomeItem  
                        key={_id}
                        id={_id}
                        amount={amount}
                        title={title}
                        description={description}
                        date={date}
                        type={type}
                        category={category}
                        indicatorColor="var(--color-green)"
                    />
            })}
        </div>
       
      </div>

      
    </IncomeStyled>
  )
}
const IncomeStyled= styled.div`
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

export default Incomes
