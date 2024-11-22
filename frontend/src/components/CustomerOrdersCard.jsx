import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const OrderCard = ({ order }) => {
  const totalAmount = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const generatePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice', 14, 60);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Order ID: ${order.id}`, 14, 70);
    doc.text(`Order Date: ${order.orderDate}`, 14, 76);
    doc.text(`Shipping Address: ${order.shippingAddress}`, 14, 82);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Product Name', 14, 100);
    doc.text('Description', 90, 100);
    doc.text('Quantity', 140, 100);
    doc.text('Price', 170, 100);
    doc.line(14, 104, 195, 104); 

    let yPosition = 110;
    order.items.forEach(item => {
      doc.setFont('helvetica', 'normal');
      doc.text(item.productName, 14, yPosition);
      doc.text(item.description, 90, yPosition);
      doc.text(item.quantity.toString(), 140, yPosition);
      doc.text(`₹${item.price.toFixed(2)}`, 170, yPosition);
      yPosition += 6;
    });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Amount:', 140, yPosition + 10);
    doc.text(`₹${totalAmount.toFixed(2)}`, 170, yPosition + 10);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for your business!', 14, 290);

    doc.save('invoice.pdf');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      {/* Invoice Container for PDF generation */}
      <div id="invoice">
        {/* Order ID and Date */}
        <div className="flex justify-between mb-4">
          <div className="text-gray-800">
            <strong>Order ID:</strong> {order.id}
          </div>
          <div className="text-gray-600">
            <strong>Order Date:</strong> {order.orderDate}
          </div>
        </div>

        {/* Order Items */}
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <img
                src={item.productImageUrl}
                alt={item.productName}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.productName}
                </h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-500">
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p className="text-gray-500">
                  <strong>Price:</strong> ₹{item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping Address and Total Amount */}
        <div className="mt-6">
          <p className="text-gray-700">
            <strong>Shipping Address:</strong> {order.shippingAddress}
          </p>
          <p className="text-gray-900 font-bold mt-2">
            <strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
