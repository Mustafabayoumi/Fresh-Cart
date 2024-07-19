/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import { CounterContext } from '../../Context/CounterContext';
import RecentProducts from './../RecentProducts/RecentProducts';
import CategoriesSlider from './../CategoriesSlider/CategoriesSlider';
import MainSlider from './../MainSlider/MainSlider';


export default function Home() {
    useEffect(() => { }, []);


    let {Counter , setCounter} = useContext(CounterContext)
return (
    <>
    <MainSlider/>
    <CategoriesSlider/>
    <RecentProducts />
    </>
)
}
