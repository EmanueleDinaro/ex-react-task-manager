// Creare TaskDetail.jsx per mostrare:
// Nome (title)
// Descrizione (description)
// Stato (status)
// Data di creazione (createdAt)
// Un bottone "Elimina Task", che per ora stampa solo "Elimino task" in console.
import { useParams } from "react-router";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks } = useContext(GlobalContext);

  const task = tasks.find((task) => task.id === parseInt(id));

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
        <span onClick={() => console.log("Elimino task", task.id)}>
          Elimina
        </span>
      </button>
    </div>
  );
}
