import { useContext } from "react"
import { AuthContext } from "../Contexts/AuthContext"
import { Link } from "react-router-dom"
import globalStyle from '../global.module.css'

const Settings = () => {

    const { user} = useContext(AuthContext)

  return (
    <>
      <h1>Settings</h1>
      <div>
         {!user?.is_admin && user && (
          <Link to="/become-admin" className={globalStyle["button"]}>
            Become admin
          </Link>
        )}
        {user?.is_admin && (
          <Link to="/admin-panel" className={globalStyle["button"]}>
            Admin panel
          </Link>
        )}
      </div>
    </>
  )
}

export default Settings
