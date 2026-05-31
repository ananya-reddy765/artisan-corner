import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";

import {
  useAuth,
} from "../../context/AuthContext";

export default function Login() {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const data =
          await loginUser({
            email,
            password,
          });

        login(
          data.user,
          data.token
        );

        /* ROLE BASED REDIRECT */

        if (
          data.user.role ===
          "admin"
        ) {
          navigate("/admin");
        }
        else if (
          data.user.role ===
          "vendor"
        ) {
          navigate("/vendor");
        }
        else {
          navigate("/");
        }

      } catch (error) {
        console.error(error);

        alert(
          error?.response?.data
            ?.message ||
            "Login Failed"
        );
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">

      <form
        onSubmit={
          handleSubmit
        }
        className="
          bg-white
          p-10
          rounded-3xl
          shadow-lg
          w-full
          max-w-md
        "
      >

        <h1 className="text-4xl font-bold mb-2 text-[#3E2723]">
          Welcome Back
        </h1>

        <p className="text-gray-500 mb-8">
          Login to your CraftedIndia account
        </p>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-4 border rounded-xl mb-4"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 border rounded-xl mb-6"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
        />

        <button
          type="submit"
          className="
            w-full
            bg-[#C96A3D]
            text-white
            p-4
            rounded-xl
            hover:opacity-90
          "
        >
          Login
        </button>

      </form>

    </div>
  );
}