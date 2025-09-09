import User from "../Models/user.js";

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params; // Extract ID from URL
    const user = await User.findById(userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ name: user.name }); // Return as an object
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
