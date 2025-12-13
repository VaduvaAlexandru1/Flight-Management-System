import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import globalStyle from "../global.module.css";
import axios from "axios";

const Settings = () => {
  const { user, loading } = useContext(AuthContext);

  const navigate = useNavigate()

  const deleteUser = async () => {
    await axios.delete("/auth/delete-account", { withCredentials: true });
    navigate('/')
  };

  return (
    <>
      <h1>Settings</h1>
      {!loading ? (
        <div>
          {!user?.is_admin && (
            <Link to="/become-admin" className={globalStyle["button"]}>
              Become admin
            </Link>
          )}
          {user?.is_admin && (
            <Link to="/admin-panel" className={globalStyle["button"]}>
              Admin panel
            </Link>
          )}
          <Link className={globalStyle["update-button"]}>Update account</Link>
          <button
            className={globalStyle["delete-button"]}
            onClick={() => deleteUser()}
          >
            Delete account
          </button>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Settings;
