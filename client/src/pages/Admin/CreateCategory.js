import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/adminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Modal } from 'antd'
import { set } from 'mongoose'
const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();
    //handle form
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const categoryData = new FormData();
            categoryData.append("name", name)
            categoryData.append("photo", photo)
            const { data } = await
                axios.post('/api/v1/category/create-category',
                    categoryData)
            if (data?.success) {
                toast.success(`${name} category has been created`)
                setName('')
                getAllCategory()
                setPhoto("")
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
            const categoryData = new FormData();
            categoryData.append("name", updatedName)
            photo && categoryData.append("photo", photo)
            const { data } = await axios.put(
                `/api/v1/category/update-category/${id}`,
                categoryData
            );
            if (data?.success) {
                toast.success(`${updatedName} has been updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
                setId("")
                setPhoto("")
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("error in front end create catwgory")
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
                navigate("/dashboard/admin/create-category")
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong while deleting");
        }
    };
    return (
        <div className='mx-auto max-w-screen-lg min-h-[80vh] p-3 bg-gray-200 rounded-lg'>
            <p className='block font-bold text-center text-2xl m-2 bg-gray-300 rounded-lg p-2'> Admin Dashboard</p>
            <div className="sm:grid sm:grid-cols-[30%_70%] p-2">
                <AdminMenu />
                <div className="bg-gray-300 min-h-[60vh] rounded-lg mt-3 sm:mt-0 sm:ml-4 p-2">
                    <p className='pt-1 block text-center'>Manage Categories</p>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className=' flex gap-2'><input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                name=""
                                id=""
                                className=" sm:text-sm rounded-lg block w-full p-2.5 border border-gray-600 placeholder-gray-900 text-black "
                                placeholder="Enter a new Category"
                                required />
                                <button type="submit"
                                    className="
                     
                     bg-gray-700
                      font-medium 
                      rounded-lg
                       text-sm
                        px-5 
                        py-2.5 
                        text-center

                         hover:bg-gray-600 border
                          border-gray-600
                          text-white">Add</button>


                            </div>

                            <div className='my-3 w-full'>
                                <label className='border mt-2 w-full border-black text-black rounded-lg p-2 hover:bg-gray-700 hover:text-white'>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type="file"
                                        className='w-full'
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>

                            </div>
                            <div className='mb-3 flex w-[16rem] justify-centermax-h-[14rem]'>
                                {photo && (
                                    <div className='my-3 flex w-auto border justify-center p-2 rounded-lg  border-black'>
                                        <img src={URL.createObjectURL(photo)} alt="product-photo" className='' />
                                    </div>
                                )}
                            </div>
                        </form>
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
                                                    setUpdatedName(c.name);
                                                    setSelected(c);
                                                    setId(c._id);
                                                }} className='border -border-black text-white bg-gray-700 px-2 py-1 rounded-lg'>Edit</button>
                                                {/* <button onClick={() => {
                                                    handleDelete(c._id);
                                                }}
                                                    className='border -border-black text-white bg-red-700 px-2 py-1 rounded-lg'>Delete</button> */}

                                            </td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)}
                            visible={visible}
                            footer={null}>
                            <form onSubmit={handleUpdate}>                      <div className=' flex gap-2'>
                                <input
                                    type="text"
                                    value={updatedName}
                                    onChange={(e) => setUpdatedName(e.target.value)}
                                    name=""
                                    id=""
                                    className=" sm:text-sm rounded-lg block w-full p-2.5 border border-gray-600 placeholder-gray-900 text-black "
                                    placeholder="Enter a new Category"
                                    required />
                                <button type="submit"
                                    className="
                     
                                         bg-gray-700
                                         font-medium 
                                             rounded-lg
                                      text-sm
                                  px-5 
                                  py-2.5 
                                  text-center

                                   hover:bg-gray-600 border
                                    border-gray-600
                                    text-white">Update</button>


                            </div>

                                <div className='my-3 w-full'>
                                    <label className='border w-full border-black text-black rounded-lg p-2 hover:bg-gray-700 hover:text-white'>
                                        {photo ? photo.name : "Upload Photo"}
                                        <input type="file"
                                            className='w-full'
                                            name="photo"
                                            accept="image/*"
                                            onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                    </label>

                                </div>
                                <div className='mb-3 flex w-[16rem] justify-centermax-h-[14rem]'>
                                    {photo ? (
                                        <div className='my-3 flex w-auto border justify-center p-2 rounded-lg  border-black'>
                                            <img src={URL.createObjectURL(photo)} alt="category-photo" className='' />
                                        </div>
                                    ) : (
                                        <div className='my-3 flex w-auto border justify-center p-2 rounded-lg  border-black'>
                                            <img src={`/api/v1/category/category-photo/${id}`} alt="category-photo" className='' />
                                        </div>
                                    )}
                                </div>
                            </form>

                        </Modal>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateCategory