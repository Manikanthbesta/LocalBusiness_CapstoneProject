import React from "react";
import { Link } from "react-router-dom";

const VendorCard = ({
  id,
  vendorPhoto,
  shopName,
  businessCategory,
  location,
  vendor,
}) => {
  // Fallback values to handle undefined props
  const vendorId = vendor?.id || id || "N/A";
  const vendorPhotoUrl = vendorPhoto || vendor?.profileImageUrl || "https://via.placeholder.com/150"; // Default placeholder image
  const vendorName = vendor?.name || "Unnamed Vendor"; // Changed to use vendor name
  const shopTitle = shopName || vendor?.
  storeName || "Unknown Shop";
  const category = businessCategory || vendor?.businessCategory || "Unknown Category";
  const vendorLocation = location || vendor?.location || "Location Not Available";

  return (
    <div className="flex flex-col font-sans bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105 h-full">
      {/* Image Section */}
      <div className="relative">
        <img
          src={vendorPhotoUrl}
          alt={vendorName} // Changed alt text to use vendor name
          className="w-full h-40 object-cover transition-transform duration-300 transform hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title and Category */}
        <div className="flex flex-wrap items-baseline mb-2">
          <h3 className="flex-auto text-xl font-bold text-gray-800">
            {vendorName} {/* Changed to display vendor name */}
          </h3>
        </div>
        <p className="text-gray-600 font-bold mb-4">
          {shopTitle}
        </p>
        <p className="text-lg font-semibold text-orange-500">
          {category}
        </p>

        {/* Location */}
        <p className="text-gray-600 mb-4">{vendorLocation}</p>
      </div>

      {/* Button Section */}
      <div className="p-3">
        <Link
          to={`/vendor/${vendorId}`}
          className="h-10 w-full font-semibold rounded-md bg-orange-500 text-white hover:bg-orange-700 transition duration-200 flex items-center justify-center"
        >
          View Vendor
        </Link>
      </div>
    </div>
  );
};

export default VendorCard;