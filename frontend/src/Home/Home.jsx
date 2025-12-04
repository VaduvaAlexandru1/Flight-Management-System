import AllFlights from "../Flights/AllFlights/AllFlights";

const Home = ({ user }) => {
  return (
    <>
      {user ? (
        <>
          <h1>{`Salut ${user.first_name} ${user.last_name}`}</h1>
          <AllFlights where="home"/>
        </>
      ) : (
        "Please log in"
      )}
    </>
  );
};

export default Home;
