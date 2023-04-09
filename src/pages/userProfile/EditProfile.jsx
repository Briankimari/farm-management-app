import React, { useEffect, useState } from "react";
import { useNavigate, useParams,  } from 'react-router-dom';
import Layout from '../../layout/Layout';
import "./Profile.scss";
import { toast } from "react-toastify";
import Loader from '../../components/loader/Loader';
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import axios from "axios";


const EditProfile = () => {
     const navigate = useNavigate();
  const [isLoading] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
   const theme= useTheme();
 const { palette} = useTheme();
  const [firstName, setFirstName] = useState( '');
const [lastName, setLastName] = useState( '');
const [email, setEmail] = useState( '');
const [farmName, setFarmName] = useState( '');
const [bio, setBio] = useState( '');
const [profile, setProfile] = useState( '');
const {id} = useParams();

useEffect(()=> {
    getProfileById();

},[]);

  
const getProfileById= async () => {
    const response = await axios.get(`https://farm-management-api.onrender.com/profile/${id}`);
    setFirstName( response.data.firstName);
    setLastName( response.data.lastName);
    setEmail( response.data.email);
    setProfile( response.data.profile);
    setBio( response.data.bio);
    setFarmName( response.data.farmName);
    

};


const updateProfile = async (e) => {
    e.preventDefault();
    try {
        await axios.patch(`https://farm-management-api.onrender.com/profile/${id}`, {
            firstName,lastName,profile,farmName,bio,email
        });
        navigate('/profile');
    } catch (error) {
       const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
    }
}
 


  return (
    <Layout>
     <div width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%" textAlign='center'>
    <Typography 
    fontWeight="bold"
    fontSize="32px"
    color="primary">
           Edit  Farmer Profile 
    </Typography>
   </div>
   <Box  cardClass={"card --flex-dir-column "}>
     <span className="profile-photo">
          <img src={profile} alt="profilepic" />
        </span>
    
    </Box>
    <div>
     {isLoading && <Loader />}
     <form onSubmit={updateProfile}>
      <Box display="grid" gap="30px" gridTemplateColumns="repeat(4,minmax(0,1fr))"
         sx={{ marginTop:'50px',"& > div":{gridColumn: isNonMobile ? undefined : 'span 4'}}}>
         <>
          <TextField label="First Name"
              type="text"
                name="firstName"
                value={firstName}
                onChange={(e)=> setFirstName(e.target.value)}
            sx={{gridColumn:'span 2'}}
            />

            <TextField label="Last Name"
              type="text"
                name="lastName"
                value={lastName}
                onChange={(e)=> setLastName(e.target.value)}
            sx={{gridColumn:'span 2'}}
            />
         
             <TextField label="Email"
              required  
            type="email"
            onChange={(e)=> setEmail(e.target.value)}
            name='email'
            value={email}
             sx={{gridColumn:'span 4'}}
            />
    
                <TextField label="Farm Name"
              required  
            type="text"
            onChange={(e)=> setFarmName(e.target.value)}
            name='farmName'
            value={farmName}
             sx={{gridColumn:'span 4'}}
            />

             <TextField 
              value={profile}
            type="file"
            onChange={(e)=> setProfile(e.target.value)}
            name='profile'
            sx={{gridColumn:'span 2'}}
            />

              <TextField className="textArea" label="Farm Bio"

            type="text"
            onChange={(e)=> setBio(e.target.value)}
            name='bio'
            value={bio}
             sx={{gridColumn:'span 4'}}
            />
         </>
     </Box>
      <Button 
      disabled
            fullWidth
            type="submit"
            sx={{ m: "2rem 0",p:"1rem", backgroundColor:palette.primary.main,color:palette.background.alt, "&:hover":{color: palette.primary.main}
            }}>
                    Edit rofile
            </Button>
     </form>
    </div>

    
    </Layout>
 
  );
}

export default EditProfile;
