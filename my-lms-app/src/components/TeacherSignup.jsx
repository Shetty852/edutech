import { useState, useEffect } from 'react';
import './AuthForms.css';

function TeacherSignup({ onSignupSuccess, onSwitchToLogin, onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      if (!name || !email || !phone || !subject || !password || !confirmPassword) {
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

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      const registeredTeachers = JSON.parse(localStorage.getItem('registeredTeachers')) || [];
      const emailExists = registeredTeachers.some(u => u.email === email);

      if (emailExists) {
        setError('Email already registered. Please login instead.');
        setLoading(false);
        return;
      }

      const newTeacher = {
        name,
        email,
        phone,
        subject,
        password,
        role: 'teacher'
      };

      registeredTeachers.push(newTeacher);
      localStorage.setItem('registeredTeachers', JSON.stringify(registeredTeachers));

      const loggedInUser = {
        name,
        email,
        role: 'teacher',
        subject
      };

      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      onSignupSuccess(loggedInUser);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="auth-container">
      <button onClick={onBack} className="back-arrow">← Back</button>
      <div className="auth-box">
        <div className="auth-header">
          <h1>👨‍🏫 Teacher Sign Up</h1>
          <p>Start Teaching Today</p>
        </div>

        <div className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>

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
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Subject / Expertise</label>
            <input
              type="text"
              placeholder="e.g., Mathematics, English, Science"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
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

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <button onClick={handleSubmit} disabled={loading} className="auth-button">
            {loading ? 'Creating Account...' : 'Create Teacher Account'}
          </button>
        </div>

        <div className="auth-footer">
          <p>Already have an account?</p>
          <button onClick={onSwitchToLogin} className="auth-link">
            Login Here
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherSignup;