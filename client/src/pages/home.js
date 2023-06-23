import React, { useState, useEffect } from "react";
import { IoCaretDown } from 'react-icons/io5'
import { BiSearch } from 'react-icons/bi';
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import SearchInput from "../components/Form/searchInput.js";
const Home = () => {
    const categories = useCategory()
    return (
        <div>
            <div className=' w-full bg-gray-200 rounded-lg'>
                <section className="flex  items-start sm:mt-0  min-h-[80vh] w-full rounded-b-[2rem]  " id="section1">
                    <div className="lg:ml-24  lg:mt-[11rem] mt-28">
                        <div className="p-2  max-w-screen-md">
                            <p className=" mb-6 text-center md:text-left text-4xl sm:text-[2.5rem] font-semibold" >

                                All your <span className=" text-blue-600">pharmacy</span> needs, fulfilled at your doorstep<span className="text-blue-600">.</span>


                            </p>

                        </div>
                        <div className="p-2  block">
                            <div className="rounded-full shadow-blue-500/50 shadow-lg">
                                <SearchInput />

                            </div>
                        </div>
                    </div>


                </section>
                <section className="flex bg-gray-200 justify-center items-center min-h-[5vh]">
                    <IoCaretDown className="animate-bounce text-blue-600" size={20} />

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