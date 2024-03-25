import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/register";

export const selectRole = async (payload: {
    email: string;
    role: string;
}) => {
    const res = await axios.post(`${BASE_URL}/select-role`, payload);
    return res;
}