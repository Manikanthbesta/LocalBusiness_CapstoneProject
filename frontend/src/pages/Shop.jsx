import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "₹0 - ₹50", min: 0, max: 50 },
  { label: "₹51 - ₹100", min: 51, max: 100 },
  { label: "₹101 - ₹200", min: 101, max: 200 },
  { label: "₹201 and above", min: 201, max: Infinity },
];

const ProductCard = ({ product, onAddToCart }) => {
  const [imageUrl, setImageUrl] = useState("/default-product.jpg");

  useEffect(() => {
    let isMounted = true;

    const fetchProductImage = async () => {
      if (product?.productImageUrl) {
        try {
          const response = await fetch(`http://localhost:8083/products/${product.id}`);
          const data = await response.json();
          if (isMounted) {
            setImageUrl(data.productImageUrl);
          }
        } catch (error) {
          console.error("Error fetching product image:", error);
        }
      }
    };

    fetchProductImage();

    return () => {
      isMounted = false;
    };
  }, [product]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
    >
      <div className="relative overflow-hidden h-48">
        <motion.img
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          src={imageUrl}
          alt={product.productName}
          className="w-full h-full object-cover transition-transform duration-500"
          onError={(e) => {
            e.target.src = "/default-product.jpg";
            console.log("Image failed to load:", imageUrl);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
      <motion.div className="p-4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <h3 className="text-xl font-semibold text-gray-800 hover:text-orange-500 transition-colors duration-300">
          {product.productName}
        </h3>
        <p className="text-gray-600 mt-1 line-clamp-2 hover:line-clamp-none transition-all duration-300">
          {product.description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-orange-500">₹{product.price}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <FaShoppingCart />
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ShoppingPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const { dispatch } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8083/products");
      setProducts(response.data);
      const uniqueCategories = [...new Set(response.data.map((product) => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
      setAlertMessage("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    try {
      dispatch({ type: "ADD_TO_CART", payload: { product } });
      setAlertMessage(`${product.productName} added to cart successfully!`);
      setTimeout(() => setAlertMessage(""), 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAlertMessage("Failed to add item to cart. Please try again.");
    }
  };

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const handlePriceRangeChange = (e) => {
    const selectedRange = priceRanges.find((range) => range.label === e.target.value);
    setSelectedPriceRange(selectedRange);
  };

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === "" || product.category === selectedCategory) &&
      product.price >= selectedPriceRange.min &&
      product.price <= selectedPriceRange.max
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 via-orange-400 to-pink-500">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="text-white text-xl font-bold"
        >
          Loading products...
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-gradient-to-r from-teal-400 via-orange-400 to-pink-500 min-h-screen"
    >
      <h1 className="text-4xl font-extrabold text-center mb-6 text-white drop-shadow-xl font-serif">Shop</h1>
      <div className="flex justify-center mb-6 space-x-4">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="bg-white/80 backdrop-blur-sm border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={selectedPriceRange.label}
          onChange={handlePriceRangeChange}
          className="bg-white/80 backdrop-blur-sm border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
        >
          {priceRanges.map((range) => (
            <option key={range.label} value={range.label}>
              {range.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
      <AnimatePresence>
        {alertMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg"
          >
            {alertMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ShoppingPage;