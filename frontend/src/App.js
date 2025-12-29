import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importaciones ajustadas a tu estructura de carpetas real
import ChatPage from './components/ChatPage/ChatPage'; // Antes era Home
import LoginPage from './componets/LoginPage/LoginPage'; // Antes era Login
import SignupPage from './components/SignupPage/SignupPage'; // Antes era Signup
import PrivateRoute from './components/PrivateRoute'; // Verifica que esté en la raíz de components
import { AuthProvider, useAuth } from './context/AuthProvider'; // Ajustado a tu carpeta 'context'

function Header() {
  const auth = useAuth();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">Hexlet Chat</Link>
        {/* El enunciado pide un botón de cerrar sesión en el Navbar */}
        {auth.user && (
          <button type="button" className="btn btn-primary" onClick={auth.logOut}>
            Salir
          </button>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {/* Ruta pública de Login */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Ruta pública de Registro */}
          <Route path="/signup" element={<SignupPage />} />

          {/* Ruta Protegida del Chat (Fase 4) */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />

          {/* Manejo de rutas no encontradas */}
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;