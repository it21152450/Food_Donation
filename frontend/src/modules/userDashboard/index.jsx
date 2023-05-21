import { Box, Grid } from '@mui/material'
import React from 'react'
import DonationsCount from '../../shared/donation/DonationsCount'
import { DonationStatusClient } from '../../constant/Donation'
import Heading2 from '../../shared/page/Heading2'

const UserDashboardScreen = () => {
  return (
    <Box boxShadow={2} p={2} minHeight={"80vh"}>
      <Heading2 title={"User Dashboard"} />
      <Grid container spacing={2} mt={2}>
        {Object.keys(DonationStatusClient).map(status => (
          <Grid key={status} item xs={12} sm={6} md={4} lg={4}>
            <DonationsCount title={DonationStatusClient[status]} name="/my-donations" params={{
              status,
              myDonations:'true'
            }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default UserDashboardScreen