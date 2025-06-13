import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log(tasks); // Stampa le task per verificare il corretto recupero

  return (
    <div>
      <h1>Pagina delle task</h1>
    </div>
  );
}
