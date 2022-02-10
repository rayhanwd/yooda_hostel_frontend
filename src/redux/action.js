import { authSlice } from './authSlice';

const { actions: slice } = authSlice;

export const emailLoggedAction = (authdetails) => (dispatch) => {
    dispatch(slice.emailAuth(authdetails))
}

export const logOutAction = () => (dispatch) => {
    dispatch(slice.logOut())
}