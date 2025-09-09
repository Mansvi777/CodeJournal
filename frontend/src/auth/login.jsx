// Login.js

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {

  const navigate = useNavigate();
  // State for inputs and loading
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  async function handleSubmit(e) {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/auth/login", {  // <-- make sure route matches backend
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Save JWT in localStorage
      localStorage.setItem("token", data.token);
      alert("Logged in successfully");
      navigate("/profile");
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Failed to Login");
  }
}

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Login to your account
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Enter your credentials to access your dashboard
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="appearance-none rounded-lg block w-full px-4 py-3 bg-gray-50 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="appearance-none rounded-lg block w-full px-4 py-3 bg-gray-50 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            Login
          </button>
        </div>
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 font-medium"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  </div>
);

}
