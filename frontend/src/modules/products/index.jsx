import { Box, Button, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import Heading2 from '../../shared/page/Heading2'
import { useProducts } from '../../hooks/react-query/product/useProducts'
import { AppContext } from '../../context/AppContext'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { UserRole } from '../../constant/User'

const AllProductsScreen = () => {
    const {navigate, user} = useContext(AppContext);
    const { data, isLoading, refetch } = useProducts({
    });

    useEffect(()=>{
        refetch();
    },[])

    return (
        <Box boxShadow={2} p={2} height={"80vh"} sx={{overflowY:"auto"}}>
            <Heading2 title={"All Products"} loading={isLoading} />
            <Stack mt={2} spacing={1}>
                {user?.role === UserRole.SHOP?(
                    <Box display="flex" justifyContent="flex-end">
                        <Button onClick={() => {
                            navigate({
                                name:"/product-form"
                            })
                        }}>Add New Product</Button>
                    </Box>
                ):(null)}
                <Grid container spacing={2}>
                    {data && data.rows.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={6} lg={4}>
                            <Box boxShadow={2} p={1}>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Typography fontSize={14}>{product.name}</Typography>
                                    <IconButton onClick={()=>navigate({
                                        name:"/product-form",
                                        params:{
                                            productId:product.id
                                        }
                                    })}>
                                        <BorderColorIcon />
                                    </IconButton>
                                </Box>
                                <Typography fontSize={12}>{product.description}</Typography>
                                <Stack direction="row" gap={2}>
                                    {product.discount > 0 ?(
                                        <Typography color="red" sx={{textDecoration:"line-through"}}>{product.price.toFixed(2)}</Typography>
                                    ):null}
                                    <Typography>{product.discountPrice.toFixed(2)}</Typography>
                                </Stack>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Box>
    )
}

export default AllProductsScreen