import { Box, Button, ButtonGroup, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Heading2 from '../../shared/page/Heading2'
import { useProduct } from '../../hooks/react-query/product/useProduct'
import { useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import useHandleError from '../../hooks/useHandleError'
import ProductApi from '../../api/ProductApi'
import { useSnackbar } from 'notistack';

const initialProductData = {
    name: "",
    description: "",
    price: 0,
    discount:0    
}

const onlyNumberRegex = new RegExp('^[0-9]+$');

const ProductForm = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { user, navigate, userRole } = useContext(AppContext);
    const [data, setData] = useState(initialProductData);
    const [searchParams] = useSearchParams();
    const productId = parseInt(searchParams.get("productId") ?? "0");
    const { data: productData, isLoading, refetch } = useProduct(productId, {})
    const handleError = useHandleError();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [deleteProduct, setDeleteProduct] = useState(false);

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

    useEffect(() => {
        if (productId) {
            refetch();
        } else {
            setData(initialProductData);
        }
    }, [productId, refetch])

    useEffect(() => {
        if (productId && productData) {
            setData(productData);
        }
    }, [productData])

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            await ProductApi.createOrUpdateProductAsync(data);
            enqueueSnackbar(
                productId ? "Product updated successfully" : "Product added successfully",
                {
                    autoHideDuration: 3000,
                    variant: "success"
                }
            )
            if (!productId) {
                setData(initialProductData);
                navigate({
                    name: "/product-form"
                })
            }
        } catch (error) {
            handleError(error);
        }
        setLoading(false);
    }

    const handleDeleteProducts = async () => {
        setLoading(true)
        try {
            await ProductApi.deleteProductAsync(productId);
            enqueueSnackbar(
                "Product deleted successfully",
                {
                    autoHideDuration: 3000,
                    variant: "success"
                }
            )
            navigate({
                name: "/my-products"
            })
        } catch (error) {
            handleError(error);
        }
        setLoading(false);
    }

    const disableButton = loading;

    return (
        <Box boxShadow={2} p={2} minHeight={"80vh"}>
            <Heading2 title={productId ? `Edit product ID: ${productId}` : "Add Product"} loading={isLoading} />
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
                        name="description"
                        label="Description"
                        size="small"  
                        type='text'
                        multiline={true}
                        minRows={2}
                        required={true}
                        value={data.description}
                        onChange={handleChange}
                    />
                    <TextField
                        name="price"
                        label="Price"
                        size="small"
                        type='number'
                        required={true}
                        value={data.price}
                        onChange={handleChange}
                    />
                    <TextField
                        name="discount"
                        label="Discount (0 - 100)"
                        size="small"
                        type='number'
                        required={true}
                        value={data.discount}
                        onChange={handleChange}
                    />
                    <Button disabled={disableButton} variant='contained' type="submit">Submit</Button>
                    {(productId) ? (
                        <>
                            {deleteProduct ? (
                                <>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography>Are you sure you want to delete this product</Typography>
                                        <ButtonGroup>
                                            <Button onClick={handleDeleteProducts}>Yes</Button>
                                            <Button onClick={() => setDeleteProduct(false)}>No</Button>
                                        </ButtonGroup>
                                    </Box>
                                </>
                            ) : (
                                <Button disabled={disableButton} onClick={() => setDeleteProduct(true)} variant='outlined' >Delete</Button>
                            )}
                        </>
                    ) : null}
                </Stack>
            </form>
        </Box>
    )
}

export default ProductForm