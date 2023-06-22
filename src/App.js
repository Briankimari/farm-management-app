
import Farm from "./components/Farm";
import Livestock from "./components/Livestock";
import ProfitLoss from "./pages/ProfitLoss";
import Summary from "./pages/Summary";
import { Route, Routes} from "react-router-dom";
import {  CssBaseline, ThemeProvider} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeSettings} from "./theme"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Assets from "./components/Assets";
import AddAsset from "./components/AddAsset";
import EditAsset from "./components/EditAsset";
import Vertinary from "./pages/Vertinary";
import PostLivestock from "./pages/PostLivestock";
import Box from "./pages/Box";
import Structure from "./pages/tree/Structure";
import Siblings from "./pages/tree/Siblings";
import AssetsCapital from "./pages/AssetsCapital/AssetsCapital";
import Login from './components/authentication/homePage/Login';
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./pages/redux/features/auth/authSlice";
import Logins from "./components/authentication/homePage/login/Logins";
import Profile from "./pages/userProfile/Profile";
import EditProfile from "./pages/userProfile/EditProfile";
import AddProfile from "./pages/userProfile/AddProfile";
import Profiles from "./bars/topbar/profile/Profiles";
import Homepage from "./pages/homepage/Homepage";




function App() {
  const dispatch= useDispatch();
  const mode= useSelector((state)=> state.mode);
  const theme= useMemo(()=> createTheme(themeSettings(mode), [mode]))
 
  useEffect(()=> {
    async function loginStatus() {
      const status= await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  },[dispatch]);
  return (
   
    <ThemeProvider theme={theme} >
    <CssBaseline/>
          <div className='App'>
          
         

 <div>

 <ToastContainer/>
          <Routes>
             
              <Route exact path="/" element= { <Homepage/>} />
              <Route path="farm" element={<Farm/>} /> 
              <Route path="assets" element= { <Assets />} />
              <Route path="livestock" element= { <Livestock />} />
              <Route path="assetscapital" element= { <AssetsCapital/>} />
              <Route path="livestockside" element= { <PostLivestock />} />
              <Route path="profitloss" element= { <ProfitLoss />} />
             <Route path="farm" element= { <Summary />} />
             <Route path="add" element= { <AddAsset />} />
             <Route path="edit/:id" element= { <EditAsset />} />
            <Route path="doctor" element= { <Vertinary />} />
            <Route path="box" element= { <Box />} />
            <Route path="structure" element= { <Structure />} />
            <Route path="siblings" element= { <Siblings />} />
             <Route path="register" element= { <Login/>} />
             <Route path="login" element= { <Logins/>} />
             <Route path="profile" element= { <Profile/>} />
              <Route path="profiles" element= { <Profiles/>} />
             <Route path="editprofile" element= { <EditProfile/>} />
             <Route path="add-profile" element= { <AddProfile/>} />
             
           </Routes>
        
           </div>
            
          </div>
       
     </ThemeProvider>

  );
}

export default App;
