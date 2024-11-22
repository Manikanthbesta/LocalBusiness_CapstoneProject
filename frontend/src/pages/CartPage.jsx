import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const [shippingAddress, setShippingAddress] = useState("");
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const prepareOrderPayload = () => {
    const customerId = Cookies.get("id");
    return {
      customerId: parseInt(customerId, 10),
      orderDate: new Date().toISOString().split("T")[0],
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      items: cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        vendorId: item.product.vendor.id,
      })),
    };
  };

  const handleCheckout = async () => {
    if (!shippingAddress) {
      alert("Please enter a shipping address.");
      return;
    }
  
    const orderPayload = prepareOrderPayload();
  
    // First, create the order on the backend
    try {
      const orderResponse = await axios.post("http://localhost:8082/create-order", {
        amount: totalAmount,
        currency: "INR",  // Use the correct currency
      });
  
      const { orderId } = orderResponse.data; // Get the order ID from the response
  
      const options = {
        key: "rzp_test_iXlTneZln0et2H",
        amount: totalAmount * 100, // Convert amount to paise
        currency: "INR",
        name: "Quickfix",
        description: `Order for ${cart.length} items`,
        order_id: orderId,  // Use the orderId from the server
        handler: async function (response) {
          try {
            const paymentDetails = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
  
            // Send the payment details to your backend to verify and process the payment
            const verifyResponse = await axios.post(
              "http://localhost:8082/orders", 
              paymentDetails
            );
  
            console.log("Payment successful:", verifyResponse.data);
            dispatch({ type: "CLEAR_CART" });
            navigate("/success");
            alert("Payment successful!");
          } catch (error) {
            console.error("Error during payment verification:", error);
            alert("Payment failed. Please try again.");
          }
        },
        theme: {
          color: "#07a291db",
        },
      };
  
      const pay = new window.Razorpay(options);
      pay.open();
  
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating order. Please try again.");
    }
  };
  

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]"></div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-float-random"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-overlay filter blur-xl animate-float-geometric"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto p-6 space-y-8">
        <h1 className="text-5xl font-bold text-center text-white mb-10 animate-fadeIn drop-shadow-lg">
          Your Cart
        </h1>

        {/* Empty Cart State */}
        {cart.length === 0 ? (
          <div className="backdrop-blur-sm bg-white/10 rounded-lg p-8 text-center animate-fadeIn">
            <p className="text-center text-white text-xl">
              Your cart is empty.{" "}
              <Link to="/" className="text-yellow-300 hover:underline hover:text-yellow-400 transition-colors duration-300">
                Continue Shopping
              </Link>
            </p>
          </div>
        ) : (
          /* Cart Items */
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-6 flex justify-between items-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white animate-fadeIn"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {item.product.productName}
                  </h3>
                  <p className="text-gray-600">By: {item.product.vendor.name}</p>
                  <p className="text-gray-700 font-semibold">
                    ₹{item.product.price} x {item.quantity} = ₹
                    {(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "DECREASE_QUANTITY",
                        payload: { id: item.product.id },
                      })
                    }
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "ADD_TO_CART",
                        payload: { product: item.product },
                      })
                    }
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: { id: item.product.id },
                      })
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-110 ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Shipping Address */}
            <div className="mt-10 bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-8 hover:shadow-xl transition-all duration-300 animate-fadeIn">
              <label
                htmlFor="shippingAddress"
                className="block text-xl font-bold mb-4 text-gray-800"
              >
                Shipping Address
              </label>
              <input
                type="text"
                id="shippingAddress"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 hover:border-blue-300 bg-white/50 backdrop-blur-sm text-lg"
                placeholder="Enter your shipping address"
              />
            </div>

            {/* Checkout Section */}
            <div className="mt-10 text-center space-y-6 animate-fadeIn">
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                Total Amount: ₹{totalAmount.toFixed(2)}
              </h2>
              <button
                onClick={handleCheckout}
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xl py-4 px-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-blue-600 hover:to-teal-600 active:scale-95 animate-pulse backdrop-blur-sm"
              >
                Proceed to Checkout
              </button>
              <div className="mt-4">
                <Link
                  to="/"
                  className="text-yellow-300 hover:text-yellow-400 text-lg hover:underline transition-colors duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;