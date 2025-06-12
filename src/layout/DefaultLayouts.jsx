import { Link, Outlet } from "react-router";

export default function DefaultLayouts() {
  return (
    <div>
      <header>
        <h1>Task Manager Avanzato</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Task List</Link>
            </li>
            <li>
              <Link to="/addtask">Aggiungi Task</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; Realizzato da Emanuele - Classe 138</p>
      </footer>
    </div>
  );
}

// Aggiungere una barra di navigazione con NavLink, per permettere all'utente di spostarsi tra le pagine.
