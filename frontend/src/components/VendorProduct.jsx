import React, { useState } from 'react';
import axios from 'axios';

const VendorProduct = ({ product, onUpdate, onDelete }) => {
  const { id, productName, price, description, productImageUrl } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // State for delete confirmation
  const [updatedName, setUpdatedName] = useState(productName);
  const [updatedPrice, setUpdatedPrice] = useState(price);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [alertMessage, setAlertMessage] = useState("");

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8083/products/₹{id}`, {
        productName: updatedName,
        price: updatedPrice,
        description: updatedDescription,
      });
      setAlertMessage("Product updated successfully!");
      setIsModalOpen(false);

      onUpdate({
        ...product,
        productName: updatedName,
        price: updatedPrice,
        description: updatedDescription
      });

    } catch (error) {
      console.error("Error updating product:", error);
      setAlertMessage("Failed to update product.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8083/products/₹{id}`);
      setIsDeleteConfirmOpen(false); 

      onDelete(id);
      window.location.reload();

    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="relative flex bg-gray-50 p-4 rounded-lg shadow-md">
      <img src={productImageUrl} alt={productName} className="w-32 h-32 object-cover rounded-lg shadow-lg" />
      <div className="ml-4 flex-grow">
        <h4 className="text-xl font-semibold">{productName}</h4>
        <p className="text-gray-700 text-lg">₹{price}</p>
        <p className="text-gray-600">{description}</p>
        <div className="mt-2 flex space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Update Product
          </button>
          <button
            onClick={() => setIsDeleteConfirmOpen(true)} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete Product
          </button>
        </div>
      </div>

      {/* Update Product Modal */}
      {isModalOpen && (
        <div>
          {/* Background overlay */}
          <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsModalOpen(false)}></div>

          {/* Modal content */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4">Update Product</h2>
              <div>
                <label className="block text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="border rounded-lg w-full p-2 mb-4"
                />
                <label className="block text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  value={updatedPrice}
                  onChange={(e) => setUpdatedPrice(e.target.value)}
                  className="border rounded-lg w-full p-2 mb-4"
                />
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  className="border rounded-lg w-full p-2 mb-4"
                />
              </div>
              {alertMessage && <p className="text-green-500 mb-2">{alertMessage}</p>}
              <div className="flex justify-between">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Submit
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div>
          {/* Background overlay */}
          <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsDeleteConfirmOpen(false)}></div>

          {/* Modal content */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-4">Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="flex justify-between">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Delete
                </button>
                <button
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorProduct;
