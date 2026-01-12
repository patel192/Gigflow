import { useContext,createContext,useState } from "react";
import api from "../api/axios.js";


const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const register = async (data) => {
        const res = await api.post("/auth/register",data);
        setUser(res.data.user);
    };
    const login = async (data) => {
        const res = await api.post("/auth/login",data);
        setUser(res.data.user);
    };

    const logout = () => {
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user,register,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
};
export const useAuth = () => useContext(AuthContext);
