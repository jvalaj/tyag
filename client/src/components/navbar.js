import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai';
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast, Toaster } from "react-hot-toast";
const Navbar = () => {

    const [auth, setAuth] = useAuth()
    const [toggle, setToggle] = useState(false);
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem('auth')
        toast.success("Logout Successful")
    }
    const handleNav = () => {
        setToggle(!toggle);
    };

    return (


        <nav className="h-[10vh] flex sm:items-center justify-center bg-gray-800 " style={{ fontFamily: 'Poppins' }}>
            <Toaster />
            <div className="w-full">
                <div className=" mt-3 sm:mt-0 max-w-screen-lg flex flex-wrap align-self-center items-center justify-between mx-auto">
                    <div className="flex items-center m-2">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                        <span className=" text-3xl font-semibold text-white">Chem Shop</span>
                    </div>

                    <ul className='hidden m-2 sm:flex sm:gap-8 sm:text-white'>
                        <li className="hover:text-teal-400 text-white">
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li className="hover:text-teal-400 text-white">
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                        <li className="hover:text-teal-400 text-white">
                            <NavLink to="/products">Products</NavLink>
                        </li>
                        {
                            !auth.user ? (
                                <>
                                    <li className="hover:text-teal-400 text-white">
                                        <NavLink to="/register">Register</NavLink>
                                    </li>
                                    <li className="hover:text-teal-400 text-white">
                                        <NavLink to="/login">Login</NavLink>
                                    </li>

                                </>
                            ) : (
                                <>
                                    <li>
                                        <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between  text-white hover:text-teal-400">{auth?.user.name} <svg className="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg></button>
                                        <div id="dropdownNavbar" className="overflow-hidden z-10 hidden font-normal rounded-lg shadow w-44 bg-gray-700 divide-gray-600">

                                            <div className="">
                                                <NavLink href="#" to="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-600 hover:text-teal-400 text-white">Dashboard</NavLink>
                                            </div>
                                            <div className="">
                                                <NavLink href="#" onClick={handleLogout} to="/login" className="block px-4 py-2 text-sm hover:bg-gray-600 hover:text-teal-400 text-white">Sign out</NavLink>
                                            </div>
                                        </div>
                                    </li>

                                </>
                            )
                        }
                        <li className="hover:text-teal-400 flex items-center text-white">
                            <NavLink to="/cart">
                                <AiOutlineShoppingCart className="text-white hover:text-teal-400" size={20} />
                            </NavLink>
                        </li>
                    </ul>
                    <Toaster />
                    <div onClick={handleNav} className={toggle ? 'hidden' : ' hover:bg-white hover:text-black sm:hidden border border-white m-2 p-2 rounded-md'}>
                        <AiOutlineMenu className='text-white' size={20} />
                    </div>
                    <div className={toggle ? 'z-10 mt-2 p-2 flex flex-col w-screen h-[90vh] bg-gray-800 ease-in-out delay-150 duration-300  ' : 'hidden'} >
                        <div onClick={handleNav} className=' fixed top-[1rem] right-[0.5rem] hover:bg-white hover:text-black sm:hidden border border-white p-2 rounded-md'>
                            <AiOutlineClose className=" text-red-700" size={20} />
                        </div>

                        <ul className="gap-y-14 items-center my-auto bg-gray-800 flex-col text-xl flex">
                            <li className="hover:text-teal-400 text-white">
                                <NavLink to="/" onClick={handleNav}>Home</NavLink>
                            </li>
                            <li className="hover:text-teal-400 text-white">
                                <NavLink to="/contact" onClick={handleNav}>Contact</NavLink>
                            </li>
                            <li className="hover:text-teal-400 text-white">
                                <NavLink to="/products" onClick={handleNav}>Products</NavLink>
                            </li>
                            {
                                !auth.user ? (
                                    <>
                                        <li className="hover:text-teal-400 text-white">
                                            <NavLink to="/register">Register</NavLink>
                                        </li>
                                        <li className="hover:text-teal-400 text-white">
                                            <NavLink to="/login">Login</NavLink>
                                        </li>

                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between  text-white hover:text-teal-400">{auth?.user.name} <svg className="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg></button>
                                            <div id="dropdownNavbar" className="overflow-hidden z-20 hidden font-normal rounded-lg shadow w-44 bg-gray-700 divide-gray-600">

                                                <div className="">
                                                    <NavLink href="#" to="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-600 hover:text-teal-400 text-white">Dashboard</NavLink>
                                                </div>
                                                <div className="">
                                                    <NavLink href="#" onClick={handleLogout} to="/login" className="block px-4 py-2 text-sm hover:bg-gray-600 hover:text-teal-400 text-white">Sign out</NavLink>
                                                </div>
                                            </div>
                                        </li>

                                    </>
                                )
                            }
                            <li className="hover:text-teal-400 text-white">
                                <NavLink to="/cart" onClick={handleNav}>Cart</NavLink>
                            </li>

                        </ul>
                    </div>





                </div>
            </div>
        </nav>



    )
}

export default Navbar;