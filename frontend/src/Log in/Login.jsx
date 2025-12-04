import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()

  const { login , user } = useContext(AuthContext);

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const handleLogin = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)
    try {
      await login(values.username, values.password);
      resetForm();
    } catch (err) {
      if (err.message) console.log(err.message);
    }finally{
      setSubmitting(false)
    }
  };

  useEffect(() => {
    if (! user) return
    if (user) navigate('/')
  } , [user])
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
