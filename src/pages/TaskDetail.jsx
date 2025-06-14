import { useParams } from "react-router";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
const URL_API_BE = import.meta.env.VITE_URL_API_BE;

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks } = useContext(GlobalContext);

  const task = tasks.find((task) => task.id === parseInt(id));

  const removeTask = (taskId) => {
    fetch(`${URL_API_BE}/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(({ success, message }) => {
        if (!success) {
          throw new Error(message);
        }
        alert("Task eliminata con successo!");
        window.location.href = "/";
      })
      .catch((error) => {
        alert(`Errore durante l'eliminazione della task: ${error.message}`);
      });
  };

  if (!task) {
    return <h2>Task non trovata.</h2>;
  }

  return (
    <div>
      <h1>Dettagli della Task</h1>
      <p>
        <strong>Nome:</strong> {task.title}
      </p>
      <p>
        <strong>Descrizione:</strong> {task.description}
      </p>
      <p>
        <strong>Stato:</strong> {task.status}
      </p>
      <p>
        <strong>Data di creazione:</strong>{" "}
        {new Date(task.createdAt).toLocaleDateString()}
      </p>
      <button>
        <span onClick={() => removeTask(task.id)}>Elimina</span>
      </button>
    </div>
  );
}
