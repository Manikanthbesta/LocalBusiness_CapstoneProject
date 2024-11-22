import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../pages/CartContext'; 
import Cookies from 'js-cookie'; 
import logo from "../assets/TownSquare.png";

const Navbar = () => {
  const { getCartCount } = useCart();
  const { cart, dispatch } = useCart(); 
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userType = Cookies.get("userType"); 

  const handleLogout = () => {
    Cookies.remove("userType");
    Cookies.remove("id");
    dispatch({ type: 'CLEAR_CART' });
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCartClick = () => {
    if (userType) {
      navigate("/cart"); 
    } else {
      navigate("/login"); 
    }
  };

  return (
    <nav className="bg-gray-900 p-4 sticky top-0 z-50 shadow-lg transition-all duration-300 ease-in-out">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Heading */}
        <div className="flex items-center text-white text-3xl font-bold transition-transform duration-300 hover:scale-110">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-12 mr-2 transition-transform duration-300 transform hover:rotate-12 hover:scale-125"
          />
          <Link
            to="/"
            className="hover:text-orange-500 transition-all duration-300 transform hover:scale-110 hover:text-shadow-lg"
          >
            TownSquare
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white text-2xl focus:outline-none transition-transform duration-300 hover:scale-125"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links for Large Screens */}
        <ul className="hidden lg:flex space-x-4 lg:space-x-8">
          <li>
            <Link
              to="/"
              className="block text-white text-xl px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 transform hover:text-orange-500 hover:scale-110 hover:text-shadow-lg hover:animate-bounce"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="block text-white text-xl px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 transform hover:text-orange-500 hover:scale-110 hover:text-shadow-lg hover:animate-bounce"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/vendors"
              className="block text-white text-xl px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 transform hover:text-orange-500 hover:scale-110 hover:text-shadow-lg hover:animate-bounce"
            >
              Vendors
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block text-white text-xl px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 transform hover:text-orange-500 hover:scale-110 hover:text-shadow-lg hover:animate-bounce"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block text-white text-xl px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 transform hover:text-orange-500 hover:scale-110 hover:text-shadow-lg hover:animate-bounce"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Icons and Buttons for Large Screens */}
        <div className="hidden lg:flex items-center space-x-6">
          <button
            onClick={handleCartClick}
            className="relative text-white transition-all duration-300 transform hover:scale-110 hover:text-orange-500 hover:shadow-xl hover:animate-pulse"
          >
            <FaShoppingCart className="text-2xl" />
            {/* Display cart count */}
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-3 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                {getCartCount()}
              </span>
            )}
          </button>

          {!userType ? (
            <Link
              to="/login"
              className="bg-gray-800 border border-gray-600 text-white px-6 py-3 rounded-md text-lg hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-110 hover:shadow-xl hover:animate-pulse"
            >
              Login/Register
            </Link>
          ) : (
            <div className="flex items-center space-x-4 group relative">
              <Link
                to={`/${userType}-profile`}
                className="text-white text-xl transition-all duration-300 transform hover:scale-110 hover:text-orange-500 group-hover:text-orange-400"
              >
                <FaUser className="text-2xl hover:text-gray-400 transition duration-200" />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-800 border border-gray-600 text-white px-6 py-3 rounded-md text-lg hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-110"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <ul className="flex flex-col space-y-2 bg-gray-900 p-4">
            <li>
              <Link
                to="/"
                className="block text-white text-xl px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 transform hover:text-orange-500 hover:scale-110 hover:text-shadow-lg hover:animate-bounce"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="block text-white text-xl px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 transform hover:text-orange-500 hover:scale-110 hover:text-shadow-lg hover:animate-bounce"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/vendors"
                className="block text-white text-xl px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 transform hover:text-orange-500 hover:scale-110 hover:text-shadow-lg hover:animate-bounce"
              >
                Vendors
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block text-white text-xl px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 transform hover:text-orange-500 hover:scale-110 hover:text-shadow-lg hover:animate-bounce"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block text-white text-xl px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 transform hover:text-orange-500 hover:scale-110 hover:text-shadow-lg hover:animate-bounce"
              >
                Contact
              </Link>
            </li>
            <li>
              <button
                onClick={handleCartClick}
                className="relative text-white text-xl px-3 py-2 rounded-md text-lg font-medium hover:text-gray-400 transition-all duration-200 transform hover:scale-110"
              >
                <FaShoppingCart className="inline-block text-2xl mr-2" />
                Cart
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </li>
            {!userType ? (
              <li>
                <Link
                  to="/login"
                  className="block bg-gray-800 border border-gray-600 text-white px-6 py-3 rounded-md text-xl hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-110"
                >
                  Login/Register
                </Link>
              </li>
            ) : (
              <li>
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/${userType}-profile`}
                    className="text-white text-xl px-3 py-2 rounded-md text-sm font-medium hover:text-orange-400 transition duration-200"
                  >
                    <FaUser className="inline-block text-2xl mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block bg-gray-800 border border-gray-600 text-white px-6 py-3 rounded-md text-lg hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-110"
                  >
                    Logout
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;