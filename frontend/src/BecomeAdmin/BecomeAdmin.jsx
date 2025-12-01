import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const BecomeAdmin = ({ user }) => {
  const validationSchema = Yup.object({
    adminPassword: Yup.string().required("Admin Password is required"),
  });

  const initialValues = {
    adminPassword: "",
  };

  const handleBecomeAdmin = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/become-admin",
        values,
        { withCredentials: true }
      );
      resetForm()
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
      {user ? (
        <div>
          <h1>Become an admin</h1>
          <h4>Ask your supervisor for the password</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleBecomeAdmin}
          >
            <Form>
              <div>
                <label htmlFor="adminPassword">Admin password: </label>
                <Field name="adminPassword" type="password" />
                <ErrorMessage name="adminPassword" component="div" />
              </div>
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      ) : (
        "please log in"
      )}
    </>
  );
};

export default BecomeAdmin;
