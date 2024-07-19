/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import style from './ProtectedRoute.module.css'
import {Navigate} from 'react-router-dom';

export default function ProtectedRoute(props) {

    if(localStorage.getItem('userToken') !== null)
        {
            return props.children
        }
        else
        {
            return <Navigate to={'/Login'}/>
        }

}
