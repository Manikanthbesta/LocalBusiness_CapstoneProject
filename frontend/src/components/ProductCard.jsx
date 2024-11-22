import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product, showAddToCart = true, onAddToCart }) => {
  const navigate = useNavigate();
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

  const handleProductClick = () => {
    navigate("/shop");
  };

  const price = product?.price ? product.price.toLocaleString() : "N/A";
  const productName = product?.productName || "Unknown Product";
  const vendorName = product?.vendor?.name || "Unknown Vendor";

  return (
    <div
      className="product-card bg-white border-gray-100 border-2 rounded-lg transition-transform duration-300 transform hover:scale-105 flex flex-col h-full overflow-hidden shadow-lg"
      onClick={handleProductClick}
      style={{ cursor: "pointer" }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 transform hover:scale-110"
          onError={(e) => {
            e.target.src = "/default-product.jpg";
            console.log("Image failed to load:", imageUrl);
          }}
        />
      </div>
      
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{productName}</h3>
        <p className="text-gray-600 text-sm mb-2">{product?.description}</p>
        <p className="text-lg font-bold text-orange-500 mb-2">₹{price}</p>
      </div>

      {showAddToCart && (
        <div className="p-4 mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart && onAddToCart(product);
            }}
            className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
