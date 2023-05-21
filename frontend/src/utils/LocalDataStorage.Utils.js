export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
}

export const storeAccessToken = (accessToken) => {
    localStorage.removeItem("accessToken");
    localStorage.setItem("accessToken", accessToken);
}

export const removeAccessToken = () => {
    localStorage.removeItem("accessToken");
}