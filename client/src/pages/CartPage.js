import React, { useState, useEffect } from "react";

import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";


const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      toast.success("Item Removed Successfully")
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  //clear cart
  const clearCart = () => {
    try {

      setCart([]);
      toast.success("Cart Cleared Successfully")
      localStorage.setItem("cart", JSON.stringify([]));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-xl min-h-[80vh]  p-3 rounded-lg">

        <div className="  w-full">
          <div className="md:grid md:grid-cols-[60%_40%]  p-2">

            <div className="">
              <div className="  text-left">
                <div className="col-md-12">
                  <h1 className="text-xl text-left bg-light p-2 mb-1">
                    {!auth?.user
                      ? "Hello Guest"
                      : `Hello  ${auth?.token && auth?.user?.name}`}
                    <p className="text-center">
                      {cart?.length
                        ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
                        }`
                        : " Your Cart Is Empty"}
                    </p>
                    <button className="bg-red-500 p-3 " onClick={clearCart}>

                      Clear Cart
                    </button>
                  </h1>
                </div>
              </div>
              {cart?.map((p) => (
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
                        <p className="my-auto text-sm leading-none text-gray-400"> {p.description.substring(0, 120)}...</p>
                      </div>
                    </div>
                    <div className=' text-right flex flex-row leading-none tracking-tighter'>
                      <div className="w-full text-lg  flex">
                        <p className="my-auto text-left font-bold text-green-500">Rs. {p.price}</p>
                      </div>
                      <div className="w-full text-xs text-right">
                        <button className=" tracking-tighter hover:opacity-60 bg-red-600 text-xs p-2 rounded-full text-white"
                          onClick={() => {
                            removeCartItem(p._id)
                          }}
                        >Remove</button>
                      </div>
                    </div>
                  </div>
                </div>

              ))}
            </div>
            <div className="w-full min-v-[40vh] p-2 text-center ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <br />
              <div className="min-h-[50vh] bg-gray-300 rounded-lg p-2 text-center flex justify-center items-center">
                Payment Box
              </div>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="border text-blue-600 hover:bg-blue-600 hover:text-white transition border-blue-600 p-3 rounded-lg "
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="border text-blue-600 hover:bg-blue-600 hover:text-white transition border-blue-600 p-3 rounded-lg "
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="border text-blue-600 hover:bg-blue-600 hover:text-white transition border-blue-600 p-3 rounded-lg "
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;