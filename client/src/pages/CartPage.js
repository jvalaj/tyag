import React, { useState } from "react";

import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";


const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const handleAdd = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart[index].quantity += 1
      const updatedCart = [...myCart]
      console.log(updatedCart)
      toast.success("Quantity Increased")
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubtract = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      if (myCart[index].quantity === 1) {
        removeCartItem(pid)
      } else {
        myCart[index].quantity -= 1
        const updatedCart = [...myCart]
        console.log(updatedCart)
        toast.success("Quantity Decreased")
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

    } catch (error) {
      console.log(error)
    }
  }
  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + (item.price * item.quantity);
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
      localStorage.removeItem("cart");
    } catch (error) {
      console.log(error);
    }
  };
  //order creater in database
  const orderCreate = async (rpid, uid, amount) => {
    try {
      const { data } = await axios.post("/api/v1/payment/razorpay/verify", { cart, rpid, uid, amount })
      if

        (data?.success) {
        toast.success(`Order Successful`)
        localStorage.removeItem("cart");
        setCart([]);
      } else {
        toast.error(data.message)
        toast.error("Error in creating order")
      }
    }
    catch (error) {
      console.log(error)

    }
  };

  const checkoutHandler = async () => {

    const { data } = await axios.post("/api/v1/payment/razorpay/order", cart)

    const options = {
      key: "rzp_test_BhG2kqVg6SNSl4",
      amount: data.amount * 100,
      currency: "INR",
      name: "Medecine Purchase",
      description: `Paying ${data.amount} to chemshop.`,
      image: "",
      order_id: data.id,

      handler: function (response) {

        const rpid = response.razorpay_payment_id
        const uid = auth?.user._id
        const amount = totalPrice()
        orderCreate(rpid, uid, amount)
        navigate("/dashboard/user/orders")


      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999"
      },
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        "color": "#121212"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }
  return (
    <div>
      <div className="mx-auto max-w-screen-xl min-h-[80vh]  p-3 rounded-lg">

        <div className="  w-full">
          {cart?.length ?
            <>
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
                        {cart?.length ?

                          <button className="bg-red-500 p-3 " onClick={clearCart}>
                            Clear Cart
                          </button> : ""}
                      </h1>
                    </div>
                  </div>
                  {cart?.map((p) => (
                    <div key={p._id} className="mb-3  max-w-[35rem] grid grid-cols-[30%_70%] overflow-hidden justify-between h-[7rem]  border rounded-lg bg-gray-200 shadow">
                      <div className='w-full flex justify-center bg-white rounded-lg overflow-hidden pb-2'>
                        <img className=" object-contain  h-auto w-full " src={`/api/v1/product/product-photo/${p._id}`} alt="photo" />
                      </div>
                      <div className="w-full  flex flex-col p-2 gap-1 ">
                        <div className="h-full flex  flex-col gap-1">
                          <h5 className="my-auto text-lg font-bold ">{p.name}</h5>
                        </div>
                        <div className="h-full flex text-sm flex-col gap-1">
                          <div className="flex felx-row">
                            <button className="bg-gray-400 px-1"
                              onClick={() => handleSubtract(p._id)}
                            >-</button>
                            <p className="border border-black rounded-lg my-auto px-1"> {p.quantity}</p>
                            <button className="bg-gray-400 px-1"
                              onClick={() => handleAdd(p._id)}
                            >+</button>
                          </div>
                        </div>
                        <div className='h-full  text-right flex  flex-row leading-none tracking-tighter'>
                          <div className="w-full text-lg flex">
                            <p className="my-auto text-left font-bold text-green-500">Rs. {p.price}</p>
                          </div>
                          <div className="w-full text-xs  flex items-center justify-end ">
                            <button className=" tracking-tighter hover:opacity-60 text-white bg-red-600 text-xs p-2 rounded-full "
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

                  <div className="min-h-[50vh] bg-gray-300 rounded-lg pt-0 pb-2 text-center ">
                    <div className="bg-gray-800 rounded-lg p-2 ">
                      <h2 className="text-xl text-white">Cart Summary</h2>
                      <p className="text-gray-300">Total | Checkout | Payment</p>

                    </div>
                    {auth?.token ? (<>
                      {cart?.length ?
                        <div className="grid p-2 justify-center grid-flow-row ">
                          {cart?.map((p) => (
                            <div key={p._id} className="mt-2 p-2 max-w-[35rem] flex flex-row overflow-hidden justify-between h-[4rem]  border rounded-lg bg-gray-200 shadow">

                              <div className="w-[45rem] flex gap-1">
                                <h5 className="my-auto text-lg font-bold ">{p.name}</h5>
                              </div>


                              <div className="w-full  justify-center  text-lg flex">
                                <p className="my-auto text-gray-500">x {p.quantity}</p>
                              </div>
                              <div className="w-full justify-end  text-lg flex">
                                <p className="my-auto text-right font-bold text-green-500">= Rs. {p.quantity * p.price}</p>
                              </div>



                            </div>

                          ))}
                          <div className="p-2 mt-2 flex flex-row border border-black border-t-0 border-b-0 border-x-0">
                            <div className="font-bold text-left my-auto text-xl w-full">
                              Total
                            </div>
                            <div className="font-bold text-xl my-auto text-right w-full">
                              Rs. {totalPrice()}
                            </div>
                          </div>
                          <button className="bg-green-500 mt-2 p-2 rounded-lg" onClick={() => checkoutHandler()}>Pay with Razorpay</button>
                        </div>

                        : "cart is empty "}</>)
                      : (<p>Please login</p>)
                    }
                  </div>


                  {auth?.user?.address ? (
                    <>
                      <div className="mb-3 bg-gray-200 shadow mt-2 rounded-lg p-2">
                        <h4 className="text-gray-500 text-left">Delivering to: </h4>
                        <h5 className="text-lg text-center mb-0">{auth?.user?.address}</h5>
                        <button
                          className="mx-auto mt-0 text-sm  cursor-pointer hover:text-blue-600 hover:underline"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address ?
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
            </>
            :
            <>
              <div className="h-screen flex items-center justify-center">
                Your Cart is Empty!
              </div>
            </>
          }

        </div>
      </div >
    </div >
  );
};

export default CartPage;