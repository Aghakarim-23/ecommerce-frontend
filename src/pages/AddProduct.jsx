
import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null,
    featured: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));

    // İstifadəçi düzəliş etdikdə həmin inputun error-unu sil
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.stock) {
      newErrors.stock = "Stock is required";
    } else if (Number(formData.stock) < 0) {
      newErrors.stock = "Stock cannot be less than 0";
    }

    if (!formData.image) {
      newErrors.image = "Product image is required";
    } else if (formData.image.size > 5 * 1024 * 1024) {
      newErrors.image = "Image size must be less than 5MB";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    data.append("image", formData.image);
    data.append("featured", formData.featured);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/api/products",
        data
      );

      console.log("Product added:", response.data);

      // Success olduqda error-ları təmizlə
      setErrors({});

    } catch (error) {
      console.error("Error adding product:", error);

      // Backend error-u UI-da göstər
      const backendMessage = error.response?.data?.message;

      if (backendMessage) {
        setErrors({
          backend: backendMessage,
        });
      } else {
        setErrors({
          backend: "Something went wrong. Please try again.",
        });
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Add Product
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add a new product to your store
          </p>
        </div>

        {/* Backend Error */}
        {errors.backend && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {errors.backend}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >

          {/* Product Information */}
          <div className="mb-8">
            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Product Information
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Name */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. JBL Tune 770NC"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter product description..."
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />

                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="449"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />

                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.price}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. headphones"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />

                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Stock */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="20"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />

                {errors.stock && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.stock}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* Image */}
          <div className="mb-8 border-t border-gray-200 pt-8">
            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Product Image
            </h2>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-10 transition hover:border-gray-500 hover:bg-gray-50">

              <div className="mb-3 text-3xl">
                📷
              </div>

              <p className="text-sm font-medium text-gray-700">
                Click to upload an image
              </p>

              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG or JPEG
              </p>

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />

            </label>

            {formData.image && (
              <p className="mt-3 text-sm text-gray-600">
                Selected:{" "}
                <span className="font-medium">
                  {formData.image.name}
                </span>
              </p>
            )}

            {errors.image && (
              <p className="mt-2 text-sm text-red-500">
                {errors.image}
              </p>
            )}
          </div>

          {/* Featured */}
          <div className="mb-8 border-t border-gray-200 pt-8">
            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300"
              />

              <div>
                <p className="text-sm font-medium text-gray-900">
                  Featured Product
                </p>

                <p className="text-xs text-gray-500">
                  Show this product in the featured section
                </p>
              </div>

            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">

            <button
              type="button"
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;
