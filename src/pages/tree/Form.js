import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import useStyles from './Styles'
import { Button, Paper, TextField, Typography } from '@mui/material';
import {useDispatch, useSelector } from "react-redux"
import FileBase from 'react-file-base64'
import { createPost, updatePost } from '../../actions/siblings';


const Form = ({childId,setChildId}) => {
 const [viewData, setViewData] = useState({
  sibling:'',age:'',sex:'',selectFiles:''
 }) ;
 
 const view= useSelector((state)=> childId ? state.views.find((v)=> v._id === childId): null);
 const classes= useStyles();
 const dispatch= useDispatch();

 useEffect(()=> {
  if(view) setViewData(view);
 }, [view])

 const submitView=(e)=>{
  e.preventDefault();
  if(childId) {
    dispatch(updatePost(childId,viewData));
  }else{
    dispatch(createPost(viewData));
  }
  clear();
 }
  const clear=()=>{
    
    setViewData({sibling:'',age:'',sex:'',selectFiles:''})
  }
  return (
    <Paper className={classes.paper}>
       <form autoComplete='off' noValidate 
   className={`${classes.root} ${classes.form}`} onSubmit={submitView}>
    <Typography variant='h6'> {childId ? 'Edit' : 'Add'  } Animal Siblings</Typography>
    <TextField name='sibling'  variant='outlined' label='Sibling Name' fullWidth value={viewData.sibling} onChange={(e)=> setViewData({...viewData,sibling: e.target.value})} />
    <TextField name='sex' variant='outlined' label='Sex' fullWidth value={viewData.sex} onChange={(e)=> setViewData({...viewData,sex: e.target.value})} />
   <TextField name='age'   variant='outlined' label='Age' fullWidth value={viewData.age} onChange={(e)=> setViewData({...viewData,age: e.target.value})} />
  <div className={classes.fileInput}>
    <FileBase type="file" multiple={false} onDone={({base64})=> setViewData ({...viewData,selectFiles: base64})} /> </div>
    <Button className={classes.buttonSubmit} variant='contained' color="primary" size="large" type="submit" fullWidth>Submit</Button>
    <Button sx={{marginTop:"10px",backgroundColor:"red"}}  variant='contained'  size="small" onClick={clear} fullWidth>Clear</Button>
      </form>

    </Paper>
  );
}

export default Form;
