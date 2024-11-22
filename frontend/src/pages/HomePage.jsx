import React, { useState, useEffect } from "react";
import axios from "axios";
import VendorCard from "../components/VendorCard";
import ProductCard from "../components/ProductCard";
import Slideshow from '../components/SlideShow';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddToCart = (productName) => {
    setAlertMessage(`${productName} added to cart!`);
    setTimeout(() => {
      setAlertMessage("");
    }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vendorsRes, productsRes] = await Promise.all([
          axios.get('http://localhost:8084/vendors'),
          axios.get('http://localhost:8083/products')
        ]);

        setVendors(vendorsRes.data.slice(-4).reverse());
        setProducts(productsRes.data.slice(-8).reverse());
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    setCategories([
      {
        imageUrl: "https://s-media-cache-ak0.pinimg.com/originals/97/ee/e0/97eee0f6404dcb0ebd478201d892fea7.gif",
        name: "Retail",
        description: "Explore retail products",
        icon: "🛍️"
      },
      {
        imageUrl: "https://media.giphy.com/media/jb0SQ1vs7qi1q/giphy.gif",
        name: "Restaurant",
        description: "Find local restaurants",
        icon: "🍽️"
      },
      {
        imageUrl: "https://i.pinimg.com/originals/7c/7b/a0/7c7ba098f48dad687e54ff24d1ccc79e.gif",
        name: "Services",
        description: "Professional services",
        icon: "🔧"
      },
      {
        imageUrl: "https://media.tenor.com/LwKy5Mellj8AAAAC/clinic-dentist.gif",
        name: "Healthcare",
        description: "Healthcare services",
        icon: "⚕️"
      },
      {
        imageUrl: "https://cdn.dribbble.com/users/1081864/screenshots/3359526/education_800x600_newcolors.gif",
        name: "Education",
        description: "Educational resources",
        icon: "📚"
      },
    ]);

    fetchData();
  }, []);

  const advertisements = [
    {
      image: "https://images.template.net/wp-content/uploads/2019/04/Sale-Advertising-Banner-Templates.jpg",
      vendorId: 1,
      vendorName: "Jack Wilson",
      title: "Special Offers",
      subtitle: "Exclusive deals just for you"
    },
    {
      image: "https://static.vecteezy.com/system/resources/previews/010/969/246/original/30-percent-discount-offer-clearance-promotion-banner-layout-with-sticker-badge-free-vector.jpg",
      vendorId: 2,
      vendorName: "Jack Wilson",
      title: "Seasonal Deals",
      subtitle: "Limited time offers"
    },
    {
      image: "https://img.freepik.com/premium-photo/sign-that-says-sombrero-food-it_1313246-591.jpg?w=826",
      vendorId: 3,
      vendorName: "Imran Abdul Rahman",
      title: "Super Sale",
      subtitle: "Mega discounts"
    },
    {
      image: "https://img.freepik.com/premium-photo/sign-that-says-november-is-bottom-leaf_1253114-12545.jpg?w=740",
      vendorId: 4,
      vendorName: "Mary Elizabeth Thompson",
      title: "Flash Sale",
      subtitle: "Limited time offers"
    },
    {
      image: "https://img.freepik.com/premium-vector/60-percent-off-discount-creative-composition-sale-brochure-with-font-made-from-leaves-sale-banner-poster_3482-9207.jpg?w=826",
      vendorId: 5,
      vendorName: "Jack Wilson",
      title: "Creative Sales",
      subtitle: "Special offers"
    }
  ];

  const handleAdClick = (vendorId) => {
    navigate(`/vendor/${encodeURIComponent(vendorId)}`);
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
  //       <div className="relative">
  //         <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
  //         <div className="mt-4 text-orange-600 font-semibold">Loading...</div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
              style={{
                background: `radial-gradient(circle, ${i % 2 === 0 ? '#FFA500' : '#3B82F6'} 0%, transparent 70%)`,
                width: `${Math.random() * 400 + 200}px`,
                height: `${Math.random() * 400 + 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${Math.random() * 10 + 20}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Slideshow Section */}
        <div className="relative mb-8">
        <Slideshow
          images={advertisements.map(ad => ad.image)}
          height="500px"
          showArrows={true}
          autoPlay={true}
          interval={5000}
        >
          {advertisements.map((ad, index) => (
            <div
              key={index}
              className="relative h-[500px] group cursor-pointer"
            >
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent 
                opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-6 
                  group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-3xl font-bold mb-2">{ad.title}</h3>
                  <p className="text-white/90 mb-4">{ad.subtitle}</p>
                  <button
                    onClick={() => handleAdClick(ad.vendorName)}
                    className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full
                      hover:bg-white/30 transition-all duration-300 transform hover:scale-105
                      border border-white/30 shadow-lg flex items-center gap-2 group"
                  >
                    <span>View {ad.vendorName}'s Store</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slideshow>
      </div>

        <div className="container mx-auto px-4">
          {/* Main Title */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r 
              from-orange-600 via-purple-600 to-blue-600 animate-gradient-x hover:scale-105 
              transition-transform duration-300">
              Find What You Need at Our Marketplace
            </h1>
            <div className="h-1 w-48 mx-auto bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 
              rounded-full animate-pulse"></div>
          </div>
                    {/* Categories Section */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-xl relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delayed"></div>
            </div>

            {/* Section Title */}
            <div className="relative mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600">
                  Browse Categories
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full animate-scale-x"></div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="group relative transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Background Image with Blur Effect */}
                    <div
                      className="absolute inset-0 bg-cover bg-center blur-sm scale-105 opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundImage: `url(${category.imageUrl})` }}
                    />
                    
                    {/* Main Image */}
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover transition-all duration-500 
                        group-hover:scale-110 group-hover:brightness-110"
                    />

                    {/* Overlay with Icon and Text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <span className="text-4xl mb-2">{category.icon}</span>
                        <h3 className="text-xl font-bold text-center px-2">{category.name}</h3>
                        <p className="text-sm text-white/80 text-center mt-1 px-4">{category.description}</p>
                      </div>
                    </div>

                    {/* Animated Border Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-transparent
                        transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-blue-500 to-transparent
                        transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vendors Section */}
<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-xl overflow-hidden">
  <div className="relative mb-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600">
        Featured Vendors
      </span>
    </h2>
    <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full animate-scale-x"></div>
  </div>

  {/* Replace the grid with this scrolling container */}
  <div className="relative overflow-hidden">
    <div className="animate-scroll-right flex gap-6 whitespace-nowrap">
      {[...vendors, ...vendors].map((vendor, index) => (
        <div 
          key={`${vendor.id}-${index}`}
          className="group relative flex-shrink-0 w-[300px] transform hover:scale-105 
            transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="relative h-64">
              <img
                src={vendor.profileImageUrl}
                alt={vendor.storeName}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent 
                opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-orange-500 
                transition-colors duration-300">{vendor.name}</h3>
              <p className="text-gray-600">{vendor.businessCategory}</p>
              <p className="text-gray-500 text-sm mt-2 flex items-center gap-1">
                <span>📍</span> {vendor.location}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

{/* Products Section */}
<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-xl overflow-hidden">
  <div className="relative mb-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600">
        Latest Products
      </span>
    </h2>
    <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full animate-scale-x"></div>
  </div>

  {/* Replace the grid with this scrolling container */}
  <div className="relative overflow-hidden">
    <div className="animate-scroll-left flex gap-6 whitespace-nowrap">
      {[...products, ...products].map((product, index) => (
        <div 
          key={`${product.id}-${index}`}
          className="flex-shrink-0 w-[300px]"
        >
          <ProductCard
            product={product}
            showAddToCart={false}
            onClick={() => navigate(`/shop/${product.id}`)}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        </div>
      ))}
    </div>
  </div>
</div>

          
      {/* Alert Message */}
      {alertMessage && (
        <div className="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-green-600 
          text-white px-6 py-3 rounded-lg shadow-2xl animate-fade-in-up flex items-center gap-2">
          <span className="text-xl">✓</span>
          <p>{alertMessage}</p>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default HomePage;