import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/register`;

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
    email?: string;
}) => {
    const email = localStorage.getItem('email');
    if(email) {
        payload = {...payload, email};
    }
    const res = await axios.post(`${BASE_URL}/company/create`, payload);
    return res;
}

export const createStudentProfile = async (payload: {
    name: string;
    resume: string;
    phone: string;
    profilePic: string;
    location: string;
    email?: string;
}) => {
    const email = localStorage.getItem('email');
    if(email) {
        payload = {...payload, email};
    }
    const res = await axios.post(`${BASE_URL}/student/create`, payload);
    return res;
}
