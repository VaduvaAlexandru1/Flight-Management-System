import axios from "axios";

const Logout = ({onLogout}) => {
  const logout = async () => {
    const response = await axios.post(
      "http://localhost:5000/auth/logout",
      {},
      { withCredentials: true }
    );

    onLogout()
  };

  return <button onClick={logout}>Log out</button>;
};

export default Logout;
