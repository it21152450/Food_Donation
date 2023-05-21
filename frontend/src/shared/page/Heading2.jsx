import { Divider, LinearProgress, Typography } from '@mui/material'
import React from 'react'

const Heading2 = ({title, loading}) => {
  return (
    <>
        <Typography fontWeight={700} fontSize={26} textTransform={"uppercase"} color="primary">{title}</Typography>
        {loading?(
          <LinearProgress />
        ):(
          <Divider sx={{borderBottomWidth:5, borderRadius:2.5, borderColor:'primary'}} />
        )}
    </>
  )
}

export default Heading2