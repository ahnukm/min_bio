import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Submissions from "@/pages/Submissions";
import Statistics from "@/pages/Statistics";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  logout: () => {},
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </AuthContext.Provider>
  );
}
