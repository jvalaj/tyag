import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/adminMenu'
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
    const [products, setProducts] = useState([]);

    //getall products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product");
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <div>
            <div className='mx-auto max-w-screen-lg min-h-[80vh] p-3 bg-gray-200 rounded-lg'>
                <p className='block font-bold text-center text-2xl m-2 bg-gray-300 rounded-lg p-2'> Admin Dashboard</p>
                <div className="sm:grid sm:grid-cols-[30%_70%] p-2">
                    <AdminMenu />
                    <div className="bg-gray-300 min-h-[60vh] pr-4 rounded-lg mt-3 sm:mt-0 sm:ml-4 p-2">
                        <p className='pt-1 block text-center'>Manage Products</p>
                        <div className='flex gap-3 m-2 flex-wrap'>
                            {products.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/product/${p.slug}`}
                                    className="product-link hover:opacity-90 transition"
                                >
                                    <div className="w-full sm:w-[14rem] overflow-hidden grid grid-rows-2 h-[22rem] border rounded-lg shadow bg-gray-800 border-gray-700">

                                        <div className='row-span-1  bg-white  rounded-t-lg overflow-hidden pb-2'>
                                            <img className=" object-contain h-[11rem] w-full rounded-t-lg" src={`/api/v1/product/product-photo/${p._id}`} alt />

                                        </div>

                                        <div className=" row-span-1 grid p-2 pb-5 grid-rows-4  ">
                                            <div className=' row-span-1 mt-2'>
                                                <h5 className=" text-md font-bold tracking-tight text-white">{p.name}</h5>

                                            </div>
                                            <div className='row-span-2 mb-0 overflow-hidden '>
                                                <p className="text-sm mb-0 leading-none text-gray-400">{p.description}</p>

                                            </div>
                                            <div className='row-span-1  flex justify-between pt-0 sm:pt-3'>
                                                <p className=" text-sm font-semibold text-right my-auto border border-violet-500 rounded-full px-2 p-1 text-violet-500">{p.category.name}</p>

                                                <p className=" text-sm text-right my-auto text-green-500">Rs. {p.price}</p>
                                            </div>

                                        </div>
                                    </div>
                                </Link>
                            ))}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Products