/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import style from './ProdutDetails.module.css'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";


export default function produtDetails() {

let {id , category} = useParams();
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const [productDetails, setProductDetails] = useState(null)
const [relatedPeoducts, setRelatedPeoducts] = useState([])
function getProductDetails(id)
{
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({data})=>{
        setProductDetails(data.data)
    })

    .catch(()=>{

    })
}

function getRelatedProducts(category)
{
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then(({data})=>{
        let allProducts = data.data;
    let related =  allProducts.filter((product)=>product.category.name == category)
    setRelatedPeoducts(related);
    console.log(related);
})

    .catch(()=>{

    })
}


    useEffect(()=> {
        getProductDetails(id);
        getRelatedProducts(category);
    },[id , category]);

return (
    <>
    <div className="row">
        <div className="w-1/4 ">
        <Slider {...settings}>
            {productDetails?.images.map((src)=><img key={id} className='w-full' src={src} alt={productDetails?.title}/> )}
    </Slider>

        
        </div>
        <div className="w-3/4 p-6">
        <h1 className='text-lg font-medium text-gry-950'>{productDetails?.title}</h1>
        <p className='text-gray-700 mt-7 font-light  '>{productDetails?.description}</p>
        
        <div className='flex my-4 justify-between items-center'>
                <span>{productDetails?.price} EGP</span>
                <span>{productDetails?.ratingsAverage}<i className='fas fa-star text-yellow-400'></i></span>
            </div>
            <button className='btn'>add to cart</button>
        </div>
    </div>

    <div className="row">
    {relatedPeoducts.map((product)=>
            <div key={product.id} className="w-1/6">
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
)
}
