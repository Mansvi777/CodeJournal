import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Register from "./auth/register.jsx";
import Login from "./auth/login.jsx";
import Profile from "./components/profile.jsx";
import IntroPage from "./components/Intro.jsx";
import Add_problem from "./components/Add_problem.jsx";
import Note from "./components/Note.jsx";


function Routess() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profile" element={<Profile />} /> 
        <Route exact path="/add_problem" element={<Add_problem/>} />
        <Route exact path="/note/:id" element={<Note/>} />
      </Routes>
    </Router>
  );
}

export default Routess;