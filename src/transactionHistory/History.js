import styled from '@emotion/styled';
import React from 'react';
import { useGlobalContext } from '../context/Global';
import Switch from '../components/dashboard/switch/Switch';
import { useState } from 'react';

function History() {
 const {transactionHistory} = useGlobalContext()
 const [...history] = transactionHistory()
   const [error, setError] = useState(null)
 const logState=()=> {
     console.log("Expense is Paid");
  
 } 
  return (
    <HistoryStyled> 
      <div className='box '>
      <h3>Expense Payment</h3>
      <p style={{color:'brown'}} className='help'>if paid, please check on the Switch</p>
        <p className='error'>{logState}</p>
      <Switch  
      label="Paid"
      toggled={true}
      onClick={logState}
      
      />
    </div>
      
      <h2>Recent History </h2>
       {history.map((item)=> {
           const {_id, title, amount, type} = item
        return (
         
            <div key={_id} className='history-item'>
            <p style={{
                color: type === 'expense' ? 'red' : 'green'}}>
                {title}
            </p>


              <p style={{
                color: type === 'expense' ? 'red' : 'green'}}>
                {
                    type === 'expense' ? `-${amount}` : `+${amount}`
                }
            </p>

            
            </div>
        )
       })}
    </HistoryStyled>
  );
}
const HistoryStyled = styled.div`
display: flex;
flex-direction:column;
gap: 1rem;
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow:0px 1px 15px rgba(0,0,0,0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;
export default History;
