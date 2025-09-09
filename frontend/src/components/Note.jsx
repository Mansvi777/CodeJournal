import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Note = () => {
  const { id } = useParams(); // get problem ID from URL
  const [note, setNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch the note from backend
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You are not authorized");
    navigate("/login");
    return;
  }

  setLoading(true);
  fetch(`${BACKEND_URL}/auth/problem_note/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch note");
      return res.json();
    })
    .then((data) => setNote(data.note))
    .catch((err) => {
      console.error("Error fetching note:", err);
      alert("Failed to load note");
      navigate(-1);
    })
    .finally(() => setLoading(false));
}, [id, navigate]);


  // Save updated note
  const handleSave = async () => {
    const token = localStorage.getItem("token"); // get token here
    if (!token) {
      alert("You are not authorized");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/auth/problem_note/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ note }),
      });

      if (!res.ok) throw new Error("Failed to save note");

      alert("Note saved successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Error saving note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-6xl flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 h-[90vh]">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Problem Note
        </h1>

        {loading ? (
          <p className="text-gray-700 dark:text-gray-300 text-center text-lg">
            Loading...
          </p>
        ) : (
          <>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={!isEditing}
              className="w-full flex-1 p-6 border border-gray-300 dark:border-gray-600 rounded-lg mb-6 resize-none text-lg leading-relaxed text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition duration-200"
              style={{ minHeight: "70vh" }}
            />

            <div className="flex flex-wrap gap-4 justify-center">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow transition duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg shadow transition duration-200"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition duration-200"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition duration-200"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Note;
