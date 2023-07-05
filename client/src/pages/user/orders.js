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
                                        <table className="table w-full">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Buyer</th>
                                                    <th scope="col">Payment ID</th>
                                                    <th scope="col">Amount</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{o?.status}</td>
                                                    <td>{o?.buyer?.name}</td>
                                                    <td>{o?.paymentId}</td>
                                                    <td>{o?.amount}</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="w-full">
                                            {o?.products?.map((p, i) => (
                                                <div className="flex mb-2 p-3 flex-row" key={p._id}>
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
                                                        <p>Quantity: {p.quantity}</p>
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
        </div>
    )
}

export default Orders