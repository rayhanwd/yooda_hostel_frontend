import React from 'react';
import { Navigate } from 'react-router-dom';

const Private = ({ children }) => {
    const auth = JSON.parse(localStorage.getItem('userInfo'));
    return (
        auth?.email ? children : <Navigate to="/login" />
    );
}

export default Private;