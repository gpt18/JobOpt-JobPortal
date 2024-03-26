import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/register";

export const selectRole = async (payload: {
    email: string;
    role: string;
}) => {
    const res = await axios.post(`${BASE_URL}/select-role`, payload);
    return res;
}

export const createCompanyProfile = async (payload: {
    companyName: string;
    websiteLink: string;
    companySize: string;
    companyLogo: string;
}) => {
    const cid = localStorage.getItem('cid');
    const res = await axios.post(`${BASE_URL}/company/${cid}`, payload);
    return res;
}
