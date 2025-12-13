import "./App.css";
import Home from "./Home/Home";
import Login from "./Log in/Login";
import Signup from "./Sign up/Signup";
import { Link, Route, Routes } from "react-router-dom";
import Logout from "./Logout/Logout";
import BecomeAdmin from "./BecomeAdmin/BecomeAdmin";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Contexts/AuthContext";
import AddFlight from "./Flights/AddFlight/AddFlight";
import AdminPanel from "./AdminPanel/AdminPanel";
import globalStyle from "./global.module.css";
import FlightDetails from "./FlightDetails/FlightDetails";
import { useNavigate } from "react-router-dom";
import EditFlight from "./Flights/EditFlight/EditFlight";
import Settings from "./Settings/Settings";
import UpdateUser from "./UpdateUser/UpdateUser";
function App() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div>
      <nav className={globalStyle["navBar"]}>
        <button onClick={() => navigate(-1)} className={globalStyle["button"]}>
          Back
        </button>
        <Link to="/" className={globalStyle["button"]}>
          Home
        </Link>
        {!user && (
          <>
            <Link to="/login" className={globalStyle["button"]}>
              Login
            </Link>
            <Link to="/signup" className={globalStyle["button"]}>
              Signup
            </Link>
          </>
        )}
        {user && (
          <>
            <Logout></Logout>
            <Link to="/settings" className={globalStyle["button"]}>
              Settings
            </Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home user={user}></Home>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/become-admin" element={<BecomeAdmin user={user} />} />
        <Route path="/admin-panel" element={<AdminPanel></AdminPanel>} />
        <Route path="/flights/add" element={<AddFlight></AddFlight>} />
        <Route
          path="/flights-by-id/:flight_id"
          element={<FlightDetails></FlightDetails>}
        />
        <Route
          path="/update-flight-by-id/:flight_id"
          element={<EditFlight></EditFlight>}
        />
        <Route path="/settings" element=<Settings></Settings> />
        <Route path="/update-user" element=<UpdateUser></UpdateUser>/>
      </Routes>
    </div>
  );
}

export default App;
