import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/student`;

export const getStudentProfile = async (payload: {
    email: string;
}) => {
    const res = await axios.get(`${BASE_URL}/profile/${payload.email}`);
    return res;
}

export const getAccountHistory = async (payload: { id: string }) => {
    const res = await axios.get(`${BASE_URL}/account-history/${payload.id}`);
    return res;
}

export const getAllJobs = async () => {
    const res = await axios.get(`${BASE_URL}/all-jobs`);
    return res;
}

export const applyJob = async (payload: {
    sid: string;
    jid: string;
}) => {
    const res = await axios.post(`${BASE_URL}/apply-job/${payload.jid}`, { sid: payload.sid});
    return res;
};

export const getAppliedJobs = async (payload: {
    sid: string;
}) => {
    const res = await axios.get(`${BASE_URL}/applied-jobs/${payload.sid}`);
    return res;
}