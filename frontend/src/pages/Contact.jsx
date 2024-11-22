import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PhoneIcon, MailIcon, LocationMarkerIcon } from '@heroicons/react/outline';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const ContactPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const [mapUrl, setMapUrl] = useState('https://maps.google.com/maps?q=UST+Global+Trivandrum+Technopark+Campus&t=&z=13&ie=UTF8&iwloc=&output=embed');

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-float-random"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-overlay filter blur-xl animate-float-geometric"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto p-6 space-y-16">
        {/* Header Section */}
        

        {/* Contact Information Section */}
        <div className="grid lg:grid-cols-1 gap-12 items-center">
          <motion.div 
            {...fadeIn}
            className="text-center lg:text-left space-y-6 mx-auto max-w-2xl"
          >
            <h2 className="text-4xl font-bold text-white drop-shadow-lg">
              Thank You for Visiting!
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              We appreciate you taking the time to explore our platform. Your feedback
              and questions are important to us. Let's start a conversation!
            </p>
            
            {/* Contact Information Cards */}
            <div className="grid gap-4 mt-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-md p-4 rounded-lg flex items-center space-x-4"
              >
                <PhoneIcon className="w-6 h-6 text-white" />
                <span className="text-white">+123 456 7890</span>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-md p-4 rounded-lg flex items-center space-x-4"
              >
                <MailIcon className="w-6 h-6 text-white" />
                <span className="text-white">townsquare@company.com</span>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-md p-4 rounded-lg flex items-center space-x-4"
              >
                <LocationMarkerIcon className="w-6 h-6 text-white" />
                <span className="text-white">UST Global, Technopark, Trivandrum</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Location Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-8"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Location</h3>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={mapUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full transition-all duration-300 hover:opacity-90"
              title="UST Global Technopark"
            ></iframe>
          </div>
        </motion.div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8">
            {/* Column 1: Company Information */}
            <div className="lg:w-1/3">
              <h1 className="text-3xl font-bold text-white mb-4">
                <a href="/" className="hover:text-gray-100 transition-colors">TownSquare</a>
              </h1>
              <p className="text-sm mb-4">
                Discover the best products with us. Bringing quality to your doorstep.
              </p>
              <p className="text-sm">
                © {new Date().getFullYear()} TownSquare. All rights reserved.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:w-1/3">
              <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/shop" className="hover:text-white transition-colors">Shop</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Column 3: Policies */}
            <div className="lg:w-1/3">
              <h2 className="text-xl font-semibold text-white mb-4">Policies</h2>
              <ul className="space-y-2">
                <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/pricing-policy" className="hover:text-white transition-colors">Pricing Policy</a></li>
                <li><a href="/copyright-policy" className="hover:text-white transition-colors">Copyright Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-8 flex justify-center space-x-6">
            <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-4 bg-white rounded-full shadow-lg hover:shadow-xl
            transform hover:scale-110 transition-all duration-300"
        >
          <i className="fas fa-arrow-up text-gray-800"></i>
        </button>
      </footer>
    </div>
  );
};

export default ContactPage;