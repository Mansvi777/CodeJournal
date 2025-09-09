import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function IntroPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If token exists, user is logged in → redirect to dashboard
      navigate("/profile");
    }
    // else do nothing, user stays on this page
  }, [navigate]);

  const handleGetStarted = () => {
    navigate("/register");
  };

    return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center px-6 text-center space-y-10">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white max-w-3xl">
        Track, Organize, and Master Coding Problems
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl text-lg">
        Save problems from LeetCode and other platforms. Add difficulty levels, categorize them, and create notes for efficient revision and smarter practice.
      </p>
      <button
        onClick={handleGetStarted}
        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200"
      >
        Get Started
      </button>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl text-left">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📂 Organize Questions</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Create categories like Arrays, Graphs, or Dynamic Programming to neatly store and manage your problems.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🔥 Track Difficulty</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Mark questions as Easy, Medium, or Hard to focus on improving specific problem areas with precision.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📝 Add Notes</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Write personalized notes, solutions, and tips for each problem to ensure better understanding and faster revision.
          </p>
        </div>
      </div>
    </div>
  );
}
