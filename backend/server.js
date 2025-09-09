import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import auth_route from './auth_manager/auth_routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// List of allowed frontend URLs
const allowedOrigins = [
  "http://localhost:5173",               // Local Vite frontend
  "https://your-frontend-domain.com"    // Replace with your deployed frontend URL
];

// Middlewares
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser requests like Postman
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Routes
app.use('/auth', auth_route);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
