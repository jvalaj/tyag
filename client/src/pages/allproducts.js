import React, { useState, useEffect } from "react";
import { AiOutlineReload, AiOutlineDelete } from "react-icons/ai";
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

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            toast.success("Item Removed Successfully")
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

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
            <div className='mx-auto max-w-screen-xl min-h-[80vh] sm:p-3 rounded-lg'>
                <div className="mx-2 mt-2">  <SearchInput />
                </div>


                <div className="min-h-[80vh] w-full sm:w-auto up-2 flex-col flex justify-center">

                    <div className="w-full min-h-[70vh]  rounded-lg mt-3  sm:p-2">

                        <div className="md:grid md:grid-cols-[60%_40%] p-2">
                            <div className='flex flex-wrap  gap-2 m-1'>
                                {products.map((p) => (

                                    <div key={p._id} className="mb-3 w-[9rem] sm:w-[10rem] lg:w-[13rem] h-[10rem] sm:h-[12rem] lg:h-[16rem] grid grid-rows-[40%_60%]   border rounded-lg shadow bg-gray-800 border-gray-700">

                                        <div onClick={() => navigate(`/product/${p.slug}`)}
                                            target="_blank" className='w-full cursor-pointer hover:opacity-40 px-auto flex justify-center bg-white rounded-lg overflow-hidden pb-2'>


                                            <img className=" object-contain  mx-auto h-auto w-full " src={`/api/v1/product/product-photo/${p._id}`} alt="photo" />


                                        </div>

                                        <div className="w-full  flex flex-col px-2 ">
                                            <div className="flex justify-center flex-col gap-1">
                                                <div className='pt-2'>
                                                    <h5 className="my-auto text-md sm:text-lg font-semibold tracking-tight text-white">{p.name}</h5>
                                                </div>
                                                <div className='hidden lg:inline m-0'>
                                                    <p className="my-auto text-sm leading-none text-gray-400"> {p.description.substring(0, 50)}...</p>

                                                </div>
                                            </div>



                                            <div className='flex flex-col mt-auto mb-3 lg:flex-row'>
                                                <div className="w-full  text-sm sm:text-lg">
                                                    <p className="my-auto text-white">Rs. {p.price}</p>

                                                </div>
                                                <div className="w-full text-right m-0 text-xs">

                                                    <button className=" hover:opacity-60 bg-blue-600 text-xs p-2 m-0 rounded-full text-white"
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
                                                    >
                                                        <p className="hidden sm:inline">Add to Cart</p>
                                                        <p className="sm:hidden m-0 px-1 py-0">+</p>



                                                    </button>

                                                </div>

                                            </div>

                                        </div>
                                    </div>



                                ))}

                            </div>
                            <div className="hidden w-full min-v-[40vh] text-center md:block">
                                {cart?.map((p) => (
                                    <div key={p._id} className="mt-2 p-2 flex flex-row overflow-hidden justify-between h-[4rem]  border rounded-lg bg-gray-200 shadow">

                                        <div className="w-[30rem] flex gap-1">
                                            <h5 className="my-auto text-left text-md font-bold ">{p.name}</h5>
                                        </div>


                                        <div className="w-full  justify-center  text-sm flex">
                                            <p className="my-auto text-gray-500">x {p.quantity}</p>
                                        </div>
                                        <div className="w-full justify-end  text-sm flex">
                                            <p className="my-auto text-right font-bold text-green-500">Rs.{p.quantity * p.price}</p>
                                        </div>
                                        <div className="w-full justify-end text-sm flex">
                                            <button className="my-auto  font-bold hover:bg-gray-300 transition p-2 rounded-full"
                                                onClick={() => {
                                                    removeCartItem(p._id)
                                                }}>
                                                <AiOutlineDelete className="text-red-500" size={20} />
                                            </button>
                                        </div>




                                    </div>

                                ))}
                                {cart?.length ? <>
                                    <div className="w-full justify-center mt-2 text-lg flex">
                                        <button className="my-auto font-bold p-2 rounded-lg w-full border border-green-800" onClick={() => navigate("/cart")}>Checkout</button>
                                    </div></> : <>
                                    <div className="p-2 min-h-[20vh] flex justify-center items-center bg-gray-200 rounded-lg">
                                        <p className="block text-center">Your Cart Is Empty</p>
                                    </div>
                                </>}
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