import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    username: "",
    password: "",
  };
  const handleSignUp = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("/auth/signup", values, {
        withCredentials: true,
      });
      console.log("Succes");
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
