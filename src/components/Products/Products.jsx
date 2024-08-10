/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import style from './Products.module.css';
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { CartContext } from '../../Context/CartContext';
import useProducts from './../Hooks/useProducts';
import toast from 'react-hot-toast';

export default function Products() {
    const [CurrentProductId, setCurrentProductId] = useState(0);
    const [Loading, setLoading] = useState(false);

    const { addCart, setCart } = useContext(CartContext);

    let { data, isError, error, isLoading } = useProducts();

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

    async function addProductCart(productId) {
        setCurrentProductId(productId);
        setLoading(true);
        localStorage.getItem('userToken');
        console.log(productId);
        toast.promise(
            addCart(productId),
            {
                loading: 'Adding product to your cart...',
                success: (response) => {
                    if (response?.data?.status === "success") {
                        setLoading(false);
                        setCart(response.data);
                        return 'Product added successfully to your cart.';
                    } else {
                        setLoading(false);
                        toast.error(response.data.message, {
                            duration: 1000,
                            position: 'top-center',
                        });
                        throw new Error("This didn't succeed.");
                    }
                },
                error: () => `Error: This didn't work`,
            }
        );
    }

    return (
        <>
            <div className="row">
                {data?.data.data.map((product) =>
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
                            <button onClick={() => addProductCart(product._id)} className='btn'>
                                {CurrentProductId === product._id && Loading ? <i className='fas fa-spinner fa-spin'></i> : 'add to cart'}
                                <i className="fa fa-shopping-basket p-1" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

    