import React, { useState, useEffect } from "react";
import { AiOutlineReload } from "react-icons/ai";
import axios from "axios";

import { useCart } from "../context/cart.js"
import { toast } from "react-hot-toast";
import { BiSearch } from 'react-icons/bi';
import SearchInput from "../components/Form/searchInput";
import { useNavigate, Link } from "react-router-dom";
const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart()
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
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
            <div className='mx-auto max-w-screen-xl min-h-[80vh] p-3 rounded-lg'>

                <SearchInput />


                <div className="min-h-[80vh] w-full sm:w-auto up-2 flex-col flex justify-center">

                    <div className="w-full min-h-[70vh] bg-gray-300 rounded-lg mt-3  p-2">
                        <p className='pt-2 block text-center'>All Products</p>
                        <div className="md:grid md:grid-cols-[60%_40%] p-2">
                            <div className='flex flex-col gap-2 m-1'>
                                {products.map((p) => (

                                    <div key={p._id} className="mb-3 flex flex-row sm:grid sm:grid-cols-[30%_70%] justify-between h-[13rem] sm:h-[10rem]  border rounded-lg shadow bg-gray-800 border-gray-700">

                                        <div onClick={() => navigate(`/product/${p.slug}`)}
                                            target="_blank" className='w-full cursor-pointer hover:opacity-40 flex justify-center bg-white rounded-lg overflow-hidden pb-2'>


                                            <img className=" object-contain  h-auto w-full " src={`/api/v1/product/product-photo/${p._id}`} alt="photo" />


                                        </div>

                                        <div className="w-full  flex flex-col justify-between p-2 gap-1 ">
                                            <div className="flex flex-col gap-1">
                                                <div className='py-2'>
                                                    <h5 className="my-auto text-md font-bold tracking-tight text-white">{p.name}</h5>

                                                </div>
                                                <div className=' py-2'>
                                                    <p className="my-auto text-sm leading-none text-gray-400"> {p.description.substring(0, 120)}...</p>

                                                </div>
                                            </div>



                                            <div className=' text-right flex flex-row leading-none tracking-tighter'>
                                                <div className="w-full text-lg  flex">
                                                    <p className="my-auto text-left font-bold text-green-500">Rs. {p.price}</p>

                                                </div>
                                                <div className="w-full text-xs text-right">

                                                    <button className=" tracking-tighter hover:opacity-60 bg-blue-600 text-xs p-2 rounded-full text-white"
                                                        onClick={() => {
                                                            let myCart = [...cart]
                                                            const index = myCart.findIndex(item => item._id === p._id);

                                                            if (index === -1) {
                                                                myCart.push({
                                                                    ...p,
                                                                    quantity: 1
                                                                });
                                                                const updatedCart = [...myCart];
                                                                console.log(updatedCart);
                                                                setCart(updatedCart)
                                                                localStorage.setItem('cart', JSON.stringify(updatedCart))
                                                                toast.success("Item Added to Cart")
                                                            } else {
                                                                myCart[index].quantity += 1;
                                                                const updatedCart = [...myCart];
                                                                setCart(updatedCart);
                                                                localStorage.setItem("cart", JSON.stringify(updatedCart))
                                                                console.log(updatedCart);
                                                                toast.success("Item Added to Cart")
                                                            }
                                                        }}
                                                    >Add to Cart</button>

                                                </div>

                                            </div>

                                        </div>
                                    </div>



                                ))}

                            </div>
                            <div className="hidden w-full min-v-[40vh] text-center sm:block">
                                Cart
                            </div>
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

export default AllProducts