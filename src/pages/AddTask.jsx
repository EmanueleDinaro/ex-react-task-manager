import { useState, useRef, useMemo } from "react";

export default function AddTask() {
  const [taskTitle, setTaskTitle] = useState("");
  const taskDescriptionRef = useRef("");
  const taskStatusRef = useRef("To do");

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
  return (
    <div>
      <h1>Aggiungi una Task</h1>
      <form
        onSubmit={(e) => {
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
          console.log(newTask);
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

// 📌 Milestone 5 - Creazione del Form per Aggiungere un Task
// Creare un form per aggiungere un task, senza ancora inviare i dati all'API.

// Al click del bottone "Aggiungi Task", il form deve SOLO stampare in console l’oggetto task con i valori inseriti (NON deve ancora essere inviata la richiesta all’API).
