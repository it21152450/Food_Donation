import { Box, IconButton, Typography } from '@mui/material'
import moment from 'moment'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { AppContext } from '../../context/AppContext';

const UserTile = ({user}) => {
   const {navigate} = useContext(AppContext);

  return (
    <Box p={1} boxShadow={2}>
        <Box display="flex" justifyContent="space-between">
            <Box>
                <Typography fontSize={14} fontWeight={600}>{`User ID: ${user.id}`}</Typography>
                <Typography fontSize={14} fontWeight={500}>{`Name: ${user.name}`}</Typography>
                <Typography fontSize={13} fontWeight={500}>{`Email: ${user.email}`}</Typography>
                <Typography fontSize={13} textTransform="capitalize" fontWeight={500}>{`Role: ${user.role}`}</Typography>
                <Typography fontSize={13} fontWeight={500}>{`SignUp At: ${moment(user.created).format("MMMM Do YYYY")}`}</Typography>
            </Box>
            <Box>
                <IconButton onClick={()=>navigate({
                    name:"/user-form",
                    params:{
                        userId:user.id
                    }
                })}>
                    <BorderColorIcon />
                </IconButton>
            </Box>
        </Box>
    </Box>
  )
}

export default UserTile