/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from 'react';

export let CartContext =createContext();
export default function CartContextProvider(props){
    
        let headers ={
            token: localStorage.getItem('userToken')
        }
    // console.log(localStorage.getItem('userToken'))
    // console.log('user token: ' , headers.token);

function getLoggedUserCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
        .then((response)=>response)
        .catch((error)=>error)
    }
function deleteProductItem(producId){
        return axios.delete (`https://ecommerce.routemisr.com/api/v1/cart/${producId}`,{
            headers
        }).then((response)=>response)
        .catch((error)=>error)
    }
    
    async function addCart(productId) {
        const token = localStorage.getItem("userToken");
        if (!token) {
            return Promise.reject(new Error("You are not logged in. Please login to get access"));
        }
        // console.log(productId);  
        try {
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
                { productId }, { headers: { token } });
            // setCartData(response?.data);
            // setCartCount(response?.data?.numOfCartItems); 
            // setCartCountNumber(response?.data?.data?.totalCartPrice); 
            console.log(productId);
            return response;
        } catch (error) {
            console.error("Error adding to cart:", error?.message);
            throw error;
        }
    }
    function  UpdatCartItemCount(productId , count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count:count
            },{
                headers
            }).then((response)=> response)
            .catch((error)=>error)
    }
return <CartContext.Provider value={ { getLoggedUserCart ,addCart , UpdatCartItemCount ,deleteProductItem } }>
        {props.children}
</CartContext.Provider>
}
