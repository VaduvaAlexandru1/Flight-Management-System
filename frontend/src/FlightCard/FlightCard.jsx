import { useNavigate } from "react-router-dom";
import styles from "./flightcard.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import globalStyle from "../global.module.css";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const FlightCard = ({ flight, fetch, where }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const deleteFlight = async (flightId) => {
    await axios.delete(`http://localhost:5000/flights/${flightId}`, {
      withCredentials: true,
    });

    fetch();
  };
  function formatTime(timeStr) {
    if (!timeStr) return "";
    const dateObj = new Date(timeStr);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return dateObj.toLocaleString(undefined, options);
  }

  return (
    <>
      <div className={styles["card"]}>
        <div>
          <div>Price : {flight?.price}</div>
          <div>Number : {flight?.flight_number}</div>
          <p>Status: {flight?.details?.flight_status}</p>

          <p>Departure Airport: {flight?.departure_airport}</p>
          <p>Departure Time: {formatTime(flight?.departure_time)}</p>

          <p>Arrival Airport: {flight?.arrival_airport}</p>
          <p>Arrival Time: {formatTime(flight?.arrival_time)}</p>
        </div>
        <div className={globalStyle["buttons-container"]}>
          <button
            onClick={() => navigate(`/flights-by-id/${flight.id}`)}
            className={globalStyle["small-button"]}
          >
            Details
          </button>

          {where === "admin-panel" ? (
            <>
              <button
                onClick={() => deleteFlight(flight?.id)}
                className={globalStyle["small-button"]}
              >
                Delete
              </button>

              <Link
                to={`/update-flight-by-id/${flight.id}`}
                className={globalStyle["small-button"]}
              >
                Update
              </Link>
            </>
          ) : (
            <button className={globalStyle["small-button"]}>Book</button>
          )}
        </div>
      </div>
    </>
  );
};

export default FlightCard;
