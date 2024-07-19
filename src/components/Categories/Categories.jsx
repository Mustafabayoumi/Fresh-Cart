/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import styles from './Categories.module.css';

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getCategories() {
            try {
                let response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
                setCategories(response.data.data);
            } catch (error) {
                console.error('Error while fetching category data:', error);
            }
        }
        getCategories();
    }, []);

    if (!Array.isArray(categories) || categories.length === 0) {
        return <div className='py-8 w-full flex justify-center'>
            <ClimbingBoxLoader color='green' />
        </div>;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-semibold my-4 text-green-600 ml-10 ">Categories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {categories?.map((category) => (
                    <div key={category._id} className={`${styles.category} border rounded-lg overflow-hidden shadow-xl`}>
                        <Link to={`/CategoryDetails/${category._id}`}>
                            <img src={category.image} alt={`${category.name} image`} className="w-full h-44 object-cover" />
                        </Link>
                        <div className="p-4">
                            <Link to={`/CategoryDetails/${category._id}`}>
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">{category.name}</h2>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
