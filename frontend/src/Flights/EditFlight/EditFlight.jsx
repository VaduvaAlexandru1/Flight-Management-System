import axios from "axios";
import FlightForm from "../../Forms/FlightForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditFlight = () => {
  const { flight_id } = useParams();

  const [prevFlight, setPrevFlight] = useState(null);

  const navigate = useNavigate()

  const handleAddFlight = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    try {
      await axios.patch(`http://localhost:5000/flights/${flight_id}`, values , {withCredentials : true});
      resetForm();
      fetchFlight();
      navigate(-1)
    } catch (err) {
      console.error(err.response ? err.response.data : err);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchFlight = async () => {
    const response = await axios.get(
      `http://localhost:5000/flights/${flight_id}`
    );
    setPrevFlight(response.data);
  };
  useEffect(() => {
    fetchFlight();
  }, []);

  const prevInitialValuesFlight = {
    flight_number: prevFlight?.flight_number || "",
    price: prevFlight?.price || 0,
    departure_airport: prevFlight?.departure_airport || "",
    arrival_airport: prevFlight?.arrival_airport || "",
    departure_time: prevFlight?.departure_time || "",
    arrival_time: prevFlight?.arrival_time || "",
    company: prevFlight?.company || "",
    details: {
      aircraft_type: prevFlight?.details?.aircraft_type || "",
      departure_terminal: prevFlight?.details?.departure_terminal || "",
      boarding_gate: prevFlight?.details?.boarding_gate || "",
      flight_status: prevFlight?.details?.flight_status || "",
      total_capacity: prevFlight?.details?.total_capacity || 0,
      available_seats: prevFlight?.details?.available_seats || 0,
    },
  };

  return (
    <>
      <FlightForm
        initialValues={prevInitialValuesFlight}
        handleFn={handleAddFlight}
        btnType="Edit Flight"
      />
    </>
  );
};

export default EditFlight;
