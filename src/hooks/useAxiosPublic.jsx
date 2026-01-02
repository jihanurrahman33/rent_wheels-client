import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://rent-wheels-nine.vercel.app",
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
