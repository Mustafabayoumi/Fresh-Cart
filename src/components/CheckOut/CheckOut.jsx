/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-constant-condition */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import style from './Checkout.module.css';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { CartContext } from './../../Context/CartContext';

    

export default function Checkout() {

    let {Checkout} = useContext(CartContext)
    let formik = useFormik({
        initialValues: {
            details:'',
            phone:'',
            city:'',
        },
        onSubmit:()=>handeleCheckout('66895901ed0dc0016c790d82' ,'http://localhost:5173')
    })

    async  function handeleCheckout(cartId , url){
        let {data} = await Checkout(cartId , url , formik.values);
        if(data.status === 'success')
        {
            window.location.href = data.session.url;
        }
        // console.log(data.session.url);
}    

return (

<div className='py-6 max-w-xl mx-auto'>
<h2 className='text-3xl font-bold text-green-600 mb-6'>Checkout Now</h2>
    <form onSubmit={formik.handleSubmit}>

<div className="relative z-0 w-full mb-5 group">
        <input id='detalis' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="text" name="detalis" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
        <label  htmlFor="detalis" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your detalis Address</label>
    </div>  

    <div className="relative z-0 w-full mb-5 group">
        <input id='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
        <label  htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
    </div>  

    <div className="relative z-0 w-full mb-5 group">
        <input id='city' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" name="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
        <label  htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your city</label>
    </div>  

    <div className='flex items-center'>
    <button type="submit" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-500">
        Pay Now
    </button>
    </div>
</form>  
</div>
)}
