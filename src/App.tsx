import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect, lazy } from "react";
import useLocalStorage from "./hooks/useLocaleStorage";

const Todos = lazy(
  () => import(/* webpackChunkName: "Todo" */ "./pages/Todos")
);

const Login = lazy(
  () => import(/* webpackChunkName: "Login" */ "./pages/Login")
);

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
          element={
            user ? (
              <Navigate to="/todos" replace />
            ) : (
              <Login setUser={setUser} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
