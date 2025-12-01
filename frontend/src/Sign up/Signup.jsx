import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../Contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const { signup } = useContext(AuthContext);

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    isAdmin: false,
  };
  const handleSignUp = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    try {
      await signup(
        values.firstName,
        values.lastName,
        values.username,
        values.password,
        values.isAdmin
      );
      resetForm();
      navigate("/");
    } catch (err) {
      if (err.message) console.log(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1>Sign up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="firstName">First name : </label>
              <Field name="firstName"></Field>
              <ErrorMessage name="firstName" component="div"></ErrorMessage>
            </div>
            <div>
              <label htmlFor="lastName">Last name : </label>
              <Field name="lastName"></Field>
              <ErrorMessage name="lastName" component="div"></ErrorMessage>
            </div>
            <div>
              <label htmlFor="username">Username : </label>
              <Field name="username"></Field>
              <ErrorMessage name="username" component="div"></ErrorMessage>
            </div>
            <div>
              <label htmlFor="password">Password : </label>
              <Field name="password" type="password"></Field>
              <ErrorMessage name="password" component="div"></ErrorMessage>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Sign-up
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Signup;
