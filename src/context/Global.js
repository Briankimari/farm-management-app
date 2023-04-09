import React, { useContext, useEffect, useState } from "react"
import axios from 'axios'


const GlobalContext= React.createContext()

export const GlobalProvider = ({children}) => {
    const [incomes, setIncome] = useState([])
    const [expenses, setExpense] = useState([])
    const [error, setError] = useState(null)

    
   useEffect(()=>{
    getIncome();
    getExpense();
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

 const transactionHistory= ()=>{
      const history=[...incomes, ...expenses] 
      history.sort((a,b)=> {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
      return history.slice(0,3)
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

    const totalIncome =()=> {
        let totalIncome =0;
            incomes.forEach((income)=> {
                totalIncome = totalIncome + income.amount
            })
            return totalIncome;
    }
    
    console.log('total',totalIncome()   );
    return (
        <GlobalContext.Provider value={{
          incomes,totalIncome,totalBalance,transactionHistory
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext =()=>{
    return useContext(GlobalContext)
}
