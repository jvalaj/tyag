import { React, useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
                address
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
            <ToastContainer />
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
                    <a href="www.www.com" className="flex items-center mb-6 text-2xl font-semibold text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Flowbite
                    </a>
                    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                                Create an account
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
                                        type="email"
                                        name="email"
                                        id="email"
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
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type=""
                                        name=""
                                        id=""
                                        placeholder="••••••••"
                                        className=" border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
                                        required />
                                </div>



                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border border-gray-600">Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="www.www.com" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Register