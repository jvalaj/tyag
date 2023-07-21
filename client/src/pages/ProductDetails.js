import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/cart.js"
import { toast } from "react-hot-toast";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart, handleAdd, handleSubtract, AddToCart] = useCart()
  //initalp details

  const getProductQuantityInCart = (productId) => {
    let myCart = [...cart]
    const productInCart = myCart.find((product) => product._id === productId);

    if (productInCart) {
      return productInCart.quantity;
    }

    // Return 0 if the product is not found in the cart
    return 0;
  };

  const productQuantity = (pid) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === pid);
    console.log(index)
    let quant = myCart[index].quantity
    console.log("this is the quantitty")
    console.log(quant)
    if (quant === -1) {
      return 0
    }
    else {
      return quant
    }

  }



  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-8 bg-gradient-to-r from-blue-600 to-blue-400 flex items-center flex-col ">

      <div className="w-full">
        <div className="shadow-xl mx-auto max-w-screen-lg grid min-h-[60vh] sm:grid-cols-2 container rounded-lg bg-gray-200 product-details">
          <div className="flex border border-gray-300 rounded-lg items-center bg-white justify-center">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              height="300"
              width={"350px"}
            />
          </div>
          <div className="h-full rounded-r-lg my-auto flex flex-col p-2">

            <div className="my-auto flex flex-col ">
              <p className="text-left  text-blue-500 w-full">
                <Link className="font-semibold text-gray-700" to={"/"}>
                  Home
                </Link> / {product.name}

              </p>
              <h6 className=" mx-0 text-4xl font-semibold mt-0 mb-2">{product.name}</h6>
              <hr className="!bg-blue-600 " />
              <div className="pb-2 mt-2 pt-0 flex items-center justify-start">
                <div className="
            border  border-violet-600 text-violet-600 text-xs  rounded-full p-1.5 ">
                  {product?.category?.name}</div>


              </div>

              <div className="flex flex-col items-center">

                <div className="w-full">
                  <p className="w-full mb-2  rounded-lg p-2  "> {product.description}</p>
                </div>

                <div className="w-full pl-0 flex flex-row gap-2 justify-between p-2">
                  <div className="w-full ml-0 border  flex ">
                    <p className="text-left pl-2 flex my-auto font-semibold w-full text-2xl text-gray-900">
                      <span className="my-auto">
                        Rs. {product?.price}
                      </span>

                    </p>
                  </div>

                  <div className="flex text-xl  w-full flex-row">
                    <button className="border border-gray-800 hover:bg-gray-700 transition hover:text-white rounded-l-lg w-full text-lg shadow-xl  px-3.5"
                      onClick={() => handleSubtract(product._id)}
                    >-</button>
                    <p className="border-y border-gray-800  shadow-xl w-full text-center px-3 m-0 py-2">
                      {getProductQuantityInCart(product._id)}
                    </p>
                    <button className="border border-gray-800 hover:bg-gray-700 transition  hover:text-white rounded-r-lg w-full shadow-xl   px-3.5"
                      onClick={() => handleAdd(product._id)}
                    >+</button>
                  </div>
                </div>
                <button className="shadow-lg mb-2 text-lg rounded-lg transition w-full bg-gradient-to-l from-blue-500 to-blue-400  hover:opacity-70 hover:text-black p-2 m-0 mt-2 py-3 text-white"
                  onClick={() => {
                    AddToCart(product)
                  }}
                >
                  Add to Cart




                </button>
              </div>

            </div>

          </div>
        </div>

      </div>


    </div >
  );
};

export default ProductDetails;
