import { useState, useEffect } from "react";

const URL_API_BE = import.meta.env.VITE_URL_API_BE;

export default function useTask() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${URL_API_BE}/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Funzione per aggiungere una nuova task
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

  // Funzione per rimuovere una task
  const removeTask = async (taskId) => {
    const response = await fetch(`${URL_API_BE}/tasks/${taskId}`, {
      method: "DELETE",
    });
    const { success, message } = await response.json();
    if (!success) {
      throw new Error(message);
    }
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // Funzione per aggiornare una task
  const updateTask = async (updatedTask) => {
    const response = await fetch(`${URL_API_BE}/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    const { success, message, task: newTask } = await response.json();
    if (!success) {
      throw new Error(message);
    }
    setTasks((prev) =>
      prev.map((oldTask) => (oldTask.id === newTask.id ? newTask : oldTask))
    );
  };

  return { tasks, addTask, removeTask, updateTask };
}
