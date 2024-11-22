import React, { useState, useEffect } from "react";
import axios from "axios";
import VendorCard from "../components/VendorCard";
import { motion, AnimatePresence } from "framer-motion";

// Animated Background Components
const ShiningStars = () => (
  <div className="fixed inset-0 pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <div
        key={`star-${i}`}
        className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          boxShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #FFA500'
        }}
      />
    ))}
  </div>
);

const FloatingBubbles = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <div
        key={`bubble-${i}`}
        className="absolute rounded-full mix-blend-multiply animate-float"
        style={{
          width: `${Math.random() * 150 + 50}px`,
          height: `${Math.random() * 150 + 50}px`,
          background: `radial-gradient(circle at 30% 30%, 
            rgba(255, 165, 0, ${Math.random() * 0.2}) 0%,
            rgba(255, 192, 203, ${Math.random() * 0.2}) 50%,
            transparent 70%)`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 10 + 10}s`,
          animationDelay: `${i * -0.5}s`
        }}
      />
    ))}
  </div>
);

const WavyBackground = () => (
  <div className="fixed inset-0 pointer-events-none opacity-30">
    <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-pink-200 animate-wave"></div>
  </div>
);

const VendorsPage = () => {
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8084/vendors/all");
        setVendors(response.data);
        
        const uniqueCategories = [...new Set(response.data.map(vendor => vendor.businessCategory))];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        setError("Failed to load vendors. Please try again later.");
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredVendors = vendors.filter((vendor) => {
    const matchesCategory = selectedCategory === "" || vendor.businessCategory === selectedCategory;
    const vendorName = vendor.name?.toLowerCase() || '';
    const matchesSearch = vendorName.includes(searchTerm.toLowerCase()) ||
                         vendor.businessCategory.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-3 border-4 border-pink-500 border-t-transparent rounded-full animate-spin-slow"></div>
          </div>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 font-medium">
            Loading amazing vendors...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-xl text-center"
        >
          <p className="text-red-500 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg
              hover:from-orange-600 hover:to-pink-600 transition-all duration-300"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 relative overflow-hidden">
      <ShiningStars />
      <FloatingBubbles />
      <WavyBackground />
      
      <motion.div 
        className={`sticky top-0 z-20 bg-white/80 backdrop-blur-md transition-all duration-300 
          ${isScrolled ? 'shadow-lg' : ''}`}
      >
        <div className="container mx-auto px-6 py-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent 
              bg-gradient-to-r from-orange-600 to-pink-600 animate-gradient-x"
          >
            Discover Our Amazing Vendors
          </motion.h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="bg-white/80 backdrop-blur-sm border border-orange-200 rounded-lg 
                  px-6 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 
                  appearance-none cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300
                  text-gray-700 font-medium min-w-[200px]"
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/80 backdrop-blur-sm border border-orange-200 rounded-lg 
                  px-6 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 
                  shadow-lg hover:shadow-xl transition-all duration-300
                  text-gray-700 min-w-[200px]"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredVendors.map((vendor, index) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="group"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 
                    rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300" 
                  />
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden">
                    <VendorCard
                      vendorId={vendor.id}
                      vendorPhoto={vendor.profileImageUrl}
                      name={vendor.name}
                      shopName={vendor.shopName}
                      businessCategory={vendor.businessCategory}
                      location={vendor.location}
                      vendor={vendor}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredVendors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No vendors found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VendorsPage;