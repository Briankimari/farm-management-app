import React, { useEffect, useState } from 'react';
import Layout from '../../layout/Layout';
import {SpinnerImg } from "../../components/loader/Loader";
import "./Profile.scss";
import DeleteForevorIcon from "@mui/icons-material/DeleteForever"
import { Link } from 'react-router-dom';
import { Box, Button, Tooltip,  Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import axios from 'axios';
import { toast } from "react-toastify";




const Profile = () => {
     const [ profile, setProfiles] =useState([]);
     const [isLoading,setIsLoading]= useState();
     const theme= useTheme();
     const { palette} = useTheme();
     const isNonMobile = useMediaQuery("(min-width:600px)");
     const [postImage,setPostImage] = useState([]);

    useEffect(()=> { 
      getImages();
        getProfile();
    },[]);

// get user 
const getProfile= async()=>{
  const response= await axios.get('https://farm-management-api.onrender.com/profile');
  setProfiles(response.data);
  
};


// delete assets
const deleteProfile = async (id) => {
  setIsLoading(true)
  try {
    await axios.delete(`https://farm-management-api.onrender.com/profile/${id}`);
    toast.success("Account Deleted Successfuly")
    getProfile();
  } catch (error) {
    console.log(error);
    setIsLoading(false)
    toast.error("error while deleting..!!,try deleting again")
  }
};

// get image
const getImages =async () => {
  const response = await axios.get('https://farm-management-api.onrender.com/uploads');
  setPostImage(response.data);
}
// remove profile image
const removeProfile = async (id)=> {
  
  try {
    await axios.delete(`https://farm-management-api.onrender.com/uploads-delete/${id}`);
    toast.success("Photo removed successfuly")
    getProfile()
  } catch (error) {
    console.log(error);
    
    toast.error("error while deleting..!!,try deleting again")
  }
}



  return (
    <Layout>
    <div className='profile --my2'>

      {isLoading && <SpinnerImg/>}
      <Link to="/add-profile">
      <Button className='button is-link'>Add Profile</Button>
      </Link>
       <div width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%" textAlign='center'>
    <Typography 
    fontWeight="bold"
    fontSize="32px"
    color="primary"> 
            Farmer Profile 
    </Typography>
   </div>
      <>
        {!isLoading && profile === null ? (
            <p>Something went wrong,Please reload the page...</p>
        ):( 
            <div className='column'>    
    
<Box display="flex" gap="30px" gridTemplateColumns="repeat(4,minmax(0,1fr))"
sx={{"& > div":{gridColumn: isNonMobile ? undefined : 'span 6'}}}>

{profile.map((user) => ( 
<span className='profile-photo'>
<article className='panel is-danger column'>
  <p className='panel-heading'>{user.firstName} {user.lastName}</p>
    <p className='panel-tabs'>
  <Link>
  Farmer Profile Details
  </Link>  
   </p>
  <div className='panel-block'>
  {postImage.map((get)=>(
<figure style={{}} className='image is-256x256'>
   <img className='is-rounded is-large'  width="640" height="360" src={get.myImage} alt=' User Profile' allowFullScreen/>
  <Button className='button is small is-danger' onClick={()=> removeProfile(get._id)}>
<Tooltip title={<span style={{color:'lightblue'}}>Delete Profile Image</span>}>
 <DeleteForevorIcon /> 
</Tooltip> 
  </Button>
  
   </figure>
  ))}
   
  </div>
   
  <div className='panel-block'>
    <ul>
    <li>
    <p >Farmer Email:
    <span className='is-underlined' style={{marginLeft:"60px"}}>{user.email} </span>
    
    </p>
    
    </li>
    </ul>
  </div>


    <div className='panel-block'>
    <ul>
    <li>
    <p >Farm Name:
    <span className='is-underlined' style={{marginLeft:"80px"}}>
    {user.farmName} 
    </span>
    
    </p>
    
    </li>
    </ul>
  </div>

   <div className='panel-block'>
    <ul>
    <li>
    <p >Farm Bio:
    <span className='is-underlined' style={{marginLeft:"100px"}}>{user.bio} </span>
    
    </p>
    
    </li>
    </ul>
  </div>
    
  
</article>
  <div>
    <Link style={{textDecoration:'none'}} >
    <Button disabled
fullWidth
type="submit"
sx={{ m: "0.5rem 0",p:"0.5rem", backgroundColor:palette.primary.main,color:palette.background.alt,
"&:hover":{color: palette.primary.main}
}}>
      EDIT
</Button>
  </Link>
  </div>
    <Button className=' is-danger 'fullWidth
    onClick={()=> deleteProfile(user._id)}
  type="submit"
sx={{ m: "0.5rem 0",p:"0.5rem", backgroundColor:"red",
"&:hover":{color: palette.primary.main}
}}    >
      Delete
</Button>
  
  </span>


))}
  
</Box>
</div>

)}
</>
</div>

</Layout>
);
}

export default Profile;

