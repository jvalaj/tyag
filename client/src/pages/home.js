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
                <section className="flex justify-center items-center min-h-[85vh] w-full rounded-b-[2rem] bg-white ">
                    <div >
                        <div className="">
                            <p className=" mb-6 block text-center text-[2.5rem] font-semibold" >

                                All your <span className="text-blue-600">pharmacy</span> needs, fulfilled at your doorstep<span className="text-blue-600">.</span>


                            </p>

                        </div>
                        <div className="p-2 block">
                            <SearchInput />
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