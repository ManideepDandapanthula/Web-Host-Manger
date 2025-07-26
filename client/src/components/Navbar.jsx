import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // for styling

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-logo">WebHostManager</Link>

        {user ? (
          <>
            <Link to="/clients" className="nav-link">Clients</Link>
            <Link to="/stats" className="nav-link">Stats</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            <button onClick={handleLogout} className="nav-btn">Logout</button>
          </>
        ) : (
          <span className="nav-user">Welcome 👋</span>
        )}
      </div>
    </nav>
  );
}
