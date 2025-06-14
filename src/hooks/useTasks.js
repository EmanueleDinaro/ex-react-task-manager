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
