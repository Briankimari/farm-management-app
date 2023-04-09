import React from 'react';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Divider, ListItem,  ListItemIcon, Typography } from '@mui/material';
import { LeftbarData } from './LeftbarData';
import { ListItemText } from '@material-ui/core';
import { LeftbarStyle } from './LeftbarStyle';
import { useNavigate} from 'react-router';
import { useLocation } from 'react-router';


function LeftbarDesign() {
const classes=LeftbarStyle();
const navigate= useNavigate();
const location= useLocation();

  return (
    <div>
    <Typography variant="h6" sx={{ my: 2,marginLeft:'89%',
        marginTop:'9px'}}>
       <ExitToAppOutlinedIcon />
      </Typography>
       <Divider />

    {/* map the data */}
    {
        LeftbarData.map(item=>(
          
            <ListItem 
            sx={{cursor:'pointer'}}
            key={item.id}
            onClick={()=>navigate(item.path)}
            className={location.pathname === item.path? classes.active: classes.NotActive}
            >
                <ListItemText >{item.title}</ListItemText>
                    <ListItemIcon className={classes.listIcon}>{item.icon} </ListItemIcon>
                
            </ListItem>
        ))
    }
</div>

  )
}

export default LeftbarDesign
