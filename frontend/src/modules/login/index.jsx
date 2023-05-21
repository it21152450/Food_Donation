import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import Heading2 from '../../shared/page/Heading2'
import { AppContext } from '../../context/AppContext'
import UserApi from '../../api/UserApi'
import useHandleError from '../../hooks/useHandleError'

const LoginScreen = () => {
  const {updateAuth, navigate} = useContext(AppContext);
  const [data, setData] = useState({
    email:"",
    password:"",
  })
  const [loading, setLoading] = useState(false);
  const handleError = useHandleError();
  const handleChange = (event) => {
    const {target: {name, value} } = event;
    setData(prev => ({
      ...prev,
      [name]:value
    }))
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    try{
      const authResponse = await UserApi.loginAsync(data)
      updateAuth(authResponse);
    }catch(error){
      console.log(error);
      handleError(error);
    }
    setLoading(false);
  }

  const disableButton = loading

  return (
    <Box mx="auto" maxWidth="md" boxShadow={2} p={2}>
      <Heading2 title={"Login"} />
      <form onSubmit={onSubmit}>
        <Stack mt={2} spacing={2}>
          <TextField 
            name="email"
            label="Email"
            size="small"  
            type='email'
            required={true}
            value={data.email}
            onChange={handleChange}
          />
          <TextField 
            name="password"
            label="Password"
            size="small"  
            type='password'
            required={true}
            value={data.password}
            onChange={handleChange}
          />
          <Button disabled={disableButton} variant='contained' type="submit">Login</Button>
        </Stack>
      </form>
    </Box>
  )
}

export default LoginScreen