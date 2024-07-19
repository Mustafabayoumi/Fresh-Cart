/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import style from './About.module.css'
export default function About() {
    const [counter, setCounter] = useState(0)
    useEffect(() => { }, []);
return (
    <>
        <h2>About</h2>
    <p>Lorem ipsum dolor sit amet.</p>
    </>
)
}
