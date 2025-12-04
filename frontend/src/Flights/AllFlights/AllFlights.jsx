import axios from "axios";
import styles from './allflights.module.css'
import { useState , useEffect } from "react";
import FlightCard from './../../FlightCard/FlightCard';

const AllFlights = () => {
  const [flights, setFlights] = useState([]);

  const fetchFlights = async () => {
    try {
      const result = await axios.get("http://localhost:5000/flights/all" , {withCredentials : true});
      setFlights(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchFlights();
  }, []);
  return (
    <>
      <div className={styles["card-container"]}>
        {flights
          ? flights?.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                fetch={fetchFlights}
              ></FlightCard>
            ))
          : "loading"}
      </div>
    </>
  );
};

export default AllFlights;
