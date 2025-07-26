import { useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import ClientForm from "../components/ClientForm";
import ClientList from "../components/ClientList";
import "./Clients.css"; // ✅ for optional styling

export default function Clients() {
  const { token } = useContext(AuthContext);
  const [clients, setClients] = useState([]);
  const [view, setView] = useState("list"); // 'list' or 'add'

  const fetchClients = async () => {
    try {
      const res = await axiosInstance(token).get("/clients");
      setClients(res.data);
    } catch (err) {
      alert("Failed to load clients");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="clients-page">
      <h2>Client Management</h2>

      <div className="clients-toggle">
        <button
          className={view === "list" ? "active" : ""}
          onClick={() => setView("list")}
        >
          📋 View Clients
        </button>
        <button
          className={view === "add" ? "active" : ""}
          onClick={() => setView("add")}
        >
          ➕ Add Client
        </button>
      </div>

      {view === "add" && <ClientForm onClientAdded={fetchClients} />}
      {view === "list" && (
        <ClientList
          clients={clients}
          onDelete={fetchClients}
          onUpdate={fetchClients}
        />
      )}
    </div>
  );
}
