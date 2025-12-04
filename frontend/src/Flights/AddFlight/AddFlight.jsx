import axios from "axios";
import FlightForm from "../../Forms/FlightForm";

const AddFlight = () => {
  const handleAddFlight = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/flights/new-flight", values , {withCredentials : true});
      resetForm();
    } catch (err) {
      console.error(err.response ? err.response.data : err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FlightForm
      handleFn={handleAddFlight}
      btnType="Add Flight"
    />
  );
};

export default AddFlight;
