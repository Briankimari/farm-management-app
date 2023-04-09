import { atm, dashboard, income, transaction } from "../../utils/Icon";

export const menuItem=[
    {
        id:1,
        title:'Dashboard',
        icon:dashboard,
        link:'/dashboard'
    },
     {
        id:2,
        title:'Liability',
        icon:transaction,
        link:'/dashboard'
    },
     {
        id:3,
        title:'Incomes',
        icon:atm,
        link:'/dashboard'
    },
     {
        id:4,
        title:'Expenditure',
        icon:income,
        link:'/dashboard'
    }

]