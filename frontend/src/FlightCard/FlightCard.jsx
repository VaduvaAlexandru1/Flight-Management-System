import { useNavigate } from "react-router-dom";
import styles from "./flightcard.module.css";

const FlightCard = ({ flight }) => {
  const navigate = useNavigate();

  const deleteFlight = async (flightId) => {
    
  } 

  const updateFlight = async (flightId) => {

  }

  return (
    <div
      className={styles["card"]}
      onClick={() => navigate(`/flights-by-id/${flight.id}`)}
    >
      <div>
        <div>Price : {flight?.price}</div>
        <div>Number : {flight?.flight_number}</div>
        <p>Status: {flight?.flight_status}</p>

        <p>Departure Airport: {flight?.departure_airport}</p>
        <p>Departure Time: {flight?.departure_time}</p>

        <p>Arrival Airport: {flight?.arrival_airport}</p>
        <p>Arrival Time: {flight?.arrival_time}</p>
      </div>
      <div>
        <button onClick={() => deleteFlight(flight?.id)}>Delete</button>
        <button onClick={() => updateFlight(flight?.id)}>Update</button>
      </div>
    </div>
  );
};

export default FlightCard;
