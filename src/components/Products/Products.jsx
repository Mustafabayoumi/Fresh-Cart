/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import style from './Products.module.css'
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import useProducts from './../Hooks/useProducts';


export default function Products() {
    const [counter, setCounter] = useState(0)
    useEffect(() => { }, []);
let {data , isError ,error , isLoading , isFetching} =useProducts();
    
    if(isLoading)
        {
            return <div className='py-8 w-full flex justify-center'>
            <ClimbingBoxLoader color='green'/>
            </div>
        }
    if(isError)
        {
            return <div className='py-8 w-full flex justify-center'>
                <h3>{error}</h3>
            </div>
        }
    


    return (
        <>
        <div className="row">
        {data?.data.data.map((product)=>
            <div key={product.id} className="w-1/6 px-4">
            <div className="product py-4">
                <Link to={`/produtDetails/${product.id}/${product.category.name}`}>  
                <img className='w-full' src={product.imageCover} alt={product.title} />
                <span className='block font-light mt-2 text-green-600'>{product.category.name}</span>
                <h3 className='text-lg font-normal text-gray-600 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
                
                <div className='flex justify-between items-center'>
                    <span>{product.price} EGP</span>
                    <span>{product.ratingsAverage}<i className='fas fa-star text-yellow-400'></i></span>
                </div>
                <button className='btn'>add to cart</button>
            </Link>
        </div>
    </div>
        )}
    
        </div>
        </>
    )}
    