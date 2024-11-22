import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const VendorDetails = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendorDetails = async () => {
      setLoading(true);
      try {
        console.log('Fetching vendor with ID:', id);
        const vendorResponse = await axios.get(`http://localhost:8084/vendors/${id}`);
        console.log('Vendor Response:', vendorResponse.data);
        
        if (vendorResponse.data) {
          setVendor(vendorResponse.data);
          
          const productsResponse = await axios.get(`http://localhost:8083/products/vendor/${id}`);
          console.log('Products Response:', productsResponse.data);
          setProducts(productsResponse.data);
        }
      } catch (err) {
        console.error('Error fetching vendor details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVendorDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-3 border-4 border-pink-500 border-t-transparent rounded-full animate-spin-slow"></div>
          </div>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 font-medium">
            Loading vendor details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-2xl text-gray-600">Error: {error}</div>
          <button 
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-2xl text-gray-600">Vendor not found</div>
          <button 
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8"
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Profile Image and Contact Information */}
            <div className="md:w-1/3">
              {vendor.profileImageUrl && (
                <img
                  src={vendor.profileImageUrl}
                  alt={`${vendor.firstName} ${vendor.lastName}`}
                  className="w-full h-64 object-cover rounded-xl shadow-lg mb-4"
                />
              )}

              {/* Contact Information Section */}
              <div className="bg-orange-50 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-orange-600 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {/* Email */}
                  {vendor.email && (
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium">Email</p>
                        <a href={`mailto:${vendor.email}`} className="text-orange-600 hover:text-orange-700 transition-colors">
                          {vendor.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Phone Number */}
                  {vendor.phoneNumber && (
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium">Phone</p>
                        <a href={`tel:${vendor.phoneNumber}`} className="text-orange-600 hover:text-orange-700 transition-colors">
                          {vendor.phoneNumber}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  {vendor.location && (
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium">Location</p>
                        <p className="text-orange-600">{vendor.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Vendor Details */}
            <div className="md:w-2/3">
              <div className="mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-orange-600 via-pink-500 to-purple-600 text-transparent bg-clip-text animate-gradient-x inline-block">
                      {vendor.name}
                    </span>
                  </h1>
                  
                  <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mb-4"></div>

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {vendor.businessCategory && (
                      <span className="px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-lg font-semibold">
                        {vendor.businessCategory}
                      </span>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Business Details */}
<div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-md mb-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Business Details</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* First Row */}
    <div>
      <p className="text-gray-600 font-medium mb-1">Business Category</p>
      <p className="text-gray-800 text-lg">{vendor.businessCategory}</p>
    </div>
    {/* Email field */}
    <div>
      <p className="text-gray-600 font-medium mb-1">Email</p>
      <p className="text-gray-800 text-lg">{vendor.contactEmail}</p>
    </div>
    {/* Phone Number field */}
    <div>
      <p className="text-gray-600 font-medium mb-1">Phone Number</p>
      <p className="text-gray-800 text-lg">{vendor.contactPhoneNumber}</p>
    </div>
  </div>
</div>
            </div>
          </div>
        </motion.div>

        {/* Products Section */}
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
>
  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-600 mb-6">
    Products by {vendor.firstName}
  </h2>
  
  {products.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {/* Vendor Name */}
          <div className="bg-orange-100 text-orange-600 text-center font-bold text-lg rounded-t-xl py-2">
            {vendor.firstName} {vendor.lastName}
          </div>

          {/* Product Image */}
          {product.productImageUrl && (
            <img
              src={product.productImageUrl}
              alt={product.productName}
              className="w-full h-48 object-cover"
            />
          )}

          {/* Product Details */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.productName}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-orange-500 font-bold">₹{product.price}</p>
          </div>
        </motion.div>
      ))}
    </div>
  ) : (
    <div className="text-center py-8 text-gray-500">
      No products available from this vendor yet.
    </div>
  )}
</motion.div>

      </div>
    </div>
  );
};

export default VendorDetails;