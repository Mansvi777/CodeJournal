import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const Profile = () => {
  const [userName, setUserName] = useState("");
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");


    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      // Fetch user info
      fetch(`${BACKEND_URL}/auth/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) setUserName(data);
          else {
            localStorage.removeItem("token");
            navigate("/login");
          }
        })
        .catch((err) => {
          console.error("User fetch error:", err);
          localStorage.removeItem("token");
          navigate("/login");
        });

      // Fetch all problems
      // Fetch all problems for this user
      fetch(`${BACKEND_URL}/auth/problems`, {
        headers: {
          Authorization: `Bearer ${token}`, // attach token
        },
      })
        .then((res) => res.json())
        .then((data) => setProblems(data))
        .catch((err) => console.error("Problems fetch error:", err));
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Delete a problem
   const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BACKEND_URL}/auth/problems/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setProblems(problems.filter((problem) => problem._id !== id));
      } else {
        alert("Failed to delete problem");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Navigate to Add Problem page
  const handleAdd = () => {
    navigate("/add_problem");
  };

  const handleNote = (id) => {
    navigate(`/note/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-semibold text-black dark:text-white mb-4 md:mb-0">
          Hi, {userName.name}!
        </h1>
        <div className="flex space-x-3">
          <button
            onClick={handleAdd}
            className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition duration-200"
          >
            Add Problem
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Problems Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <thead>
            <tr className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 uppercase text-sm">
              <th className="p-3">S.No</th>
              <th className="p-3">Title</th>
              <th className="p-3">Link</th>
              <th className="p-3">Platform</th>
              <th className="p-3">Difficulty</th>
              <th className="p-3">Status</th>
              <th className="p-3">Category</th>
              <th className="p-3">Note</th>
              <th className="p-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {problems.length > 0 ? (
              problems.map((problem, index) => (
                <tr
                  key={problem._id}
                  className="text-center border-b border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
                >
                  <td className="p-3 text-black dark:text-gray-200">
                    {index + 1}
                  </td>
                  <td className="p-3 font-medium text-black dark:text-gray-200">
                    {problem.title}
                  </td>
                  <td className="p-3">
                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Visit
                    </a>
                  </td>
                  <td className="p-3 text-black dark:text-gray-200">
                    {problem.platform}
                  </td>
                  <td className="p-3 text-black dark:text-gray-200">
                    {problem.difficulty}
                  </td>
                  <td className="p-3 text-black dark:text-gray-200">
                    {problem.status}
                  </td>
                  <td className="p-3 text-black dark:text-gray-200">
                    {problem.category}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleNote(problem._id)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200"
                    >
                      Note
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(problem._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="p-6 text-center text-gray-700 dark:text-gray-400 italic"
                >
                  No problems found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
