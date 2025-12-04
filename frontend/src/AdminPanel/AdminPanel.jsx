import { Link } from "react-router-dom";
import globalStyles from "../global.module.css";
import adminStyles from "./adminpanel.module.css";
import AllFlights from "../Flights/AllFlights/AllFlights";

const AdminPanel = () => {

  return (
    <>
      <div className={adminStyles["buttons"]}>
        <Link to="/flights/add" className={globalStyles["button"]}>
          Add flight
        </Link>
      </div>
      <div>Here you will see the flights</div>
      <AllFlights></AllFlights>
    </>
  );
};

export default AdminPanel;
