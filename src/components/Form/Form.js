import React, { useState, useEffect } from 'react'
import useStyles from './Styles'
import {TextField, Button,Typography, Paper} from "@mui/material"
import FileBase from 'react-file-base64'
import { toast } from "react-toastify";
import {useDispatch, useSelector } from "react-redux"
import { createPost, updatePost } from '../../actions/posts'
import Loader from '../loader/Loader';

 

const Form = ({currentId, setCurrentId}) => {
  const [postData, setPostData]= useState({
    creator:'', title:'',message:'', tags:'',selectedFiles:''
  });
  const post= useSelector((state)=> currentId ? state.posts.find((p)=> p._id === currentId): null);
  const classes= useStyles();
  const dispatch= useDispatch();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(()=> {
    if(post) setPostData(post);
  }, [post])

  const handleSubmit= (e)=>{
    e.preventDefault();
    setIsLoading(true)
    if(currentId) {
      dispatch(updatePost(currentId,postData));  
      toast.success("Uploaded Successfuly")
      setIsLoading(false)
     
    } else{
       dispatch(createPost(postData));
      
    }

    clear();
  }

  const clear= () =>{
    setCurrentId(null);
    setPostData({creator:'', title:'',message:'', tags:'',selectedFiles:''});
  }
 


  return (
    <Paper className={classes.paper}>
    {isLoading && <Loader/>}
       <form autoComplete='off' noValidate 
   className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
    <Typography variant='h6'> {currentId ? 'Edit' : 'Add'  } Livestock</Typography>
    <TextField  name='creator' variant='outlined' label='Animal Type' fullWidth value={postData.creator} onChange={(e)=> setPostData({...postData,creator: e.target.value})} />
    <TextField name='title' variant='outlined' label='Sex' fullWidth value={postData.title} onChange={(e)=> setPostData({...postData,title: e.target.value})} />
   <TextField name='message' variant='outlined' label='No of Siblings' fullWidth value={postData.message} onChange={(e)=> setPostData({...postData,message: e.target.value})} />
  <TextField name='tags' variant='outlined' label='Age' fullWidth value={postData.tags} onChange={(e)=> setPostData({...postData,tags: e.target.value})} />
  <div className={classes.fileInput}>
    <FileBase type="file" multiple={false} onDone={({base64})=> setPostData ({...postData,selectedFiles: base64})} /> </div>
    <Button className={classes.buttonSubmit} variant='contained' color="primary" size="large" type="submit" fullWidth>Submit</Button>
    <Button sx={{marginTop:"10px",backgroundColor:"red"}}  variant='contained'  size="small" onClick={clear} fullWidth>Clear</Button>
      </form>

    </Paper>
  )
}

export default Form