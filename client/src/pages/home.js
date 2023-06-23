import React, { useState, useEffect } from "react";
import { IoCaretDown } from 'react-icons/io5'
import { BiSearch } from 'react-icons/bi';
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import SearchInput from "../components/Form/searchInput.js";
import Accordian from "../components/accordian";
const Home = () => {
    const categories = useCategory()
    return (
        <div>
            <div className=' w-full bg-gray-200 rounded-lg'>
                <section className="flex z-30 items-start sm:mt-0  min-h-[60vh] w-full rounded-b-[2rem]  " id="section1">
                    <div className="lg:ml-24  lg:mt-[9rem] md:mt-28 mt-14">
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
                <section className="flex z-20 bg-gray-200 justify-center items-center min-h-[3vh]">
                    <IoCaretDown className="animate-bounce mt-3 text-blue-600" size={20} />

                </section>
                <section className="flex justify-center pb-4 flex-col items-center pt-4 min-h-[30vh] w-full ">
                    <div className="w-full sm:w-3/4">

                        <p className="block text-3xl font-semibold text-left">
                            Shop by <span className="text-blue-600">Category</span>
                        </p>
                    </div>
                    <div className="mb-6">

                        <div className="w-full sm:w-1/2 flex sm:flex-row flex-col gap-8 ">
                            {categories?.map((c) => (

                                <Link to={`/category/${c.slug}`}>
                                    <div className="p-6 sm:m-2 shadow-lg bg-blue-300 hover:bg-blue-400 transition hover:scale-110 h-[10rem] w-full sm:w-[12rem] rounded-lg">
                                        <span className="font-semibold">
                                            {c.name}
                                        </span>
                                    </div>
                                </Link>


                            ))}



                        </div>

                    </div>


                </section>
                <section className="w-full pt-4 bg-white flex  justify-center">

                    <div className=" w-full mt-6 sm:w-3/4">
                        <p className="block text-3xl font-semibold text-left">
                            <span className="text-blue-600">F</span>requently <span className="text-blue-600">A</span>sked <span className="text-blue-600">Q</span>uestions
                        </p>
                        <Accordian />


                    </div>




                </section>
            </div >
        </div >
    )
}

export default Home