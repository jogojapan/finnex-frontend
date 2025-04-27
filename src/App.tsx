import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Main from './Main';
import NewAccount from './NewAccount';
import AccountList from './AccountList';
import Layout from './Layout';
import { ThemeProvider } from './ThemeContext';

const App: React.FC = () => {
 const [token, setToken] = useState(localStorage.getItem('token'));

 useEffect(() => {
   if (token) {
     axios.defaults.headers.common['Authorization'] = `Token ${token}`;
   } else {
     delete axios.defaults.headers.common['Authorization'];
   }
 }, [token]);

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
    window.location.replace('/');
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
      <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={
           token ? (
             <Navigate to="/" replace />
           ) : (
             <Login onLoginSuccess={handleLoginSuccess} />
           )
        }/>
        <Route path="/" element={
          token ? <Main onLogout={handleLogout} /> : <Navigate to="/login" replace />
        }/>
        <Route path='/accounts/new' element={token ? <NewAccount /> : <Navigate to="/login" replace />} />
        <Route path='/accounts/list' element={token ? <AccountList /> : <Navigate to="/login" replace />} />
      </Route>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
 );
};

export default App;
