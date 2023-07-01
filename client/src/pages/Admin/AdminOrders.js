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
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col"> date</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>
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
                                                <td>{o?.buyer?.name}</td>
                                                <td>{o?.createdAt}</td>
                                                <td>{o?.paymentId}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        {o?.products?.map((p, i) => (
                                            <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                                <div className="col-md-4">
                                                    <img
                                                        src={`/api/v1/product/product-photo/${p._id}`}
                                                        className="card-img-top"
                                                        alt={p.name}
                                                        width="100px"
                                                        height={"100px"}
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <p>{p.name}</p>
                                                    <p>{p.description.substring(0, 30)}</p>
                                                    <p>Price : {p.price}</p>
                                                </div>
                                            </div>
                                        ))}
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