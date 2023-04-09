import React, { useState } from 'react';
import useStyles from './Styles';
import { Card, CardActions,CardContent, CardMedia, Button,Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'; 
import { useDispatch} from 'react-redux';
import { deletePost } from '../../../actions/posts';
import { toast } from 'react-toastify';


const Post = ({post,setCurrentId}) => {
 const classes= useStyles();

 const dispatch= useDispatch();
 
  return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={post.selectedFiles} title={post.title} />
          <div className={classes.overlay}>
            <Typography variant='h6'>  {post.creator}</Typography>
            {/* <Typography variant='h6'>{moment(post.createdAt).fromNow()}</Typography> */}
          </div>
          <div className={classes.overlay2}>
            <Button style={{color:'white'}}
             size='large'
              onClick={()=> setCurrentId(post._id)}>
              <MoreHorizIcon 
              fontSize='default' />
            </Button>

          </div>
          <div className={classes.details}>
            <Typography variant='body2'  color="textSecondary"><span style={{color:"red"}}> Age:</span> {post.tags}</Typography>
          </div>
         <Typography className={classes.title}  color="textSecondary"  variant='body2' ><span style={{color:"red"}}> Sex:</span> {post.title}</Typography>

          <CardContent>
         <Typography  variant='body2' color='textSecondary' component='p' ><span style={{color:"red"}}> No of Siblings:</span> {post.message}</Typography>

          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button size='small' color='primary' onClick={()=> dispatch(deletePost(post._id))}> <DeleteIcon fontSize='small' />
            Delete
            </Button>
          </CardActions>

      </Card>
    )
}

export default Post