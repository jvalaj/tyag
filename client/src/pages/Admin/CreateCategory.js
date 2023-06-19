import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/adminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
const CreateCategory = () => {
    const [categories, setCategories] = useState([])

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data.success) {
                setCategories(data.category)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong in getting Category')
        }
    }

    useEffect(() => {
        getAllCategory(

        )
    }, [])
    return (
        <div style={{ fontFamily: 'Poppins' }} className='mx-auto max-w-screen-lg h-[80vh] p-3 bg-gray-200 rounded-lg'>
            <p className='block font-bold text-center text-2xl m-2 bg-gray-300 rounded-lg p-2'> Admin Dashboard</p>
            <div className="sm:grid sm:grid-cols-[30%_70%] p-2">
                <AdminMenu />
                <div className="bg-gray-300 h-[50vh] rounded-lg mt-3 sm:mt-0 sm:ml-4 p-2">
                    <p>Manage Category</p>
                    <div>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-400">
                                <thead className="text-xs uppercasebg-gray-700 text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map(c => (
                                        <tr className="border-b bg-gray-800 border-gray-700">
                                            <td key={c._id}>{c.name}</td>
                                            <td>
                                                <button className=''>Edit</button>
                                            </td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateCategory