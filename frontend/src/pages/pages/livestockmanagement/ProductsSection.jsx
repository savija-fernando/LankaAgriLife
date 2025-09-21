import React, { useState } from 'react';
import { Card } from '../../../components/components/ui/Card';
import { Input } from '../../../components/components/ui/Input';
import { Edit, Trash, PlusCircle } from 'lucide-react'; // Added Trash for Delete
import { Button } from '../../../components/components/ui/Button';
import { GiMilkCarton } from "react-icons/gi";

const ProductsSection = ({ products, setProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    product_id: '',
    storageDetails: '',
    type: '',
    quantity: '',
    CollectionDate: '',
    processedStatus: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setProducts(
        products.map((p) =>
          p.product_id === editMode ? { ...p, ...currentProduct } : p
        )
      );
    } else {
      setProducts([...products, { ...currentProduct, product_id: products.length + 1 }]);
    }
    setIsModalOpen(false);
    setEditMode(null);
    setCurrentProduct({
      product_id: '',
      storageDetails: '',
      type: '',
      quantity: '',
      CollectionDate: '',
      processedStatus: '',
    });
  };

  const handleEdit = (id) => {
    const product = products.find((p) => p.product_id === id);
    setCurrentProduct(product);
    setEditMode(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.product_id !== id));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-green-700 flex items-center gap-2">
          <GiMilkCarton className="w-8 h-8 text-green-600" /> Products
        </h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-green-700 text-white hover:bg-green-600 rounded-full px-4 py-2"
        >
          <PlusCircle className="w-5 h-5" />
          Add Product
        </Button>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.product_id} className="relative bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition">
            {/* Edit and Delete Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button onClick={() => handleEdit(product.product_id)} className="text-green-600 hover:text-gray-800">
                <Edit className="w-5 h-5" />
              </button>
              <button onClick={() => handleDelete(product.product_id)} className="text-green-600 hover:text-gray-800">
                <Trash className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-xl font-semibold">{product.type}</h3>
            <p><strong>Storage:</strong> {product.storageDetails}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Collection Date:</strong> {product.CollectionDate}</p>
            <p><strong>Status:</strong> {product.processedStatus}</p>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-green-700">
              {editMode ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input name="type" placeholder="Type" value={currentProduct.type} onChange={handleInputChange} />
              <Input name="storageDetails" placeholder="Storage Details" value={currentProduct.storageDetails} onChange={handleInputChange} />
              <Input name="quantity" placeholder="Quantity" value={currentProduct.quantity} onChange={handleInputChange} />
              <Input name="CollectionDate" placeholder="Collection Date" value={currentProduct.CollectionDate} onChange={handleInputChange} />
              <Input name="processedStatus" placeholder="Processed Status" value={currentProduct.processedStatus} onChange={handleInputChange} />
              <div className="flex justify-end gap-2">
                <Button onClick={() => setIsModalOpen(false)} className="bg-red-600">Cancel</Button>
                <Button type="submit" className="bg-green-700">{editMode ? 'Update' : 'Add'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsSection;
