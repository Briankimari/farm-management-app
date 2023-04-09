import styled from '@emotion/styled'
import React, { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Form() {
   
    const navigate =useNavigate();
     const [error, setError] = useState(null)
     const [inputState, setInputState] = useState({
        title:'',amount:'',date:'',category:'',description:'',
     })
     const {title,amount,date,category,description}= inputState;

     const saveIncome = async (e)  => {
        e.preventDefault()
       
        
        try {
          await axios.post('https://farm-management-api.onrender.com/incomes',{
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

   
  return (
   
    <FormStyled onSubmit={saveIncome}>
           {error && <p className='error'>{error}</p>}
      <div className='input-control'>
        <input type='text'
               value={title}
               name={'title'}
               placeholder='Earning Title'
              onChange={handleInput('title')}
              
        />
      </div>
       <div className='input-control'>
        <input type='text'
               value={amount}
               name={'amount'}
               placeholder={'Earning Amount'}
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
        <select required value={category} name='category' id='category'     onChange={handleInput('category')}>
        <option value='' disabled>Select Option</option>
         <option value='earnings'>Earnings</option>
           <option value='assets'>Assets Earn</option>
          <option value='livestock'>Livestock Earn</option>
          <option value='sales'>Sales</option>
          <option value='investments'>Investments</option>
          <option value='other'>Other</option>

        </select>
      </div>
      <div className='input-control'>
        <textarea name='description' value={description} placeholder='description'
   onChange={handleInput('description')}
/>
      </div>
      <div className=''> 
        <button className='button is-link '  style={{borderRadius:'15px'}}  type='submit'>Add Income</button>
      </div>
      

    </FormStyled>
  )
}
const FormStyled = styled.form`
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
export default Form
