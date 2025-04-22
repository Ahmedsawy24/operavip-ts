import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../../components/OperaVIPlogo.png';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('⚠️ Please enter both email and password.');
      return;
    }
    if (email === 'admin@hotel.com' && password === '123456') {
      navigate('/dashboard');
    } else {
      setError('⚠️ Invalid email or password.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={logo} alt="OperaVIP Logo" className={styles.logo} />

        <h2 className={styles.title}>Welcome to OperaVIP</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className={styles.input}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          className={styles.input}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && <div className={styles.error}>{error}</div>}

        <button className={styles.button} onClick={handleLogin}>
          Login
        </button>

        <a href="/forgot-password" className={styles.forgot}>
          Forgot your password?
        </a>

        <div className={styles.footer}>
          © 2025 OperaVIP. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
