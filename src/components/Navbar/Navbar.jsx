/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import style from './Navbar.module.css';
import logo from '../../assets/images/logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Navbar() {
    useEffect(() => { }, []);
let navigate = useNavigate();
let {userLogin , setUserLogin} = useContext(UserContext);
function LogOut ()
{
    localStorage.removeItem('userToken');
    setUserLogin(null);
    navigate('/Login')
}
return (
    <>
            <nav className="bg-gray-100 w-full z-50 text-center lg:fixed top-0 left-0 right-0 py-2">
                <div className="container mx-auto justify-between py-2 flex flex-col lg:flex-row items-center">
                
                    <div className="flex flex-col lg:flex-row items-center">
                        <img width={110} src={logo} alt="fresh vart logo" />
                        
                        <ul className="flex flex-col lg:flex-row items-center">
                            {userLogin !== null ?<>
                            <li className='py-2'><NavLink className="mx-2 text-lg text-slate-900 font-light NavHover" to="">Home</NavLink></li>
                            <li className='py-2'><NavLink className="mx-2 text-lg text-slate-900 font-light NavHover" to="Cart">Cart</NavLink></li>
                            <li className='py-2'><NavLink className="mx-2 text-lg text-slate-900 font-light NavHover" to="Products">Products</NavLink></li>
                            <li className='py-2'><NavLink className="mx-2 text-lg text-slate-900 font-light NavHover" to="Brands">Brands</NavLink></li>
                            <li className='py-2'><NavLink className="mx-2 text-lg text-slate-900 font-light NavHover" to="Categories">Categories</NavLink></li>
                            </>:null }
                        </ul>       
                        </div>
                    <div>
                    <ul className="flex flex-col lg:flex-row items-center">
                        {userLogin === null ?<>
                            <li className=' py-2'><NavLink className="mx-2 text-lg text-slate-900 font-light NavHover" to="Login">Login</NavLink> </li>
                            <li className=' py-2'><NavLink className="mx-2 text-lg text-slate-900 font-light NavHover" to="Register">Register</NavLink> </li>
                        </>:<li onClick={LogOut} className=' py-2'><span className="mx-2 text-lg text-slate-900 font-light cursor-pointer NavHover" >Logout</span> </li>
                        }
                            <li className='flex items-center py-2'>
                                <a href="http://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className='fab mx-2 fa-facebook faceHover'></i></a>
                                <a href="http://www.twitter.com" target="_blank" rel="noopener noreferrer"> <i className='fab mx-2 fa-twitter twitterHover'></i></a>
                                <a href="http://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className='fab mx-2 fa-instagram instaHover'></i></a>
                                <a href="http://www.youtube.com" target="_blank" rel="noopener noreferrer"><i className='fab mx-2 fa-youtube youtubeHover'></i></a>
                                <a href="http://www.tiktok.com" target="_blank" rel="noopener noreferrer"><i className='fab mx-2 fa-tiktok tiktokHover'></i></a>
                            </li>
                        </ul>       
                    </div>
                </div>
            </nav>
    </>
)
}
