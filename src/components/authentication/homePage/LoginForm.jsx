import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser,validateEmail } from '../../../services/authService';
import { SET_LOGIN,SET_NAME } from '../../../pages/redux/features/auth/authSlice';
import Loader from '../../loader/Loader';
import {Box,Typography,useTheme,useMediaQuery, TextField,Button} from '@mui/material';
import axios from 'axios';



const initialState = {
  email: "",
  password: "",
};


const LoginForm = () => {
  const theme= useTheme();
  const isNonMobileScreens= useMediaQuery("(min-width: 1000px)");
  const dispatch = useDispatch();
  const { palette} = useTheme();
const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
const login = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/login',{
        email,password
      })
    } catch (error) {
      
    }

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      console.log(data);
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
    <form onSubmit={login}>
       <Box display="grid" gap="30px" gridTemplateColumns="repeat(4,minmax(0,1fr))"
     sx={{"& > div":{gridColumn: isNonMobile ? undefined : 'span 4'}}}>
            
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
            
        </Box>
         <Box>
              <Button 
            fullWidth
            type="submit"
            sx={{ m: "2rem 0",p:"1rem", backgroundColor:palette.primary.main,color:palette.background.alt, "&:hover":{color: palette.primary.main}
            }}>
                    LOGIN
            </Button>
                <Link to="/homepage">
                <Typography 
                    
                      sx={{
                textDecoration:'underline',color:palette.primary.main,
                "&:hover":{
                    cursor: "pointer",
                    color: palette.primary.light,

                }
            }}>
              
                    Don't have an account? Register here.
             
           
           
            </Typography>
            </Link>
        </Box>
        
        
    </form>
   </div>
  );
}

export default LoginForm;
