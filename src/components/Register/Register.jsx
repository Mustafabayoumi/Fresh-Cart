/* eslint-disable no-constant-condition */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import style from './Register.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup  from 'yup'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Register() {
    let {setUserLogin} = useContext(UserContext)
    let navigate = useNavigate();

const [apiError, setApiError] = useState('')
const [isloding, setIsloding] = useState(false)

    function handleRegister(formValues)
{
    setIsloding(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,formValues)
    .then((response) => {
        if(response.data.message === 'success')
            {
                localStorage.getItem('userToken' , response.data.token)
                
                setUserLogin(response.data.token)
                navigate('/')
            }
        // setIsloding(false)
        console.log(response.data.message);
    })
    .catch((error) =>{
        console.log(error);
        setIsloding(false)
        setApiError(apiResponse?.response?.data?.message);
        // console.log(apiResponse?.response?.data?.message);
    
    })

    console.log(formValues);
    console.log('Register');
}


let validationSchema = Yup.object().shape({
    name: Yup.string().min(3 , 'name minlength is 3').max(10 , 'name maxlength is 10').required('name is repuired'),
    email: Yup.string().email('email is not valid').required('email is repuired'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/,'phone must be valid egyption number').required('phone is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'password must start wieth uppercase').required('password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')],'paasword and re Password must be ').required('rePassword is required'),
})


let formik = useFormik({
    initialValues: {
        name:'',
        phone:'',
        email:'',
        password:'',
        rePassword:''
    },
    validationSchema:validationSchema,
    onSubmit:handleRegister
})

return (
<>
<div className='py-6 max-w-xl mx-auto'>

{apiError?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
    {apiError}
    </div>:null}

    <h2 className='text-3xl font-bold text-green-600 mb-6'>Register Now</h2>
<form onSubmit={formik.handleSubmit}>
    <div className="relative z-0 w-full mb-5 group">
        <input id='name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
        <label  htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name :</label>
    </div>  

    {formik.errors.name && formik.touched.name?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
    {formik.errors.name}</div>:null}
    
<div className="relative z-0 w-full mb-5 group">
        <input id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
        <label  htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email Address</label>
    </div>  

    {formik.errors.email && formik.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
    {formik.errors.email}</div>:null}


    <div className="relative z-0 w-full mb-5 group">
        <input id='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
        <label  htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your phone Number</label>
    </div>  

    {formik.errors.phone && formik.touched.phone?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
    {formik.errors.phone}</div>:null}


    <div className="relative z-0 w-full mb-5 group">
        <input id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
        <label  htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
    </div>  

    {formik.errors.password && formik.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
    {formik.errors.password}</div>:null}


    <div className="relative z-0 w-full mb-5 group">
        <input id='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
        <label  htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your rePassword</label>
    </div>  


    {formik.errors.rePassword && formik.touched.rePassword?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
    {formik.errors.rePassword}</div>:null}


    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-500">
        {isloding?<i className='fas fa-spinner fa-spin'></i>:"Submit"}
        </button>
</form>  

</div>
</>
)
}
