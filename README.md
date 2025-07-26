
# 🌐 Web Host Manager

**Web Host Manager** is a full-stack web application built to help web hosting companies manage client data, domains, credentials, and renewals in one centralized system.

## 🚀 Features

- Add, view, edit, and delete client records
- Store domain names, hosting providers, login & email credentials
- Track domain expiry dates and renewal charges
- Secure login using authentication tokens (JWT)
- Toggle visibility for password fields
- Responsive UI with React

---

## 🛠️ Tech Stack

| Layer     | Technology        |
|----------|-------------------|
| Frontend | React + Vite      |
| Backend  | Express.js (Node) |
| Database | MongoDB (Mongoose)|
| Auth     | JWT (Token-based) |
| Styling  | CSS / Bootstrap   |
| Tools    | Axios, Toastify   |

---

## 📁 Project Structure

```

webhost-manager/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.jsx
│   └── index.html
└── README.md

````

---

## 🧑‍💻 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/webhost-manager.git
cd webhost-manager
````

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend:

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🔐 Authentication Flow

* JWT token is issued upon login and stored in the frontend context
* All protected routes use the token in headers via Axios
* Backend verifies token for every secured route

---

## 📸 Screenshots

![Client List Page](screenshots/client-list.png)
![Add Client Form](screenshots/add-client.png)

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📃 License

MIT License. Feel free to use and modify.

---

## ✨ Credits

Built with 💻 by Manideep Dandapanthula


