import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";
import { useContext } from "react";
import globalStyle from '../global.module.css'

const Logout = ({}) => {

    const {logout} = useContext(AuthContext)

  const handleLogout = async () => {
    await logout
  };

  return <button onClick={logout} className={globalStyle['button']}>Log out</button>;
};

export default Logout;
