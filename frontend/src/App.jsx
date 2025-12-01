import "./App.css";
import Home from "./Home/Home";
import Login from "./Log in/Login";
import Signup from "./Sign up/Signup";
import { Link, Route, Routes } from "react-router-dom";
import Logout from "./Logout/Logout";
import BecomeAdmin from "./BecomeAdmin/BecomeAdmin";
import { useContext } from "react";
import { AuthContext } from "./Contexts/AuthContext";
import AddFlight from "./Flights/AddFlight/AddFlight";
import AdminPanel from "./AdminPanel/AdminPanel";
function App() {

  const {user} = useContext(AuthContext)

  return (

    <div>
      <nav>
        <Link to="/">Home</Link> |
        {!user && (
          <>
            <Link to="/login">Login</Link> |
            <Link to="/signup">Signup</Link> |
          </>
        )}
        {user && <Logout></Logout>}
        {!user?.is_admin && user && <Link to="/become-admin">Become admin</Link>}
        {user?.is_admin && <Link to="/admin-panel">Admin panel</Link>}
      </nav>

      <Routes>
        <Route path="/" element={<Home user={user}></Home>} />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup  />}
        />
        <Route
          path="/become-admin"
          element={<BecomeAdmin user={user} />}
        />
        <Route
          path="/admin-panel"
          element={<AdminPanel></AdminPanel>}
        />
        <Route
          path="/flights/add"
          element={<AddFlight></AddFlight>}
        />
      </Routes>
    </div>
  );
}

export default App;
