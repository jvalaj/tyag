import React, { useState, useEffect } from "react";
import { IoCaretDown } from 'react-icons/io5'
import { BiSearch } from 'react-icons/bi';
import { BsWhatsapp } from 'react-icons/bs'
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import SearchInput from "../components/Form/searchInput.js";
import Accordian from "../components/accordian";
import ScrollAnimation from 'react-animate-on-scroll';
const Home = () => {
    const categories = useCategory()
    return (
        <div>
            <div className="cursor-pointer z-50 fixed transition   shadow-green-500 shadow-sm hover:scale-110 hover:animate-none hover:bg-gray-300 border-2 rounded-lg border-green-500 bg-white p-3 right-6 bottom-6">
                <a href="https://wa.me/919999513839" target="_blank">
                    <BsWhatsapp size={20} className="text-green-500" />
                </a>

            </div>
            <div className="cursor-pointer z-40 fixed animate-ping transition   shadow-green-500 shadow-sm  hover:bg-gray-300 border-2 rounded-lg border-green-500 bg-white p-3 right-6 bottom-6">
                <a href="https://wa.me/919999513839" target="_blank">
                    <BsWhatsapp size={20} className="text-green-500" />
                </a>

            </div>
            <div className=' w-full rounded-lg'>
                <section className="flex z-30 justify-center bg-white sm:mt-0  min-h-[50vh] w-full rounded-b-[2rem]" id="section1">
                    <div className="text-center  lg:mt-[9rem] md:mt-28 mt-24">
                        <div className="p-2 ">
                            <ScrollAnimation animateIn="fadeInDownBig">
                                <p className=" mb-6 text-center text-4xl text-white sm:text-[2.5rem] font-semibold" >

                                    All your <span className="" id="">pharmacy</span> needs, fulfilled at your doorstep<span className="">.</span>


                                </p>
                            </ScrollAnimation>

                        </div>
                        <div className="p-2 max-w-screen-sm  mx-auto">
                            <div className=" rounded-full">             <SearchInput />
                            </div>


                        </div>
                    </div>


                </section>

                <section className="flex justify-center flex-col items-center pt-4 min-h-[30vh] w-full ">
                    <div className="w-full mt-6 sm:w-3/4 mb-5">

                        <p className="block text-3xl font-semibold text-center sm:text-left">
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
                        <p className="block text-3xl font-semibold text-center sm:text-left">
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