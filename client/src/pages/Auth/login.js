import { React, useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/auth';
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth()
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
    const location = useLocation()

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login", {
                email,
                password
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message, {
                    toastId: 'success4',
                });
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message, {
                    toastId: 'error3',
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong", {
                toastId: 'error4',
            });
        }
    };
    return (
        <div>
            <section className="min-h-[80vh] bg-gray-900">
                <div className="flex flex-col my-auto items-center justify-center px-6 py-8 mx-auto ">

                    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl block text-center font-bold leading-tight tracking-tight md:text-2xl text-white">
                                Login to your Account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} >

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



                                <button type="submit" className="w-full text-white bg-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 border border-gray-600">Login</button>
                                <button type="button"
                                    className="w-full text-white 
                                bg-primary-600 
                                hover:bg-primary-700 focus:ring-4 
                                focus:outline-none focus:ring-primary-300
                                 font-medium rounded-lg text-sm px-5 py-2.5
                                  text-center dark:bg-primary-600 dark:hover:bg-primary-700 
                                  dark:focus:ring-primary-800 border border-gray-600"
                                    onClick={() => { navigate('/forgot-password') }}
                                >Forgot Password</button>

                                <p className="text-sm block text-center font-light text-gray-400">
                                    Don't have an account? <Link to="/register" className="font-medium hover:underline text-primary-500">Register here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Login;