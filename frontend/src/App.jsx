import "./App.css";
import Home from "./Home/Home";
import Login from "./Log in/Login";
import Signup from "./Sign up/Signup";
import { Link , Route , Routes} from "react-router-dom";
import axios from 'axios'

function App() {

  const logout = async () => {
    const response = await axios.post('http://localhost:5000/auth/logout' , {} , {withCredentials : true})
  }

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | {" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/signup">Signup</Link>
        <button onClick={logout}> Log out</button>
      </nav>

      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
