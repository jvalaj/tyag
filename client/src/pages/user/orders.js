import { React, useState, useEffect } from 'react'
import UserMenu from '../../components/userMenu'
import axios from "axios";
import { useAuth } from "../../context/auth";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
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
                <div className="sm:grid sm:grid-cols-[30%_70%] p-2">
                    <UserMenu />
                    <div className="bg-gray-300 min-h-[50vh] rounded-lg mt-3 sm:mt-0 sm:ml-4 p-2">
                        Orders
                        <div className='w-full p-2 '>
                            {orders?.map((o, i) => {
                                return (
                                    <div className="border p-2 rounded-lg mb-2 w-full shadow">
                                        <table className="table-auto text-left w-full">
                                            <thead className='p-2'>
                                                <tr className='p-2'>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Payment ID</th>
                                                    <th scope="col">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{o?.status}</td>
                                                    <td>{o?.paymentId}</td>
                                                    <td>{o?.amount}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="w-full pb-2">
                                            {o?.products?.map((p) => (
                                                <div className="flex mb-1 bg-gray-400 rounded-lg shadow p-3 flex-row" key={p.product?._id}>
                                                    <div className="col-md-4">
                                                        <img
                                                            src={`/api/v1/product/product-photo/${p.product?._id}`}
                                                            className="card-img-top"
                                                            alt={p.product?.name}
                                                            width="100px"
                                                            height={"100px"}
                                                        />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p>Name: {p.product?.name}</p>
                                                        <p>Quantity: {p.quantity}</p>
                                                        <p>Price : {p.product?.price}</p>
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
        </div>
    )
}

export default Orders