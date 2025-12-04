import * as Yup from "yup";

const validationSchemaFlight = Yup.object().shape({
  flight_number: Yup.string().required("Flight number is required"),
  price: Yup.number().required("Price is required"),
  departure_airport: Yup.string().required("Departure airport is required"),
  arrival_airport: Yup.string().required("Arrival airport is required"),
  departure_time: Yup.date().required("Departure time is required"),
  arrival_time: Yup.date().required("Arrival time is required"),
  company: Yup.string().required("Company name is required"),

  details: Yup.object().shape({
    aircraft_type: Yup.string().required("Aircraft type is required"),
    departure_terminal: Yup.string().required("Departure terminal is required"),
    boarding_gate: Yup.string().required("Boarding gate is required"),
    flight_status: Yup.string().required("Flight status is required"),
    total_capacity: Yup.number().required("Total capacity is required"),
    available_seats: Yup.number().required("Available seats is required"),
  }),
});

export default validationSchemaFlight;
