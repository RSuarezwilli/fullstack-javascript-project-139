import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider, useAuth } from './components/AuthContext';

function Header() {
  const auth = useAuth();

  return (
    <header className="header">
      <Link to="/">Chat</Link>

      {auth.user ? (
        <button onClick={auth.logOut}>Log out</button>
      ) : null}
    </header>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />

        <Routes>
          {/* --- LOGIN --- */}
          <Route path="/login" element={<Login />} />

          {/* --- SIGNUP --- */}
          <Route path="/signup" element={<Signup />} />

          {/* --- HOME (PROTEGIDA) --- */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          {/* --- 404 --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
