// src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// 1. IMPORTAR COMPONENTES DE AUTORIZACIÓN
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    // 2. ENVOLVER LA APLICACIÓN CON EL PROVEEDOR DE AUTORIZACIÓN
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta de Login (no protegida) */}
          <Route path="/login" element={<Login />} />

          {/* Ruta Protegida: Reemplazamos <Home /> por la lógica de protección */}
          {/* Si el usuario está logueado, PrivateRoute renderiza su contenido */}
          <Route path="/" element={<PrivateRoute />}>
            {/* 3. Definimos la página Home (Chat) como el componente a proteger */}
            <Route index element={<Home />} /> 
          </Route>
          
          {/* Ruta para cualquier otra URL no definida */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
