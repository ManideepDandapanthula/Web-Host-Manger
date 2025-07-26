import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Stats from "./pages/Stats";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home: Welcome page for unauthenticated users */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Home />}
        />

        {/* Auth routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/dashboard" />}
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/clients"
          element={user ? <Clients /> : <Navigate to="/login" />}
        />
        <Route
          path="/stats"
          element={user ? <Stats /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
