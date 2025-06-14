import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import TaskList from "./pages/TaskList.jsx";
import AddTask from "./pages/AddTask.jsx";
import TaskDetail from "./pages/TaskDetail.jsx";
import DefaultLayouts from "./layout/DefaultLayouts.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayouts />}>
            <Route path="/" element={<TaskList />} />
            <Route path="/addtask" element={<AddTask />} />
            <Route path="/task/:id" element={<TaskDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  </StrictMode>
);

// Aggiornare main.jsx per aggiungere la rotta TaskDetail.jsx
// Aggiungere la rotta /task/:id che caricherà il componente TaskDetail.jsx.
