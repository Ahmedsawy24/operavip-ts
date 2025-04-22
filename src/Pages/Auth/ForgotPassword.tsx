import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ForgotPassword.module.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (e: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = () => {
    setError('');
    setSuccess('');

    if (!email) {
      setError('⚠️ Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      setError('⚠️ Invalid email format.');
      return;
    }

    // dummy action
    setSuccess('✅ Reset link sent successfully!');
    setEmail('');
  };

  return (
    <div className={styles.fpContainer}>
      <div className={styles.fpCard}>
        <h2 className={styles.fpTitle}>🔐 Forgot Your Password?</h2>
        <p className={styles.fpDescription}>
          📧 Enter your registered email to receive reset instructions.
        </p>

        <input
          type="email"
          placeholder="Enter your email address"
          className={styles.fpInput}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {error && <div className={styles.fpError}>{error}</div>}
        {success && <div className={styles.fpSuccess}>{success}</div>}

        <button className={styles.fpButton} onClick={handleSubmit}>
          📬 Send Reset Link
        </button>

        <Link to="/" className={styles.fpBackLink}>
          🔙 Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
