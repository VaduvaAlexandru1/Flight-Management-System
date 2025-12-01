import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FlightCard from "../FlightCard/FlightCard";
import globalStyles from "../global.module.css";
import adminStyles from './adminpanel.module.css'

const AdminPanel = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const result = await axios.get("http://localhost:5000/flights/all");
        setFlights(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFlights();
  }, []);

  return (
    <>
      <div className={adminStyles['buttons']}>
        <Link to="/flights/add" className={globalStyles['button']}>Add flight</Link>
      </div>
      <div>Here you will see the flights</div>
      <div className={globalStyles['container']}>
        {flights
          ? flights?.map((flight) => (
              <FlightCard key={flight.id} flight={flight}></FlightCard>
            ))
          : "loading"}
      </div>
    </>
  );
};

export default AdminPanel;
