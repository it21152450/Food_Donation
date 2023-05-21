import { Box, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import DonationApi from '../../api/DonationApi';
import { AppContext } from '../../context/AppContext';

const DonationsCount = ({
    title,
    params,
    name
}) => {
const {navigate} = useContext(AppContext);
const [total, setTotal] = useState(0);

useEffect(() => {
    DonationApi.getDonationsAsync(params)
    .then((data) => {
        setTotal(data.count);
    })
},[params])

return (
    <Box p={2} boxShadow={2} display="flex" alignItems="center" justifyContent='center' onClick={() => {
        if(name){
            navigate({
                name,
                params
            })
        }
    }}>
        <Box>
            <Typography textAlign="center" fontWeight={700}>
                {title}
            </Typography>
            <Typography textAlign="center" fontSize={30} fontWeight={900}>{total}</Typography>
        </Box>
    </Box>
  )
}

export default DonationsCount