import React from 'react';
import { AiFillBackward, AiOutlineQuestion } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './index.css';
import {Tree,TreeNode} from 'react-organizational-chart'
import { Box } from '@mui/system';
import styled from '@emotion/styled';

 const StyledNode=styled.div`
 padding:5px;
 border-radius:8px;
 display:inline-block;
 border:1px solid red;
 `;
const Structure = () => (
           
    <Box className='--center-all  '>
    <div className=' --center-all --text-sm --inline-block '>
    <Link to='/livestockside' className='btn btn-success'><AiFillBackward/></Link>
    <p className='help --color-primary --fw-bold --text-p'>click to view each parent/child family</p>
    
    
    <div className='--text-sm --fw-bold parent --mt --my '>
       <Tree 
       lineWidth={'2px'}
       lineColor={'green'}
       lineBorderRadius={'10px'}
       label={<StyledNode>Livestocks</StyledNode>}>

       <TreeNode label={<StyledNode>Cattle</StyledNode>}>
        <TreeNode label={<StyledNode>Cow</StyledNode>}>
        <TreeNode label={<StyledNode>Has Siblings</StyledNode>}>
        <TreeNode  className='button is-warning '  label={<div>View</div>}/>
        </TreeNode>
         <TreeNode label={<StyledNode>No Siblings</StyledNode>}>
         <TreeNode label={<StyledNode><AiOutlineQuestion/></StyledNode>}/>
         </TreeNode>

        </TreeNode>
       </TreeNode>

       <TreeNode label={<StyledNode>Poultry</StyledNode>}>
       <TreeNode label={<StyledNode>Hens</StyledNode>}>
       <TreeNode label={<StyledNode>Has Siblings</StyledNode>}>
       <TreeNode  className='button is-warning ' label={<div>View</div>}/>

       </TreeNode>
       <TreeNode label={<StyledNode>No Siblings</StyledNode>}>
       <TreeNode label={<StyledNode><AiOutlineQuestion/></StyledNode>}/>
       </TreeNode>

       </TreeNode>
       
       </TreeNode>

       <TreeNode label={<StyledNode>Pigs</StyledNode>}>
           <TreeNode label={<StyledNode>Has Siblings</StyledNode>}>
           <TreeNode  className='button is-warning ' label={<div>View</div>}/>
           </TreeNode>
           <TreeNode label={<StyledNode>No Siblings</StyledNode>}>
           <TreeNode label={<StyledNode><AiOutlineQuestion/></StyledNode>}/>
           </TreeNode>
       </TreeNode>
 <TreeNode label={<StyledNode>Goats</StyledNode>}>
     <TreeNode label={<StyledNode>Has Siblings</StyledNode>}>
     <TreeNode  className='button is-warning ' label={<div>View</div>}/>
     </TreeNode>
     <TreeNode label={<StyledNode>No Siblings</StyledNode>}>
     <TreeNode label={<StyledNode><AiOutlineQuestion/></StyledNode>}/>
     </TreeNode>
 </TreeNode>

       
       </Tree>

           </div>
           </div>
    </Box>
  ); 


export default Structure;
