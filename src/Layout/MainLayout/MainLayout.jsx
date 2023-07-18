import React from 'react';
import Navbar from '../../Shared/Navbar';
import { Outlet } from 'react-router-dom';
import Container from '../../Shared/Cointainer';

const MainLayout = () => {
    return (
        <>
         <Navbar/>
         <Container>
         <Outlet/> 
        </Container>  
        </>
    );
};

export default MainLayout;