import { Box, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import Heading2 from '../../shared/page/Heading2'
import { useUsers } from '../../hooks/react-query/user/useUsers'
import UserTile from '../../shared/user/UserTile'

const UsersScreen = () => {
    const {data, refetch, isLoading, isFetching} = useUsers({});

    useEffect(()=>{
      refetch();
    },[])

    return (
    <Box boxShadow={2} p={2} height={"80vh"} sx={{overflowY:"auto"}}>
        <Heading2 title={"Manage Users"} loading={isLoading || isFetching} />
        <Stack mt={2} spacing={1}>
          {data && data.rows.map((user) => (
            <UserTile key={user.id} user={user} />
          ))}
        </Stack>
    </Box>
  )
}

export default UsersScreen