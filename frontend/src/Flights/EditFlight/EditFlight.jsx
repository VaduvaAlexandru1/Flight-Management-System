import axios from "axios";
import FlightForm from "../../Forms/FlightForm";
import { useParams } from "react-router-dom";

const EditFlight = () => {
  const { flight_id } = useParams();

  const handleAddFlight = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    try {
      await axios.patch("http://localhost:5000/flights/${flight_id}", values);
      resetForm();
    } catch (err) {
      console.error(err.response ? err.response.data : err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <FlightForm handleFn={handleAddFlight} btnType="Edit Flight" />
    </>
  );
};

export default EditFlight;
