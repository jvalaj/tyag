import { React, useState, useEffect } from 'react'
import UserMenu from '../../components/userMenu'
import axios from "axios";
import { BiHelpCircle } from 'react-icons/bi'
import { useAuth } from "../../context/auth";
import { useNavigate } from 'react-router-dom';
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate()
    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/orders");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);
    return (
        <div>
            <div style={{ fontFamily: 'Poppins' }} className='mx-auto max-w-screen-lg min-h-[80vh] p-3 bg-gray-200 rounded-lg'>
                <p className='block font-bold text-center text-2xl m-2 bg-gray-300 rounded-lg p-2'> User Dashboard</p>
                <div className="sm:grid sm:grid-cols-[30%_70%] sm:p-2">
                    <UserMenu />
                    <div className="bg-gray-300 min-h-[50vh] w-full rounded-lg mt-3 sm:mt-0 sm:ml-4 sm:p-2">
                        <p className='block text-center m-0'>Your Orders</p>
                        <div className='w-full h-full  p-2 '>

                            {orders?.length > 0 ? <div> {orders?.map((o, i) => {
                                return (
                                    <div className="sm:p-2 rounded-lg mb-2 shadow">
                                        <table className="table-auto text-left text-sm w-full">
                                            <thead className='p-2'>
                                                <tr className='bg-gray-700 text-white'>
                                                    <th scope="col" className="px-2 sm:px-6 py-3">#</th>
                                                    <th scope="col" className="sm:px-6 py-3">Status</th>
                                                    <th scope="col" className="sm:px-6 py-3">Payment ID</th>
                                                    <th scope="col" className="sm:px-6 py-3">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='bg-white'>
                                                    <td className="px-2 sm:px-6 py-3">{i + 1}</td>
                                                    <td className="sm:px-6 py-3 font-bold">{o?.status}</td>
                                                    <td className="sm:px-6 py-3">{o?.paymentId}</td>
                                                    <td className="sm:px-6 py-3">Rs.{o?.amount}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="w-full pb-2">
                                            <p className='my-2 text-xl py-auto'>Items: </p>
                                            <div className='flex flex-wrap gap-1'>
                                                {o?.products?.map((p) => (



                                                    <div key={p.product?._id} className="mb-3 w-[9rem] sm:w-[10rem] h-[9rem] grid grid-rows-[50%_50%]   border rounded-lg shadow bg-gray-800 border-gray-700">

                                                        <div
                                                            className='w-full   px-auto flex justify-center bg-white rounded-lg overflow-hidden pb-2'>
                                                            <img className=" object-contain  mx-auto h-auto w-full " src={`/api/v1/product/product-photo/${p.product?._id}`} alt="photo" />
                                                        </div>

                                                        <div className="w-full flex flex-col px-2 ">
                                                            <div className="flex justify-center flex-col gap-1">
                                                                <div className='pt-2'>
                                                                    <h5 className="my-auto text-md font-semibold tracking-tight text-white">{p.product?.name}</h5>
                                                                </div>
                                                                <div className=''>
                                                                    <p className="my-auto text-sm leading-none text-gray-400">Quantity: {p.quantity} </p>
                                                                </div>
                                                            </div>


                                                        </div>

                                                    </div>
                                                ))}
                                            </div>

                                        </div>

                                        <div className='w-full flex justify-end'>
                                            <a className="" href="https://wa.me/919999513839" target="_blank">
                                                <BiHelpCircle size={20} />
                                            </a>
                                        </div>

                                    </div>
                                );
                            })} </div> : <div className='h-[90%] w-full flex items-center justify-center'>
                                <button className='p-2 rounded-lg border text-blue-500 border-blue-500' onClick={() => navigate("/allproducts")}>Buy Something!</button>
                            </div>}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Orders