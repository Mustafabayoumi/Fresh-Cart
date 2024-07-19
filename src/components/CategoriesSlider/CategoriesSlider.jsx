/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import style from './CategoriesSlider.module.css';
import Slider from "react-slick";
import axios from 'axios';


export default function CategoriesSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 8,
        slidesToScroll: 3,
        autoplay:true 
        
    };
    
    const [categories, setCategories] = useState([])
    function getCategories()
    {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then(({data})=>{
            setCategories(data.data)
        })   
        .catch((error)=>{

        }) 
    }


    useEffect(() => {
        getCategories();
    }, []);
return (
    <>
    <div className='py-5 px-3'>
        <h2 className='py-4 pl-4 text-xl text-gray-800 font-medium'>shop Popular Categories</h2>
    <Slider {...settings}>
            {categories.map((category)=><div key={category?._id}>
                <img className='category-ime w-full' src={category?.image} alt={category?.name} />
                <h3 className='font-light mt-2'>{category?.name}</h3>
                </div> )}
    </Slider>
    </div>
    </>
)
}
