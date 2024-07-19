/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import style from './Layout.module.css'
import { Outlet } from 'react-router-dom';
import  Navbar from './../Navbar/Navbar';
import  Footer from './../Footer/Footer';

export default function Layout() {



    const [counter, setCounter] = useState(0)
    useEffect(() => { }, []);
return (
    <>
    <Navbar/>
    <div className="container mx-auto my-10 py-10 ">
        <Outlet></Outlet>
    </div>
    <Footer/>
    </>
)
}
