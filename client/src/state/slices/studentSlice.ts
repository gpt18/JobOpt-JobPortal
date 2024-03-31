import { createSlice } from "@reduxjs/toolkit";

interface StudentState {
    sid: string;
    balance: number;
    name: string;
    email: string;
    resume: string;
    location: string;
    profilePic: string;
    phone: string;
}

const initialState: StudentState = {
    sid: '',
    email: '',
    balance: 0,
    name: '',
    resume: '',
    location: '',
    profilePic: '',
    phone: '',
};

const studentSlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            Object.assign(state, action.payload); 
        },
        setBalance: (state, action) => {
            state.balance = action.payload;
        },
        reset: () => initialState,
    },
});

export const { setProfile, setBalance, reset } = studentSlice.actions;
export default studentSlice.reducer;