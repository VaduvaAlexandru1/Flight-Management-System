import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import globalStyle from "../global.module.css";

const Settings = () => {
  const { user, loading } = useContext(AuthContext);

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
          <button className={globalStyle["update-button"]}>Update account</button>
          <button className={globalStyle["delete-button"]}>Delete account</button>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Settings;
