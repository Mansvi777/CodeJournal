import express from 'express';
import { getUserById } from './User.js';
import { LoginUser, RegisterUser } from './auth_controller.js';
import { post_problem, get_problems ,delete_problem,get_problem_note,update_problem_note} from '../problem_page.js';
const routes = express.Router();

// routes

routes.post('/login',LoginUser);

routes.post('/register', RegisterUser);

routes.get('/users/:userId',getUserById);

routes.post('/post/problems', post_problem);

routes.get('/problems',get_problems);

routes.delete('/problems/:id',delete_problem);

routes.get('/problem_note/:id',get_problem_note);

routes.put("/problem_note/:id", update_problem_note);

export default routes;