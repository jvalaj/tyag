import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <div>


            <div className="w-full sm:w-50  border rounded-lg bg-gray-500 border-gray-600 text-white">
                <NavLink to="/dashboard/user/profile" className="block w-full px-4 py-2 text-white border rounded-t-lg  bg-gray-700 hover:bg-gray-600 border-gray-600">
                    Update Profile
                </NavLink>
                <NavLink to="/dashboard/user/orders" className="block w-full px-4 py-2 text-white border rounded-b-lg bg-gray-700 hover:bg-gray-600 border-gray-600">
                    Orders
                </NavLink>


            </div>



        </div>
    )
}

export default UserMenu