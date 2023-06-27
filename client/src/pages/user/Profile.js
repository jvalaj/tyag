import { React, useState, useEffect } from 'react'
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/userMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios'
const Profile = () => {
    //context
    const [auth, setAuth] = useAuth()

    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    //get user data
    useEffect(() => {
        const { email, name, phone, address } = auth?.user
        setName(name)
        setPhone(phone)
        setEmail(email)
        setAddress(address)
    }, [auth?.user])

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("/api/v1/auth/profile", {
                name,
                email,
                password,
                phone,
                address,

            });
            if (data?.error) {
                toast.error(data?.error)

            } else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem('auth', JSON.stringify(ls))
                toast.success("Profile Updated Successfully")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong", {
                toastId: 'error2',
            });
        }
    };
    return (
        <div>
            <div style={{ fontFamily: 'Poppins' }} className='mx-auto max-w-screen-lg mb-3 min-h-[80vh] p-3 bg-gray-200 rounded-lg'>
                <p className='block font-bold text-center text-2xl m-2 bg-gray-300 rounded-lg p-2'> User Dashboard</p>
                <div className="sm:grid sm:grid-cols-[30%_70%] p-2">
                    <UserMenu />
                    <div className="bg-gray-300 min-h-[50vh] rounded-lg mt-3 sm:mt-0 sm:ml-4 p-2">
                        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl block text-center font-bold leading-tight tracking-tight md:text-2xl text-white">
                                    Update Account
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
                                        />
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
                                            disabled />
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
                                        />
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
                                        />
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
                                        />
                                    </div>



                                    <button type="submit" className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-700 transition shadow-xl font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-gray-400">
                                        Update
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile