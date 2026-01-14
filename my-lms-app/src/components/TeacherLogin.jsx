import { useState, useEffect } from 'react';
import './AuthForms.css';

function TeacherLogin({ onLoginSuccess, onSwitchToSignup, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError('');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (!email.includes('@')) {
        setError('Please enter a valid email');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      const registeredTeachers = JSON.parse(localStorage.getItem('registeredTeachers')) || [];
      const teacher = registeredTeachers.find(u => u.email === email);

      if (!teacher) {
        setError('Email not registered. Please sign up first.');
        setLoading(false);
        return;
      }

      if (teacher.password !== password) {
        setError('Invalid password');
        setLoading(false);
        return;
      }

      const loggedInUser = {
        name: teacher.name,
        email: teacher.email,
        role: 'teacher',
        subject: teacher.subject
      };

      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      onLoginSuccess(loggedInUser);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="auth-container">
      <button onClick={onBack} className="back-arrow">← Back</button>
      <div className="auth-box">
        <div className="auth-header">
          <h1>👨‍🏫 Teacher Login</h1>
          <p>Welcome Back, Teacher</p>
        </div>

        <div className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <button onClick={handleSubmit} disabled={loading} className="auth-button">
            {loading ? 'Logging in...' : 'Teacher Login'}
          </button>
        </div>

        <div className="auth-footer">
          <p>Don't have an account?</p>
          <button onClick={onSwitchToSignup} className="auth-link">
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherLogin;