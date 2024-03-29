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
            state.cid = action.payload.cid;
            state.name = action.payload.name;
            state.website = action.payload.website;
            state.size = action.payload.size;
            state.logo = action.payload.logo;
            state.email = action.payload.email;
            state.balance = action.payload.balance;
        },
        updatePost: (state, action) => {
            state.addJob = {
                ...state.addJob,
                ...action.payload
            };
        },
        setBalance: (state, action) => {
            state.balance = action.payload;
        }
    },
});

export const { setProfile, updatePost, setBalance } = companySlice.actions;
export default companySlice.reducer;