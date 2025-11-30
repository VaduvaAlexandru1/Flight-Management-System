import "./App.css";
import Home from "./Home/Home";
import Login from "./Log in/Login";
import Signup from "./Sign up/Signup";
import { Link , Route , Routes} from "react-router-dom";
import { useState , useEffect } from "react";
import Logout from "./Logout/Logout";
import { checkAuth } from "./utils";
import BecomeAdmin from "./BecomeAdmin/BecomeAdmin";

function App() {

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const verify = async () => {
    let ok
    try{
        ok = await checkAuth();
        setIsLogged(ok);

    }catch(err){
        console.log(err)
    }finally{
        console.log(ok)
    }

    };
    verify();
  }, []);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | {" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/signup">Signup</Link>
        <Logout onLogout={() => setIsLogged(false)}></Logout>
        <Link to="become-admin">Become admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home isLogged={isLogged}></Home>} />
        <Route path="/login" element={<Login onLogin={() => setIsLogged(true)} />} />
        <Route path="/signup" element={<Signup onSignup={() => setIsLogged(true)}/>} />
        <Route path="/become-admin" element={<BecomeAdmin isLogged={isLogged}/>} />
      </Routes>
    </div>
  );
}

export default App;
