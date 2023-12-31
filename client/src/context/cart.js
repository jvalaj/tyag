import { useState, useContext, createContext, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const AddToCart = (product) => {
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
  }

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

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart, handleAdd, handleSubtract, AddToCart]} >
      {children}
    </CartContext.Provider >
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
