import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai';
import { NavLink } from "react-router-dom";
const Navbar = () => {

    const [toggle, setToggle] = useState(false);

    const handleNav = () => {
        setToggle(!toggle);
    };

    return (

        <nav className="h-[10vh] flex sm:items-center justify-center bg-gray-800 " style={{ fontFamily: 'Poppins' }}>
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
                        <li className="hover:text-teal-400 text-white">
                            <NavLink to="/register">Register</NavLink>
                        </li>
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
                            <li className="hover:text-teal-400 text-white">
                                <NavLink to="/register" onClick={handleNav}>Register</NavLink>
                            </li>
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