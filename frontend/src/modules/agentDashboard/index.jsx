import { Box, Grid } from '@mui/material'
import React from 'react'
import DonationsCount from '../../shared/donation/DonationsCount'
import { DonationStatus, DonationStatusClient } from '../../constant/Donation'
import Heading2 from '../../shared/page/Heading2'

const AgentDashboardScreen = () => {
  return (
    <Box boxShadow={2} p={2} minHeight={"80vh"}>
        <Heading2 title={"Agent Dashboard"} />
      <Grid container spacing={2}>
        {Object.keys(DonationStatusClient).filter(key => [DonationStatus.ON_PROGRESS, DonationStatus.COLLECTED].includes(key)).map(status => (
          <Grid key={status} item xs={12} sm={6} md={4} lg={4}>
            <DonationsCount title={DonationStatusClient[status]} params={{
              status,
              assignedToMe:'true'
            }} name={"/assign-to-me-donations"} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default AgentDashboardScreen