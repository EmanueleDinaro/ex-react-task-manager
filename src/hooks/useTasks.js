import { useState, useEffect } from "react";
import AddTask from "../pages/AddTask";
const URL_API_BE = import.meta.env.VITE_URL_API_BE || "http://localhost:3001";

export default function useTask() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${URL_API_BE}/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTask = async (newTask) => {
    const response = await fetch(`${URL_API_BE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const { success, message, task } = await response.json();
    if (!success) {
      throw new Error(message);
    }
    setTasks((prev) => [...prev, task]);
  };
  const removeTask = (taskId) => {};
  const updateTask = () => {};
  return { tasks, addTask, removeTask, updateTask };
}

// Milestone 6 - Integrazione dell'API per Aggiungere un Task (POST)
// Collegare il form di AddTask all'API e completare la funzione addTask in useTasks().

// Modificare la gestione del Submit del Form in AddTask.jsx:
// Eseguire la funzione addTask di useTasks(), passando l’oggetto con title, description e status.
// Se la funzione esegue correttamente l'operazione:
// Mostrare un alert di conferma dell’avvenuta creazione della task.
// Resettare il form.
// Se la funzione lancia un errore:
// Mostrare un alert con il messaggio di errore ricevuto.
