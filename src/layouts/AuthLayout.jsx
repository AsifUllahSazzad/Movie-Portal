import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';

const AuthLayout = () => {
    return (
        <div className=''>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default AuthLayout;