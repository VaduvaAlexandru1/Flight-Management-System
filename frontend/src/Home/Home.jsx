import { useEffect, useState } from "react";
import { checkAuth } from "../utils";

const Home = () => {
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

  return <>{isLogged ? "true" : "false"}</>;
};

export default Home;
