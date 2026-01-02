import axios from "axios";
import { useEffect, use } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const axiosSecure = axios.create({
    baseURL: "https://rent-wheels-nine.vercel.app",
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = use(AuthContext); // Access context directly with use() in React 19

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("token");
                if (token) {
                    config.headers.authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;
                if (status === 401 || status === 403) {
                    await logOut();
                    navigate("/login");
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
