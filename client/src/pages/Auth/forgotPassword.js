import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/forgot-password", {
                email,
                newPassword,
                answer,
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


            <section className="min-h-[80vh] bg-gradient-to-r from-blue-800 to-blue-500 flex items-center justify-center">
                <div className="flex w-full md:w-[60%] flex-col my-auto items-center justify-center px-6 py-8 mx-auto ">

                    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-white border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl block text-center font-bold leading-tight tracking-tight md:text-2xl ">
                                Reset Password
                            </h1>
                            <form className="space-y-8" onSubmit={handleSubmit} >
                                <div className="space-y-4 md:space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium ">Enter Your Email</label>
                                        <input value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type=""
                                            name=""
                                            id=""
                                            className=" sm:text-sm rounded-lg block w-full p-2.5 bg-gray-300 border border-gray-600 placeholder-gray-400 text-white "
                                            placeholder="name@company.com"
                                            required />
                                    </div>


                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">What is your favourite Sport?</label>
                                        <input value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            type=""
                                            name=""
                                            id=""
                                            placeholder="Football, Basketball etc."
                                            className=" border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-300 border-gray-600 placeholder-gray-400 text-white "
                                            required />
                                    </div>

                                    <div >
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Enter New Password</label>
                                        <input value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            type=""
                                            name=""
                                            id=""
                                            placeholder=".............."
                                            className=" border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-300 border-gray-600 placeholder-gray-400 text-white "
                                            required />
                                    </div>
                                </div>
                                <button type="submit"

                                    className="w-full bg-white hover:bg-gray-300 transition shadow-xl font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-gray-400">Reset Password</button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default ForgotPassword