import StackedBarChartOutlinedIcon from '@mui/icons-material/StackedBarChartOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';


export const LeftbarData =[
//    summary
    {
        id:1,
        title:'summary',
        path:'/farm',
        icon: <StackedBarChartOutlinedIcon  sx={{marginLeft:'75%'}} /> 
    },

    // profit and loss
     {
        id:2,
        title:'Profit and Loss',
        path:'/ProfitLoss',
        icon: <ShowChartOutlinedIcon sx={{marginLeft:'75%'}} />
    },

    // Livestock
    {
        id:3,
        title:'Livestock',
        path:'/LivestockSide',
        icon:<FolderSharedOutlinedIcon sx={{marginLeft:'75%'}}/> 
    },

    // assets and capital
    {
        id:4,
        title:'Assets and Capital',
        path:'/assetsCapital',
        icon: < AccountBalanceWalletOutlinedIcon sx={{marginLeft:'75%'}}/> 
    },

]