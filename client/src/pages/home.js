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
                <section className="flex justify-center flex-col items-center pt-4 min-h-[30vh] w-full ">
                    <div className="w-full mt-6 sm:w-3/4 mb-5">

                        <p className="block text-3xl font-semibold text-left">
                            Shop by <span className="text-blue-600">Category</span>
                        </p>
                    </div>
                    <div className="">

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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#93c5fd" fill-opacity="1" d="M0,96L40,128C80,160,160,224,240,240C320,256,400,224,480,197.3C560,171,640,149,720,165.3C800,181,880,235,960,218.7C1040,203,1120,117,1200,101.3C1280,85,1360,139,1400,165.3L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
                <section className="bg-blue-300 flex items-center justify-center min-h-[40vh]">
                    <p className="block text-center ">
                        Coming Soon...
                    </p>

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