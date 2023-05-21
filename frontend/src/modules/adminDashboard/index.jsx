import { Box, Grid } from '@mui/material'
import React from 'react'
import DonationsCount from '../../shared/donation/DonationsCount'
import { DonationStatusClient } from '../../constant/Donation'
import Heading2 from '../../shared/page/Heading2'

const AdminDashboardScreen = () => {
  return (
    <Box boxShadow={2} p={2} minHeight={"80vh"}>
        <Heading2 title={"Admin Dashboard"} />
      <Grid container spacing={2}>
        {Object.keys(DonationStatusClient).map(status => (
          <Grid key={status} item xs={12} sm={6} md={4} lg={4}>
            <DonationsCount title={DonationStatusClient[status]} params={{
              status,
            }} name={"/all-donations"} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default AdminDashboardScreen