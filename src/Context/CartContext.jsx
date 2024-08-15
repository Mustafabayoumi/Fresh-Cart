/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext } from "react";
import { useState , useEffect } from "react";

export let CartContext =createContext();
export default function CartContextProvider(props){
    
        let headers ={
            token: localStorage.getItem('userToken')
        }
////    // console.log(localStorage.getItem('userToken'))
////    // console.log('user token: ' , headers.token);

    const [Cart, setCart] = useState(null)
function getCartItems(){
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
    function  UpdatCartItemCount(productId , count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count:count
            },{
                headers
            }).then((response)=> response)
            .catch((error)=>error)
    }
    async function addCart(productId) {
        const token = localStorage.getItem("userToken");
        if (!token) {
            return Promise.reject(new Error("You are not logged in. Please login to get access"));
        }
////        // console.log(productId);  
        try {
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
                { productId }, { headers: { token } });
////            console.log(productId);
            return response;
        } catch (error) {
            console.error("Error adding to cart:", error?.message);
            throw error;
        }
    }
    function Checkout(cartId, url, formValues) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
            shippingAddress: formValues
        }, { headers }).then(response => response)
        .catch(error => error)
    }


async function getCart() {
let response =  await getCartItems();
setCart(response.data)
}


useEffect (() => { 
    getCart(); 
} , []);


    return <CartContext.Provider value={ { Cart , setCart , Checkout, getCartItems ,addCart , UpdatCartItemCount ,deleteProductItem } }>
        {props.children}
</CartContext.Provider>
}
