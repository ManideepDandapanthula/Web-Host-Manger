import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name} 👋</h1>
        <p>Here’s a quick look at what you can do with WebHostManager.</p>
      </div>

      <div className="dashboard-actions">
        <button onClick={() => navigate("/clients")}>📁 Manage Clients</button>
      </div>

      <div className="dashboard-section">
        <h2>🚀 What This Platform Offers</h2>
        <p>All-in-one client & domain management system for web hosting professionals.</p>

        <div className="dashboard-features">
          <div className="feature-card">
            <h3>📂 Client Management</h3>
            <p>Add, edit, and organize client profiles with full details.</p>
          </div>
          <div className="feature-card">
            <h3>🔐 Credential Storage</h3>
            <p>Securely store hosting and email login credentials.</p>
          </div>
          <div className="feature-card">
            <h3>📅 Expiry Tracking</h3>
            <p>Never miss a renewal again. Auto-track domain & hosting expiry dates.</p>
          </div>
          <div className="feature-card">
            <h3>📬 Notifications</h3>
            <p>Get reminders before domain and hosting expirations.</p>
          </div>
          <div className="feature-card">
            <h3>📊 Dashboard Stats</h3>
            <p>Quick summaries for active clients, upcoming renewals, and more.</p>
          </div>
          <div className="feature-card">
            <h3>🔐 Secure Login</h3>
            <p>Access protected routes with token-based authentication.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
