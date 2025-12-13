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

const validationSchemaUser = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name must be at most 30 characters"),

  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name must be at most 30 characters"),

  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be at most 50 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});
export default validationSchemaFlight
export { validationSchemaUser, validationSchemaFlight };
