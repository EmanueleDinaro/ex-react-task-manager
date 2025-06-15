import { useContext, useState, useMemo, useCallback } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import TaskRow from "../components/TaskRow.jsx";

function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

export default function TaskList() {
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearch = useCallback(debounce(setSearchQuery, 500), []);

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

  const filteredAndSortedTask = useMemo(() => {
    return [...tasks]
      .filter((task) => {
        return (
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.status.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
      .sort((a, b) => {
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
            (new Date(a.createdAt).getTime() -
              new Date(b.createdAt).getTime()) *
            sortOrder
          );
        }
        return 0;
      });
  }, [tasks, sortBy, sortOrder, searchQuery]);

  return (
    <div>
      <h1>Pagina delle task</h1>
      <input
        type="text"
        placeholder="Cerca task..."
        onChange={(e) => debounceSearch(e.target.value)}
      />
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
          {filteredAndSortedTask.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
// Modificare l'useMemo() per filtrare e ordinare i task
// Applicare il filtraggio basato su searchQuery.
// La ricerca deve essere case insensitive.
// Ordinare i risultati in base ai criteri esistenti (es. nome, stato, data di creazione).
