import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Todos from "./pages/Todos";
import { useEffect, useState } from "react";
import useLocalStorage from "./hooks/useLocaleStorage";

const App = () => {

  const [user, setUser] = useLocalStorage("user", null);
  useEffect(() => {}, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/todos"
          element={user ? <Todos /> : <Navigate to="/" replace />}
        />
        <Route
          path="/"
          element={user ? <Navigate to="/todos" replace /> : <Login setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
