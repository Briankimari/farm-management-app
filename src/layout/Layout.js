import React, { useState } from 'react';
import { LayoutStyle } from './LayoutStyle';
import Topbar from '../bars/topbar/Topbar';


const Layout = ({children}) => {
const classes = LayoutStyle();
// for the open and close drawer in leftBar
const [isMobile, setIsMobile] =useState(false);
const funcSetIsMobile=()=> {
  setIsMobile(!isMobile);
}
  return (
    <div  className={classes.root}>
    
      <Topbar funcSetIsMobile={funcSetIsMobile} />
   
        <main>
      
            {children}
        </main>
        
    </div>
  )
}

export default Layout