import List from './Models/list.js';
import jwt from 'jsonwebtoken';

// Helper to get userId from token
const getUserIdFromToken = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("Unauthorized");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.userId;
};

// POST /auth/problems
export const post_problem = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req); // get logged-in user
    const { title, platform, link, note, difficulty, category, status } = req.body;

    const problem = new List({
      title,
      platform,
      link,
      note,
      difficulty,
      category,
      status,
      user: userId, // attach user ID here
    });

    await problem.save();
    res.status(201).json({ message: 'Problem added successfully', problem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /auth/problems
export const get_problems = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req); // get logged-in user
    const problems = await List.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(problems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE /auth/problems/:id
export const delete_problem = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req); // verify user
    const { id } = req.params;

    // Only allow deleting if the problem belongs to this user
    const deletedProblem = await List.findOneAndDelete({ _id: id, user: userId });
    if (!deletedProblem) return res.status(404).json({ error: 'Problem not found' });

    res.status(200).json({ message: 'Problem deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /auth/problem_note/:id
export const get_problem_note = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { id } = req.params;

    const problem = await List.findOne({ _id: id, user: userId });
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    res.status(200).json({ note: problem.note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /auth/problem_note/:id
export const update_problem_note = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { id } = req.params;
    const { note } = req.body;

    const updatedProblem = await List.findOneAndUpdate(
      { _id: id, user: userId },
      { note },
      { new: true }
    );

    if (!updatedProblem) return res.status(404).json({ error: "Problem not found" });

    res.status(200).json({ message: "Note updated", problem: updatedProblem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
