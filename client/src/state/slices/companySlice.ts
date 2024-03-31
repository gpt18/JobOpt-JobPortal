import { createSlice } from "@reduxjs/toolkit";

interface CompanyState {
    cid: string;
    balance: number;
    name: string;
    email: string;
    website: string;
    size: string;
    logo: string;
    addJob: {
        roleName: string;
        location: string;
        minCTC: string;
        maxCTC: string;
        rr: Number;
    }
}

const initialState: CompanyState = {
    cid: '',
    email: '',
    balance: 0,
    name: '',
    website: '',
    size: '',
    logo: '',
    addJob: {
        roleName: '',
        location: '',
        minCTC: '',
        maxCTC: '',
        rr: 0.0
    }
};

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            Object.assign(state, action.payload);
        },
        updatePost: (state, action) => {
            state.addJob = {
                ...state.addJob,
                ...action.payload
            };
        },
        setBalance: (state, action) => {
            state.balance = action.payload;
        },
        reset: () => initialState,
    },
});

export const { setProfile, updatePost, setBalance, reset } = companySlice.actions;
export default companySlice.reducer;