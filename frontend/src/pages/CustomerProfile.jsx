import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null);
  const [updatedCustomer, setUpdatedCustomer] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);  // <-- New state for tracking editing mode
  const customerId = Cookies.get("id");

  const navigate = useNavigate();

  useEffect(() => {
    if (customerId) {
      axios
        .get(`http://localhost:8081/customers/${customerId}`)
        .then((response) => {
          setCustomer(response.data);
          setUpdatedCustomer(response.data);
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
        });
    }
  }, [customerId]);

  const handleInputChange = (e) => {
    setUpdatedCustomer({
      ...updatedCustomer,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataForImage = new FormData();
    formDataForImage.append("file", file);
    formDataForImage.append("upload_preset", "ymsskzwa");
    formDataForImage.append("cloud_name", "dzm3qqhtc");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dzm3qqhtc/image/upload",
        {
          method: "POST",
          body: formDataForImage,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await response.json();
      const imageUrl = result.secure_url;

      setUpdatedCustomer({
        ...updatedCustomer,
        profileImageUrl: imageUrl,
      });

      setImageUploaded(true);
    } catch (error) {
      console.error("Error:", error);
      setError("There was a problem with the image upload.");
    }
  };

  const handleSaveChanges = async () => {
    if (selectedFile) {
      const imageUrl = await uploadToCloudinary(selectedFile);
      if (imageUrl) {
        setUpdatedCustomer({
          ...updatedCustomer,
          profileImageUrl: imageUrl,
        });
      }
    }

    axios
      .put(`http://localhost:8081/customers/${customerId}`, updatedCustomer)
      .then((response) => {
        setCustomer(response.data);
        toast.success("Profile updated successfully!");
        setImageUploaded(false);
        setIsEditing(false);  // <-- Stop editing mode after saving
      })
      .catch((error) => {
        console.error("Error updating customer profile:", error);
        setError(
          error.response?.data?.message ||
          "Error updating profile. Please try again."
        );
      });
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ymsskzwa");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzm3qqhtc/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      try {
        await axios.delete(`http://localhost:8081/customers/${customerId}`);
        Cookies.remove("id");
        toast.success("Profile deleted successfully!");
        setCustomer(null);
        navigate("/login");
      } catch (error) {
        console.error("Error deleting customer profile:", error);
        toast.error("Error deleting profile. Please try again.");
      }
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);  // <-- Set editing mode to true when "Update Profile" is clicked
  };

  if (!customer) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-lg shadow-lg min-h-screen flex justify-center items-center">
      {/* Profile Content */}
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg border-2 border-gray-300">
        {/* Customer Details Section */}
        {!isEditing && (
          <div className="flex items-center mb-8 bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300">
            <img
              src={customer.profileImageUrl}
              alt={`${customer.firstName} ${customer.lastName}`}
              className="w-56 h-56 rounded-full m-6 shadow-lg border-4 border-yellow-400"  // Increased profile photo size
            />
            <div>
              <h2 className="text-4xl font-bold text-gray-800">{customer.firstName} {customer.lastName}</h2> {/* Increased font size */}
              <p className="text-gray-600 text-lg">Email: {customer.email}</p>
              <p className="text-gray-600 text-lg">Phone: {customer.phoneNumber}</p>
              <p className="text-gray-600 text-lg">Address: {customer.address}</p>
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={handleEditProfile}  // <-- Trigger edit mode
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:shadow-lg hover:from-indigo-500 hover:to-purple-600 transition-all transform hover:scale-110"
                >
                  Update Profile
                </button>
                <button
                  onClick={handleDeleteProfile}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-110"
                >
                  Delete Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Update Form - Shown only when isEditing is true */}
        {isEditing && updatedCustomer && (
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-3xl font-bold mb-6">Update Profile</h3> {/* Increased heading size */}
            <div className="space-y-6">
              <input
                type="text"
                name="username"
                value={updatedCustomer.username || ""}
                onChange={handleInputChange}
                placeholder="Username"
                className="w-full px-6 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                value={updatedCustomer.email || ""}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-6 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="phoneNumber"
                value={updatedCustomer.phoneNumber || ""}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full px-6 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="address"
                value={updatedCustomer.address || ""}
                onChange={handleInputChange}
                placeholder="Address"
                className="w-full px-6 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="firstName"
                value={updatedCustomer.firstName || ""}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full px-6 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="lastName"
                value={updatedCustomer.lastName || ""}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full px-6 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-between space-x-4">
                <button
                  onClick={handleSaveChanges}
                  className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:shadow-lg hover:bg-green-600 transition-all"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}  // <-- Cancel editing mode
                  className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg hover:shadow-lg hover:bg-gray-500 transition-all"
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

export default CustomerProfile;
