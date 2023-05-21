import { Box, FormControl, InputLabel, LinearProgress, MenuItem, Select, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Heading2 from '../../shared/page/Heading2'
import { useAssignToMeDonations } from '../../hooks/react-query/donation/useAssignToMeDonations'
import DonationTile from '../../shared/donation/DonationTile'
import { useSearchParams } from 'react-router-dom'
import { DonationStatus, DonationStatusClient } from '../../constant/Donation'

const AssignToMeDonationsScreen = () => {
    const [searchParams] = useSearchParams();
    const donationStatus = searchParams.get("status");
    const [status, setStatus] = useState(donationStatus);
    const { data, isLoading, refetch } = useAssignToMeDonations({
        status
    });

    useEffect(()=>{
        refetch();
    },[status])

    useEffect(() => {
        setStatus(donationStatus??DonationStatus.ON_PROGRESS);
    },[donationStatus])
    
    return (
        <Box boxShadow={2} p={2} height={"80vh"} sx={{overflowY:"auto"}} >
            <Heading2 title={"Assigned To Me Donations"} loading={isLoading} />
            
            <Stack mt={2} spacing={1}>
                <FormControl size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                        label="Status"
                        value={status}
                        size="small"
                        name="status"
                        onChange={(event) => setStatus(event.target.value)}
                    >
                        {Object.keys(DonationStatusClient).filter(key => [DonationStatus.ON_PROGRESS, DonationStatus.COLLECTED].includes(key)).map(key => (
                            <MenuItem key={key} value={key}>{DonationStatusClient[key]}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {data && data.rows.map((donation) => (
                    <DonationTile key={donation.id} donation={donation} />
                ))}
            </Stack>
        </Box>
    )
}

export default AssignToMeDonationsScreen