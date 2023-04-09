import { makeStyles } from "@mui/styles"
import { deepPurple } from "@mui/material/colors"


export const TopbarStyle= makeStyles(theme=> ({
    topbar:{
        backgroundColor:'#9bf6ca',
          },
  
    Active:{
        borderBottom:'4px solid white',
        background:'#55555555',
        color:"orangered"
              
    },
    notActive:{
       
    },
  
  appBar: {
    display: 'flex',
    
  },
 
  image: {
    marginLeft: '15px',
  },
  toolbars: {
    display: 'flex',
    justifyContent: 'flex-end',
     width:'1100px'
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',

  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
   
 
  
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
 

}))