import React from 'react'
import AdminMenu from '../../components/adminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
    const [auth] = useAuth()
    return (
        <div className='mx-auto max-w-screen-lg h-[80vh] p-3 bg-gray-200 rounded-lg'>
            <p className='block font-bold text-center text-2xl m-2 bg-gray-300 rounded-lg p-2'> Admin Dashboard</p>
            <div className="sm:grid sm:grid-cols-[30%_70%] p-2">
                <AdminMenu />
                <div className="bg-gray-300 h-[50vh] rounded-lg mt-3 sm:mt-0 sm:ml-4 p-2">
                    Hi {auth?.user.name}
                </div>
            </div>

        </div>
    )
}

export default AdminDashboard