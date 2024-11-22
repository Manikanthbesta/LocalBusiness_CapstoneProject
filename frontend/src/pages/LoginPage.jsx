import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 
import logo from "../assets/townsquarelogin.png";
import loginbg from "../assets/loginbg.jpg"; 

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 

    try {
      const vendorsResponse = await fetch("http://localhost:8084/vendors/all");
      const vendors = await vendorsResponse.json();

      const customersResponse = await fetch("http://localhost:8081/customers");
      const customers = await customersResponse.json();

      const customerUser = customers.find(
        (customer) => customer.username === username
      );
      const vendorUser = vendors.find(
        (vendor) => vendor.name === username
      );

      if (customerUser && customerUser.passwordHash === password) {
        Cookies.set("userType", "customer");
        Cookies.set("id", customerUser.userId);

        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          const cart = JSON.parse(storedCart);
          console.log("Cart items:", cart);
        }

        navigate("/");
      } 
      else if (vendorUser && vendorUser.passwordHash === password) {
        Cookies.set("userType", "vendor");
        Cookies.set("id", vendorUser.id);
        navigate("/vendor-profile");
      } else {
        setErrorMessage("Login failed: Invalid username or password");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Login failed: Unable to fetch data");
    }
  };

  const divStyle = {
    backgroundImage: `url(${loginbg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    animation: "gradientBg 15s ease infinite"  
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image with Blur and Animation */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          ...divStyle,
          filter: 'blur(8px)',  // Apply blur to the background image only
        }}
      ></div>

      {/* Login Form (Modal Style) */}
      <div 
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-500 scale-100 z-10 animate__animated animate__fadeIn animate__delay-0.5s"
      >
        {/* Logo with Floating Animation and Increased Size */}
        <center>
          <img 
            src={logo} 
            alt="Logo" 
            className="h-24 w-24 mb-6 transform transition duration-500 hover:rotate-12 hover:scale-110 animate__animated animate__fadeIn animate__delay-1s animate__bounceIn"
          />
        </center>
        {/* Adding Text Animation */}
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 animate__animated animate__fadeIn animate__delay-1.2s">
          Entry Protocol
        </h2>
        <form onSubmit={handleLogin}>
          {/* Username Input Field with Floating Effect */}
          <div className="mb-4 relative">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-60 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105 animate__animated animate__pulse animate__delay-1s"
              placeholder="Enter your username"
              required
            />
          </div>
          {/* Password Input Field with Floating Effect */}
          <div className="mb-6 relative">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-60 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105 animate__animated animate__pulse animate__delay-1.5s"
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Error Message with Animation */}
          {errorMessage && (
            <p className="text-red-500 text-center mb-4 animate__animated animate__shakeX animate__delay-0.5s">
              {errorMessage}
            </p>
          )}
          {/* Login Button with Glowing Hover Effect and Ripple */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-xl hover:animate-pulse"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-600">New to our site?</p>
          <div className="mt-2">
            <Link
              to="/register"
              className="text-blue-400 p-2 rounded hover:underline transition duration-200"
            >
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;