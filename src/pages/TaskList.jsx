import { useContext, useState, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import TaskRow from "../components/TaskRow.jsx";

export default function TaskList() {
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);

  const { tasks } = useContext(GlobalContext);

  const sortIcon = sortOrder === 1 ? "↑" : "↓";

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title) * sortOrder;
      } else if (sortBy === "status") {
        const statusOrder = {
          "To do": 0,
          Doing: 1,
          Done: 2,
        };
        return (statusOrder[a.status] - statusOrder[b.status]) * sortOrder;
      } else if (sortBy === "createdAt") {
        return (
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
          sortOrder
        );
      }
      return 0;
    });
  }, [tasks, sortBy, sortOrder]);

  return (
    <div>
      <h1>Pagina delle task</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>
              Nome {sortBy === "title" && sortIcon}
            </th>
            <th onClick={() => handleSort("status")}>
              Status{sortBy === "status" && sortIcon}
            </th>
            <th onClick={() => handleSort("createdAt")}>
              Data di creazione{sortBy === "createdAt" && sortIcon}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Implementare la logica di ordinamento con useMemo(), in modo che l’array ordinato venga ricalcolato solo quando cambiano tasks, sortBy o sortOrder:
// Ordinamento per title → alfabetico (localeCompare).
// Ordinamento per status → ordine predefinito: "To do" < "Doing" < "Done".
// Ordinamento per createdAt → confrontando il valore numerico della data (.getTime()).
// Applicare sortOrder per definire se l’ordine è crescente o decrescente.
