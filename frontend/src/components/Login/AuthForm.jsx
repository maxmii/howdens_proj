import { useState } from 'react';
import httpClient from '../../../httpClient';

const AuthForm = ({ type = 'login' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const url = import.meta.env.VITE_BACKEND_URL;

  const isLogin = type === 'login';
  const endpoint = isLogin ? '/login' : '/register';
  const buttonText = isLogin ? 'Login' : 'Register';
  const title = isLogin ? 'Sign In' : 'Create Account';

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    try {
      await httpClient.post(`${url}${endpoint}`, {
        email,
        password,
      });
      
      window.location.href = '/';
    } catch (err) {
      setError(isLogin ? 'Invalid credentials' : 'Registration failed');
      console.error(err);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>{title}</h2>
      {error && <div className="auth-error">{error}</div>}
      <form className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button 
          type="button" 
          onClick={handleSubmit}
          className="submit-button"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
