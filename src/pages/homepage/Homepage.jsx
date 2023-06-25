import React from 'react';
import { Link } from 'react-router-dom';
import './HomepageStyle.css'
import { BrightnessMediumTwoTone } from '@mui/icons-material';
import { Box } from '@mui/material';
import hero from '../../components/data/hero.png'


const Homepage = () => {
   
  return (
    <div className='homepage-0'>
       <header className='head-1 heading ' >
        <Link style={{textDecoration:'none'}}>
        <h1  >Farmers App.</h1>
        </Link>
        

        <div className='head-2' >
       <a className='und' href="/">Home</a>
       <a href='/'>About</a>
       <a className='und-1' ><BrightnessMediumTwoTone fontSize='80'/></a>
        
        </div>
       </header>
       {/* dashborad */}
      

    <Box className="hero-1">
      <div className='full-1'>
        <Box  className='sec-1 type-1 '>
          <p >
          Farm Management App is a world wide website helpful to every farmer wanting to 
          record,trade,manage,control and analyse his/her farm.Each Farmer has ability
          to change and create an account and start controlling your farm.Connect with diffrent 
          farmers to share ideas and acquire knowledge.
          Use the buttons below to sign in or sign up Farm App.
          </p> 
           <div className='btn-box'>
            <Link to='/register'>
               <a  className='btn btn-10'>Register</a>
            </Link>
                 <Link to="/login">
                  <a className='btn btn-11'>Login</a>

                 </Link>
                   
                </div>
       
        </Box>

         <Box  className='sec-1 sec-2  '>
        <p className='hero-img'>
        
              <img src={hero} alt="Hero Image" />
       
        </p>
       
        </Box>
        
        </div>
    </Box>
  {/* footer */}
    <footer className='footers'>
      <div className='text'>
      <p>Copyright &copy; 2023 by Brian Bandi / All Right Reserved.</p>

      </div>
    </footer>
</div>
   
  )
}

export default Homepage
