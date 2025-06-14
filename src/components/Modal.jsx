import { createPortal } from "react-dom";

export default function Modal({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText = "Conferma",
}) {
  if (!show) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="modal-buttons">
          <button onClick={onClose}>Annulla</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// Creare il componente Modal.jsx, che deve:
// Accettare i seguenti props:
// title: il titolo della modale.
// content: il contenuto principale della modale.
// show: stato booleano per mostrare o nascondere la modale.
// onClose: funzione per chiudere la modale.
// onConfirm: funzione eseguita al click del bottone di conferma.
// confirmText (opzionale, default "Conferma"): testo del bottone di conferma.
// Utilizzare ReactDOM.createPortal per rendere la modale indipendente dal flusso di rendering.
// Implementare i pulsanti "Annulla" (chiude la modale) e "Conferma" (esegue onConfirm).
