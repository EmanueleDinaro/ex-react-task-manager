import { createContext } from "react";
import useTask from "../hooks/useTasks";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const taskData = useTask();

  return (
    <GlobalContext.Provider value={{ ...taskData }}>
      {children}
    </GlobalContext.Provider>
  );
};
