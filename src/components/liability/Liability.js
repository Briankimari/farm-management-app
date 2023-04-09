import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/Global';
import Form from './form/Form';
import axios from 'axios';
import LiabilityItem from './liabilityItems/LiabilityItem';
 
function Liability() {
   const [liabilities, setLiability] = useState([]);
    
   useEffect(()=>{ 
    getLiability();
   }, []);

   const getLiability= async () => {
    const response= await axios.get ('http://localhost:5000/get-liability');
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
    console.log('total',totalLiability()   );
  return (
    <LiabilityStyled>
   
  
      <div className='income-content'>
      
             <div className='form-container'>
               <h1 className=''>Farm Liability</h1>
            <Form/>
        </div> 
       
        <div className='incomes'>
          <h2 className='total-income'>Total Liability: <span>Kshs,{totalLiability()}</span></h2>
            {liabilities.map((income)=> {
                const {_id,type,title,amount,date,category,description} =income;
                    return <LiabilityItem  
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

      
    </LiabilityStyled>
  )
}
const LiabilityStyled= styled.div`
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

export default Liability
