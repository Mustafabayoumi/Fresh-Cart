/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {

    function getRecent()
    {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    
    // let {data , isError ,error , isLoading , isFetching} = 
    let responsObject = useQuery({
        queryKey:['recentProdcuts'],
        queryFn:getRecent,
        // refetchInterval:1000, 
        // refetchIntervalInBackground:true, 
        // staleTime:0,
        // refetchOnWindowFocus:true
        // retry:6,
        // retryDelay:5000
    });
    

    return (
        responsObject
    )
}
