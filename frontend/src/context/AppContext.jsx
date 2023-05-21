import { createContext, useEffect, useState, useRef } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { UserRole } from "../constant/User";
import DefaultLayout from "../shared/layout/DefaultLayout";
import Routes from "../Routes";
import { getAccessToken, removeAccessToken, storeAccessToken } from "../utils/LocalDataStorage.Utils";
import useHandleError from "../hooks/useHandleError";
import { setAuthHeader } from "../api/AxiosInstance";
import UserApi from "../api/UserApi";

export const AppContext = createContext(null);

const AppProvider = () => {
    const appNavigate = useNavigate();
    const [userRole, setRole] = useState(UserRole.USER);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    const handleError = useHandleError();

    const updateLoading = (status) => {
        setLoading(status);
    }

    const navigate = (to) => {
        const search = to.params?`?${createSearchParams(Object.keys(to.params).map(key => ([key, to.params[key]])))}`:undefined
        appNavigate({
            pathname:to.name,
            search:search
        })
    }

    const logout = () => {
        removeAccessToken();
        setUser(null);
        setRole(UserRole.USER);
        navigate({
            name:"/login"
        })
    }

    const updateAuth = (authResponse) => {
        if(authResponse.accessToken){
            storeAccessToken(authResponse.accessToken);
            setAuthHeader(authResponse.accessToken);
        }
        if(authResponse.user){
            setUser(authResponse.user);
            setRole(authResponse.user.role);
            navigate({
                name:`/${authResponse.user.role}-dashboard`
            })
        }else{
            setUser(null);
            setRole(UserRole.USER);
            navigate({
                name:'/'
            })
        }
    }

    const initializeAuth = async () => {
        const accessToken = getAccessToken();
        setAuthLoading(true);
        try{
            if(accessToken){
                setAuthHeader(accessToken);
                const authResponse = await UserApi.getCurrentUserDetailAsync();
                updateAuth(authResponse);
            }else{
                navigate({
                    name:'/'
                })
            }
        }catch(error){
            console.log(error);
            handleError(error, "Please Login / SignUp");
            setUser(null);
            setRole(UserRole.USER);
            removeAccessToken();
            navigate({
                name:'/'
            })
        }
        setAuthLoading(false);
    }

    useEffect(()=>{
        initializeAuth();
    },[])

    const appLoading = loading || authLoading;

    const appContextValue = {
        userRole,
        user,
        appLoading,
        updateLoading,
        navigate,
        updateAuth,
        logout
    }

    return (
        <AppContext.Provider value={appContextValue}>
            <DefaultLayout>
                <Routes />
            </DefaultLayout>
        </AppContext.Provider>
    )

}

export default AppProvider;