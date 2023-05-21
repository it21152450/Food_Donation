import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Heading2 from '../../shared/page/Heading2'
import DonationTile from '../../shared/donation/DonationTile'
import { useDonations } from '../../hooks/react-query/donation/useDonations'
import { useSearchParams } from 'react-router-dom'
import { DonationStatus } from '../../constant/Donation'

const AgentAvailableDonationsScreen = () => {
    const [searchParams] = useSearchParams();
    const donationStatus = searchParams.get("status");
    const [status, setStatus] = useState(donationStatus);
    const { data, isLoading, refetch } = useDonations({
        status:DonationStatus.NEW,
        notAssigned:"true"
    });

    useEffect(()=>{
        refetch();
    },[status])

    useEffect(() => {
        setStatus(donationStatus);
    },[donationStatus])

    return (
        <Box boxShadow={2} p={2} height={"80vh"} sx={{overflowY:"auto"}}>
            <Heading2 title={"New Donations"} loading={isLoading} />
            <Stack mt={2} spacing={1}>
                {data && data.rows.map((donation) => (
                    <DonationTile key={donation.id} donation={donation} />
                ))}
            </Stack>
        </Box>
    )
}

export default AgentAvailableDonationsScreen