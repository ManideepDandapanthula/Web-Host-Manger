import { useEffect, useState, useContext } from "react";
import axiosInstance from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "./Stats.css";

export default function Stats() {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState({
    total: 0,
    expiringSoon: 0,
    expired: 0,
    avgRenewal: 0,
  });

  useEffect(() => {
    const fetchClientStats = async () => {
      try {
        const res = await axiosInstance(token).get("/clients/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats");
      }
    };

    fetchClientStats();
  }, []);

  const statCards = [
    { title: "Total Clients", value: stats.total, color: "#3b82f6", icon: "👥" },
    { title: "Expiring Soon", value: stats.expiringSoon, color: "#facc15", icon: "⏳", textColor: "#1e293b" },
    { title: "Expired", value: stats.expired, color: "#ef4444", icon: "❌" },
    { title: "Avg. Renewal ₹", value: stats.avgRenewal, color: "#10b981", icon: "💰" }
  ];

  return (
    <div className="stats-dashboard">
      <h2>📊 Hosting Stats</h2>
      <div className="stats-grid">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className="stat-card"
            style={{ backgroundColor: card.color, color: card.textColor || "#fff" }}
          >
            <div className="stat-icon">{card.icon}</div>
            <div className="stat-label">{card.title}</div>
            <div className="stat-value">{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
