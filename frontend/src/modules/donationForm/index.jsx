import { Autocomplete, Box, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Heading2 from '../../shared/page/Heading2'
import { useDonation } from '../../hooks/react-query/donation/useDonation'
import { useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import useHandleError from '../../hooks/useHandleError'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import DonationApi from '../../api/DonationApi'
import { useSnackbar } from 'notistack';
import { DonationStatus, DonationStatusClient } from '../../constant/Donation'
import { UserRole } from '../../constant/User'
import { useUsers } from '../../hooks/react-query/user/useUsers'
import { useUser } from '../../hooks/react-query/user/useUser'
import { useProducts } from '../../hooks/react-query/product/useProducts'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const initialDonationData = {
    description: "",
    address: "",
    name: "",
    mobile: "",
    date: new Date(),
    donationItems: [],
    status: DonationStatus.NEW,
}

const onlyNumberRegex = new RegExp('^[0-9]+$');

const DonationForm = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { user, navigate, userRole } = useContext(AppContext);
    const [data, setData] = useState(initialDonationData);
    const [searchParams] = useSearchParams();
    const donationId = parseInt(searchParams.get("donationId") ?? "0");
    const { data: donationData, isLoading, refetch } = useDonation(donationId, {
        expandDonationItems: "true",
        expandManageByUser: "true"
    })
    const handleError = useHandleError();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const { data: usersData, isFetching: usersFetching, isLoading: usersLoading, refetch: refetchUsers } = useUsers({
        search
    })
    const { data: handleByUser, refetch: refetchUser, isLoading: userLoading, isFetching: userFetching } = useUser(data.manageByUserId)
    const [deleteDonation, setDeleteDonation] = useState(false);
    const [openProductPicker, setOpenProductPicker] = useState(false);
    const { data: productsData, refetch: refetchProducts } = useProducts({});
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
        setCart(prev => {
            const cartItems = [...prev];
            if(quantity<1){
                return cartItems.filter(item => item.productId !== product.id);
            }else{
                const index = cartItems.findIndex(item => item.productId === product.id);
                if(index === -1){
                    cartItems.push({
                        name:product.name,
                        productId:product.id,
                        quantity:1
                    })
                }else{
                    const cartItem = cartItems[index];
                    cartItem['quantity'] = quantity;
                    cartItems[index] = cartItem
                }
                return cartItems;
            }
        })
    }

    const getQuantity = (productId) => {
        const item = cart.find(item => item.productId === productId);
        if(item) return item.quantity;
        return 0
    }

    const buyProducts = () => {
        setData(prev => ({
            ...prev,
            donationItems:[...prev.donationItems, ...cart]
        }))
        setCart([]);
        setOpenProductPicker(false);
    }

    useEffect(() => {
        refetchProducts();
    }, [])

    useEffect(() => {
        if (data.manageByUserId) {
            refetchUser();
        }
    }, [data])

    useEffect(() => {
        refetchUsers();
    }, [search])

    const handleChange = (event) => {
        const { target: { name, value } } = event;
        if (name === 'mobile') {
            if (value.length > 10 || (value && !onlyNumberRegex.test(value))) return
        }
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangeDate = (event) => {
        const { target: { name, value } } = event;
        setData(prev => ({
            ...prev,
            [name]: new Date(value).toISOString()
        }))
    }

    useEffect(() => {
        if (donationId) {
            refetch();
        } else {
            setData(initialDonationData);
        }
    }, [donationId, refetch])

    useEffect(() => {
        if (donationId && donationData) {
            setData(donationData);
        }
    }, [donationData])

    useEffect(() => {
        if (user) {
            setData(prev => ({
                ...prev,
                name: user.name,
                mobile: user.phone
            }))
        }
    }, [user])

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            await DonationApi.createOrUpdateDonationAsync(data);
            enqueueSnackbar(
                donationId ? "Donation updated successfully" : "Donation added successfully",
                {
                    autoHideDuration: 3000,
                    variant: "success"
                }
            )
            if (!donationId) {
                setData(initialDonationData);
                navigate({
                    name: "/donation-form"
                })
            }
        } catch (error) {
            handleError(error);
        }
        setLoading(false);
    }

    const addNewFood = () => {
        setData(prev => ({
            ...prev,
            donationItems: [...prev.donationItems, {
                name: "",
                quantity: 0
            }]
        }))
    }

    const deleteDonationItem = (index) => {
        setData(prev => ({
            ...prev,
            donationItems: prev.donationItems.filter((_, idx) => idx !== index)
        }))
    }

    const handleChangeFoodItem = (index, field, value) => {
        setData(prev => {
            const donationItems = [...prev.donationItems];
            const donationItem = donationItems[index];
            donationItem[field] = value;
            donationItems[index] = donationItem;
            return {
                ...prev,
                donationItems
            }
        })
    }

    const handleDeleteDonations = async () => {
        setLoading(true)
        try {
            await DonationApi.deleteDonationAsync(donationId);
            enqueueSnackbar(
                "Donation deleted successfully",
                {
                    autoHideDuration: 3000,
                    variant: "success"
                }
            )
            navigate({
                name: "/my-donations"
            })
        } catch (error) {
            handleError(error);
        }
        setLoading(false);
    }

    const handleAssignToMe = async () => {
        setLoading(true)
        try {
            await DonationApi.createOrUpdateDonationAsync({ ...data, manageByUserId: user?.id ?? null });
            enqueueSnackbar(
                "Donation assigned to you successfully",
                {
                    autoHideDuration: 3000,
                    variant: "success"
                }
            )
            refetch();
        } catch (error) {
            handleError(error);
        }
        setLoading(false);
    }

    const disableButton = loading;

    return (
        <Box boxShadow={2} p={2} minHeight={"80vh"}>
            <Dialog fullWidth open={openProductPicker} onClose={() => setOpenProductPicker(false)}>
                <DialogTitle>Products</DialogTitle>
                <DialogContent>
                    <Box height="70vh" sx={{overflowY:"auto"}}>
                        <Grid container spacing={1}>
                            {productsData?.rows.map(product => (
                                <Grid item key={product.id} xs={12} sm={6} md={6} lg={6}>
                                    <Box boxShadow={2} p={1}>
                                        <Typography fontSize={14}>{product.name}</Typography>
                                        <Typography fontSize={12}>{product.description}</Typography>
                                        <Stack direction="row" gap={2}>
                                            {product.discount > 0 ? (
                                                <Typography color="red" sx={{ textDecoration: "line-through" }}>{product.price.toFixed(2)}</Typography>
                                            ) : null}
                                            <Typography>{product.discountPrice.toFixed(2)}</Typography>
                                        </Stack>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <IconButton onClick={() => {
                                                addToCart(product, getQuantity(product.id)-1)
                                            }}>
                                                <RemoveCircleOutlineIcon />
                                            </IconButton>
                                            <Typography fontSize={14} fontWeight={700}>{getQuantity(product.id)}</Typography>
                                            <IconButton onClick={() => {
                                                addToCart(product, getQuantity(product.id)+1)
                                            }}>
                                                <ControlPointIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={buyProducts}>Buy</Button>
                </DialogActions>
            </Dialog>
            <Heading2 title={donationId ? `Edit donation ID: ${donationId}` : "Add Donation"} loading={isLoading} />
            <form onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                        <Stack mt={2} spacing={2}>
                            {/* <TextField
                                name="description"
                                label="Description"
                                size="small"  
                                type='text'
                                multiline={true}
                                minRows={2}
                                required={true}
                                value={data.description}
                                onChange={handleChange}
                            /> */}
                            <TextField
                                name="address"
                                label="Address"
                                size="small"
                                type='text'
                                multiline={true}
                                minRows={3}
                                required={true}
                                value={data.address}
                                onChange={handleChange}
                            />
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
                                name="mobile"
                                label="Phone"
                                size="small"
                                type='text'
                                required={true}
                                value={data.mobile}
                                onChange={handleChange}
                            />
                            <TextField
                                name="date"
                                label="Donation date"
                                size="small"
                                type='datetime-local'
                                required={true}
                                value={new Date(data.date).toISOString().replace("T", " ").slice(0, -1)}
                                onChange={handleChangeDate}
                            />
                            {donationId ? (
                                <FormControl disabled={userRole === UserRole.USER} size="small">
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        label="Status"
                                        value={data.status}
                                        size="small"
                                        name="status"
                                        onChange={handleChange}
                                    >
                                        {Object.keys(DonationStatusClient).map(key => (
                                            <MenuItem key={key} value={key}>{DonationStatusClient[key]}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            ) : null}
                            {(userRole === 'admin' && donationId) ? (
                                <Autocomplete
                                    disabled={!userRole === UserRole.ADMIN}
                                    size='small'
                                    options={usersData?.rows || []}
                                    value={handleByUser}
                                    onChange={(_, value) => {
                                        setData(prev => ({
                                            ...prev,
                                            manageByUserId: value.id
                                        }))
                                    }}
                                    getOptionLabel={(option) => `${option.name} - ${option.email} - ${option.phone}`}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    loading={usersFetching || usersLoading || userFetching || userLoading}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Assign to"
                                        />
                                    )
                                    }
                                />
                            ) : null}
                            <Button disabled={disableButton} variant='contained' type="submit">Submit</Button>
                            {(user && userRole === UserRole.AGENT && donationId && (!donationData?.manageByUserId)) ? (
                                <Button disabled={disableButton} onClick={handleAssignToMe}>Assigned to me</Button>
                            ) : null}
                            {(donationId && (donationData?.userId === user?.id || donationData?.manageByUserId === user?.id)) ? (
                                <>
                                    {deleteDonation ? (
                                        <>
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Typography>Are you sure you want to delete this donation</Typography>
                                                <ButtonGroup>
                                                    <Button onClick={handleDeleteDonations}>Yes</Button>
                                                    <Button onClick={() => setDeleteDonation(false)}>No</Button>
                                                </ButtonGroup>
                                            </Box>
                                        </>
                                    ) : (
                                        <Button disabled={disableButton} onClick={() => setDeleteDonation(true)} variant='outlined' >Delete</Button>
                                    )}
                                </>
                            ) : null}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                        <Box mt={2} border="1px solid black" borderRadius={1} py={1} px={1}>
                            <Box mb={1} display="flex" justifyContent="space-between">
                                <Typography textTransform="uppercase" fontWeight={600}>Food Items</Typography>
                                <Box display="flex" gap={2}>
                                    <Button size="small" onClick={() => setOpenProductPicker(true)}>
                                        Buy products
                                    </Button>
                                    <IconButton sx={{ p: 0 }} onClick={addNewFood}>
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Divider />
                            <Stack mt={1} spacing={1}>
                                {data.donationItems.map((item, index) => (
                                    <Box key={index} display="flex">
                                        <IconButton disabled={item.productId} onClick={() => deleteDonationItem(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <TextField
                                            size='small'
                                            value={data.donationItems[index].name}
                                            onChange={(e) => {
                                                handleChangeFoodItem(index, 'name', e.target.value)
                                            }}
                                            disabled={item.productId}
                                            fullWidth={true}
                                            placeholder='Food name'

                                        />
                                        <TextField
                                            size='small'
                                            type='number'
                                            disabled={item.productId}
                                            value={data.donationItems[index].quantity}
                                            onChange={(e) => {
                                                handleChangeFoodItem(index, 'quantity', e.target.value)
                                            }}
                                            sx={{ width: '90px' }}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default DonationForm