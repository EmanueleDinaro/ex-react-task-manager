import { createContext } from "react";
import { useState, useEffect } from "react";
const URL_API_BE = import.meta.env.VITE_URL_API_BE || "http://localhost:3001";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${URL_API_BE}/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobalContext.Provider>
  );
};
