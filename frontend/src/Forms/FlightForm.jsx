import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchemaFlight from '../ValidationSchemas'
import initialValuesFlight from "../InitialValues";

const FlightForm = ({handleFn, btnType }) => {
  return (
    <>
      <Formik
        initialValues={initialValuesFlight}
        validationSchema={validationSchemaFlight}
        onSubmit={handleFn}
      >
        {({ isSubmitting }) => (
          <Form className="flight-form">
            <div>
              <label>Flight Number</label>
              <Field name="flight_number" type="text" />
              <ErrorMessage
                name="flight_number"
                component="div"
                className="error"
              />
            </div>

            <div>
              <label>Price</label>
              <Field name="price" type="number" />
              <ErrorMessage name="price" component="div" className="error" />
            </div>

            <div>
              <label>Departure Airport</label>
              <Field name="departure_airport" type="text" />
              <ErrorMessage
                name="departure_airport"
                component="div"
                className="error"
              />
            </div>

            <div>
              <label>Arrival Airport</label>
              <Field name="arrival_airport" type="text" />
              <ErrorMessage
                name="arrival_airport"
                component="div"
                className="error"
              />
            </div>

            <div>
              <label>Departure Time</label>
              <Field name="departure_time" type="datetime-local" />
              <ErrorMessage
                name="departure_time"
                component="div"
                className="error"
              />
            </div>

            <div>
              <label>Arrival Time</label>
              <Field name="arrival_time" type="datetime-local" />
              <ErrorMessage
                name="arrival_time"
                component="div"
                className="error"
              />
            </div>

            <div>
              <label>Company</label>
              <Field name="company" type="text" />
              <ErrorMessage name="company" component="div" className="error" />
            </div>

            <hr />
            <h3>Flight Details</h3>

            <div>
              <label>Aircraft Type</label>
              <Field name="details.aircraft_type" type="text" />
              <ErrorMessage name="details.aircraft_type" component="div" />
            </div>

            <div>
              <label>Departure Terminal</label>
              <Field name="details.departure_terminal" type="text" />
              <ErrorMessage name="details.departure_terminal" component="div" />
            </div>

            <div>
              <label>Boarding Gate</label>
              <Field name="details.boarding_gate" type="text" />
              <ErrorMessage name="details.boarding_gate" component="div" />
            </div>

            <div>
              <label>Flight Status</label>
              <Field name="details.flight_status" type="text" />
              <ErrorMessage name="details.flight_status" component="div" />
            </div>

            <div>
              <label>Total Capacity</label>
              <Field name="details.total_capacity" type="number" />
              <ErrorMessage name="details.total_capacity" component="div" />
            </div>

            <div>
              <label>Available Seats</label>
              <Field name="details.available_seats" type="number" />
              <ErrorMessage name="details.available_seats" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : `${btnType}`}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FlightForm;
