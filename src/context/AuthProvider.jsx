import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

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

  const login = useCallback((nameValue) => {
    localStorage.setItem("loggedUserName", nameValue);
    setName(nameValue);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("loggedUserName");
    setName("");
  }, []);

  const value = useMemo(
    () => ({
      name,
      login,
      logout,
    }),
    [name, login, logout, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
