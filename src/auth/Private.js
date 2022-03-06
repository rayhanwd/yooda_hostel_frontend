import React from 'react';
import { Navigate } from 'react-router-dom';

const Private = ({ children }) => {
    const token = JSON.parse(localStorage.getItem('token'));
    return (
        token ? children : <Navigate to="/login" />
    );
}

export default Private;