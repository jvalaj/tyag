import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useCart } from "../context/cart";
const Navbar = () => {
    const [cart] = useCart()
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


        <nav className="h-[10vh] sticky top-0 z-50 shadow-xl flex sm:items-center justify-center bg-white ">

            <div className="w-full">
                <div className=" mt-3 sm:mt-0 max-w-screen-xl flex flex-wrap align-self-center items-center justify-between mx-auto">
                    <div className="flex items-center m-2 cursor-pointer" >
                        <Link className="flex items-center" to="/">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                            <span className="text-xl md:text-3xl font-semibold ">chemshop.</span>
                        </Link>
                    </div>

                    <ul className='hidden text-sm md:text-md m-2 sm:flex sm:gap-8 '>

                        <li className="hover:text-blue-600 flex items-center transition ">
                            <NavLink to="/allproducts">Shop</NavLink>
                        </li>

                        {
                            !auth.user ? (
                                <>
                                    <li className="flex items-center">
                                        <Menu as="div" className="relative inline-block text-left">
                                            <div className="flex items-center">
                                                <Menu.Button className="inline-flex w-full p-2 border-blue-600 border my-auto items-center justify-center rounded-md hover:bg-blue-500 hover:text-white text-blue-600 transition">

                                                    Login / Register
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
                                                <Menu.Items className="absolute overflow-hidden right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className=" ">
                                                        <Menu.Item className="border-b border-gray-300">
                                                            <NavLink to="/login"
                                                                className="block px-4 py-2 text-sm hover:bg-gray-300 transition text-blue-600">Login</NavLink>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <NavLink to="/register"
                                                                className="block px-4 py-2 text-sm hover:bg-gray-300  transition text-blue-600">Register</NavLink>
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </li>

                                </>
                            ) : (
                                <>
                                    <li className="flex items-center">
                                        <Menu as="div" className="relative inline-block text-left">
                                            <div className="flex items-center">
                                                <Menu.Button className="inline-flex w-full my-auto items-center justify-center rounded-md  hover:text-blue-600 transition">
                                                    <AiOutlineUser size={21} className="mr-1" />
                                                    <span style={{ textTransform: 'capitalize' }}>{auth?.user.name}</span>

                                                    <ChevronDownIcon className="-mr-1 h-5 w-5  hover:text-blue-600" aria-hidden="true" />
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
                                                <Menu.Items className="absolute overflow-hidden right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className=" ">
                                                        <Menu.Item className="border-b border-gray-300">
                                                            <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                                                                className="block px-4 py-2 text-sm hover:bg-gray-300 transition text-blue-600">Dashboard</NavLink>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <NavLink onClick={handleLogout} to="/"
                                                                className="block px-4 py-2 text-sm hover:bg-gray-300 transition text-blue-600">Sign out</NavLink>
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </li>
                                </>
                            )
                        }
                        <li className="hover:text-blue-600 mr-3 transition flex items-center ">
                            <NavLink to="/cart" className="flex items-center">
                                <div className="flex h-4 items-center p-0 ">
                                    <div className="relative mr-2 top-[-10px]">

                                        <div className="bg-blue-500" id="cart-count">{cart?.length}</div>
                                        <AiOutlineShoppingCart className=" hover:text-blue-600 transition" size={20} />

                                    </div>
                                    Cart
                                </div>
                            </NavLink>
                        </li>
                    </ul>

                    <div className="sm:hidden flex items-center flex-row gap-2">
                        <li className={toggle ? 'hidden' : " hover:text-blue-600 transition flex items-center "}>
                            <NavLink to="/cart" className="flex items-center">
                                <div className="m-2 flex h-4 items-center p-0 ">
                                    <div className="relative top-[-8px] mr-1">

                                        <div className="bg-blue-500" id="cart-count-phone">{cart?.length}</div>
                                        <AiOutlineShoppingCart className=" hover:text-blue-600 transition" size={20} />

                                    </div>
                                </div>
                            </NavLink>

                        </li>
                        <li className={toggle ? 'hidden' : " hover:text-blue-600 transition flex items-center "}>
                            {
                                !auth.user ? (
                                    <>
                                        <li className="flex items-center">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <div className="flex items-center">
                                                    <Menu.Button className="inline-flex w-full p-2 border-blue-600 border my-auto items-center justify-center rounded-md hover:bg-blue-500 hover:text-white text-blue-600 transition">

                                                        Login / Register
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
                                                    <Menu.Items className="absolute overflow-hidden right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className=" ">
                                                            <Menu.Item className="border-b border-gray-300">
                                                                <NavLink to="/login"
                                                                    className="block px-4 py-2 text-sm hover:bg-gray-300 transition text-blue-600">Login</NavLink>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <NavLink to="/register"
                                                                    className="block px-4 py-2 text-sm hover:bg-gray-300  transition text-blue-600">Register</NavLink>
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </li>

                                    </>
                                ) : (
                                    <>
                                        <li className="flex items-center">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <div className="flex items-center justify-center">
                                                    <Menu.Button className="m-1 inline-flex w-full my-auto items-center justify-center rounded-md  hover:text-blue-600 transition">
                                                        <AiOutlineUser size={23} className="" />
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
                                                    <Menu.Items className="absolute overflow-hidden right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className=" ">
                                                            <Menu.Item className="border-b border-gray-300">
                                                                <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                                                                    className="block px-4 py-2 text-sm hover:bg-gray-300 transition text-blue-600">Dashboard</NavLink>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <NavLink onClick={handleLogout} to="/"
                                                                    className="block px-4 py-2 text-sm hover:bg-gray-300 transition text-blue-600">Sign out</NavLink>
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </li>
                                    </>
                                )
                            }
                        </li>
                        <div onClick={handleNav} className={toggle ? 'hidden' : 'transition cursor-pointer hover:text-blue-500 px-2 '}>
                            <AiOutlineMenu className='' size={22} />
                        </div>
                    </div>

                    <div className={toggle ? ' z-10 mt-2 p-2 flex flex-col w-screen h-[95vh] bg-gradient-to-r from-blue-800 to-blue-500 ease-in-out delay-150 duration-300  ' : 'hidden'} >
                        <div onClick={handleNav} className='transition cursor-pointer rounded-full fixed top-[1rem] right-[0.5rem] hover:bg-gray-300 hover:text-black sm:hidden p-2 '>
                            <AiOutlineClose className=" text-red-700" size={20} />
                        </div>

                        <ul className="gap-y-14 items-center my-auto  text-white flex-col text-xl flex">
                            {
                                !auth.user ? (
                                    <>
                                        <li className="hover:text-black transition ">
                                            <NavLink onClick={handleNav} to="/register">Register</NavLink>
                                        </li>
                                        <li className="hover:text-blacktransition ">
                                            <NavLink onClick={handleNav} to="/login">Login </NavLink>
                                        </li>

                                    </>
                                ) : (
                                    <>
                                        <li>

                                            <Menu as="div" className="relative inline-block text-left">
                                                <div>
                                                    <Menu.Button className="inline-flex w-full justify-center items-center rounded-md text-white hover:text-black transition">
                                                        <span style={{ textTransform: 'capitalize' }}>  {auth?.user.name}</span>
                                                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-white hover:text-black " aria-hidden="true" />
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
                                                    <Menu.Items className="absolute overflow-hidden right-0 z-10 mt-2 w-56 rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className=" ">
                                                            <Menu.Item>
                                                                <NavLink href="#" onClick={handleNav} to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                                                                    className="block px-4 py-2 text-sm hover:bg-gray-600 hover:text-black transition text-white">Dashboard</NavLink>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <NavLink href="#" onClick={handleLogout} to="/"
                                                                    className="block px-4 py-2 text-sm hover:bg-gray-600 hover:text-black transition text-white">Sign out</NavLink>
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </li>

                                    </>
                                )
                            }
                            <li>
                                <NavLink onClick={handleNav} to="/allproducts">
                                    Shop
                                </NavLink>

                            </li>


                        </ul>
                    </div>





                </div>
            </div>
        </nav >



    )
}

export default Navbar;