import { useState, useContext } from "react";
import axiosInstance from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./ClientForm.css";

export default function ClientForm({ onClientAdded }) {
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    hostingProvider: '',
    loginCredentials: '',
    emailCredentials: '',
    expiryDate: '',
    renewalCharge: '',
  });

  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showEmailPass, setShowEmailPass] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      expiryDate: new Date(formData.expiryDate),
      renewalCharge: parseFloat(formData.renewalCharge),
    };

    try {
      await axiosInstance(token).post('/clients', cleanedData);
      toast.success("🎉 Client added successfully!");
      onClientAdded();
      setFormData({
        name: '',
        domain: '',
        hostingProvider: '',
        loginCredentials: '',
        emailCredentials: '',
        expiryDate: '',
        renewalCharge: '',
      });
    } catch (err) {
      console.error("POST /clients error:", err.response?.data || err.message);
      toast.error("❌ Error adding client. Please check the form.");
    }
  };

  return (
    <div className="client-form-container">
      <form className="client-form" onSubmit={handleSubmit}>
        <h3>Add New Client</h3>

        <input name="name" value={formData.name} onChange={handleChange} placeholder="Client Name" required />
        <input name="domain" value={formData.domain} onChange={handleChange} placeholder="Domain Name" required />
        <input name="hostingProvider" value={formData.hostingProvider} onChange={handleChange} placeholder="Hosting Provider" required />

        <div className="password-toggle">
          <input
            name="loginCredentials"
            value={formData.loginCredentials}
            onChange={handleChange}
            type={showLoginPass ? "text" : "password"}
            placeholder="Hosting Login Credentials"
            required
          />
          <button type="button" onClick={() => setShowLoginPass(!showLoginPass)}>
            {showLoginPass ? "Hide" : "Show"}
          </button>
        </div>

        <div className="password-toggle">
          <input
            name="emailCredentials"
            value={formData.emailCredentials}
            onChange={handleChange}
            type={showEmailPass ? "text" : "password"}
            placeholder="Email Login Credentials"
            required
          />
          <button type="button" onClick={() => setShowEmailPass(!showEmailPass)}>
            {showEmailPass ? "Hide" : "Show"}
          </button>
        </div>

        <input name="expiryDate" value={formData.expiryDate} onChange={handleChange} type="date" required />
        <input name="renewalCharge" value={formData.renewalCharge} onChange={handleChange} placeholder="Renewal Charge (₹)" type="number" required />

        <button type="submit">Add Client</button>
      </form>
    </div>
  );
}
