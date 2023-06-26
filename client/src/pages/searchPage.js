import React from "react";
import { toast } from "react-hot-toast";
import { useCart } from "../context/cart.js"
import { useSearch } from "../context/search";
import SearchInput from "../components/Form/searchInput.js";
import { useNavigate } from "react-router-dom";
const Search = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate()
    const [cart, setCart] = useCart()
    return (


        <div>
            <div className='mx-auto max-w-screen-xl min-h-[80vh] p-3 rounded-lg'>

                <SearchInput />
                <div className="min-h-[80vh] w-full sm:w-auto flex-col flex justify-center">

                    <div className="w-full min-h-[70vh] bg-gray-300 rounded-lg mt-3  p-2">
                        <p className='pt-2 block text-center'>
                            <h1>Search Resuts</h1>
                            <h6>
                                {values?.results.length < 1
                                    ? "No Products Found"
                                    : `Found ${values?.results.length}`}
                            </h6>
                        </p>
                        <div className="md:grid md:grid-cols-[60%_40%] p-2">
                            <div className='flex flex-col gap-2 m-1'>
                                {values?.results.map((p) => (

                                    <div key={p._id} className="mb-3 flex flex-row sm:grid sm:grid-cols-[30%_70%] justify-between h-[13rem] sm:h-[10rem]  border rounded-lg shadow bg-gray-800 border-gray-700">

                                        <div onClick={() => navigate(`/product/${p.slug}`)} className='cursor-pointer hover:opacity-60 w-full flex justify-center bg-white rounded-lg overflow-hidden pb-2'>
                                            <img className=" object-contain  h-auto w-full " src={`/api/v1/product/product-photo/${p._id}`} alt="photo" />

                                        </div>

                                        <div className="w-full  flex flex-col justify-between p-2 gap-1 ">
                                            <div className="flex flex-col gap-1">
                                                <div className='py-2'>
                                                    <h5 className="my-auto text-md font-bold tracking-tight text-white">{p.name}</h5>

                                                </div>
                                                <div className=' py-2'>
                                                    <p className="my-auto text-sm leading-none text-gray-400"> {p.description.substring(0, 100)}...</p>

                                                </div>
                                            </div>
                                            <div className=' text-right flex flex-row leading-none tracking-tighter'>
                                                <div className="w-full text-lg  flex">
                                                    <p className="my-auto text-left font-bold text-green-500">Rs. {p.price}</p>

                                                </div>
                                                <div className="w-full text-xs text-right">
                                                    <button
                                                        onClick={() => {
                                                            setCart([...cart, p])
                                                            localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                                            toast.success("Item Added to Cart")
                                                        }}
                                                        className=" tracking-tighter hover:opacity-60 bg-blue-600 text-xs p-2 rounded-full text-white">Add to Cart</button>

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

                </div>

            </div>
        </div>




    );
};

export default Search