/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function RecentProducts() {

    function getRecent() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }

    let { addCart } = useContext(CartContext);
const [Loading, setLoading] = useState(false)
const [CurrentProductId, setCurrentProductId] = useState(0)

    async function addProductCart(productId) {
        setCurrentProductId(productId)
        setLoading(true);
    localStorage.getItem('userToken')
        console.log(productId);
        toast.promise(
            addCart(productId),
            {
                loading: 'Adding product to your cart...',
                success: (response) => {
                    if (response?.data?.status === "success") {
                        setLoading(false)
                        return 'Product added successfully to your cart.';
                    } else {
                        setLoading(false)
                        toast.error(response.data.message,{
                            duration:1000,
                            position:'top-center',
                        })
                        throw new Error("This didn't success.");
                    }
                },
                error: () => `Error: This didn't work`,
            }
        );
    }
    let { data, isError, error, isLoading, isFetching } =
        useQuery({
            queryKey: ['recentProdcuts'],
            queryFn: getRecent,
            // refetchInterval:3000, 
            // refetchInterval:1000, 
            // refetchIntervalInBackground:true, 
            // staleTime:0,
            // refetchOnWindowFocus:true
            // retry:6,
            // retryDelay:5000,
            // gcTime:4000,
            select: (data) => data.data.data
        });

    if (isLoading) {
        return <div className='py-8 w-full flex justify-center'>
            <ClimbingBoxLoader color='green' />
        </div>
    }
    if (isError) {
        return <div className='py-8 w-full flex justify-center'>
            <h3>{error}</h3>
        </div>
    }

    return (
        <>
            <div className="row">
                {/* ?.data.data  X  select */}
                {data.map((product) => 
                    <div key={product.id} className="w-1/6 px-4">
                        <div className="product py-4">
                            <Link to={`/produtDetails/${product.id}/${product.category.name}`}>
                                <img className='w-full' src={product.imageCover} alt={product.title} />
                                <span className='block font-light mt-2 text-green-600'>{product.category.name}</span>
                                <h3 className='text-lg font-normal text-gray-600 mb-4'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                                <div className='flex justify-between items-center'>
                                    <span>{product.price} EGP</span>
                                    <span>{product.ratingsAverage}<i className='fas fa-star text-yellow-400'></i></span>
                                </div>
                            </Link>
                            <button onClick={() => addProductCart(product.id)} className='btn'>
                                {CurrentProductId ===  product.id && Loading?<i className='fas fa-spinner fa-spain'></i>:'add to cart'}</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
