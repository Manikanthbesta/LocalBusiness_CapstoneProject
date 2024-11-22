import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircleIcon } from '@heroicons/react/solid';

const VendorEditModal = ({ isOpen, onClose, vendor, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: vendor.name,
        contactEmail: vendor.contactEmail,
        contactPhoneNumber: vendor.contactPhoneNumber,
        location: vendor.location,
        storeName: vendor.storeName,
        profileImageUrl: vendor.profileImageUrl
    });

    const [imageUploaded, setImageUploaded] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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
                    body: formDataForImage
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }

            const result = await response.json();
            const imageUrl = result.secure_url;

            setFormData({
                ...formData,
                profileImageUrl: imageUrl
            });

            setImageUploaded(true);
        } catch (error) {
            console.error("Error:", error);
            setError("There was a problem with the image upload.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.put(
                `http://localhost:8084/vendors/₹{vendor.id}`,
                formData
            );

            if (response.status === 200) {
                setSuccess("Profile updated successfully!");
                onSuccess(); 
                onClose(); 
            } else {
                setError("Update failed. Please try again.");
            }
        } catch (error) {
            console.error("Error updating vendor:", error);
            setError("Update failed. Please check your input and try again.");
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'block' : 'hidden'} z-50`}>
            <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose}></div>
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full z-50">
                <h2 className="text-xl font-bold mb-4">Update Profile</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                {success && <p className="text-green-500 mb-2">{success}</p>}
                <form onSubmit={handleSubmit}>
                    {/* Form fields */}
                    <label className="block mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded-lg w-full p-2 mb-4"
                    />

                    <label className="block mb-2">Contact Email</label>
                    <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="border rounded-lg w-full p-2 mb-4"
                    />

                    <label className="block mb-2">Contact Phone Number</label>
                    <input
                        type="tel"
                        name="contactPhoneNumber"
                        value={formData.contactPhoneNumber}
                        onChange={handleChange}
                        className="border rounded-lg w-full p-2 mb-4"
                    />

                    <label className="block mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="border rounded-lg w-full p-2 mb-4"
                    />

                    <label className="block mb-2">Store Name</label>
                    <input
                        type="text"
                        name="storeName"
                        value={formData.storeName}
                        onChange={handleChange}
                        className="border rounded-lg w-full p-2 mb-4"
                    />

                    <label className="block mb-2">Profile Image</label>
                    <input
                        type="file"
                        name="profileImageUrl"
                        onChange={handleFileChange}
                        className="border rounded-lg w-full p-2 mb-4"
                    />
                    {imageUploaded && (
                        <div className="mt-2 text-green-500">
                            <CheckCircleIcon className="h-5 w-5 inline-block" /> Image
                            uploaded successfully!
                        </div>
                    )}

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VendorEditModal;
