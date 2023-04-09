import styled from '@emotion/styled'
import React, { useState,useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'
import { Route, useNavigate } from 'react-router-dom'


 
function ExpenseForm() {
     const [expenses, setExpense] = useState([]);
    const navigate =useNavigate();
     const [error, setError] = useState(null)
     const [inputState, setInputState] = useState({
        title:'',amount:'',date:'',category:'',description:'',
     })
     const {title,amount,date,category,description}= inputState;

    useEffect(()=>{
    getExpense();
   }, []);
  
   const getExpense= async () => {
    const response= await axios.get('http://localhost:5000/get-expenses');
    setExpense(response.data); 
    console.log(response.data);
   }
     const addExpense = async (e)  => {
        e.preventDefault()
        
        
        try {
          await axios.post('http://localhost:5000/add-expenses',{
          title,amount,date,category,description
          });
          navigate('/')
         
        } catch (err) {
          setError(err.response.data.message)
        }
     
        clear();
     }
     
     const clear =()=>{
     
      setInputState({ title:'',amount:'',date:'',category:'',description:'',})
     }
      const handleInput=name=>e=>{
      setInputState({...inputState, [name] : e.target.value})
      setError('')
     }

function refreshPage() {
  window.location.reload(false);
}
   
  return (
   
    <ExpenseFormStyled onSubmit={addExpense}>
       {error && <p className='error help'>{error}</p>}
      <div className='input-control'>
        <input type='text'
               value={title}
               name={'title'}
               placeholder='Expenditure Title'
               onChange={handleInput('title')}
        />
      </div>
       <div className='input-control'>
        <input type='text'
               value={amount}
               name={'amount'}
               placeholder={'Expenditure Amount'}
                onChange={handleInput('amount')}
        />
      </div>
      <div className='input-control'>
        <input
        type='date' 
            id='date'
            value={date}
         onChange={handleInput('date')}
         
              
                    />
      </div>
      <div className='selects input-control'>
        <select required value={category} name='category' id='category'   onChange={handleInput('category')}>
        <option value='' disabled>Select Option</option>
         <option value='custom'>Custom Work</option>
           <option value='rent'>Rent</option>
          <option value='property'>Property Taxes</option>
          <option value='crop'>Crop inputs</option>
          <option value='livestock2'>Livestock inputs</option>
          <option value='insurance'>Insurance</option>
           <option value='fuel'>Fuel</option>
            <option value='others'>Others</option>

        </select>
      </div>
      <div className='input-control'>
        <textarea name='description' value={description} placeholder='description'
     onChange={handleInput('description')}
/>
      </div>
      <div className=''> 
        <button  className='button is-link '  style={{borderRadius:'15px'}}  type='submit'>Add Expenditure</button>
      </div>
      

    </ExpenseFormStyled>
  )
}
const ExpenseFormStyled = styled.form`
display:flex;
margin-left:15px;
flex-direction: column;
gap:2rem;
input, textarea,select{
  font-family: inherit;
  outline:none;
  border:none;
  padding:.5rem 1rem;
  border-radius: 5px;
  border:2px solid #fff;
  background:transparent;
  resize:none;
  box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
  color: rgba(34,34,96,0.9);
  &::placeholder{
    color: rgba(34,34,96,0.4);
  }
}
.input-control{
  input{
    width:99%;
  }
}
.selects{
  margin-right: 10px;
 display: flex;
  justify-content: flex-end;
  select{
    color:rgba(34,34,96,0.4);
    &:focus,&:active{
      color:rgba(34,34,96,1);
    }
  }
  
}
.submit-btn{
  
  button{
    box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
    &:hover{
      background: var(--color-green) !important;
    }
  }
}
`;
export default ExpenseForm
