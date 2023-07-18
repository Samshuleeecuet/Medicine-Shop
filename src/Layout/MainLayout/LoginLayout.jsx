import React from 'react';
import Login from '../../pages/Login/Login';
import { Outlet } from 'react-router-dom';

const LoginLayout = () => {
    return (
        <>
        <Outlet/>
        </>
    );
};

export default LoginLayout;