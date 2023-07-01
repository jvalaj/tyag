import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <div>

            <div className="w-full sm:w-50  border rounded-lg bg-gray-500 border-gray-600 text-white">
                <NavLink to="/dashboard/admin/create-category" className="block w-full px-4 py-2 text-white border rounded-t-lg  bg-gray-700 hover:bg-gray-600 border-gray-600">
                    Create Category
                </NavLink>
                <NavLink to="/dashboard/admin/create-product" className="block w-full px-4 py-2 text-white border  bg-gray-700 hover:bg-gray-600 border-gray-600">
                    Create Product
                </NavLink>
                <NavLink to="/dashboard/admin/products" className="block w-full px-4 py-2 text-white border   bg-gray-700 hover:bg-gray-600 border-gray-600">
                    Manage Products
                </NavLink>
                <NavLink to="/dashboard/admin/orders" className="block w-full px-4 py-2 text-white border rounded-b-lg  bg-gray-700 hover:bg-gray-600 border-gray-600">
                    Orders
                </NavLink>


            </div>



        </div>
    )
}

export default AdminMenu