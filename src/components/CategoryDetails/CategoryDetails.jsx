/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ClimbingBoxLoader } from 'react-spinners';
import styles from './CategoryDetails.module.css';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { useContext } from 'react';


const CategoryDetails = () => {
    const { id } = useParams();
    const [categoryDetails, setCategoryDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    let { addCart } = useContext(CartContext);
    const [Loading, setLoading] = useState(false)
    const [CurrentProductId, setCurrentProductId] = useState(0)
    

    useEffect(() => {
        if (id) {
            getCategoryDetails(id);
        }
    }, [id]);

    useEffect(() => {
        if (categoryDetails) {
            getRelatedProducts(categoryDetails.name);
        }
    }, [categoryDetails]);



    async function addProductCart(productId) {
        setCurrentProductId(productId)
        setLoading(true);
    localStorage.getItem('userToken')
//        console.log(productId);
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





    function getCategoryDetails(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
            .then(({ data }) => {
                setCategoryDetails(data.data);
            })
            .catch((error) => {
                console.error("Error fetching category details", error);
            });
    }

    function getRelatedProducts(categoryName) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then(({ data }) => {
                let allProducts = data.data;
                let related = allProducts.filter((product) => product.category.name === categoryName);
                setRelatedProducts(related);
            })
            .catch((error) => {
                console.error("Error fetching related products", error);
            });
    }

    if (!categoryDetails) {
        return <div className='py-8 w-full flex justify-center'>
            <ClimbingBoxLoader color='green' />
        </div>;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-4 text-green-600">{categoryDetails.name}</h1>
            <img src={categoryDetails.image} alt={`${categoryDetails.name} image`} className="w-full h-64 object-contain" />
            <div className="p-4">
                <p>{categoryDetails.description}</p>
            </div>

            <div className="row mx-auto w-[95%]">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((product) => (
                        <div key={product?._id} className="w-1/5 ">
                            <div className={`${styles.product} rounded-md my-2 py-2 px-2 flex flex-col justify-start items-center`}>
                                <Link to={`/ProductDetails/${product?.id}/${product?.category?.name}`}>
                                    <img className="w-full rounded-sm" src={product?.imageCover} alt={product?.name} />
                                    <span className="block font-normal text-green-500 mt-1 ">{product.category.name} </span>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                        {product.title.split(" ").slice(0, 2).join(" ")}
                                    </h2>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-green-500">
                                            {product?.price}
                                            <span className="font-normal ms-1">EGP</span>{" "}
                                        </span>
                                        <span className="text-lg font-normal text-green-500 py-2">
                                            {product?.ratingsAverage}{" "}
                                            <i className="fas fa-star text-yellow-300" />
                                        </span>
                                    </div>
                                </Link>
                                <div className="flex flex-col justify-start items-center">
                                    <button onClick={() => addProductCart(product.id)} className='btn art shadow-md px'>
                                {CurrentProductId ===  product.id && Loading?<i className='fas fa-spinner fa-spain'></i>:'add to cart'}
                                <i className="fa fa-shopping-basket p-1" aria-hidden="true"></i>
                                </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No related products found</p>
                )}
            </div>
        </div>
    );
};

export default CategoryDetails;
