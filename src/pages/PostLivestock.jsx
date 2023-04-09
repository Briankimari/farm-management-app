import React, { useState } from 'react';
import {Container,Typography,Grow,Grid} from "@mui/material";
import LivestockSide from './LivestockSide';
import Box from './Box';
import Child from './tree/Child';
import Layout from '../layout/Layout';


const PostLivestock = () => {
  const [openDetails,setOpenDetails]= useState(true)
  return (
    <Layout>
     <Grow in>
      <Container >
        <Grid container  justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <LivestockSide />
          </Grid>
          
           <Grid  item xs={12} sm={4}>
         
           <Box/>
             
             <Child/>
             
           
            
          </Grid>

        </Grid>
    
      </Container>
    </Grow>
    </Layout>
  );
}

export default PostLivestock;
