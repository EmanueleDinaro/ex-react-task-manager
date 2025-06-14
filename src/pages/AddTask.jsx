import { useState, useRef, useMemo, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";

export default function AddTask() {
  const [taskTitle, setTaskTitle] = useState("");
  const taskDescriptionRef = useRef("");
  const taskStatusRef = useRef("To do");
  const { addTask } = useContext(GlobalContext);
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

  const taskTitleError = useMemo(() => {
    if (!taskTitle.trim()) {
      return "Il campo Nome non può essere vuoto.";
    }
    if ([...taskTitle].some((char) => symbols.includes(char))) {
      return "Il campo Nome non può contenere simboli speciali.";
    }
    return "";
  }, [taskTitle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskTitleError) {
      alert("Per favore, correggi gli errori nel form.");
      return;
    }
    const newTask = {
      title: taskTitle.trim(),
      description: taskDescriptionRef.current.value,
      status: taskStatusRef.current.value,
    };
    try {
      await addTask(newTask);
      alert("Task aggiunta con successo!");
      setTaskTitle("");
      taskDescriptionRef.current.value = "";
      taskStatusRef.current.value = "To do";
    } catch (error) {
      alert(`Errore durante l'aggiunta della task: ${error.message}`);
      return;
    }
  };

  return (
    <div>
      <h1>Aggiungi una Task</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label>
          Nome Task:
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </label>
        {taskTitleError && <p style={{ color: "red" }}>{taskTitleError}</p>}
        <label>
          Descrizione
          <textarea
            ref={taskDescriptionRef}
            placeholder="Descrizione del task"
          ></textarea>
          <label>
            Stato
            <select ref={taskStatusRef} defaultValue="To do">
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </label>
        </label>
        <button type="submit" disabled={taskTitleError}>
          Aggiungi Task
        </button>
      </form>
    </div>
  );
}
