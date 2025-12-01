import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";
import { useContext } from "react";

const Logout = ({}) => {

    const {logout} = useContext(AuthContext)

  const handleLogout = async () => {
    await logout
  };

  return <button onClick={logout}>Log out</button>;
};

export default Logout;
