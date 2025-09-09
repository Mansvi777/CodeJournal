import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Optionally, you can also clear other stored data here
    // localStorage.clear();

    // Redirect to login or intro page after logout
    navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          You’ve been logged out
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Redirecting you to the login page...
        </p>
      </div>
    </div>
  );

}
