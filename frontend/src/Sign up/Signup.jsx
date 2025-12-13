import UserForm from "../Forms/UserForm";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const Signup = () => {
  const navigate = useNavigate();

  const { signup } = useContext(AuthContext);

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
      <UserForm handleFn={handleSignUp} btnType='sign up'/>
    </>
  );
};

export default Signup;
