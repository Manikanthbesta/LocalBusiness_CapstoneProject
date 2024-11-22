import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [hoveredFeature, setHoveredFeature] = useState(null);

    const handleCustomerRegister = () => {
        navigate("/customer-register")
    }
    const handleVendorRegister = () => {
        navigate("/vendor-register")
    }

    const features = [
        { icon: "🛍️", title: "Vast Product Range", desc: "Access products from multiple vendors", color: "from-pink-500 to-rose-500" },
        { icon: "💰", title: "Best Deals", desc: "Compare prices and find great offers", color: "from-purple-500 to-indigo-500" },
        { icon: "📦", title: "Order Tracking", desc: "Track orders and view history", color: "from-blue-500 to-cyan-500" },
        { icon: "🎯", title: "Personalization", desc: "Get customized recommendations", color: "from-teal-500 to-green-500" },
        { icon: "⭐", title: "Reviews", desc: "Rate and review your experience", color: "from-yellow-500 to-orange-500" },
        { icon: "🔒", title: "Secure Payments", desc: "Safe and easy transaction process", color: "from-red-500 to-pink-500" }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden animate-gradient-xy">
            {/* Animated Background */}
            <div className="fixed inset-0">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-white to-blue-100 animate-gradient-xy" />
                
                {/* Animated Particles */}
                <div className="absolute inset-0">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float-random"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${Math.random() * 6 + 2}px`,
                                height: `${Math.random() * 6 + 2}px`,
                                backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`,
                                borderRadius: '50%',
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${Math.random() * 10 + 5}s`
                            }}
                        />
                    ))}
                </div>

                {/* Animated Wave Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-wave" />
                    <div className="absolute bottom-4 left-0 right-0 h-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-wave-delayed" />
                    <div className="absolute bottom-8 left-0 right-0 h-16 bg-gradient-to-r from-pink-400/20 to-orange-400/20 animate-wave-slow" />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Title Section */}
                    <div className="text-center mb-12 animate-fade-in">
                        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600
                            hover:from-blue-600 hover:to-orange-600 transition-all duration-500 animate-pulse-slow">
                            Welcome to Local Market
                        </h1>
                        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-orange-500 to-blue-500 rounded-full animate-scale-x" />
                    </div>

                    {/* Features Section */}
                    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 mb-8 transition-all duration-300 animate-fade-in-up">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">
                            Discover Our Features
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => setHoveredFeature(index)}
                                    onMouseLeave={() => setHoveredFeature(null)}
                                    className={`p-6 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-105
                                        ${hoveredFeature === index ? 'bg-gradient-to-r ' + feature.color + ' text-white' : ''}
                                        animate-fade-in-up`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="text-4xl mb-3 animate-bounce-subtle">
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                    <p className={`text-sm ${hoveredFeature === index ? 'text-white/90' : 'text-gray-600'}`}>
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Registration Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Customer Registration */}
                        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 relative overflow-hidden group
                            hover:scale-[1.02] transition-all duration-300 animate-fade-in-left">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 transform scale-x-0 
                                group-hover:scale-x-100 transition-transform duration-500" />
                            <div className="text-5xl mb-4 animate-bounce-subtle">
                                👤
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Customer Account</h3>
                            <p className="text-gray-600 mb-6">
                                Join our community to enjoy personalized shopping experiences, track orders, and discover amazing deals!
                            </p>
                            <button 
                                onClick={handleCustomerRegister}
                                className="w-full bg-gradient-to-r from-orange-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold
                                    hover:from-orange-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300
                                    hover:scale-105 active:scale-95"
                            >
                                Register as Customer
                            </button>
                        </div>

                        {/* Vendor Registration */}
                        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 relative overflow-hidden group
                            hover:scale-[1.02] transition-all duration-300 animate-fade-in-right">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 transform scale-x-0 
                                group-hover:scale-x-100 transition-transform duration-500" />
                            <div className="text-5xl mb-4 animate-bounce-subtle">
                                🏪
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Vendor Account</h3>
                            <p className="text-gray-600 mb-6">
                                Expand your business reach, manage your products efficiently, and connect with more customers!
                            </p>
                            <button 
                                onClick={handleVendorRegister}
                                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg font-semibold
                                    hover:from-green-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300
                                    hover:scale-105 active:scale-95"
                            >
                                Register as Vendor
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;