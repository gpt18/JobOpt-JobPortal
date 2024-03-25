import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/company";

export const getCompanyBalance = async (payload: {
    cid: string;
}) => {
    const res = await axios.get(`${BASE_URL}/balance/${payload.cid}`);
    return res;
}