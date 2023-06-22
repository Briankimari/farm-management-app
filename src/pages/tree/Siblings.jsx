import React from 'react';
import {Container,Typography,Grow,Grid} from "@mui/material";
import useStyles from '../../Styles'
import { Link} from 'react-router-dom'
import Form from './Form';
import Posts from './Posts';
import HomeIcon from '@mui/icons-material/Home';

 

const Siblings = () => {
   const classes= useStyles();
  return (
    <div className='header-sibling'>
    <div className=' h1-1'>
      <Link to='/livestockside' style={{textDecoration:'none',marginBottom:'20%'}}>
        <button style={{marginLeft:'20px'}} className='button is-primary --my '><HomeIcon/></button>
      </Link>
      <div>
       <Grow in>
   <Container >
     <Grid container className={classes.mainContainer} justify="space-between" alignItems="stretch" spacing={3}>
       <Grid item xs={12} sm={7}>
       <Posts/>
       </Grid>
       
        <Grid  item xs={12} sm={4} style={{
          marginTop:'35px'
        }}>
      <Form/>
       </Grid>
     </Grid>
   </Container>
 </Grow>
  
      </div>
    </div>
    </div>
  ); 
}

export default Siblings;
