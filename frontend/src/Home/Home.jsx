const Home = ({ isLogged }) => {
  return <>{isLogged ? "Salut" : "Te rog sa te loghezi"}</>;
};

export default Home;
