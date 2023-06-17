import { React, useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/register", {
                name,
                email,
                password,
                phone,
                address,
                answer
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    return (
        <div>
            <Toaster />

            <section className=" bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">

                    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl block text-center font-bold leading-tight tracking-tight md:text-2xl text-white">
                                Create an Account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} >
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Name</label>
                                    <input value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type=""
                                        name=""
                                        id=""
                                        className=" sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border border-gray-600 placeholder-gray-400 text-white "
                                        placeholder="John Smith"
                                        required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                                    <input value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type=""
                                        name=""
                                        id=""
                                        className=" sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border border-gray-600 placeholder-gray-400 text-white "
                                        placeholder="name@company.com"
                                        required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Phone Number</label>
                                    <input value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        type=""
                                        name=""
                                        id=""
                                        className=" sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border border-gray-600 placeholder-gray-400 text-white "
                                        placeholder="+1 234567890"
                                        required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Address</label>
                                    <input value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        type=""
                                        name=""
                                        id=""
                                        className=" sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border border-gray-600 placeholder-gray-400 text-white "
                                        placeholder="ABC Street, City, State"
                                        required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">What is your favourite sport?</label>
                                    <input value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        type=""
                                        name=""
                                        id=""
                                        className=" sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border border-gray-600 placeholder-gray-400 text-white "
                                        placeholder="Football etc."
                                        required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                    <input value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type=""
                                        name=""
                                        id=""
                                        placeholder="••••••••"
                                        className=" border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
                                        required />
                                </div>



                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border border-gray-600">Register</button>
                                <div className=" block text-center text-sm font-light text-gray-500 dark:text-gray-400">

                                    Already have an account? <Link to='/login' className="font-medium hover:underline text-primary-500">Login here</Link>


                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Register;