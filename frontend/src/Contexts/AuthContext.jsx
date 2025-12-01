import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/auth/whoami", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "/auth/login",
        { username, password },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
    }
    await fetchUser();
  };

  const signup = async (firstName, lastName, username, password, isAdmin) => {
    await axios.post(
      "/auth/signup",
      { firstName, lastName, username, password, isAdmin },
      {
        withCredentials: true,
      }
    );

    await fetchUser()
  };

  const logout = async () => {
    await axios.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
