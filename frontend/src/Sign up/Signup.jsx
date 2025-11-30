import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = ({onSignup}) => {
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    isAdmin: false
  };
  const handleSignUp = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("/auth/signup", values, {
        withCredentials: true,
      });
      console.log("Succes");
      onSignup()
      resetForm();
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(error.response.data.message);
      }
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
