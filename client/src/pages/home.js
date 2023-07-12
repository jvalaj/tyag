import React, { useState, useEffect } from "react";
import { IoCaretDown } from 'react-icons/io5'
import { BiSearch } from 'react-icons/bi';
import { BsWhatsapp } from 'react-icons/bs'
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import SearchInput from "../components/Form/searchInput.js";
import Accordian from "../components/accordian";
import ScrollAnimation from 'react-animate-on-scroll';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import data from './../localData/categoryImages.json'
// Import Swiper styles
import 'swiper/css';

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
                <section className="flex z-30 justify-center bg-white sm:mt-0  min-h-[50vh] w-full rounded-b-[2rem] shadow-lg " id="section1">
                    <div className="text-center  my-auto">
                        <div className="px-2 ">
                            <ScrollAnimation animateOnce={true} animateIn="fadeInDown">
                                <p className=" mb-4 text-center text-3xl text-white sm:text-[2.5rem] font-semibold" >

                                    All your <span className="" id="">pharmacy</span> needs, fulfilled at your doorstep<span className="">.</span>


                                </p>

                            </ScrollAnimation>
                            <p className="text-lg text-gray-300">
                                This is a subtitle line as an example. It can be anything.
                            </p>
                        </div>
                        <div className="p-2 max-w-screen-sm  mx-auto">
                            <div className=" shadow-lg shadow-gray-700 rounded-full">
                                <SearchInput />
                            </div>


                        </div>
                    </div>


                </section>

                <section className="flex justify-center flex-col items-center pt-4 min-h-[30vh] w-full ">
                    <div className="w-full mt-6 sm:w-3/4 sm:mb-3">

                        <p className="block text-3xl font-semibold text-center sm:text-left">
                            Shop by <span className="text-blue-600">Category</span>


                        </p>
                    </div>
                    <div className="">

                        <div className=" bg-gray-200 rounded-lg w-screen md:max-w-screen-lg pt-2 px-2 pb-0 flex" id="catBox">
                            <Swiper spaceBetween={30}
                                pagination={true}
                                modules={[Pagination]}

                                breakpoints={{
                                    // when window width is >= 640px
                                    360: {
                                        slidesPerView: 1.5,
                                    },
                                    440: {
                                        slidesPerView: 2.5,
                                    },
                                    660: {
                                        slidesPerView: 3.5,
                                    },

                                    // when window width is >= 768px
                                    768: {

                                        slidesPerView: 4.5,
                                    },
                                }}
                                id="swiperCategory"
                                className="h-[15rem] transition py-2">
                                <div>
                                    {categories?.map((c) => (


                                        <SwiperSlide className="shadow-lg shadow-gray-300 p-1 transition rounded-lg bg-white" style={{ backgroundImage: `${c.photo}` }}>
                                            <Link to={`/category/${c.slug}`}>
                                                <img className="p-2 mx-auto h-[9rem]" src={`/api/v1/category/category-photo/${c._id}`} />
                                                <p className="text-center text-lg py-auto my-auto block font-semibold">
                                                    {c.name}
                                                </p>
                                            </Link>
                                        </SwiperSlide>



                                    ))}
                                </div>


                            </Swiper>




                        </div>

                    </div>
                </section>
                <section className="mt-16 py-3 shadow-lg bg-gradient-to-r from-blue-800 to-blue-500 flex items-center justify-center min-h-[40vh]">

                    <div className="w-full
                     bg-transparent rounded-lg">
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={2}
                            modules={[Autoplay, Pagination, Navigation]}
                            navigation={true}
                            loop={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            className="h-[20rem] sm:h-[25rem] w-full bg-transparent"
                            id="bannerSwiper"
                            breakpoints={{
                                // when window width is >= 640px
                                360: {
                                    slidesPerView: 1,
                                },
                                440: {
                                    slidesPerView: 1,
                                },


                                // when window width is >= 768px
                                768: {

                                    slidesPerView: 1.5,
                                },
                                1000: {

                                    slidesPerView: 2,
                                },
                            }}
                        >
                            <SwiperSlide id="bannerSlide" className="overflow-hidden h-[10rem]  rounded-lg ">
                                <img src="https://assets.truemeds.in/Images/dwebbanner3.jpeg" className="h-full w-full" />
                            </SwiperSlide>
                            <SwiperSlide id="bannerSlide" className="overflow-hidden h-[10rem]  rounded-lg ">
                                <img src="https://cdn01.pharmeasy.in/dam/banner/banner/1dc1375328c-EASY22.jpg" className="h-full w-full" />
                            </SwiperSlide>
                            <SwiperSlide id="bannerSlide" className="overflow-hidden h-[10rem]  rounded-lg ">
                                <img src="https://assets.truemeds.in/Images/dwebbanner3.jpeg" className="h-full w-full" />
                            </SwiperSlide>
                            <SwiperSlide id="bannerSlide" className="overflow-hidden h-[10rem]  rounded-lg ">
                                <img src="https://assets.truemeds.in/Images/dwebbanner2.jpeg" className="h-full w-full" />
                            </SwiperSlide>
                            <SwiperSlide id="bannerSlide" className="overflow-hidden h-[10rem]  rounded-lg ">
                                <img src="https://assets.truemeds.in/Images/dwebbanner4.jpeg" className="h-full w-full" />
                            </SwiperSlide>

                        </Swiper>


                    </div>

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