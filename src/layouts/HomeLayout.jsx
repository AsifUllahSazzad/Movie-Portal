import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar/>

                <Outlet/>
            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default HomeLayout;