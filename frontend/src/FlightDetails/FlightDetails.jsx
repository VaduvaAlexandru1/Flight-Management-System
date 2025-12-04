import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const FlightDetails = () => {
  const { flight_id } = useParams();

  const [flight, setFlight] = useState({});

  useEffect(() => {
    const fetchFlight = async () => {
      const response = await axios.get(
        `http://localhost:5000/flights/${flight_id}`
       , {withCredentials : true});
      setFlight(response.data);
    };
    fetchFlight();
  }, []);

  return (
    <div>
      <div>
        <h2>Flight Details</h2>

        <p>Flight Number: {flight?.flight_number}</p>

        <p>Price: {flight?.price}</p>

        <p>Departure Airport: {flight?.departure_airport}</p>
        <p>Departure Time: {flight?.departure_time}</p>


        <p>Arrival Airport: {flight?.arrival_airport}</p>
        <p>Arrival Time: {flight?.arrival_time}</p>

        <p>Status: {flight?.flight_status}</p>
        <p>Company: {flight?.company}</p>

        <h3>Details</h3>

        <p>Aircraft Type: {flight?.details?.aircraft_type}</p>
        <p>Departure Terminal: {flight?.details?.departure_terminal}</p>
        <p>Boarding Gate: {flight?.details?.boarding_gate}</p>
        <p>Available Seats: {flight?.details?.available_seats}</p>
        <p>Total Capacity: {flight?.details?.total_capacity}</p>
      </div>
    </div>
  );
};

export default FlightDetails;
