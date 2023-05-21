import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import Heading2 from '../../shared/page/Heading2'
import { AppContext } from '../../context/AppContext'
import UserApi from '../../api/UserApi'
import useHandleError from '../../hooks/useHandleError'

const onlyNumberRegex = new RegExp('^[0-9]+$');

const SignUpScreen = () => {
  const {updateAuth, navigate} = useContext(AppContext);
  const [data, setData] = useState({
    name:"",
    email:"",
    phone:"",
    password:"",
    confirmPassword:""
  })
  const [loading, setLoading] = useState(false);
  const handleError = useHandleError();
  const handleChange = (event) => {
    const {target: {name, value} } = event;
    if(name === 'phone'){
      if(value.length > 10 || (value && !onlyNumberRegex.test(value))) return 
    }
    setData(prev => ({
      ...prev,
      [name]:value
    }))
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    try{
      await UserApi.createUserAsync(data);
      const authResponse = await UserApi.loginAsync({
        email:data.email,
        password:data.password
      })
      updateAuth(authResponse);
    }catch(error){
      handleError(error);
    }
    setLoading(false);
  }

  const disableButton = (data.password !== data.confirmPassword) || loading

  return (
    <Box mx="auto" maxWidth="md" boxShadow={2} p={2} >
      <Heading2 title={"SignUp"} loading={loading} />
      <form onSubmit={onSubmit}>
        <Stack mt={2} spacing={2}>
          <TextField 
            name="name"
            label="Name"
            size="small"  
            type='text'
            required={true}
            value={data.name}
            onChange={handleChange}
          />
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
            name="phone"
            label="Phone"
            size="small"  
            type='text'
            required={true}
            value={data.phone}
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
          <TextField 
            error={data.password !== data.confirmPassword}
            name="confirmPassword"
            label="Confirm Password"
            size="small"  
            type='password'
            required={true}
            value={data.confirmPassword}
            onChange={handleChange}
            helperText={data.password !== data.confirmPassword ? "Password not matched":""}
          />
          <Button disabled={disableButton} variant='contained' type="submit">SignUp</Button>
        </Stack>
      </form>
    </Box>
  )
}

export default SignUpScreen