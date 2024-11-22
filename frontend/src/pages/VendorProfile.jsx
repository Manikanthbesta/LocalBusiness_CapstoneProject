import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import VendorProduct from '../components/VendorProduct';
import Cookies from 'js-cookie';
import axios from 'axios';
import VendorEditModal from '../components/VendorEditModal';

const VendorProfile = () => {
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const vendorId = Cookies.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    if (vendorId) {
      // Fetch vendor details
      axios.get(`http://localhost:8084/vendors/${vendorId}`)
        .then(response => {
          // Add image URL handling
          const vendorData = {
            ...response.data,
            profileImageUrl: response.data.profileImageUrl || '/default-vendor.jpg'
          };
          setVendor(vendorData);
        })
        .catch(error => {
          console.error("Error fetching vendor data:", error);
        });

      // Fetch products with image handling
      axios.get(`http://localhost:8083/products/vendor/${vendorId}`)
        .then(response => {
          const productsWithImages = response.data.map(product => ({
            ...product,
            productImageUrl: product.productImageUrl || '/default-product.jpg'
          }));
          setProducts(productsWithImages);
        })
        .catch(error => {
          console.error("Error fetching products:", error);
        });

      axios.get(`http://localhost:8082/orders/vendor/${vendorId}`)
        .then(response => {
          setOrderCount(response.data.length);
        })
        .catch(error => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [vendorId]);

  const handleUpdateProduct = (productId) => {
    console.log(`Update product ${productId}`);
  };

  const handleDeleteProduct = (productId) => {
    console.log(`Delete product ${productId}`);
  };

  const handleAddProducts = () => {
    navigate("/add-product");
  };

  const handleViewOrders = () => {
    navigate("/vendor-orders");
  };

  const handleSuccess = () => {
    // Refresh products with image handling
    axios.get(`http://localhost:8083/products/vendor/${vendorId}`)
      .then(response => {
        const productsWithImages = response.data.map(product => ({
          ...product,
          productImageUrl: product.productImageUrl || '/default-product.jpg'
        }));
        setProducts(productsWithImages);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  };

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteConfirmOpen = () => {
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteConfirmClose = () => {
    setIsDeleteConfirmOpen(false);
  };

  const handleDeleteProfile = () => {
    axios.delete(`http://localhost:8084/vendors/${vendorId}`)
      .then(() => {
        Cookies.remove("id");
        Cookies.remove("userType");
        navigate("/login");
      })
      .catch(error => {
        console.error("Error deleting vendor:", error);
      });
  };

  if (!vendor) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-orange-50 to-gray-100">
        <div className="text-2xl text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 py-8">
      <div className="p-6 max-w-6xl mx-auto space-y-8">
        {/* Vendor Profile Section */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
          <div className="bg-gradient-to-r from-orange-400 to-orange-300 h-32"></div>
          <div className="md:flex items-center px-6 -mt-20">
            <div className="w-full md:w-1/3 p-6 flex flex-col items-center">
              <div className="relative">
                <img
                  src={vendor.profileImageUrl}
                  alt={vendor.name}
                  className="w-48 h-48 rounded-full border-4 border-white shadow-xl object-cover
                           hover:border-orange-400 transition-all duration-300"
                  onError={(e) => {
                    e.target.src = '/default-vendor.jpg';
                  }}
                />
              </div>
              <p className="mt-4 text-gray-600 bg-orange-50 px-4 py-2 rounded-full shadow-sm">
                Category: {vendor.businessCategory}
              </p>
            </div>
            <div className="md:w-1/3 text-center mt-6 md:mt-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 hover:text-orange-500 transition-colors duration-300">
                {vendor.name}
              </h2>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center justify-center gap-2">
                  <span className="text-orange-400">📍</span> {vendor.location}
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="text-orange-400">📞</span> {vendor.contactPhoneNumber}
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="text-orange-400">✉️</span> {vendor.contactEmail}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-6 flex flex-col justify-center space-y-4">
              <div className="text-center bg-orange-50 rounded-xl p-4 shadow-inner">
                <p className="text-4xl font-bold text-orange-500 mb-2">{orderCount}</p>
                <p className="text-gray-600">Total Orders</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={handleViewOrders}
                  className="bg-white border-2 border-orange-400 px-4 py-2 rounded-lg shadow-md
                           hover:bg-orange-400 hover:text-white transition-all duration-300
                           transform hover:scale-105">
                  View Orders
                </button>
                <button onClick={handleEditModalOpen}
                  className="bg-white border-2 border-orange-400 px-4 py-2 rounded-lg shadow-md
                           hover:bg-orange-400 hover:text-white transition-all duration-300
                           transform hover:scale-105">
                  Update Profile
                </button>
                <button onClick={handleAddProducts}
                  className="bg-white border-2 border-orange-400 px-4 py-2 rounded-lg shadow-md
                           hover:bg-orange-400 hover:text-white transition-all duration-300
                           transform hover:scale-105">
                  Add Products
                </button>
              </div>

              <button onClick={handleDeleteConfirmOpen}
                className="bg-white border-2 border-red-400 px-4 py-2 rounded-lg shadow-md
                         hover:bg-red-400 hover:text-white transition-all duration-300
                         transform hover:scale-105 w-full">
                Delete Profile
              </button>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-xl shadow-2xl p-8 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="flex justify-between items-center mb-8">
            <div className="relative">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                Your Products
              </h3>
              <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full 
                transform origin-left animate-scale-x"></div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.length > 0 ? (
              products.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl 
                    transform hover:scale-[1.02] transition-all duration-300 group">
                    {/* Product Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.productImageUrl}
                        alt={product.productName}
                        className="w-full h-full object-cover transform group-hover:scale-110 
                          transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = '/default-product.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 
                        to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white font-semibold truncate">{product.productName}</p>
                          <p className="text-white/80 text-sm">₹{product.price}</p>
                        </div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                      <h4 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-500 
                        transition-colors duration-300">
                        {product.productName}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                      
                      {/* Price and Stock */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="bg-orange-50 px-3 py-1 rounded-full">
                          <span className="text-orange-500 font-semibold">₹{product.price}</span>
                        </div>
                        <div className="bg-blue-50 px-3 py-1 rounded-full">
                          <span className="text-blue-500 font-semibold">Stock: {product.stockQuantity}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateProduct(product.id)}
                          className="flex-1 bg-orange-100 text-orange-600 px-4 py-2 rounded-lg
                            hover:bg-orange-200 transition-colors duration-300 font-medium"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="flex-1 bg-red-100 text-red-600 px-4 py-2 rounded-lg
                            hover:bg-red-200 transition-colors duration-300 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 
                bg-orange-50/50 rounded-xl border-2 border-dashed border-orange-200">
                <img
                  src="https://illustrations.popsy.co/amber/taking-notes.svg"
                  alt="No products"
                  className="w-48 h-48 mb-4 opacity-75"
                  onError={(e) => {
                    e.target.src = '/default-empty.jpg';
                  }}
                />
                <p className="text-xl text-gray-600 mb-2">No products found</p>
                <p className="text-gray-500 text-center mb-4">
                  Start adding your amazing products to showcase them to your customers
                </p>
                <button
                  onClick={handleAddProducts}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow-md
                    hover:bg-orange-600 transition-colors duration-300"
                >
                  Add Your First Product
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        {vendor && (
          <VendorEditModal
            isOpen={isEditModalOpen}
            onClose={handleEditModalClose}
            vendor={vendor}
            onSuccess={handleSuccess}
          />
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteConfirmOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={handleDeleteConfirmClose}></div>
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full relative z-10">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Deletion</h2>
              <p className="mb-6 text-gray-600">Are you sure you want to delete your profile? This action cannot be undone.</p>
              <div className="flex justify-between">
                <button
                  onClick={handleDeleteProfile}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 
                           transition-colors duration-300"
                >
                  Delete
                </button>
                <button
                  onClick={handleDeleteConfirmClose}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 
                           transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorProfile;