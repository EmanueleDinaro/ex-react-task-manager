import { useState, useEffect } from "react";
const URL_API_BE = import.meta.env.VITE_URL_API_BE || "http://localhost:3001";

export default function useTask() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${URL_API_BE}/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTask = (newTask) => {};
  const removeTask = (taskId) => {};
  const updateTask = () => {};
  return { tasks, addTask, removeTask, updateTask };
}
