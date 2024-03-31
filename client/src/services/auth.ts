import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/auth`;

export const sendOtp = async (payload: {
    email: string;
}) => {
    const res = await axios.post(`${BASE_URL}/send-otp`, payload);
    return res;
}

export const verifyOtp = async (payload: {
    email: string;
    otp: string;
}) => {
    const res = await axios.post(`${BASE_URL}/verify-otp`, payload);
    return res;
}