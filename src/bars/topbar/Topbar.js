import React,{ useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from "@mui/icons-material/Logout"
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { topbarData } from './topbarData';
import {useNavigate, useLocation} from "react-router";
import { LeftbarData } from '../leftbar/LeftbarData';
import { Avatar,  Button,  Tooltip } from '@mui/material';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import "./index.css";
import {TopbarStyle} from './TopbarStyle';
import { LeftbarStyle } from '../leftbar/LeftbarStyle';
import Profile from './profile/Profile';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Profiles from './profile/Profiles';


const drawerWidth = 240;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function MiniDrawer() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openProfiles, setOpenProfiles] = useState(false);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate=useNavigate();
  const classes = TopbarStyle();
  const styled=LeftbarStyle();
  const location= useLocation();
  const [ profile, setProfiles] =useState([]);
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

// get image
const getImages =async () => {
  const response = await axios.get('https://farm-management-api.onrender.com/uploads');
  setPostImage(response.data);
}

  return (
    <div className='is-family-sans-serif --navbar'>
      <CssBaseline />
      <AppBar sx={{ backgroundColor:'#9bf6ca'
      }} className="--navigation" position="fixed" open={open} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
           <Tooltip title="Menu" ><MenuIcon /></Tooltip> 
            
          </IconButton>
          
      
           
          <div style={{display:"flex",width:"35%",color:'white'}} className='is-family-sans-serif ' >
             {
              topbarData.map(item => (
                <ListItem sx={
                  {
                   cursor:'pointer'
                  } 
                } key={item.id}   className={location.pathname===
                   item.path? classes.Active: classes.notActive} onClick={()=> navigate(item.path)}
               
                 >

                  <ListItemText  ext>{item.title}</ListItemText>
                  

                </ListItem>
              ))
            }
          
        </div>
        
       
          {
            openProfile && (
                  <Profile/>
          
            )
          }
          {
            openProfiles && (
              <Profiles/>
            )
          }
         
          <Toolbar style={{marginLeft:''}} className='--profile'>
          {postImage.map((get)=>(
        
            <span className='--profile'   onClick={()=> setOpenProfile((prev)=> !prev)}  style={{cursor:'pointer'}}>
         <Tooltip title={<span style={{color:'lightblue'}}>Farmer Profiles</span>}>
               
         <Avatar className='--photo' alt="Profile Img" src={get.myImage} />
        </Tooltip>
            {profile.map((user) => (
          <Typography
           sx={{ml:'0.5rem',fontSize:'1.2rem',fontWeight:'bolder'}} 
            className="is-underlined is-family-sans-serif --farm  "variant='h6'>
                   {user.farmName} 
                   <Link to="/homepage" style={{textDecoration:'none',marginLeft:'1rem'}}  >
              <Tooltip title={<span style={{color:'lightblue'}}>Logout</span>} >
          <LogoutIcon color='white' />
           </Tooltip>            
                   </Link>
              </Typography>
          ))}
             
               
          </span>

          ))}
           
          
           
        
          </Toolbar>
        

     <span className='--open '  onClick={()=> setOpenProfiles((prev)=> !prev)}  >
         <Tooltip  title={<span style={{color:'lightblue'}}>User Profile</span>}>
              <Link style={{cursor:'pointer'}} ><ArrowDropDownIcon   /></Link> 
         </Tooltip>

            
            </span>
 
      
        
        </Toolbar>
        
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <br/>
     
        <List className='is-family-sans-serif' >
          {LeftbarData.map((item) => (
            <ListItem   key={item.id} disablePadding onClick={()=>navigate(item.path)} 
              className= {location.pathname === item.path? styled.active: styled.NotActive}       

            sx={{ display: 'block',marginBottom:"20px" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,

                }}
                
              >
              <ListItemText sx={{ opacity: open ? 1 : 0 }}  > {item.title}<Divider/></ListItemText>

                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
   
       
      </Box>
      
    </div>
  );
}
