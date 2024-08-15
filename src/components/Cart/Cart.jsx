/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css';
import { CartContext } from './../../Context/CartContext';
import { Link } from 'react-router-dom';


export default function Cart() {
    let { getCartItems, UpdatCartItemCount, deleteProductItem , setCart } = useContext(CartContext);
    const [CartDetails, setCartDetails] = useState();

    async function getCartItemsData() {
        let response = await getCartItems();
        //re-render
        setCartDetails(response.data.data)
////            // console.log(response.data.data);

    }
    useEffect(() => {
        // Component didmount
        getCartItemsData();
    }, []);


    async function deleteItem(productId) {
        let response = await deleteProductItem(productId);
        //re-render
        setCartDetails(response.data.data)
////        // console.log(response.data.data);
        setCart(response.data)
    }

    async function UpdatCartCount(productId, count) {
        let response = await UpdatCartItemCount(productId, count);
////        console.log(response.data.data);
        //re-render
        setCartDetails(response.data.data)
    }


return (
<>
    <div className="relative overflow-x-auto sm:rounded-lg">
        <h2 className='text-3xl text-green-600 py-5 text-center'>Shopping Cart</h2>
        <h3 className='text-center text-slate-600 '><span className='font-semibold'>Total Cart Price</span> :{CartDetails?.totalCartPrice} EGP</h3>
        <table className="w-3/4 mx-auto my-6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Qty
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
            </thead>
            <tbody>
                {CartDetails?.products.map((product) =>
                    <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="p-2">
                            <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                        </td>
                        <td className="px-4 py-2 font-semibold text-gray-900 dark:text-white">
                            {product.product.title}
                        </td>
                        <td className="px-4 py-2">
                            <div className="flex items-center">
                                <button onClick={() => UpdatCartCount(product.product.id, product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                    <span className="sr-only">Quantity button</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                    </svg>
                                </button>
                                <div>
                                    <span>{product.count}</span>
                                </div>
                                <button onClick={() => UpdatCartCount(product.product.id, product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                    <span className="sr-only">Quantity button</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                        <td className="px-4 py-2 font-semibold text-gray-900 dark:text-white">
                            {product.price}<span className='mx-1'>EGP</span>
                        </td>
                        <td className="px-4 py-2">
                            <span onClick={()=>deleteItem(product.product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        <Link to={'/checkout'} >
        <div className='row--'>
        <button  className=' btn--'>CheckOut Now</button>
        </div>
        </Link>
    </div>
</>
)
}
