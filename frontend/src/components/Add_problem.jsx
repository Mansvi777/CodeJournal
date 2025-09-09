import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add_problem = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [platform, setPlatform] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Not started");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/auth/post/problems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // optional if you add JWT auth middleware
        },
        body: JSON.stringify({ title, link, platform, difficulty, category, status, note }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Problem added successfully!");
        navigate("/profile");
      } else {
        alert(data.error || "Failed to add problem");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Add New Problem</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 rounded shadow-md">
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Link */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Link</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            placeholder="https://..."
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Platform */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Platform</label>
          <input
            type="text"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Difficulty */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option>Not started</option>
            <option>In progress</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Note */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Problem
        </button>
      </form>
    </div>
  );
};

export default Add_problem;
