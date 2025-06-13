import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router";
import TaskList from "./pages/TaskList.jsx";
import AddTask from "./pages/AddTask.jsx";
import DefaultLayouts from "./layout/DefaultLayouts.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayouts />}>
            <Route path="/" element={<TaskList />} />
            <Route path="/addtask" element={<AddTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  </StrictMode>
);
