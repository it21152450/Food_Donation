import React from 'react'
import { useSnackbar } from 'notistack';

const useHandleError = () => {
    const { enqueueSnackbar } = useSnackbar();

    const handleError = (error, message) => {
        if(error.response && error.response.data && error.response.data.message){
            enqueueSnackbar(
                error.response.data.message,
                {
                    autoHideDuration: 3000,
                    variant:"error"
                }
            )
        }else{
            enqueueSnackbar(
                message||"Something went wrong",
                {
                    autoHideDuration: 3000,
                    variant:"error"
                }
            )
        }
    }

    return handleError;

}

export default useHandleError