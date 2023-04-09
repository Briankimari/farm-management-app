import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link, useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { TopbarStyle } from '../../../bars/topbar/TopbarStyle';
import { toast } from "react-toastify";
import { registerUser,validateEmail } from "../../../services/authService"
import {SET_LOGIN,SET_NAME} from "../../../pages/redux/features/auth/authSlice"
import Loader from "../../loader/Loader"
import axios from 'axios';




const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email:"",
    password: "",
    password2:""
   
     
}

const Form = () => {


const { palette} = useTheme();
const classes = TopbarStyle();
const dispatch= useDispatch(); 
const navigate= useNavigate();
const isNonMobile = useMediaQuery("(min-width:600px)");

const [isLoading,setIsLoading] = useState(false);
const [formData, setformData]= useState(initialValuesRegister);
const {firstName,lastName,email,password,password2} = formData;



   const handleInputChange =(e) => {
    const {name,value} = e.target;
    setformData({ ...formData, [name]: value});
   } 
   
   const register = async (e) => {
    e.preventDefault();
     try {
        await axios.post('http://localhost:5000/api/users/register',{
            firstName,lastName,email,password
        });
        navigate('/')
     } catch (error) {
        
     }

    if(!firstName || !lastName || !email || !password) {
        return toast.error("All fields are required");

    };
    if (password.length < 6) {
        return toast.error("Password too short,Please input more than 6 characters");
    };
    if (!validateEmail(email)) {
        return toast.error("Please enter a valid email");
    };
    if (password !== password2) {
        return toast.error("Password does not match");
    };
    const userData= {
        firstName,
        lastName,
        email,
        password,
    };
    setIsLoading(true);
        try {
            const data = await registerUser(userData);
            await dispatch(SET_LOGIN(true));
            await dispatch(SET_NAME(data.name));
            navigate("/farm");
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }

  
};
  return (
    <div>
    
       {isLoading && <Loader />}
       <form onSubmit={register}>
        <Box display="grid" gap="30px" gridTemplateColumns="repeat(4,minmax(0,1fr))"
         sx={{"& > div":{gridColumn: isNonMobile ? undefined : 'span 4'}}}>
         <>
          <TextField label="First Name"
               required    
            onChange={handleInputChange}
            name='firstName'
            value={firstName}
                sx={{gridColumn:'span 2'}}
            />

            <TextField label="Last Name"
            required  
            onChange={handleInputChange}
            name='lastName'
            value={lastName}
            sx={{gridColumn:'span 2'}}
            />
            </>

              <TextField label="Email"
              required  
            type="email"
            onChange={handleInputChange}
            name='email'
            value={email}
             sx={{gridColumn:'span 4'}}
            />

             <TextField label="Password"
             required
            type='password'
            onChange={handleInputChange}
            name='password'
            value={password}
            sx={{gridColumn:'span 4'}}
            />

             <TextField label="Confirm Password"
            type='password'
            onChange={handleInputChange}
            name='password2'
            value={password2}
           required
            sx={{gridColumn:'span 4'}}
            />
        
        </Box>
        <Box>
              <Button 
            fullWidth
            type="submit"
            sx={{ m: "2rem 0",p:"1rem", backgroundColor:palette.primary.main,color:palette.background.alt, "&:hover":{color: palette.primary.main}
            }}>
                    REGISTER
            </Button>
                <Link to="/login">
                <Typography 
                    
                      sx={{
                textDecoration:'underline',color:palette.primary.main,
                "&:hover":{
                    cursor: "pointer",
                    color: palette.primary.light,

                }
            }}>
              
                    Already have an account? Login here.
             
           
           
            </Typography>
            </Link>
        </Box>
       
       </form>
       

    </div>
  );
}

export default Form;
