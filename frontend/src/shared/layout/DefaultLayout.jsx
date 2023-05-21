import React from 'react'
import Header from './header/default'
import { Box, Container, Grid } from '@mui/material'
import DefaultNavigation from './navigation'

const DefaultLayout = ({children}) => {

    return (
        <>
            <Header />
            <Box sx={{minHeight:'80vh'}} mt={2}>
                <Container maxWidth="xl">
                    <Grid container spacing={2}>
                        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                            <DefaultNavigation />
                        </Grid>
                        <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                            {children}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            {/* <DefaultFooter /> */}
        </>
    )
}

export default DefaultLayout