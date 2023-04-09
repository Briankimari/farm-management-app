 import React from 'react';
import {Grid, CircularProgress} from '@mui/material';
import useStyles from './Styles';
import { useSelector } from 'react-redux';
import Post from './Post';
 
const Posts = ({setCurrentId}) => {
   const classes= useStyles();
   const posts=useSelector((state)=> state.posts);

   console.log(posts);
  return (
   !posts.length ? <CircularProgress /> :(
    <Grid className={classes.container} container alignItems='stretch' spacing={3}>
     
        <Grid item  xs={12} sm={6}>
            <Post  />
        </Grid>
      
    </Grid>
   )
  )
}

export default Posts