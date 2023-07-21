import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/cart.js"
import { toast } from "react-hot-toast";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart()
  //initalp details
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
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center flex-col ">
      <div className="w-full">
        <div className="mx-auto max-w-screen-lg pt-8 p-2 ">
          <p className="text-left  text-gray-700 w-full">
            <Link className="font-semibold" to={"/"}>
              Home
            </Link> / {product.name}
            <hr className="mt-4 bg-gray-500 " />
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="mx-auto max-w-screen-lg grid min-h-[80vh] sm:grid-cols-2 container rounded-lg bg-gray-200 product-details">
          <div className="flex border border-gray-300 rounded-lg items-center bg-white justify-center">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              height="300"
              width={"350px"}
            />
          </div>
          <div className="bg-gray-200 h-full rounded-r-lg my-auto flex flex-col p-2">

            <div className="my-auto min-h-[60%] flex flex-col ">
              <h6 className=" text-4xl mb-2">{product.name}</h6>
              <div className="pb-2 pt-0 flex items-center justify-start">
                <div className="
            border  border-violet-600 text-violet-500 text-xs font-bold rounded-full p-1.5 ">
                  {product?.category?.name}</div>


              </div>
              <h6 className="my-4 leading-relaxed -tracking-tight"> {product.description}</h6>
              <div className="flex flex-row justify-between items-center">
                <h6 className="text-2xl font-semibold text-green-500">

                  Rs. {product?.price}
                </h6>

                <button className="hover:opacity-60 bg-blue-600 text-md p-2 m-0 rounded-lg text-white"
                  onClick={() => {
                    let myCart = [...cart]
                    const index = myCart.findIndex(item => item._id === product._id);

                    if (index === -1) {
                      myCart.push({
                        ...product,
                        quantity: 1
                      });
                      const updatedCart = [...myCart];
                      console.log(updatedCart);
                      setCart(updatedCart)
                      localStorage.setItem('cart', JSON.stringify(updatedCart))
                      toast.success("Item Added to Cart")
                    } else {
                      myCart[index].quantity += 1;
                      const updatedCart = [...myCart];
                      setCart(updatedCart);
                      localStorage.setItem("cart", JSON.stringify(updatedCart))
                      console.log(updatedCart);
                      toast.success("Item Added to Cart")
                    }
                  }}
                >
                  Add to Cart




                </button>
              </div>

            </div>
            <hr />
          </div>
        </div>

      </div>

      <hr />
    </div>
  );
};

export default ProductDetails;
