// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Main from './Main';
import NewAccount from './NewAccount';

const App: React.FC = () => {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLoginSuccess={() => window.location.replace('/')} />
            )
          }
        />
        <Route
           path="/"
           element={token ? <Main /> : <Navigate to="/login" replace />}
        />
        <Route path='/accounts/new' element={<NewAccount />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
