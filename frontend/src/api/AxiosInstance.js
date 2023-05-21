import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "/api"
});

export const setAuthHeader = (authToken) => {
    if (authToken) {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    }
};

export const removeAuthHeader = () => {
    axiosInstance.defaults.headers.common.Authorization = '';
};

export default axiosInstance;