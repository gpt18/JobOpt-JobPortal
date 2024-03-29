import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/company";

export const getCompanyBalance = async (payload: {
    cid: string;
}) => {
    const res = await axios.get(`${BASE_URL}/balance/${payload.cid}`);
    return res;
}


export const getCompanyProfile = async (payload: {
    email: string;
}) => {
    const res = await axios.get(`${BASE_URL}/profile/${payload.email}`);
    return res;
}

export const getAccountHistory = async (payload: {id: string}) => {
    const res = await axios.get(`${BASE_URL}/account-history/${payload.id}`);
    return res;
}


export const calculatePostRR = (payload: {
    roleName: string;
    location: string;
}) => {

    return 2*(payload.roleName.length) + 5*(payload.location.length)

}

export const getIndianCities = async () => {
    const res = await axios.get('https://raw.githubusercontent.com/nshntarora/Indian-Cities-JSON/master/cities.json');
    return res;
}

export const postJob = async (payload: {
    cid: string;
    roleName: string;
    location: string;
    minCTC: string;
    maxCTC: string;
}) => {
    const res = await axios.post(`${BASE_URL}/post-job`, payload);
    return res;
}