import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaStar, FaStore, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

// Animated Background Components
const FloatingParticles = () => {
  const colors = ['#FFA500', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
  
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(50)].map((_, i) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle at center, ${color}40, ${color}00)`,
              width: Math.random() * 20 + 10 + 'px',
              height: Math.random() * 20 + 10 + 'px',
              left: Math.random() * 100 + 'vw',
              top: Math.random() * 100 + 'vh',
            }}
            animate={{
              x: [0, Math.random() * 400 - 200],
              y: [0, Math.random() * 400 - 200],
              scale: [1, Math.random() + 0.5],
              opacity: [0.3, 0.6]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
};

// Scroll Progress Indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-pink-500 transform-origin-0 z-50"
      style={{ scaleX }}
    />
  );
};

// Enhanced background animation
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-50 to-pink-50"
        animate={{
          background: [
            "linear-gradient(to bottom right, #fff5f5, #fff0f0)",
            "linear-gradient(to bottom right, #fff0f0, #fff5f5)"
          ]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <FloatingParticles />
    </div>
  );
};

// Enhanced Product Card Component
const ProductCard = ({ product, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      className="relative group cursor-pointer perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl transform-gpu"
        style={{
          transformStyle: "preserve-3d"
        }}
      >
        <div className="relative overflow-hidden">
          <motion.img
            src={product.productImageUrl}
            alt={product.productName}
            className="w-full h-48 object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <motion.div
          className="p-4"
          animate={{
            y: isHovered ? -5 : 0
          }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-xl font-bold text-gray-800">{product.productName}</h3>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <motion.span
              className="text-2xl font-bold text-orange-500"
              animate={{
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              ₹{product.price}
            </motion.span>
            {/* <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg
                transform transition-all duration-300 hover:shadow-lg"
            >
              View Details
            </motion.button> */}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Product Reviews Modal Component
const ProductReviewsModal = ({ product, reviews, onClose, onSubmitReview }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmitReview({
        productId: product.id,
        rating,
        comment,
        createdAt: new Date().toISOString()
      });
      setComment('');
      setRating(5);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === modalRef.current && onClose()}
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/90 backdrop-blur-md rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal content remains the same */}
      </motion.div>
    </motion.div>
  );
};

// Main VendorProfilePage Component
const VendorProfilePage = () => {
  const { id } = useParams();
  const [vendorData, setVendorData] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productReviews, setProductReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  useEffect(() => {
    fetchVendorData();
  }, [id]);

  const fetchVendorData = async () => {
    try {
      setLoading(true);
      const [vendorResponse, productsResponse] = await Promise.all([
        axios.get(`http://localhost:8084/vendors/${id}`),
        axios.get(`http://localhost:8083/products/vendor/${id}`)
      ]);

      const vendorDetails = {
        ...vendorResponse.data,
        email: vendorResponse.data.email || 'Not Available',
        phone: vendorResponse.data.phone || 'Not Available',
        address: vendorResponse.data.address || 'Not Available'
      };

      setVendorData(vendorDetails);
      setProducts(productsResponse.data);
    } catch (err) {
      console.error("Error fetching vendor data:", err);
      setError("Failed to fetch vendor details or products.");
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = async (product) => {
    setSelectedProduct(product);
    try {
      const response = await axios.get(`http://localhost:8082/reviews/product/${product.id}`);
      setProductReviews(response.data);
    } catch (error) {
      console.error("Error fetching product reviews:", error);
      setProductReviews([]);
    }
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      await axios.post('http://localhost:8082/reviews', reviewData);
      const response = await axios.get(`http://localhost:8082/reviews/product/${reviewData.productId}`);
      setProductReviews(response.data);
      setAlertMessage("Review submitted successfully!");
      setTimeout(() => setAlertMessage(""), 3000);
    } catch (error) {
      console.error("Error submitting review:", error);
      setAlertMessage("Failed to submit review. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-3 border-4 border-pink-500 border-t-transparent rounded-full animate-spin-slow"></div>
            <div className="absolute inset-6 border-4 border-purple-500 border-t-transparent rounded-full animate-spin-slower"></div>
          </div>
          <p className="text-orange-600 font-medium">Loading vendor details...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl text-center max-w-md"
        >
          <FaStore className="text-red-500 text-4xl mx-auto mb-4" />
          <p className="text-red-500 mb-6 text-lg">{error}</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-lg
              hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ScrollProgress />
      <AnimatedBackground />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10"
      >
        {/* Vendor Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 100
          }}
          className="bg-white/80 backdrop-blur-sm shadow-xl"
        >
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <motion.img
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                src={vendorData?.profileImageUrl}
                alt={vendorData?.name}
                className="w-32 h-32 rounded-full object-cover shadow-xl"
              />
              <div className="flex-1">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-gray-800 mb-2"
                >
                  {vendorData?.name || 'Loading...'}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Business Category */}
                    <motion.div 
                      className="bg-white/50 backdrop-blur-sm rounded-lg p-3 shadow-sm"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-gray-600 flex items-center gap-2">
                        <FaStore className="text-orange-500" />
                        <span className="font-semibold">Business:</span>
                        {vendorData?.businessCategory || 'Not Available'}
                      </p>
                    </motion.div>

                    {/* Address */}
                    <motion.div 
                      className="bg-white/50 backdrop-blur-sm rounded-lg p-3 shadow-sm"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-gray-600 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-orange-500" />
                        <span className="font-semibold">Address:</span>
                        {vendorData?.address || 'Not Available'}
                      </p>
                    </motion.div>

                    {/* Email */}
                    <motion.div 
                      className="bg-white/50 backdrop-blur-sm rounded-lg p-3 shadow-sm"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-gray-600 flex items-center gap-2">
                        <FaEnvelope className="text-orange-500" />
                        <span className="font-semibold">Email:</span>
                        <a 
                          href={`mailto:${vendorData?.contactEmail}`} 
                          className="hover:text-orange-500 transition-colors"
                        >
                          {vendorData?.contactEmail || 'Not Available'}
                        </a>
                      </p>
                    </motion.div>

                    {/* Phone */}
                    <motion.div 
                      className="bg-white/50 backdrop-blur-sm rounded-lg p-3 shadow-sm"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-gray-600 flex items-center gap-2">
                        <FaPhone className="text-orange-500" />
                        <span className="font-semibold">Phone:</span>
                        <a 
                          href={`tel:${vendorData?.contactPhoneNumber}`} 
                          className="hover:text-orange-500 transition-colors"
                        >
                          {vendorData?.contactPhoneNumber || 'Not Available'}
                        </a>
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              {/* <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="md:text-right"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-lg
                    hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                >
                  Contact Vendor
                </motion.button>
              </motion.div> */}
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Product Reviews Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductReviewsModal
            product={selectedProduct}
            reviews={productReviews}
            onClose={() => setSelectedProduct(null)}
            onSubmitReview={handleSubmitReview}
          />
        )}
      </AnimatePresence>

      {/* Alert Message */}
      <AnimatePresence>
        {alertMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 
              text-white px-6 py-3 rounded-xl shadow-2xl"
          >
            {alertMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VendorProfilePage;