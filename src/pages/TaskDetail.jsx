import { useParams } from "react-router";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import { useState } from "react";

import Modal from "../components/Modal.jsx";
import EditTaskModal from "../components/EditTaskModal.jsx";

const URL_API_BE = import.meta.env.VITE_URL_API_BE;

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    return <h2>Task non trovata.</h2>;
  }

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliminata con successo!");
      setshowDeleteModal(false);
    } catch (error) {
      alert(`Errore durante l'eliminazione della task: ${error.message}`);
    }
  };

  const handleUpdate = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      alert("Task aggiornata con successo!");
      setShowEditModal(false);
    } catch (error) {
      alert(`Errore durante l'aggiornamento della task: ${error.message}`);
    }
  };

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
      <button onClick={() => setshowDeleteModal(true)}>Elimina Task</button>
      <button onClick={() => setShowEditModal(true)}>Modifica Task</button>
      <Modal
        title="Conferma Eliminazione"
        content={`Sei sicuro di voler eliminare la task "${task.title}"?`}
        show={showDeleteModal}
        onClose={() => setshowDeleteModal(false)}
        onConfirm={() => handleDelete(task.id)}
        confirmText="Elimina"
      ></Modal>
      <EditTaskModal
        task={task}
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdate}
      ></EditTaskModal>
    </div>
  );
}

// Integrare EditTaskModal in TaskDetail.jsx, con un nuovo bottone "Modifica Task":

// Quando l’utente clicca su "Modifica", si apre la modale con il form precompilato.
// L'onSave di EditTaskModal deve eseguire la funzione updateTask di useTasks(), passando la task modificata.
// Se la funzione esegue correttamente l'operazione:
// Mostrare un alert di conferma dell’avvenuta modifica.
// Chiudere la modale.
// Se la funzione lancia un errore:
// Mostrare un alert con il messaggio di errore ricevuto.
