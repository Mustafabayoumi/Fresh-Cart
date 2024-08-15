/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import style from './ProdutDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { ClimbingBoxLoader } from 'react-spinners';

export default function ProductDetails() {
    let { id, category } = useParams();
    const { addCart } = useContext(CartContext);
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [CurrentProductId, setCurrentProductId] = useState(0);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        if (id && category) {
            getProductDetails(id);
            getRelatedProducts(category);
        }
    }, [id, category]);

    async function addProductCart(productId) {
        setCurrentProductId(productId);
        setLoading(true);
        localStorage.getItem('userToken');
//        console.log(productId);
        toast.promise(
            addCart(productId),
            {
                loading: 'Adding product to your cart...',
                success: (response) => {
                    if (response?.data?.status === "success") {
                        setLoading(false);
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

    function getProductDetails(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then(({ data }) => {
                setProductDetails(data.data);
            })
            .catch((error) => {
                console.error("Error fetching product details", error);
            });
    }

    function getRelatedProducts(category) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then(({ data }) => {
                let allProducts = data.data;
                let related = allProducts.filter((product) => product.category.name === category);
                setRelatedProducts(related);
//                console.log(related);
            })
            .catch((error) => {
                console.error("Error fetching related products", error);
            });
    }

    if (!productDetails) {
        return <div className='py-8 w-full flex justify-center'>
            <ClimbingBoxLoader color='green' />
        </div>;
    }

    return (
        <>
            <div className="row">
                <div className="w-1/4">
                    <Slider {...settings}>
                        {productDetails?.images.map((src) => (
                            <img key={id} className='w-full' src={src} alt={productDetails?.title} />
                        ))}
                    </Slider>
                </div>
                <div className="w-3/4 p-6">
                    <h1 className='text-lg font-medium text-gray-950'>{productDetails?.title}</h1>
                    <p className='text-gray-700 mt-7 font-light'>{productDetails?.description}</p>

                    <div className='flex my-4 justify-between items-center'>
                        <span>{productDetails?.price} EGP</span>
                        <span>{productDetails?.ratingsAverage}<i className='fas fa-star text-yellow-400'></i></span>
                    </div>
                    <button onClick={() => addProductCart(productDetails._id)} className='btn'>
                        {CurrentProductId === productDetails._id && Loading ? <i className='fas fa-spinner fa-spin'></i> : 'add to cart'}
                        <i className="fa fa-shopping-basket p-1" aria-hidden="true"></i>
                    </button>
                </div>
            </div>

            <div className="row">
                {relatedProducts.map((product) =>
                    <div key={product.id} className="w-1/6">
                        <div className="product py-4">
                            <Link to={`/produtDetails/${product.id}/${product.category.name}`}>
                                <img className='w-full' src={product.imageCover} alt={product.title} />
                                <span className='block font-light mt-2 text-green-600'>{product.category.name}</span>
                                <h3 className='text-lg font-normal text-gray-600 mb-4'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                                <div className='flex justify-between items-center'>
                                    <span>{product.price} EGP</span>
                                    <span>{product.ratingsAverage}<i className='fas fa-star text-yellow-400'></i></span>
                                </div>
                                <button onClick={() => addProductCart(product._id)} className='btn'>
                                    {CurrentProductId === product._id && Loading ? <i className='fas fa-spinner fa-spin'></i> : 'add to cart'}
                                    <i className="fa fa-shopping-basket p-1" aria-hidden="true"></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
