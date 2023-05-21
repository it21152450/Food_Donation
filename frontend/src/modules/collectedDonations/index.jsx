import { Box, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import Heading2 from '../../shared/page/Heading2'
import { useAssignToMeDonations } from '../../hooks/react-query/donation/useAssignToMeDonations'
import DonationTile from '../../shared/donation/DonationTile'
import { DonationStatus } from '../../constant/Donation'

const CollectedDonationsScreen = () => {
    const { data, isLoading, refetch } = useAssignToMeDonations({
        status:DonationStatus.COLLECTED
    });

    useEffect(()=>{
        refetch();
    },[])

    
    return (
        <Box boxShadow={2} p={2} height={"80vh"} sx={{overflowY:"auto"}} >
            <Heading2 title={"Collected Donations"} loading={isLoading} />
            
            <Stack mt={2} spacing={1}>
                {data && data.rows.map((donation) => (
                    <DonationTile key={donation.id} donation={donation} />
                ))}
            </Stack>
        </Box>
    )
}

export default CollectedDonationsScreen