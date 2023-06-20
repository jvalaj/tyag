import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/adminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (



    <div className='mx-auto max-w-screen-lg min-h-[80vh] p-3 bg-gray-200 rounded-lg'>
      <p className='block font-bold text-center text-2xl m-2 bg-gray-300 rounded-lg p-2'> Admin Dashboard</p>
      <div className="sm:grid sm:grid-cols-[30%_70%] p-2">
        <AdminMenu />
        <div className="bg-gray-300 min-h-[60vh] pr-4 rounded-lg mt-3 sm:mt-0 sm:ml-4 p-2 ">
          <p className='pt-1 block text-center'>Update Product</p>
          <div className='m-1 w-full text-black'>
            <Select bordered={false}
              placeholder="Select a Category"
              size="large"
              showSearch
              className='bg-white w-full placeholder-black text-black form-select border border-black rounded-lg px-0 mb-3'
              onChange={(value) => { setCategory(value) }}
              value={category}
            >
              {categories?.map(c => (
                <Option key={c._id} value={c._id} >{c.name}</Option>
              ))}

            </Select>

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
                  <img src={URL.createObjectURL(photo)} alt="product-photo" className='' />
                </div>
              ) : (
                <div className='my-3 flex w-auto border justify-center p-2 rounded-lg  border-black'>
                  <img src={`/api/v1/product/product-photo/${id}`} alt="product-photo" className='' />
                </div>
              )}
            </div>
            <div className='w-full mb-3'>
              <input type="text"
                value={name}
                placeholder='Name'
                className='w-full rounded-lg block p-2 border border-gray-600 placeholder-gray-900 text-black '
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='mb-3 w-full'>
              <textarea type="text"
                value={description}
                placeholder='Description'
                className='w-full rounded-lg block p-2 border border-gray-600 placeholder-gray-900 text-black '
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='mb-3 flex gap-2 w-full'>
              <input type="number"
                value={price}
                placeholder='Rs. Price'
                className='rounded-lg w-full  block p-2 border border-gray-600 placeholder-gray-900 text-black '
                onChange={(e) => setPrice(e.target.value)}
              />
              <input type="number"
                value={quantity}
                placeholder='Quantity'
                className='rounded-lg w-full block p-2 border border-gray-600 placeholder-gray-900 text-black '
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className='w-full'>
              <Select bordered={false}
                placeholder="Select shipping"
                size="large"
                value={shipping ? "yes" : "No"}
                showSearch
                className='bg-white w-full placeholder-black text-black form-select border border-black rounded-lg px-0 mb-3'
                onChange={(value) => { setShipping(value) }}
              >

                <Option value="1" >Yes</Option>
                <Option value="0" >No</Option>


              </Select>

            </div>
            <div className='w-full flex justify-end'>
              <button onClick={handleUpdate} className='p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white'> Update Product</button>
            </div>
            <div className='w-full flex justify-end'>
              <button onClick={handleDelete} className='p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white'> Delete Product</button>
            </div>


          </div>
        </div>
      </div>

    </div>



  );
};

export default UpdateProduct;
