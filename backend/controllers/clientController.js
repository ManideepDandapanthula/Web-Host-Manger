const Client = require('../models/Client');
const { encrypt, decrypt } = require('../utils/crypto');

// @desc    Get all clients belonging to the logged-in user
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find({ user: req.user.userId });
    const now = new Date();
    const soonThreshold = 1000 * 60 * 60 * 24 * 7;

    const processedClients = clients.map(c => {
      const expiry = new Date(c.expiryDate);
      const msUntilExpiry = expiry - now;
      const daysLeft = Math.ceil(msUntilExpiry / (1000 * 60 * 60 * 24));
      const isExpiringSoon = msUntilExpiry <= soonThreshold && msUntilExpiry > 0;
      const isExpired = msUntilExpiry < 0;

      return {
        ...c._doc,
        loginCredentials: decrypt(c.loginCredentials),
        emailCredentials: decrypt(c.emailCredentials),
        isExpiringSoon,
        isExpired,
        daysLeft,
      };
    });

    res.json(processedClients);
  } catch (err) {
    console.error("getClients error:", err);
    res.status(500).json({ error: err.message });
  }
};

// @desc    Create a client owned by the logged-in user
exports.createClient = async (req, res) => {
  try {
    const data = {
      ...req.body,
      loginCredentials: encrypt(req.body.loginCredentials),
      emailCredentials: encrypt(req.body.emailCredentials),
      user: req.user.userId, // 👈 store ownership
    };

    const newClient = new Client(data);
    const saved = await newClient.save();

    const decrypted = {
      ...saved._doc,
      loginCredentials: decrypt(saved.loginCredentials),
      emailCredentials: decrypt(saved.emailCredentials),
    };

    res.status(201).json(decrypted);
  } catch (err) {
    console.error("Create Client Error:", err);
    res.status(400).json({ error: err.message || "Unknown error" });
  }
};

// @desc    Update a client (only if owned by user)
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findOne({ _id: req.params.id, user: req.user.userId });
    if (!client) return res.status(404).json({ error: 'Client not found or unauthorized' });

    const updateData = { ...req.body };
    if (updateData.loginCredentials) {
      updateData.loginCredentials = encrypt(updateData.loginCredentials);
    }
    if (updateData.emailCredentials) {
      updateData.emailCredentials = encrypt(updateData.emailCredentials);
    }

    const updated = await Client.findByIdAndUpdate(client._id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Update Client Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// @desc    Delete a client (only if owned by user)
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findOne({ _id: req.params.id, user: req.user.userId });
    if (!client) return res.status(404).json({ error: 'Client not found or unauthorized' });

    await Client.findByIdAndDelete(client._id);
    res.json({ message: 'Client deleted' });
  } catch (err) {
    console.error("Delete Client Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getClientStats = async (req, res) => {
  try {
    const clients = await Client.find({ user: req.user.userId });

    const now = new Date();
    const soonThreshold = 1000 * 60 * 60 * 24 * 7;

    const total = clients.length;
    const expiringSoon = clients.filter(c => {
      const days = new Date(c.expiryDate) - now;
      return days <= soonThreshold && days > 0;
    }).length;
    const expired = clients.filter(c => new Date(c.expiryDate) < now).length;

    const totalRenewal = clients.reduce((sum, c) => sum + (c.renewalCharge || 0), 0);
    const avgRenewal = total ? Math.round(totalRenewal / total) : 0;

    res.json({
      total,
      expiringSoon,
      expired,
      avgRenewal
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: "Failed to calculate stats" });
  }
};
