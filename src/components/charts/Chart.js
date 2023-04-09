import React, { useEffect, useState } from 'react';
import {Chart as ChartJs,
     CategoryScale,
     LinearScale,
     PointElement,
     Title,
     Tooltip,
     Legend,
     ArcElement,
     LineElement,
   
    }  from 'chart.js'
import {Line} from 'react-chartjs-2';
import styled from '@emotion/styled';
import { dateFormat } from '../../utils/date';
import axios from 'axios';

ChartJs.register(
    CategoryScale,
     LinearScale,
     PointElement,
     Title,
     Tooltip,
     Legend,
     ArcElement,
     LineElement,
)

function Chart() {
const [expenses,setExpense] = useState([]);
const [incomes,setIncome] = useState([]);
const [liabilities, setLiability] = useState([]);
const [assets, setAsset] = useState([]);
const [capital, setCapital] = useState([])

 useEffect(()=>{
    getExpense();
    getIncome();
    getLiability();
    getAssets();
   }, []);

    
   const getExpense= async () => {
    const response= await axios.get('https://farm-management-api.onrender.com/get-expenses');
    setExpense(response.data); 
    console.log(response.data);
   }

   
   const getIncome= async () => {
    const response= await axios.get('https://farm-management-api.onrender.com/get-incomes');
    setIncome(response.data); 
    console.log(response.data);
   }

   
   const getLiability= async () => {
    const response= await axios.get('https://farm-management-api.onrender.com/get-liability');
    setLiability(response.data); 
    console.log(response.data);
   } 
   
// get assets
 const getAssets = async () => {
  const response = await axios.get('https://farm-management-api.onrender.com/assets');
  setAsset(response.data);
 };
 
 const totalAssetAmount=()=>{
  let totalAssetAmount=0;
    assets.forEach((amount)=>{
      totalAssetAmount= totalAssetAmount + amount.value
    })
    return totalAssetAmount;
 }

  
const totalLiability =()=> {
        let totalLiability =0;
            liabilities.forEach((liability)=> {
                totalLiability = totalLiability + liability.amount
            })
            return totalLiability;
    }
 
  const totalCapital =()=> {
      return totalAssetAmount() - totalLiability()
    }

    const data ={
        labels: incomes.map((inc)=> {
            const {date}=inc
            return dateFormat(date)
        }),

        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.map((income)=>{
                        const {amount} = income
                            return amount
                    })
                ],
                backgroundColor: 'green',
              tension:0.5
            },
             {
                label: 'Expenditure',
                data: [
                    ...expenses.map((expense)=>{
                        const {amount} = expense
                            return amount
                    })
                ],
                backgroundColor: 'red',
              
                
            },

            {
                label: 'Liability',
                data: [
                    ...liabilities.map((liability)=>{
                        const {amount} = liability
                            return amount
                    })
                ],
                backgroundColor: 'yellow',
              
                
            },
             {
                label: 'Assets',
                data: [
                    ...assets.map((asset)=>{
                        const {value} = asset
                            return value
                    })
                ],
                backgroundColor: 'orange',
              
                
            },
             {
                label: 'Capital',
                data: [
                    ...capital.map((asset)=>{
                        const {totalCapital} = asset
                            return totalCapital
                    })
                ],
                backgroundColor: 'blue',
              
                
            },
            
            
        ]
    }



  return (
    <ChartStyled  className=''>
    <Line data={data}/>
    </ChartStyled>
  );
}
const ChartStyled = styled.div`
background: #FCF6F9;
border: 2px solid #FFFFFF;
box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
padding:1rem;
border-radius: 20px;
height: 100%;

@media screen and (max-width: 768px) {
   .--flex-dir {
    flex-direction: column;
     display: block
  }
}
`;
export default Chart;
