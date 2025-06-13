import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import TaskRow from "../components/TaskRow.jsx";

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);

  return (
    <div>
      <h1>Pagina delle task</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Status</th>
            <th>Data di creazione</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
