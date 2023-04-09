
import styled from '@emotion/styled'
import React, { useState } from 'react'
import Navigation from './Navigation/navigation';
import { Grid } from '@mui/material';
import DashBoard from './dashboard/DashBoard';
import Incomes from './income/Incomes';
import Expense from './expenses/Expense';
import { useGlobalContext } from '../context/Global';
import Summary from './liability/Liability';
import Layout from '../layout/Layout';
import { toast } from 'react-toastify';



function Farm() {
 const [active,setActive]= useState(1);
 const global = useGlobalContext()
 console.log(global);
const displayData=()=>{
  toast.success("Welcome to Mkulima Farm")
switch(active) {
  case 1:
    return <DashBoard/>
    case 2:
      return <Summary/>
      case 3:
        return <Incomes/>
        case 4:
          return <Expense/>
          default: 
          return <DashBoard/>
}
} 


  
  return (
    <Layout>
    <div style={{flex:1,flexDirection:'row',display:'flex',width:'1350px'}} >
    <div >
      <section >
           
 <Navigation  active={active } setActive={setActive}/>
      </section>
    
     </div>
        <section  >
      
 <NavStyled className='box ' >
   <div className='main-tag' >
  {displayData()}
</div>
 </NavStyled>
      </section>
    </div>
    </Layout>
  )
}

 const NavStyled= styled.div`
 
 

 .main-tag{
 flex:1;
 background:rgba(252,246,249,0.78);
 border:3px solid #ffffff;
 backdrop-filter:blur(4.5px);

 overflow-x:hidden;
 &::-webkit-scrollbar{
   width:0;

 }
 }


 `;

export default Farm

