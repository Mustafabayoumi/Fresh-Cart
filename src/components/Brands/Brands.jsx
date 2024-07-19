/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styles from './Brands.module.css';
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

export default function Brands() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        async function getBrands() {
            try {
                let response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
                setBrands(response.data.data);
            } catch (error) {
                console.error('Error while fetching brand data:', error);
            }
        }
        getBrands();
    }, []);

    if (!Array.isArray(brands) || brands.length === 0) {
        return <div className='py-8 w-full flex justify-center'>
            <ClimbingBoxLoader color='green' />
        </div>;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-semibold my-4 text-green-600 ml-10 ">Brands</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-">
                {brands?.map((brand) => (
                    <div key={brand._id} className={`${styles.brand} border rounded-lg overflow-hidden shadow-xl`}>
                        <Link to={`/BrandDetails/${brand._id}`}>
                            <img src={brand.image} alt={`${brand.name} logo`} className="w-full h-44 object-cover" />
                        </Link>
                        <div className="p-4">
                            <Link to={`/BrandDetails/${brand._id}`}></Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
