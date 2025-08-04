import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedName = localStorage.getItem("loggedUserName");
    if (savedName) {
      setName(savedName);
    }
    setIsLoading(false); 
  }, []);

  const login = (nameValue) => {
    localStorage.setItem("loggedUserName", nameValue);
    setName(nameValue);
  };

  const logout = () => {
    localStorage.removeItem("loggedUserName");
    setName("");
  };

  return (
    <AuthContext.Provider value={{ name, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
