import axios from "axios";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddFlight = () => {
  const validationSchema = Yup.object().shape({
    flight_number: Yup.string().required("Flight number is required"),
    price: Yup.number().required("Price is required"),
    departure_airport: Yup.string().required("Departure airport is required"),
    arrival_airport: Yup.string().required("Arrival airport is requiered"),
    departure_time: Yup.date().required("Departure time is required"),
    arrival_time: Yup.date().required("Arrival time is required"),
    company: Yup.string().required("Company name is required"),

    details: Yup.object().shape({
      aircraft_type: Yup.string().required("Aircraft is required"),
      departure_terminal: Yup.string().required(
        "Departure terminal is required"
      ),
      boarding_gate: Yup.string().required("Boarding gate is required"),
      flight_status: Yup.string().required("Flight status is required"),
      total_capacity: Yup.number().required("Total capacity is required"),
      available_seats: Yup.number().required("Available seats is required"),
    }),
  });

  const initialValues = {
    flight_number: "",
    price: 0,
    departure_airport: "",
    arrival_airport: "",
    departure_time: "",
    arrival_time: "",
    company: "",
    details: {
      aircraft_type: "",
      departure_terminal: "",
      boarding_gate: "",
      flight_status: "",
      total_capacity: 0,
      available_seats: 0,
    },
  };

  const handleAddFlight = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    try {
      const result = await axios.post(
        "http://localhost:5000/flights/new-flight",
        values
      );

      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleAddFlight}
      >
        <Form className="flight-form">
          {/* FLIGHT NUMBER */}
          <div>
            <label>Flight Number</label>
            <Field name="flight_number" type="text" />
            <ErrorMessage
              name="flight_number"
              component="div"
              className="error"
            />
          </div>

          {/* PRICE */}
          <div>
            <label>Price</label>
            <Field name="price" type="number" />
            <ErrorMessage name="price" component="div" className="error" />
          </div>

          {/* DEPARTURE AIRPORT */}
          <div>
            <label>Departure Airport</label>
            <Field name="departure_airport" type="text" />
            <ErrorMessage
              name="departure_airport"
              component="div"
              className="error"
            />
          </div>

          {/* ARRIVAL AIRPORT */}
          <div>
            <label>Arrival Airport</label>
            <Field name="arrival_airport" type="text" />
            <ErrorMessage
              name="arrival_airport"
              component="div"
              className="error"
            />
          </div>

          {/* DEPARTURE TIME */}
          <div>
            <label>Departure Time</label>
            <Field name="departure_time" type="datetime-local" />
            <ErrorMessage
              name="departure_time"
              component="div"
              className="error"
            />
          </div>

          {/* ARRIVAL TIME */}
          <div>
            <label>Arrival Time</label>
            <Field name="arrival_time" type="datetime-local" />
            <ErrorMessage
              name="arrival_time"
              component="div"
              className="error"
            />
          </div>

          {/* COMPANY */}
          <div>
            <label>Company</label>
            <Field name="company" type="text" />
            <ErrorMessage name="company" component="div" className="error" />
          </div>

          <hr />
          <h3>Flight Details</h3>

          {/* AIRCRAFT TYPE */}
          <div>
            <label>Aircraft Type</label>
            <Field name="details.aircraft_type" type="text" />
            <ErrorMessage
              name="details.aircraft_type"
              component="div"
              className="error"
            />
          </div>

          {/* DEPARTURE TERMINAL */}
          <div>
            <label>Departure Terminal</label>
            <Field name="details.departure_terminal" type="text" />
            <ErrorMessage
              name="details.departure_terminal"
              component="div"
              className="error"
            />
          </div>

          {/* BOARDING GATE */}
          <div>
            <label>Boarding Gate</label>
            <Field name="details.boarding_gate" type="text" />
            <ErrorMessage
              name="details.boarding_gate"
              component="div"
              className="error"
            />
          </div>

          {/* FLIGHT STATUS */}
          <div>
            <label>Flight Status</label>
            <Field name="details.flight_status" type="text" />
            <ErrorMessage
              name="details.flight_status"
              component="div"
              className="error"
            />
          </div>

          {/* TOTAL CAPACITY */}
          <div>
            <label>Total Capacity</label>
            <Field name="details.total_capacity" type="number" />
            <ErrorMessage
              name="details.total_capacity"
              component="div"
              className="error"
            />
          </div>

          {/* AVAILABLE SEATS */}
          <div>
            <label>Available Seats</label>
            <Field name="details.available_seats" type="number" />
            <ErrorMessage
              name="details.available_seats"
              component="div"
              className="error"
            />
          </div>

          <button type="submit">Add Flight</button>
        </Form>
      </Formik>
    </>
  );
};

export default AddFlight;
