import { useContext, createContext, useState, useEffect } from "react";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    setUser(res.data.user);
  };

  const login = async (data) => {
    const res = await api.post("/auth/login", data);
    setUser(res.data.user);
  };

  const logout = async () => {
    await api.post("/auth/logout"); // you can add this backend endpoint
    setUser(null);
  };

  // 🔥 Restore session on refresh
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
