import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Dashboard.css"; // Reuse dashboard styles
import './Home.css'
export default function Home() {
  const { user } = useContext(AuthContext);

  const features = [
    {
      icon: "📂",
      title: "Client Management",
      description: "Add, edit, and organize client profiles with full details.",
    },
    {
      icon: "🔐",
      title: "Credential Storage",
      description: "Securely store hosting and email login credentials.",
    },
    {
      icon: "📅",
      title: "Expiry Tracking",
      description: "Never miss a renewal again. Auto-track domain & hosting expiry dates.",
    },
    {
      icon: "📬",
      title: "Notifications",
      description: "Get reminders before domain and hosting expirations.",
    },
    {
      icon: "📊",
      title: "Dashboard Stats",
      description: "Quick summaries for active clients, upcoming renewals, and more.",
    },
    {
      icon: "🔐",
      title: "Secure Login",
      description: "Access protected routes with token-based authentication.",
    },
  ];

  return (
    <div className="dashboard-container" style={{ textAlign: "center" }}>
      <div className="dashboard-header">
        <h1>🌐 Welcome to WebHostManager</h1>
        <p>All-in-one client & domain management system for web hosting professionals.</p>

        {user ? (
          <p style={{ marginTop: "10px" }}>
            You're logged in as <strong>{user.name}</strong>
          </p>
        ) : (
          <div style={{ margin: "20px 0" }}>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register" style={{ marginLeft: "10px" }}>
              <button>Register</button>
            </Link>
          </div>
        )}
      </div>

      <div className="dashboard-section">
        <h2>🚀 Platform Features</h2>
        <div className="dashboard-features">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <h3>{f.icon} {f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
