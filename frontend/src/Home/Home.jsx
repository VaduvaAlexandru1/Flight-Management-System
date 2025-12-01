const Home = ({user}) => {
  return <>{user ? `Salut ${user.first_name} ${user.last_name}` : "Te rog sa te loghezi"}</>;
};

export default Home;
