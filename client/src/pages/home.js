import React, { useState, useEffect } from "react";
import { IoCaretDown } from 'react-icons/io5'
import { BiSearch } from 'react-icons/bi';
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
const Home = () => {
    const categories = useCategory()
    return (
        <div>
            <div className=' w-full bg-gray-200 rounded-lg'>
                <section className="flex justify-center items-center min-h-[85vh] w-full rounded-b-[2rem] bg-white ">
                    <div >
                        <div className="">
                            <p className=" mb-6 block text-center text-[2.5rem] font-semibold" >

                                All your <span className="text-blue-600">pharmacy</span> needs, fulfilled at your doorstep<span className="text-blue-600">.</span>


                            </p>

                        </div>
                        <div className="p-2 block">
                            <form className=" mx-auto max-w-screen-md">
                                <label htmlFor="default-search" className="  mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative ">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer">
                                        <BiSearch className="text-white" size={20} />
                                    </div>
                                    <input type="search" id="default-search" className="
                                block transition
                                 w-full py-3 p-2 pl-10 text-sm border
                                rounded-full 
                                 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search Now" required />
                                    <button type="submit" className="text-white
                                absolute transition py-3 right-[0px] bottom-[0.8px] rounded-full text-sm px-4 bg-blue-600 hover:bg-blue-700">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>


                </section>
                <section className="flex bg-gray-200 justify-center items-center min-h-[5vh]">
                    <IoCaretDown className="text-blue-600" size={20} />
                </section>
                <section className="flex justify-center items-center min-h-[90vh] w-full bg-gray-400">
                    <div >
                        <div className="flex flex-wrap gap-2 ">
                            {categories?.map((c) => (

                                <Link to={`/category/${c.slug}`}>
                                    <button className="p-6 border border-gray-800">
                                        {c.name}
                                    </button>
                                </Link>


                            ))}



                        </div>

                    </div>


                </section>
            </div >
        </div >
    )
}

export default Home