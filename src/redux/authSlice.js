import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authdetails: {
            
        },
    },
    reducers: {
        emailAuth: (state, action) => {
            state.authdetails = action.payload

        },
        customAuth: (state, action) => {
            state.authdetails = action.payload

        },
        logOut: (state, action) => {
            state.authdetails = {}
        }
    },
})