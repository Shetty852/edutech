import { useState, useEffect } from 'react';
import './AuthForms.css';

function StudentLogin({ onLoginSuccess, onSwitchToSignup, onBack }) {
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

      const registeredStudents = JSON.parse(localStorage.getItem('registeredStudents')) || [];
      const student = registeredStudents.find(u => u.email === email);

      if (!student) {
        setError('Email not registered. Please sign up first.');
        setLoading(false);
        return;
      }

      if (student.password !== password) {
        setError('Invalid password');
        setLoading(false);
        return;
      }

      const loggedInUser = {
        name: student.name,
        email: student.email,
        role: 'student'
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
          <h1>👨‍🎓 Student Login</h1>
          <p>Welcome Back, Student</p>
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
            {loading ? 'Logging in...' : 'Student Login'}
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

export default StudentLogin;