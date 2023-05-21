import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Heading2 from '../../shared/page/Heading2'
import DonationTile from '../../shared/donation/DonationTile'
import { useDonations } from '../../hooks/react-query/donation/useDonations'
import { DonationStatus, DonationStatusClient } from '../../constant/Donation'
import { useSearchParams } from 'react-router-dom'

const AllDonationsScreen = () => {
    const [searchParams] = useSearchParams();
    const donationStatus = searchParams.get("status");
    const [status, setStatus] = useState(donationStatus);
    const { data, isLoading, refetch } = useDonations({
        status
    });

    useEffect(()=>{
        refetch();
    },[status])

    useEffect(() => {
        setStatus(donationStatus);
    },[donationStatus])

    return (
        <Box boxShadow={2} p={2} height={"80vh"} sx={{overflowY:"auto"}}>
            <Heading2 title={"All Donations"} loading={isLoading} />
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
                        <MenuItem value="">All Donations</MenuItem>
                        {Object.keys(DonationStatusClient).map(key => (
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

export default AllDonationsScreen