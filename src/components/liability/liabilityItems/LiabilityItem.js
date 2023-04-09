import styled from '@emotion/styled'
import React, { useEffect,useState } from 'react'
import { assetIcon, calender, comment, investment, livestockIcon, money, others, trash } from '../../../utils/Icon';
import { Button } from '@mui/material';
import axios from 'axios';
import { dateFormat } from '../../../utils/date';

function LiabilityItem({id,amount,title,date,category,description,deleteItem,indicatorColor,type})
     {
const [liabilities, setLiability] = useState([]);
        const categoryIcon =() =>{
            switch(category) {
                case 'earnings' :
                    return money;
                case 'assets' :
                    return assetIcon;
                case 'livestock' :
                    return livestockIcon;
                case 'sales' :
                    return money;
                case 'investments':
                    return investment;
                case 'other' :
                    return others;
                default:
                    return ''
            }
        }
        
         
        const expenseCategoryIcon=()=>{
             switch(category) {
                case 'earnings' :
                    return money;
                case 'assets' :
                    return assetIcon;
                case 'livestock' :
                    return livestockIcon;
                case 'sales' :
                    return money;
                case 'investments':
                    return investment;
                case 'other' :
                    return others;
                default:
                    return ''
            }
        }
      
   useEffect(()=>{
    getLiability();
   }, []);
 const getLiability= async () => {
    const response= await axios.get('http://localhost:5000/get-liability');
    setLiability(response.data); 
    console.log(response.data);
   }
        // delete income
        const deleteLiability= async (id)=> {
            try {
                await axios.delete(`http://localhost:5000/delete-liability/${id}`);
                getLiability();
            } catch (error) {
                 console.log(error);
            }
        }
        
   
  return (
    <LiabilityStyled indicator={indicatorColor}>
      <div className='icon'>
            {type === 'liability' ? expenseCategoryIcon() : categoryIcon()}
      </div>
      <div className='content'>
        <h5>{title}</h5> 
        <div className='inner-content'>
            <div className='text'>
                <p>{money} {amount}</p>
                  <p>{calender}  {dateFormat(date)}</p>
                  <p>
                    {comment}
                    {description}
                    
                  </p>
            </div>
            <div className='btn-con'>
                <Button 
                  onClick={()=> deleteLiability(id)}
                    style={{color:'red',}}
                > {trash}</Button>
            </div>

        </div>
      </div>
    </LiabilityStyled>
  )
}
const LiabilityStyled = styled.div`
 background: #FCF6F9;
 border: 2px solid #FFFFFF;
 box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
 border-radius: 1rem;
 padding: 2px;
 margin-top: 1rem;
 display:flex;
 align-items: center;
 gap: 1rem;
 width: 100%;
 color: #222260;
    .icon{
        width:80px;
        height:80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
            i{
                font-size: 2.6rem;
            }
    }
    .content{
        flex:1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
            h5{
                font-size: 1rem;
                padding-left: 2rem;
                position: relative;
                  &::before{
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: .8rem;
                    height: .8rem;
                    border-radius: 50%;
                    background:#6FA;
                  }
            }
            .inner-content{
                display:flex;
                justify-content: space-between;
                align-items: center;
                 .text{
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                        p{
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            color:purple ;
                            opacity: 0.8;
                        }

                }
            }
    }
`;
export default LiabilityItem
