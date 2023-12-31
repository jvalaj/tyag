import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer'
import Navbar from './components/navbar';
import Home from './pages/home';

import Error from './pages/error';
import Register from './pages/Auth/register'
import Login from './pages/Auth/login';
import Dashboard from './pages/user/dashboard';
import AdminRoute from './components/routes/AdminRoute';
import PrivateRoute from './components/routes/private';
import ForgotPassword from './pages/Auth/forgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import { Toaster } from 'react-hot-toast';
import CreateProduct from './pages/Admin/CreateProduct';
import Orders from './pages/user/orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import AllProducts from './pages/allproducts';
import CategoryProduct from './pages/CategoryProduct';
import Search from './pages/searchPage';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';
import Users from './pages/Admin/Users';
import ScrollToTop from './components/scroll.js';
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />

        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="*" element={<Error />} />

      </Routes>
      <Footer />


    </Router>
  );
}

export default App;
