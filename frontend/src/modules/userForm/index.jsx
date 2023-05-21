import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import useHandleError from '../../hooks/useHandleError';
import { UserRole } from '../../constant/User';
import { useSearchParams } from 'react-router-dom';
import { useUser } from '../../hooks/react-query/user/useUser';
import UserApi from '../../api/UserApi';
import Heading2 from '../../shared/page/Heading2';

const initialUserData = {
    name: "",
    email: "",
    role: UserRole.USER,
    phone: "",
    password: "",
    confirmPassword: ""
}

const UserForm = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { userRole, navigate, user } = useContext(AppContext);
    const [data, setData] = useState(initialUserData);
    const [searchParams] = useSearchParams();
    const userId = parseInt(searchParams.get("userId") ?? "0");
    const [loading, setLoading] = useState(false);
    const handleError = useHandleError();
    const { data: userData, isLoading, refetch, isFetching } = useUser(userId);

    const handleChange = (event) => {
        const { target: { name, value } } = event;
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        if (userId) {
            refetch();
        }
    }, [userId])

    useEffect(() => {
        if (userId && userData) {
            setData({
                ...initialUserData,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                role: userData.role
            })
        }
    }, [userData])

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            await UserApi.updateUserAsync({ ...data, id: userId });
            enqueueSnackbar(
                "User updated successfully",
                {
                    autoHideDuration: 3000,
                    variant: "success"
                }
            )
        } catch (error) {
            handleError(error);
        }
        setLoading(false);
    }

    const disableButton = (data.password !== data.confirmPassword) || loading || isLoading || isFetching

    return (
        <Box boxShadow={2} p={2} minHeight={"80vh"}>
            <Heading2 title={`Edit user ID: ${userId}`} loading={isLoading || loading} />
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
                    {userRole === UserRole.ADMIN && (
                        <FormControl size="small">
                            <InputLabel>Role</InputLabel>
                            <Select
                                label="Role"
                                value={data.role}
                                size="small"
                                name="role"
                                onChange={handleChange}
                            >
                                {Object.keys(UserRole).map(key => (
                                    <MenuItem key={key} value={UserRole[key]}>{key}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    {(user?.id === userId) && (
                        <>
                            <TextField
                                name="password"
                                label="Password"
                                size="small"
                                type='password'
                                value={data.password}
                                onChange={handleChange}
                            />
                            <TextField
                                error={data.password !== data.confirmPassword}
                                name="confirmPassword"
                                label="Confirm Password"
                                size="small"
                                type='password'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                helperText={data.password !== data.confirmPassword ? "Password not matched" : ""}
                            />
                        </>
                    )}
                    <Button disabled={disableButton} variant='contained' type="submit">Update</Button>
                </Stack>
            </form>
        </Box>
    )
}

export default UserForm