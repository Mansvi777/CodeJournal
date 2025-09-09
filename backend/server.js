import  express from 'express';
import  mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import auth_route from './auth_manager/auth_routes.js'

dotenv.config();

const app=express();
const PORT=process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());

//routes
//route for authenticating user
app.use('/auth', auth_route);

mongoose.connect(process.env.MONGODB_URI, {
}).then(()=>console.log('Connected to MongoDB')).catch((err)=>console.error('Failed to connect to MongoDB', err));

app.listen(process.env.PORT, ()=>console.log(`Server running on port ${PORT}`));