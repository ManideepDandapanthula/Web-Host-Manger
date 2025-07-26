import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './context/AuthContext'; // ✅ Default export
// import './index.css'; // or './main.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Wrap App with AuthProvider */}
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  </React.StrictMode>
);
