import { useEffect, useState } from "react";
import { checkAuth } from "../utils";

const Home = ({isLogged}) => {
  

  return <>{isLogged ? "Salut" : "Te rog sa te loghezi"}</>;
};

export default Home;
