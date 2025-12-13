import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchemaUser } from "../ValidationSchemas";

import init from "../InitialValuesUser";

const UserForm = ({ handleFn, btnType, initialValues = init }) => {
  return (
    <>
      <h1>Sign up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaUser}
        onSubmit={handleFn}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="firstName">First name :</label>
              <Field name="firstName" />
              <ErrorMessage name="firstName" component="div" />
            </div>

            <div>
              <label htmlFor="lastName">Last name :</label>
              <Field name="lastName" />
              <ErrorMessage name="lastName" component="div" />
            </div>

            <div>
              <label htmlFor="username">Username :</label>
              <Field name="username" />
              <ErrorMessage name="username" component="div" />
            </div>

            <div>
              <label htmlFor="password">Password :</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm Password :</label>
              <Field name="confirmPassword" type="password" />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {btnType}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UserForm;
