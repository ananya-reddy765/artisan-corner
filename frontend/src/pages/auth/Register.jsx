import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
    shopName: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-lg"
      >
        <h1 className="text-4xl font-bold mb-2 text-[#3E2723]">
          Create Account
        </h1>

        <p className="text-gray-500 mb-8">
          Join CraftedIndia today
        </p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-4 border rounded-xl mb-4"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full p-4 border rounded-xl mb-4"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-4 border rounded-xl mb-4"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full p-4 border rounded-xl mb-4"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="buyer">
            Buyer
          </option>

          <option value="vendor">
            Vendor
          </option>
        </select>

        {formData.role === "vendor" && (
          <input
            type="text"
            name="shopName"
            placeholder="Shop Name"
            className="w-full p-4 border rounded-xl mb-4"
            value={formData.shopName}
            onChange={handleChange}
            required
          />
        )}

        <button
          type="submit"
          className="w-full bg-[#C96A3D] text-white p-4 rounded-xl hover:opacity-90"
        >
          Register
        </button>
      </form>
    </div>
  );
}