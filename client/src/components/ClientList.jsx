import { useState, useContext } from "react";
import axiosInstance from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./ClientList.css";

export default function ClientList({ clients, onDelete, onUpdate }) {
  const { token } = useContext(AuthContext);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [visibleCreds, setVisibleCreds] = useState({}); // map client._id → boolean

  const toggleCreds = (id) => {
    setVisibleCreds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const startEdit = (client) => {
    setEditingId(client._id);
    setEditData({
      ...client,
      expiryDate: client.expiryDate?.split("T")[0],
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      const updatePayload = {
        ...editData,
        renewalCharge: parseFloat(editData.renewalCharge),
        expiryDate: new Date(editData.expiryDate),
      };

      await axiosInstance(token).put(`/clients/${editingId}`, updatePayload);
      toast.success("✅ Client updated successfully");
      setEditingId(null);
      onUpdate();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update client");
    }
  };

  const cancelEdit = () => setEditingId(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await axiosInstance(token).delete(`/clients/${id}`);
      toast.success("🗑️ Client deleted");
      onDelete();
    } catch (err) {
      toast.error("❌ Delete failed");
    }
  };

  return (
    <ul className="client-list">
      {clients.map((client) => (
        <li className="client-item" key={client._id}>
          {editingId === client._id ? (
            <div className="client-edit">
              <input
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                placeholder="Client Name"
              />
              <input
                name="domain"
                value={editData.domain}
                onChange={handleEditChange}
                placeholder="Domain"
              />
              <input
                name="hostingProvider"
                value={editData.hostingProvider}
                onChange={handleEditChange}
                placeholder="Hosting Provider"
              />
              <input
                name="expiryDate"
                type="date"
                value={editData.expiryDate}
                onChange={handleEditChange}
              />
              <input
                name="renewalCharge"
                type="number"
                value={editData.renewalCharge}
                onChange={handleEditChange}
                placeholder="Renewal Charge"
              />
              <div className="client-actions">
                <button className="save-btn" onClick={saveEdit}>Save</button>
                <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div className="client-info">
                <strong>{client.name}</strong> ({client.domain})
                <br />
                Provider: {client.hostingProvider} | Expires:{" "}
                <span
                  className={
                    client.isExpired
                      ? "expired"
                      : client.isExpiringSoon
                      ? "expiring"
                      : ""
                  }
                >
                  {new Date(client.expiryDate).toLocaleDateString()}
                </span>{" "}
                | ₹{client.renewalCharge}

                {client.isExpired && (
                  <span className="badge expired-badge">❌ Expired</span>
                )}
                {!client.isExpired && client.isExpiringSoon && (
                  <span className="badge warning-badge">
                    ⚠️ {client.daysLeft} days left
                  </span>
                )}
              </div>

              {visibleCreds[client._id] && (
                <div className="client-creds">
                  <p><strong>Hosting Login:</strong> {client.loginCredentials}</p>
                  <p><strong>Email Login:</strong> {client.emailCredentials}</p>
                </div>
              )}

              <div className="client-actions">
                <button onClick={() => toggleCreds(client._id)}>
                  {visibleCreds[client._id] ? "Hide Credentials" : "Show Credentials"}
                </button>
                <button className="edit-btn" onClick={() => startEdit(client)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(client._id)}>Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
