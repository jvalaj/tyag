import React, { useState, useEffect } from "react";
import { BsWhatsapp } from 'react-icons/bs'
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import SearchInput from "../components/Form/searchInput.js";
import Accordian from "../components/accordian";
import ScrollAnimation from 'react-animate-on-scroll';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import "swiper/css/effect-cards";

// import required modules
import { Autoplay, Pagination, Navigation, EffectCards } from 'swiper/modules';

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
                <section className="flex z-30 justify-center bg-white sm:mt-0  min-h-[70vh] w-full  shadow-lg shadow-red-500" id="section1">
                    <div className="text-center  my-auto ">
                        <div className="px-2 ">
                            <ScrollAnimation animateOnce={true} animateIn="fadeInDown">
                                <p className=" mb-4 text-center text-3xl text-white sm:text-[2.5rem] font-semibold" >

                                    All your <span className="bg-gradient-to-r from-[#91f0ff] to-[#0099ff] bg-clip-text text-transparent" id="">pharmacy</span> needs, fulfilled at your <span className="bg-gradient-to-r from-[#91f0ff] to-[#0099ff] bg-clip-text text-transparent">doorstep</span>.


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

                <section class="bg-white ">
                    <div class="max-w-screen-xl  px-4 py-4 mx-auto lg:py-10">
                        <div class="grid link text-gray-500 gap-8 sm:gap-12 grid-cols-6 dark:text-gray-400">
                            <a class="flex items-center  lg:justify-center">
                                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Dabur_Logo.svg/1200px-Dabur_Logo.svg.png" className="grayscale opacity-60 max-h-[5rem]" />
                            </a>
                            <a class="flex items-center lg:justify-center">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Patanjali_Logo.svg/1200px-Patanjali_Logo.svg.png" className="grayscale opacity-60 max-h-[9rem]" />
                            </a>
                            <a class="flex items-center lg:justify-center">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/ITC_Limited_Logo.svg/1200px-ITC_Limited_Logo.svg.png" className="grayscale opacity-60 max-h-[5rem]" />
                            </a>

                            <a class="flex items-center lg:justify-center" disabled>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Cipla_logo.svg" className="grayscale opacity-60 max-h-[5rem]" />
                            </a>
                            <a class="flex items-center lg:justify-center">
                                <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1453809541/vjd7wnxl5jmkbf6rzd8j.png" className="grayscale opacity-60 max-h-[7rem]" />
                            </a>
                            <a class="flex items-center lg:justify-center">
                                <img src="https://www.ima-india.org/ima/images/IMA%20LOGO.jpg" className="grayscale opacity-60 max-h-[7rem]" />
                            </a>
                        </div>
                    </div>
                </section>

                <section className="flex z-20 py-16 bg-gradient-to-r from-blue-600 to-blue-400 justify-center flex-col items-center pt-4 min-h-[30vh] w-full ">
                    <div className="w-full mt-6 sm:w-3/4 sm:pb-3">
                        <ScrollAnimation animateOnce={true} animateIn="fadeInLeft">
                            <p className="items-center sm:justify-normal justify-center text-3xl text-white flex font-semibold text-center sm:text-left">
                                <hr className="w-[2rem] rounded-full bg-white h-1.5 my-auto border border-white mr-2" /> Shop by Categories


                            </p>
                        </ScrollAnimation>

                    </div>
                    <div className="">

                        <div className=" bg-blue-100 rounded-lg w-screen md:max-w-screen-lg pt-2 px-2 pb-0 flex" id="catBox">
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
                                className="h-[13rem] transition py-2">
                                <div>
                                    {categories?.map((c) => (


                                        <SwiperSlide className="shadow-lg border border-blue-500 shadow-gray-300 p-1 transition rounded-lg bg-white" style={{ backgroundImage: `${c.photo}` }}>
                                            <Link to={`/category/${c.slug}`}>
                                                <img className="p-2 mx-auto h-[7rem]" src={`/api/v1/category/category-photo/${c._id}`} />
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
                <section className="py-7 sm:py-14 flex items-center justify-center min-h-[40vh]">

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
                <section className="min-h-[60vh] ">
                    <section className="bg-blue-100 shadow-lg border-gray-300 border-t border-b">
                        <div className="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
                            <div className="col-span-2 mb-8">
                                <p className="text-lg font-medium text-blue-600 dark:text-blue-500">Trusted Pan Delhi</p>
                                <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl ">More than 1000 customers and 10,000 products</h2>
                                <p className="font-light text-gray-700 sm:text-xl dark:text-gray-700">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                <div className="pt-6 mt-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
                                    <div>
                                        <a href="#" className="inline-flex items-center text-base font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">
                                            Contact Us
                                            <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#" className="inline-flex items-center text-base font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">
                                            Visit our Shop
                                            <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
                                <div className="p-4 flex flex-col justify-between rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg">
                                    <div>
                                        <svg className="w-10 h-10 mb-2 text-blue-600 md:w-12 md:h-12 dark:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" /></svg>
                                        <h3 className="mb-2 text-2xl font-bold text-gray-100">99.99% uptime</h3>
                                    </div>
                                    <p className="font-light  dark:text-gray-200">Available 24x7</p>
                                </div>
                                <div className="p-4 flex flex-col justify-between rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg">
                                    <div>
                                        <svg className="w-10 h-10 mb-2 text-blue-600 md:w-12 md:h-12 dark:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
                                        <h3 className="mb-2 text-2xl font-bold text-gray-100">1000+ Customers</h3>
                                    </div>
                                    <p className="font-light  dark:text-gray-200">Trusted by over 1000 users in Delhi</p>
                                </div>
                                <div className="p-4 flex flex-col justify-between rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg ">
                                    <div>
                                        <svg className="w-10 h-10 mb-2 text-blue-600 md:w-12 md:h-12 dark:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" /></svg>
                                        <h3 className="mb-2 text-2xl font-bold text-gray-100">3 Locations</h3>
                                    </div>
                                    <p className="font-light  dark:text-gray-200">We are present in multiple areas within Delhi</p>
                                </div>
                                <div className="p-4 flex flex-col justify-between rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg ">
                                    <div>
                                        <svg className="w-10 h-10 mb-2 text-blue-600 md:w-12 md:h-12 dark:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
                                        <h3 className="mb-2 text-2xl font-bold text-gray-100">100+ Purchases</h3>
                                    </div>
                                    <p className="font-light  dark:text-gray-200">Handling multiple orders everday.</p>
                                </div>
                            </div>
                        </div>
                    </section>





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