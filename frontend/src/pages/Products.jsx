// src/pages/Products.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";

// Import images
import carrot from "../assets/carrot.png";
import eggs from "../assets/eggs.png";
import compost from "../assets/compost.png";
import hay from "../assets/hay.png";
import bellPepper from "../assets/bellPepper.png";
import broccoli from "../assets/Broccoli.png";
import tomato from "../assets/tomato.png";
import lettuce from "../assets/letuce.png";

const productsData = [
  {
    name: "Organic Carrots",
    image: carrot,
    description: "Sweet, crunchy organic carrots with greens.",
    available: 18,
    unit: "bunches",
    status: "In Stock",
    tag: "Harvest",
  },
  {
    name: "Farm Fresh Eggs",
    image: eggs,
    description: "Free-range chicken eggs rich in protein.",
    available: 12,
    unit: "dozen",
    status: "In Stock",
    tag: "Products",
  },
  {
    name: "Premium Compost",
    image: compost,
    description: "Nutrient-dense compost made from farm waste.",
    available: 8,
    unit: "bags",
    status: "In Stock",
    tag: "Compost",
  },
  {
    name: "Fresh Hay",
    image: hay,
    description: "High-quality hay for livestock and gardens.",
    available: 0,
    unit: "bales",
    status: "Out of Stock",
    tag: "Products",
  },
  {
    name: "Bell Peppers",
    image: bellPepper,
    description: "Fresh bell peppers with vibrant colors.",
    available: 15,
    unit: "lbs",
    status: "In Stock",
    tag: "Harvest",
  },
  {
    name: "Organic Broccoli",
    image: broccoli,
    description: "Crisp organic broccoli rich in nutrients.",
    available: 10,
    unit: "heads",
    status: "Low Stock",
    tag: "Harvest",
  },
  {
    name: "Vine Tomatoes",
    image: tomato,
    description: "Juicy vine-ripened organic tomatoes.",
    available: 7,
    unit: "lbs",
    status: "In Stock",
    tag: "Harvest",
  },
  {
    name: "Crisp Lettuce",
    image: lettuce,
    description: "Fresh lettuce heads perfect for salads.",
    available: 15,
    unit: "heads",
    status: "In Stock",
    tag: "Harvest",
  },
];

const Products = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");

  // Filtering + searching
  const filteredProducts = productsData.filter((p) => {
    const matchesCategory = filter === "All" || p.tag === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "availability") return b.available - a.available;
    if (sort === "status") return a.status.localeCompare(b.status);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 pt-28">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Our Products
        </h1>

        {/* Search + Filters + Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {["All", "Harvest", "Products", "Compost"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full font-medium shadow-md transition ${
                  filter === cat
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 border hover:bg-green-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="name">Sort by Name (A–Z)</option>
            <option value="availability">Sort by Availability (High–Low)</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />

                {/* Content */}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                      {product.tag}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        product.status === "In Stock"
                          ? "bg-green-100 text-green-600"
                          : product.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    {product.description}
                  </p>
                  <p className="text-sm text-gray-800 font-medium">
                    Available:{" "}
                    <span className="text-green-600">
                      {product.available} {product.unit}
                    </span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
