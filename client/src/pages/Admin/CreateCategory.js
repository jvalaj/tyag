import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/adminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import { Modal } from 'antd'
import { set } from 'mongoose'
const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")
    //handle form
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/category/create-category', { name })
            if (data?.success) {
                toast.success(`${name} category has been created`)
                setName('')
                getAllCategory()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Somethin went wrong in input form")
        }
    }
    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in fetching categories')
        }
    }

    useEffect(() => {
        getAllCategory(

        )
    }, [])

    //update catefgory
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data?.success) {
                toast.success(`${updatedName} has been updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    //delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `/api/v1/category/delete-category/${pId}`
            );
            if (data?.success) {
                toast.success(`${name} Category has been deleted`);

                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong while deleting");
        }
    };
    return (
        <div style={{ fontFamily: 'Poppins' }} className='mx-auto max-w-screen-lg min-h-[80vh] p-3 bg-gray-200 rounded-lg'>
            <p className='block font-bold text-center text-2xl m-2 bg-gray-300 rounded-lg p-2'> Admin Dashboard</p>
            <div className="sm:grid sm:grid-cols-[30%_70%] p-2">
                <AdminMenu />
                <div className="bg-gray-300 min-h-[60vh] rounded-lg mt-3 sm:mt-0 sm:ml-4 p-2">
                    <p className='pt-1 block text-center'>Manage Categories</p>
                    <div>
                        <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                    </div>
                    <div>

                        <div className="relative overflow-x-auto">
                            <table className="table-auto w-full mt-4 border rounded-lg border-black p-4 text-left">
                                <thead className="bg-gray-400 text-black">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Category Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map(c => (
                                        <tr className="border border-black">
                                            <td scope="row" className="px-6 py-4" key={c._id}>{c.name}</td>
                                            <td className='px-6 py-4'>
                                                <button onClick={() => {
                                                    setVisible(true);
                                                    setUpdatedName(c.name); setSelected(c)
                                                }} className='border -border-black text-white bg-gray-700 px-2 py-1 rounded-lg'>Edit</button>
                                                <button onClick={() => {
                                                    handleDelete(c._id);
                                                }}
                                                    className='border -border-black text-white bg-red-700 px-2 py-1 rounded-lg'>Delete</button>

                                            </td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)}
                            visible={visible}
                            footer={null}>

                            <CategoryForm
                                value={updatedName}
                                setValue={setUpdatedName}
                                handleSubmit={handleUpdate} />
                        </Modal>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateCategory