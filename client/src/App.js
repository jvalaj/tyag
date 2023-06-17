import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Footer from './components/footer'
import Navbar from './components/navbar';
import Home from './pages/home';
import Contact from './pages/contact';
import Products from './pages/products';
import Error from './pages/error';
import Register from './pages/Auth/register'
import Login from './pages/Auth/login';
import Dashboard from './pages/user/dashboard';
import PrivateRoute from './components/routes/private';
import ForgotPassword from './pages/Auth/forgotPassword';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
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
