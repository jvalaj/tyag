import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai';
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const Navbar = () => {

    const [auth, setAuth] = useAuth()
    const [toggle, setToggle] = useState(false);
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem('auth')
        toast.success("Logout Successful", {
            toastId: 'success1',
        })
    }
    const handleNav = () => {
        setToggle(!toggle);
    };

    return (


        <nav className="h-[10vh] shadow flex sm:items-center justify-center bg-gray-800 " style={{ fontFamily: 'Poppins' }}>

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
                                        <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <Menu.Button className="inline-flex w-full justify-center rounded-md text-white hover:text-teal-400">
                                                    {auth?.user.name}
                                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </Menu.Button>
                                            </div>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100  scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95 "
                                            >
                                                <Menu.Items className="absolute overflow-hidden right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className=" ">
                                                        <Menu.Item>
                                                            <NavLink href="#" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                                                                className="block px-4 py-2 text-sm hover:bg-gray-600 hover:text-teal-400 text-white">Dashboard</NavLink>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <NavLink href="#" onClick={handleLogout} to="/login"
                                                                className="block px-4 py-2 text-sm hover:bg-gray-600 hover:text-teal-400 text-white">Sign out</NavLink>
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
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
                                            <NavLink to="/login">Login </NavLink>
                                        </li>

                                    </>
                                ) : (
                                    <>
                                        <li>

                                            <Menu as="div" className="relative inline-block text-left">
                                                <div>
                                                    <Menu.Button className="inline-flex w-full justify-center rounded-md text-white hover:text-teal-400">
                                                        {auth?.user.name}
                                                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </Menu.Button>
                                                </div>

                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100  scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95 "
                                                >
                                                    <Menu.Items className="absolute overflow-hidden right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className=" ">
                                                            <Menu.Item>
                                                                <NavLink href="#" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                                                                    className="block px-4 py-2 text-sm hover:bg-gray-600 hover:text-teal-400 text-white">Dashboard</NavLink>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <NavLink href="#" onClick={handleLogout} to="/login"
                                                                    className="block px-4 py-2 text-sm hover:bg-gray-600 hover:text-teal-400 text-white">Sign out</NavLink>
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
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
        </nav >



    )
}

export default Navbar;