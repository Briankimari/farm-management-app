import React, {  useState } from "react";

import { useNavigate,   } from 'react-router-dom';
import Layout from '../../layout/Layout';
import "./Profile.scss";

import Loader from '../../components/loader/Loader';
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import axios from "axios";
import { toast } from "react-toastify";





const AddProfile = () => {
const navigate = useNavigate();
const [isLoading, setIsLoading] = useState(false);
const isNonMobile = useMediaQuery("(min-width:600px)");
const theme= useTheme();
const { palette} = useTheme();
const [firstName, setFirstName] = useState( '');
const [lastName, setLastName] = useState( '');
const [email, setEmail] = useState( '');
const [farmName, setFarmName] = useState( '');
const [bio, setBio] = useState( '');
const [profileImg,setProfile] = useState({ myImage:''});



const  createPost = async (newImage) =>{
  setIsLoading(true)
  try {
     await axios.post('https://farm-management-api.onrender.com/uploads',newImage)
     toast.success("Image Uplaoded")
  } catch (error) {
      console.log(error);
       toast.error(error.message)
  }
}

const saveProfile= async (e) => {
    e.preventDefault();
    setIsLoading(true)
    createPost(profileImg)
    console.log("uploaded");
    try {
     
           await axios.post('https://farm-management-api.onrender.com/profile',{
            firstName,lastName,email,bio,farmName,profileImg
        });
        
        toast.success("User Added Successfuly")
        navigate('/profile')
        setIsLoading(false)
       
    } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.error(error.message)
    }

}
const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file)
    setProfile({...profileImg, myImage:base64})
}




 

 
  return (
    <Layout>
     <div width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%" textAlign='center'>
    <Typography 
    fontWeight="bold"
    fontSize="32px"
    color="primary">
           Add  Farmer Profile 
    </Typography>
   </div>
   <Box  cardClass={"card --flex-dir-column "}>
     <span className="profile-photo">
          <img src={profileImg.myImage} alt="profilepic" />
        </span>
    
    </Box>
    <div  >
     {isLoading && <Loader />}
     <form onSubmit={saveProfile}>
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

             <input
             label="image"
            name="myImage"
            id='file-upload'
            accept=".jpeg,.png,.jpg"
           type="file"
          onChange={(e) => handleFileUpload(e)}
          
            sx={{gridColumn:'span 4'}}
            />
                
              <textarea className="textarea is-medium is-loading 
              is-hovered is-primary" placeholder="Farm Description"

            type="text"
            onChange={(e)=> setBio(e.target.value)}
            name='bio'
            value={bio}
             sx={{gridColumn:'span 4'}}
            />
         </>
     </Box>
     <div>
        
     </div>
      <Button 
            fullWidth
            type="submit"
            sx={{ m: "2rem 0",p:"1rem", backgroundColor:palette.primary.main,color:palette.background.alt, "&:hover":{color: palette.primary.main}
            }}>
                    ADD Profiles
            </Button>
           
     </form>
    </div>

    
    </Layout>
 
  );
}

export default AddProfile;



function convertToBase64(file){
  return new Promise((resolve,reject) => {
      const fileReader= new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload=()=> {
        resolve(fileReader.result)
      };
      fileReader.onerror =(error) => {
        reject(error)
      }
  })
}
