import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="w-full  flex justify-center mt-3 ">

      <div className="row max-w-screen-lg">

        <div className="w-full  bg-gray-300 rounded-lg p-2">
          <h4 className="text-center">Category - {category?.name}</h4>
          <h6 className="text-center">{products?.length} results found </h6>
          <div className="md:grid md:grid-cols-[60%_40%] p-2">
            <div className='flex flex-col gap-2 m-1'>
              {products.map((p) => (

                <div key={p._id} className="mb-3 flex flex-row sm:grid sm:grid-cols-[30%_70%] justify-between h-[13rem] sm:h-[10rem]  border rounded-lg shadow bg-gray-800 border-gray-700">

                  <div className='w-full flex justify-center bg-white rounded-lg overflow-hidden pb-2'>
                    <img className=" object-contain  h-auto w-full " src={`/api/v1/product/product-photo/${p._id}`} alt="photo" />

                  </div>

                  <div className="w-full  flex flex-col justify-between p-2 gap-1 ">
                    <div className="flex flex-col gap-1">
                      <div className='py-2'>
                        <h5 className="my-auto text-md font-bold tracking-tight text-white">{p.name}</h5>

                      </div>
                      <div className=' py-2'>
                        <p className="my-auto text-sm leading-none text-gray-400"> {p.description.substring(1, 120)}...</p>

                      </div>
                    </div>



                    <div className=' text-right flex flex-row leading-none tracking-tighter'>
                      <div className="w-full text-lg  flex">
                        <p className="my-auto text-left font-bold text-green-500">Rs. {p.price}</p>

                      </div>
                      <div className="w-full text-xs text-right">
                        <button className=" tracking-tighter  bg-blue-600 text-xs p-2 rounded-full text-white">Add to Cart</button>

                      </div>

                    </div>

                  </div>
                </div>

              ))}

            </div>
            <div className="hidden w-full min-v-[40vh] text-center sm:block">
              Cart
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CategoryProduct;
