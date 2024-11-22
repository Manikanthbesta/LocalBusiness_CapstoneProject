import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Background Effect Components
const FloatingParticle = ({ delay = 0 }) => (
  <div
    className="absolute rounded-full mix-blend-multiply filter blur-xl animate-float-random opacity-70"
    style={{
      width: `${Math.random() * 150 + 50}px`,
      height: `${Math.random() * 150 + 50}px`,
      background: `radial-gradient(circle at center, 
        ${['#10B981', '#059669', '#047857'][Math.floor(Math.random() * 3)]} 0%,
        transparent 70%)`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`
    }}
  />
);

const GeometricShape = ({ delay = 0 }) => {
  const shapes = [
    'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
    'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
    'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
  ];
  
  return (
    <div
      className="absolute bg-gradient-to-br from-emerald-300/20 to-teal-300/20 animate-float-geometric"
      style={{
        width: `${Math.random() * 100 + 50}px`,
        height: `${Math.random() * 100 + 50}px`,
        clipPath: shapes[Math.floor(Math.random() * 3)],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`
      }}
    />
  );
};

const WaveEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 opacity-30">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 animate-wave"
          style={{
            background: `linear-gradient(${45 + (i * 30)}deg, transparent 40%, rgba(16, 185, 129, 0.1) 45%, rgba(16, 185, 129, 0.1) 55%, transparent 60%)`,
            animationDelay: `${i * 2}s`
          }}
        />
      ))}
    </div>
  </div>
);

// Enhanced Input Field Component
const InputField = ({ label, type, name, value, onChange, placeholder, options = [] }) => (
  <div className="group relative">
    <label className="block text-lg font-medium text-gray-700 mb-2 transition-colors 
      group-focus-within:text-emerald-600 relative inline-block">
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 
        group-focus-within:w-full" />
    </label>
    
    {type === 'select' ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-select block w-full rounded-lg border-gray-300 shadow-sm 
          focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-300
          hover:border-emerald-400 text-lg py-3 bg-white
          hover:shadow-lg hover:shadow-emerald-500/10
          transform hover:-translate-y-0.5"
        required
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    ) : (
      <div className="relative group/input">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-input block w-full rounded-lg border-gray-300 shadow-sm 
            focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-300
            hover:border-emerald-400 text-lg py-3
            hover:shadow-lg hover:shadow-emerald-500/10
            transform hover:-translate-y-0.5
            peer"
          required
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/0 
          via-emerald-500/10 to-teal-500/0 opacity-0 group-hover/input:opacity-100 
          transition-opacity duration-300 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 
          bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 
          peer-focus:w-full" />
      </div>
    )}
  </div>
);

// Main Component
const VendorRegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    password: "",
    contactPhoneNumber: "",
    address: "",
    businessCategory: "",
    storeName: "",
    profileImage: "",
    location: "",
  });

  const [imageUploaded, setImageUploaded] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
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

      if (!response.ok) throw new Error("Image upload failed");

      const result = await response.json();
      setFormData(prev => ({
        ...prev,
        profileImage: result.secure_url,
      }));

      setImageUploaded(true);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error:", error);
      setError("Image upload failed. Please try again.");
      toast.error("Image upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!formData.profileImage) {
      setError("Please upload a profile image");
      toast.error("Please upload a profile image");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8084/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          passwordHash: formData.password,
          profileImageUrl: formData.profileImage,
          createdDate: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Registration failed");

      toast.success("Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Error:", error);
      setError("Registration failed. Please try again.");
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.1]">
          <div className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(16,185,129,0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16,185,129,0.2) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              mask: 'radial-gradient(circle at center, black 40%, transparent 100%)'
            }}>
          </div>
        </div>

        {/* Wave Effect */}
        <WaveEffect />

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <FloatingParticle key={`particle-${i}`} delay={i * 0.5} />
        ))}

        {/* Geometric Shapes */}
        {[...Array(6)].map((_, i) => (
          <GeometricShape key={`shape-${i}`} delay={i * 0.7} />
        ))}

        {/* Enhanced Glowing Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-300/30 to-teal-300/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-green-300/30 to-emerald-300/30 rounded-full blur-3xl animate-pulse-slow" />
        
        {/* Central Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-500/10 via-transparent to-teal-500/10 rounded-full blur-3xl animate-glow" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-down">
            <h2 className="text-5xl font-bold mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                Join Our Vendor Community
              </span>
            </h2>
            <div className="h-1.5 w-40 mx-auto bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-scale-x" />
          </div>

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10 animate-fade-in-up">
            {error && (
              <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 text-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  <InputField
                    label="Vendor Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />

                  <InputField
                    label="Store Name"
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    placeholder="Enter store name"
                  />

                  <InputField
                    label="Email Address"
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="email@example.com"
                  />

                  <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <InputField
                    label="Phone Number"
                    type="tel"
                    name="contactPhoneNumber"
                    value={formData.contactPhoneNumber}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                  />

                  <InputField
                    label="Business Category"
                    type="select"
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleChange}
                    placeholder="Select a category"
                    options={[
                      { value: "Retail", label: "Retail" },
                      { value: "Restaurant", label: "Restaurant" },
                      { value: "Services", label: "Services" },
                      { value: "HealthCare", label: "HealthCare" },
                      { value: "Education", label: "Education" }
                    ]}
                  />

                  <InputField
                    label="Address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />

                  <InputField
                    label="Location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State"
                  />
                </div>
              </div>

              {/* Profile Image Upload */}
              <div className="group mt-8">
                <label className="block text-lg font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-emerald-600">
                  Profile Image
                </label>
                <div className="mt-2 flex justify-center px-8 pt-6 pb-8 border-2 border-gray-300 border-dashed rounded-lg
                  hover:border-emerald-400 transition-colors duration-300 relative group/upload">
                  <div className="space-y-2 text-center">
                    <svg className="mx-auto h-16 w-16 text-gray-400 group-hover/upload:text-emerald-500 transition-colors duration-300" 
                      stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-lg text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500
                        transition-colors duration-300">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="sr-only"
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-base text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-teal-500/0 
                    opacity-0 group-hover/upload:opacity-100 transition-opacity duration-300 rounded-lg" />
                </div>
                {imageUploaded && (
                  <p className="mt-2 text-lg text-emerald-600 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Image uploaded successfully!
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-8 rounded-lg 
                    font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] 
                    active:scale-[0.98] hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 
                    disabled:cursor-not-allowed text-xl relative group"
                >
                  <span className="relative z-10">
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Register as Vendor"
                    )}
                  </span>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-600/0 via-white/10 to-teal-600/0 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </button>
              </div>
            </form>
          </div>

          {/* Back Link */}
          <div className="text-center mt-8 animate-fade-in">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-emerald-600 transition-all duration-300 text-lg
                hover:scale-105 active:scale-95 flex items-center justify-center mx-auto space-x-2"
            >
              <span className="transform transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span>Back to Registration Options</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegisterPage;