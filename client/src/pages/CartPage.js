import React, { useState } from "react";
import { SiRazorpay } from 'react-icons/si'
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from 'react-icons/ai'
import axios from "axios";
import toast from "react-hot-toast";


const CartPage = () => {
  const [id, setId] = useState("")
  const [auth, setAuth] = useAuth();
  const [cart, setCart, handleAdd, handleSubtract] = useCart();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState("");
  // const [uid, setUid] = useState("");
  // const [rpid, setRpid] = useState("");
  // const [amount, setAmount] = useState("");
  //payable price
  const payablePrice = () => {
    let total = totalPrice()
    let taxes = taxesPrice()
    let final = Number(taxes) + Number(total)
    return final.toFixed(2)
  }

  const taxesPrice = () => {
    let mrp = totalPrice()
    let taxes = mrp * (1 / 10)
    let roundedTax = taxes.toFixed(2)
    return roundedTax
  }

  //mrp price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + (item.price * item.quantity);
      });
      return total.toFixed(2)
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
  const handleUpdate = async () => {

    try {
      const photoData = new FormData();
      photoData.append("photo", photo)
      const { data } = await axios.put(
        `/api/v1/payment/razorpay/pres/${id}`,
        photoData
      );
      if (data?.success) {
        toast.success(`pres has been updated`);
        setPhoto("")
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error in front end pres")
      console.log(error);
    }
  };
  //create order
  const orderCreate = async (rpid, uid, amount) => {

    try {
      //   const orderData = new FormData();

      const { data } = await axios.post("/api/v1/payment/razorpay/verify", { cart, rpid, uid, amount })

      if
        (data?.success) {
        setId(data?.order._id)
        handleUpdate()
        alert({ id })
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
        const amount = payablePrice()
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
      <div className="mx-auto max-w-screen-lg min-h-[80vh]  p-3 rounded-lg">

        <div className="  w-full">

          {cart?.length ?
            <>
              <div className="rounded-lg md:grid md:grid-cols-[60%_40%] gap-4 sm:p-2">

                <div className=" rounded-lg m-0">


                  {cart?.length ?
                    <div className="w-full my-2 md:w-[28rem] lg:w-[38rem] text-left">
                      <button className=" hover:bg-gray-300 text-gray-500 flex gap-2 bg-gray-200  transition p-2 rounded-full " onClick={clearCart}>
                        Clear Cart <AiOutlineDelete className="text-red-500" size={20} />
                      </button>
                    </div>
                    : ""}

                  <div className="">

                    <div className='p-10 px-12 flex items-center w-full'>

                      <label className='border p-8 w-full border-black text-black rounded-lg  hover:bg-gray-700 hover:text-white'>
                        Upload Prescription
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
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    {cart?.map((p) => (
                      <div key={p._id} className="mb-3 w-full md:w-[28rem] lg:w-full grid grid-cols-[30%_70%] overflow-hidden justify-between h-[7rem]  border rounded-lg mx-2 bg-sky-100 border-blue-200 ">
                        <div className='w-full flex shadow-xl justify-center bg-white rounded-lg overflow-hidden pb-2'>
                          <img className="rounded-lg object-contain  h-auto w-full " src={`/api/v1/product/product-photo/${p._id}`} alt="photo" />
                        </div>
                        <div className="w-full  flex flex-col p-2 gap-1 ">
                          <div className="h-full flex  flex-col gap-1">
                            <h5 className="my-auto text-lg font-semibold ">{p.name}</h5>
                          </div>
                          <div className="h-full flex text-sm flex-col gap-1">
                            <div className="flex felx-row">
                              <button className="bg-gray-400 shadow-md text-white rounded-full px-1.5"
                                onClick={() => handleSubtract(p._id)}
                              >-</button>
                              <p className="border border-black rounded-lg my-auto px-1.5"> {p.quantity}</p>
                              <button className="bg-gray-400 shadow-md text-white rounded-full px-1.5"
                                onClick={() => handleAdd(p._id)}
                              >+</button>
                            </div>
                          </div>
                          <div className='h-full  text-right flex  flex-row leading-none tracking-tighter'>
                            <div className="w-full text-lg flex">
                              <p className="my-auto text-left">Rs.{p.price}</p>
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

                </div>
                <div className="w-full min-v-[40vh] sm:p-2 mt-2 sm:mt-0 text-center ">

                  <div className="min-h-[30vh] bg-gray-200 rounded-lg pt-0 pb-2 text-center ">
                    <div className="bg-gray-800 rounded-lg p-2 ">
                      <h2 className="text-xl py-auto my-2 text-white">Billing Summary</h2>

                    </div>
                    {auth?.token ? (
                      <>
                        {cart?.length ?
                          <div className="grid p-2 grid-flow-row ">

                            <div className="w-full">

                            </div>
                            <div className="grid text-gray-500 text-sm p-2 grid-flow-row">
                              <div className="leading-tight flex flex-row justify-between">
                                <p className="">MRP</p>
                                <p>Rs. {totalPrice()}</p>
                              </div>
                              <div className="leading-tight flex flex-row justify-between">
                                <p className=" ">Taxes</p>
                                <p>Rs. {taxesPrice()}</p>
                              </div>
                              <div className=" leading-tight flex flex-row justify-between">
                                <p className=" ">Shipping Charges</p>
                                <p className="text-green-500">FREE</p>
                              </div>
                            </div>
                            <hr className="h-[0.5px] bg-gray-400  rounded-full shadow-xl" />

                            <div className="p-2 mt-2 flex flex-row w-full">
                              <div className="font-bold text-left my-auto text-md w-full">
                                Payable
                              </div>
                              <div className="font-bold text-md my-auto text-right w-full">
                                Rs. {payablePrice()}
                              </div>
                            </div>
                            {photo ? (
                              <button className="bg-green-500 flex text-white items-center justify-center mt-2 p-2 rounded-lg shadow-xl"
                                onClick={() => {
                                  checkoutHandler()
                                }}>
                                <span className="h-full text-lg">Pay with Razorpay </span> <SiRazorpay className=" ml-1" size={20} />
                              </button>
                            ) : (
                              <>
                                <button disabled className=" bg-green-500 flex text-white items-center justify-center mt-2 p-2 rounded-lg shadow-xl" >
                                  <span className="h-full text-lg">Please uplaod prescription</span>
                                </button>

                              </>)}
                          </div>

                          : "cart is empty "}

                      </>)
                      : (<div className=" min-h-[40vh] w-full justify-center flex items-center">
                        <button
                          className="border mx-auto my-auto text-blue-600 hover:bg-blue-600 hover:text-white transition border-blue-600 p-3 rounded-lg "
                          onClick={() =>
                            navigate("/login", {
                              state: "/cart",
                            })
                          }
                        >
                          Please Login to checkout
                        </button>

                      </div>)
                    }
                  </div>


                  {auth?.user?.address ? (
                    <>
                      <div className="mb-3 bg-gray-200 shadow mt-2 rounded-lg p-2">
                        <h4 className="text-gray-500 text-left">Delivering to: </h4>
                        <h5 className="text-lg text-center text-sky-500 mb-0">{auth?.user?.address}</h5>
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
                        < >

                        </>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </>
            :
            <>
              <div className="min-h-[80vh] flex flex-col items-center justify-center">
                <p className="block text-3xl text-center">
                  Your Cart is Empty!

                </p>
                <button className="p-2 !text-lg text-blue-600 mt-2 rounded-lg border border-blue-500 " onClick={() => navigate("/allproducts")}>
                  Shop Now
                </button>
              </div>
            </>
          }

        </div>
      </div >
    </div >
  );
};

export default CartPage;