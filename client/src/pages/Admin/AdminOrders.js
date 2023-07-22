import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/adminMenu'
import { Select } from "antd";
import axios from "axios"
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth'

const { Option } = Select;
const AdminOrders = () => {
    const [status, setStatuss] = useState(["Not Processed", "Processing", "Shipped", "Delivered", "Canceled"])
    const [changeStatus, setCHangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/all-orders");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
                status: value,
            });
            getOrders();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div className='mx-auto max-w-screen-lg min-h-[80vh] p-3 bg-gray-200 rounded-lg'>
                <p className='block font-bold text-center text-2xl m-2 bg-gray-300 rounded-lg p-2'> Admin Dashboard</p>
                <div className="sm:grid sm:grid-cols-[30%_70%] p-2">
                    <AdminMenu />
                    <div className="bg-gray-300 min-h-[60vh] pr-4 rounded-lg mt-3 sm:mt-0 sm:ml-4 p-2">
                        <h1 className="text-center">All Orders</h1>
                        {orders?.map((o, i) => {
                            return (
                                <div className="border shadow">
                                    <table className="table-auto sm:text-md text-xs text-left w-full">
                                        <thead>
                                            <tr className='bg-gray-700 text-white'>
                                                <th scope="col" className="pr-2 sm:px-4 py-3">#</th>
                                                <th scope="col" className="sm:px-4 py-3">Status</th>
                                                <th scope="col" className="px-2 sm:px-4 py-3">Buyer</th>
                                                <th scope="col" className="sm:px-4 py-3">Date</th>
                                                <th scope="col" className="sm:px-4 py-3">Payment Id</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='bg-white'>
                                                <td className="sm:px-4 py-3">{i + 1}</td>
                                                <td className="sm:px-4 py-3">
                                                    <Select
                                                        bordered={false}
                                                        onChange={(value) => handleChange(o._id, value)}
                                                        defaultValue={o?.status}
                                                    >
                                                        {status.map((s, i) => (
                                                            <Option key={i} value={s}>
                                                                {s}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </td>
                                                <td className="sm:px-4 py-3">{o?.buyer?.name}</td>
                                                <td className="sm:px-4 py-3">{o?.createdAt}</td>
                                                <td className="sm:px-4 py-3">{o?.paymentId}</td>

                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        {o?.products?.map((p, i) => (
                                            <div className="mb-2 border p-3 flex flex-row" key={p.product?._id}>
                                                <div className="p-2 ">
                                                    <img
                                                        src={`/api/v1/product/product-photo/${p.product?._id}`}
                                                        className="card-img-top"
                                                        alt={p.name}
                                                        width="100px"
                                                        height={"100px"}
                                                    />
                                                </div>
                                                <div className="p-2">
                                                    <p>{p.product?.name}</p>
                                                    <p>quantity: {p.quantity}</p>
                                                    <p>Price : {p.product?.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                        <div className='row-span-1  bg-white  rounded-t-lg overflow-hidden pb-2'>
                                            <img className=" object-contain h-[9rem] w-full rounded-t-lg" src={`/api/v1/auth/prescription/${o?._id}`} alt="photo" />

                                        </div>
                                        <p className='py-auto p-2'><span className='font-bold'>{o?.buyer?.name} Address:</span> {o?.buyer?.address}</p>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminOrders