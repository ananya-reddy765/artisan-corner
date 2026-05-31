import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getProductById,
  updateProduct,
} from "../../services/productService";

export default function EditProduct() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      price: "",
      image: "",
      stock: "",
    });

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct =
    async () => {
      try {
        const data =
          await getProductById(
            id
          );

        setFormData({
          title:
            data.product.title ||
            "",
          description:
            data.product
              .description ||
            "",
          price:
            data.product.price ||
            "",
          image:
            data.product.image ||
            "",
          stock:
            data.product.stock ||
            "",
        });
      } catch (error) {
        console.log(error);
      }
    };

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await updateProduct(
          id,
          formData
        );

        alert(
          "Product Updated Successfully"
        );

        navigate(
          "/vendor/products"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Update Failed"
        );
      }
    };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-5xl font-bold mb-10">
        Edit Product
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="bg-white p-8 rounded-3xl shadow space-y-6"
      >
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={
            formData.title
          }
          onChange={
            handleChange
          }
          className="w-full p-4 border rounded-xl"
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
          className="w-full p-4 border rounded-xl"
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
          className="w-full p-4 border rounded-xl"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={
            formData.image
          }
          onChange={
            handleChange
          }
          className="w-full p-4 border rounded-xl"
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
          className="w-full p-4 border rounded-xl"
        />

        <button
          type="submit"
          className="
            bg-[#C96A3D]
            text-white
            px-8
            py-4
            rounded-xl
            hover:opacity-90
          "
        >
          Update Product
        </button>
      </form>
    </div>
  );
}