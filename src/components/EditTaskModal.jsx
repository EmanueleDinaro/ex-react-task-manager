import Modal from "./Modal";
import { useState, useRef } from "react";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const editFormRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...task,
      title: title.trim(),
      description: description.trim(),
      status,
    });
  };

  return (
    <Modal
      title="Modifica Task"
      content={
        <form ref={editFormRef} onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Descrizione:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>
          <label>
            Stato:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </label>
        </form>
      }
      confirmText="Salva"
      show={show}
      onClose={onClose}
      onConfirm={() => {
        editFormRef.current.requestSubmit();
      }}
    ></Modal>
  );
}
