// src/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

async function login(username: string, password: string): Promise<string | null> {
  try {
    const response = await axios.post('http://localhost:8000/api-token-auth/', { username, password });
    return response.data.token;
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg]     = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(username, password).then((token) => {
      if (token) {
        console.log('Obtained token:', token);
        setMsg('Obtained token:' + token);
        localStorage.setItem('token', token);
        onLoginSuccess(token);
      } else {
        console.log('Login failed. Invalid username or password.');
        setError('Login failed. Invalid username or password.');
      }
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {msg && <p style={{ color: 'black' }}>{msg}</p>}
      </form>
    </div>
  );
};

export default Login;
