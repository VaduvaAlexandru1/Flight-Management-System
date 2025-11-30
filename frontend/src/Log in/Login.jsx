import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = ({onLogin}) => {
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const handleLogin = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("/auth/login", values, {
        withCredentials: true,
      });
      console.log("Succes");
      resetForm();
      onLogin()
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
      <h1>Log in</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
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
              Log in
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
