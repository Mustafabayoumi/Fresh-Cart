/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ClimbingBoxLoader } from 'react-spinners';
import styles from './BrandDetails.module.css';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

const BrandDetails = () => {
    const { id } = useParams();
    const [brandDetails, setBrandDetails] = useState(null);
    const [relatedBrands, setRelatedBrands] = useState([]);
    const { addCart } = useContext(CartContext);
    const [Loading, setLoading] = useState(false);
    const [CurrentProductId, setCurrentProductId] = useState(0);

    useEffect(() => {
        if (id) {
            getBrandDetails(id);
        }
    }, [id]);

    useEffect(() => {
        if (brandDetails) {
            getRelatedBrands(brandDetails.name);
        }
    }, [brandDetails]);

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

    function getBrandDetails(id) {
        axios
            .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
            .then(({ data }) => {
                setBrandDetails(data.data);
            })
            .catch((error) => {
                console.error("Error fetching brand details", error);
            });
    }

    function getRelatedBrands(brandName) {
        axios
            .get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then(({ data }) => {
                let allBrands = data.data;
                let related = allBrands.filter((product) => product.brand.name === brandName);
                setRelatedBrands(related);
            })
            .catch((error) => {
                console.error("Error fetching related brands", error);
            });
    }

    if (!brandDetails) {
        return <div className='py-8 w-full flex justify-center'>
            <ClimbingBoxLoader color='green' />
        </div>;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-4 text-green-600">{brandDetails.name}</h1>
            <img src={brandDetails.image} alt={`${brandDetails.name} logo`} className="w-full h-64 object-cover" />
            <div className="p-4">
                <p>{brandDetails.description}</p>
            </div>
            <div className="row mx-auto w-[95%]">
                {relatedBrands.length > 0 ? (
                    relatedBrands.map((brand) => (
                        <div key={brand._id} className="w-1/6">
                            <div className={`${styles.brand} rounded-md my-2 py-2 px-2 flex flex-col justify-start items-center`}>
                                <Link to={`/ProductDetails/${brand.id}/${brand.category.name}`}>
                                    <img className="w-full rounded-md" src={brand.imageCover} alt={brand?.name} />
                                    <span className="block font-normal text-green-500 mt-2 ">{brand.category.name} </span>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                        {brand.title.split(" ").slice(0, 2).join(" ")}
                                    </h2>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-green-500">
                                            {brand.price}
                                            <span className="font-normal ms-1">EGP</span>{" "}
                                        </span>
                                        <span className="text-lg font-normal text-green-500 py-2">
                                            {brand.ratingsAverage}{" "}
                                            <i className="fas fa-star text-yellow-300" />
                                        </span>
                                    </div>
                                </Link>
                                <div className="flex flex-col justify-start items-center">
                                    <button onClick={() => addProductCart(brand._id)} className='btn art shadow-md px'>
                                {CurrentProductId ===  brand._id && Loading?<i className='fas fa-spinner fa-spain'></i>:'add to cart'}
                                <i className="fa fa-shopping-basket p-1" aria-hidden="true"></i>
                                </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No related brands found</p>
                )}
            </div>
        </div>
    );
};

export default BrandDetails;
