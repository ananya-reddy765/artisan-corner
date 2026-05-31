import { useState } from "react";

import { createProduct } from "../../services/productService";
import { uploadImage } from "../../services/uploadService";

export default function AddProduct() {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      price: "",
      stock: "",
      image: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleImageUpload =
    async (e) => {
      try {
        setLoading(true);

        const file =
          e.target.files[0];

        if (!file) return;

        const data =
          await uploadImage(
            file
          );

        setFormData(
          (prev) => ({
            ...prev,
            image:
              data.image,
          })
        );

        setLoading(false);
      } catch (error) {
        console.log(error);

        setLoading(false);

        alert(
          "Image Upload Failed"
        );
      }
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await createProduct(
          formData
        );

        alert(
          "Product Added Successfully"
        );

        setFormData({
          title: "",
          description: "",
          price: "",
          stock: "",
          image: "",
        });
      } catch (error) {
        console.log(error);

        alert(
          "Failed to add product"
        );
      }
    };

  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-5xl font-bold mb-10">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          p-8
          rounded-3xl
          shadow
          space-y-5
        "
      >

        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          className="
            w-full
            p-4
            border
            rounded-xl
          "
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={
            formData.description
          }
          onChange={
            handleChange
          }
          rows="5"
          className="
            w-full
            p-4
            border
            rounded-xl
          "
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={
            formData.price
          }
          onChange={
            handleChange
          }
          className="
            w-full
            p-4
            border
            rounded-xl
          "
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={
            formData.stock
          }
          onChange={
            handleChange
          }
          className="
            w-full
            p-4
            border
            rounded-xl
          "
          required
        />

        <div>

          <label className="block mb-2 font-medium">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={
              handleImageUpload
            }
            className="
              w-full
              p-3
              border
              rounded-xl
            "
          />

        </div>

        {loading && (
          <p className="text-blue-600">
            Uploading image...
          </p>
        )}

        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="
              h-48
              rounded-xl
              object-cover
            "
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            bg-[#C96A3D]
            text-white
            px-8
            py-4
            rounded-xl
            hover:opacity-90
            disabled:opacity-50
          "
        >
          {loading
            ? "Uploading..."
            : "Create Product"}
        </button>

      </form>

    </div>
  );
}