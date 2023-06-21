import React, { useState, useEffect } from "react";
import { AiOutlineReload } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        getTotal();
    }, []);
    //get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //getTOtal COunt
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <div>
            <div className='mx-auto max-w-screen-lg min-h-[80vh] p-3 rounded-lg'>

                <form>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

                        </div>
                        <input type="search" id="default-search" className="block 
                        w-full py-3 p-2 pl-10 text-sm border
                          rounded-full 
                         bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                        <button type="submit" className="text-white
                         absolute py-3 right-[0px] bottom-0.5 rounded-full text-sm px-4 bg-blue-600 hover:bg-blue-700">Search</button>
                    </div>
                </form>


                <div className="min-h-[80vh] w-full sm:w-auto up-2 flex-col flex justify-center">

                    <div className="w-full min-h-[70vh] bg-gray-300 rounded-lg mt-3  p-2">
                        <p className='pt-1 block text-center'>All Products</p>
                        <div className='flex gap-2 m-1 flex-wrap'>
                            {products.map((p) => (

                                <div key={p._id} className="w-[9rem] sm:w-[13rem] grid grid-rows-2 min-h-[14rem] sm:min-h-[14rem] border rounded-lg shadow bg-gray-800 border-gray-700">

                                    <div className='bg-orange-500 row-span-1 flex justify-center bg-white  rounded-t-lg overflow-hidden pb-2'>
                                        <img className=" object-contain h-auto mx-auto w-full  rounded-t-lg" src={`/api/v1/product/product-photo/${p._id}`} alt="photo" />

                                    </div>

                                    <div className="bg-yellow-500 row-span-1 gap-2 grid px-2 pt-2 grid-rows-3  ">
                                        <div className='bg-white row-span-1 mt-2'>
                                            <h5 className=" text-md font-bold tracking-tight text-white">{p.name}</h5>

                                        </div>
                                        <div className='bg-violet-500 pt-2 row-span-1 '>
                                            <p className="text-sm leading-none text-gray-400"> {p.description.substring(0, 60)}...</p>
                                            <p className=" text-sm text-right my-auto text-green-500">Rs. {p.price}</p>
                                        </div>
                                        <div className='bg-red-500 row-span-1 pt-2  sm:pt-3'>
                                            <button className="bg-blue-500 text-xs p-2 rounded-lg text-white">Add to Cart</button>

                                        </div>

                                    </div>
                                </div>

                            ))}

                        </div>
                    </div>
                    <div className="m-2 flex justify-center p-3">
                        {products && products.length < total && (
                            <button
                                className="rounded-full px-3 p-2 flex flex-row gap-2 bg-gray-700 hover:bg-gray-900 transition text-white"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? (
                                    "Loading ..."
                                ) : (
                                    <>
                                        {" "}
                                        Loadmore <AiOutlineReload />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home