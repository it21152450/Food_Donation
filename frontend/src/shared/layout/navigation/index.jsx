import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import { useMemo } from 'react';
import { UserRole } from '../../../constant/User';

const authRoutes = [
    {
        name:"Login",
        path:"/login"
    },
    {
        name:"Signup",
        path:"/sign-up"
    }
]

const userRoutes = [
    {
        name:"User Dashboard",
        path:"/user-dashboard"
    },
    {
        name:"Add New Donation",
        path:"/donation-form"
    },
    {
        name:"My Donations",
        path:"/my-donations"
    },
]

const adminRoutes = [
    {
        name:"Admin Dashboard",
        path:"/admin-dashboard"
    },
    {
        name:"All Donations",
        path:"/all-donations"
    },
    {
        name:"All Products",
        path:"/all-products"
    },
    {
        name:"Manage users",
        path:"/users"
    }
]

const agentRoutes = [
    {
        name:"Agent Dashboard",
        path:"/agent-dashboard"
    },
    {
        name:"Assigned To Me Donations",
        path:"/assign-to-me-donations"
    },
    {
        name:"Collected Donations",
        path:"/collected-donations"
    },
    {
        name:"New Not Assigned Donations",
        path:"/not-assigned"
    },
]

const shopRoutes = [
    {
        name:"All Products",
        path:"/shop-dashboard"
    }
]

const DefaultNavigation = () => {
    const {user, userRole, navigate} = useContext(AppContext);

    const routes = useMemo(() => {
        let routeList = []
        
        if(user){
            routeList = userRoutes;
            if(user.role === UserRole.ADMIN){
                routeList = [...adminRoutes]
            }else if(user.role === UserRole.AGENT){
                routeList = [...agentRoutes]
            }else if(user.role === UserRole.SHOP){
                routeList = [...shopRoutes]
            }
        }else{
            routeList = authRoutes;
        }

        return routeList.map((route, index) => (
            <Box key={index} bgcolor="white" px={2} py={1} mb={1} borderRadius={2} onClick={() => {
                navigate({
                    name:route.path
                })
            }}>
                <Typography fontSize={20} fontWeight={800}>{route.name}</Typography>
            </Box>
        ))
    },[user, userRole, navigate])

    return (
        <Box boxShadow={4} p={2} sx={{backgroundColor:"#262626"}} minHeight={"80vh"} borderRadius={2}>
            {routes}
        </Box>
    )
}

export default DefaultNavigation