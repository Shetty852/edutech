import { useState, useEffect } from 'react';
import './AuthForms.css';

function StudentSignup({ onSignupSuccess, onSwitchToLogin, onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
      if (!name || !email || !phone || !password || !confirmPassword) {
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

      const registeredStudents = JSON.parse(localStorage.getItem('registeredStudents')) || [];
      const emailExists = registeredStudents.some(u => u.email === email);

      if (emailExists) {
        setError('Email already registered. Please login instead.');
        setLoading(false);
        return;
      }

      const newStudent = {
        name,
        email,
        phone,
        password,
        role: 'student'
      };

      registeredStudents.push(newStudent);
      localStorage.setItem('registeredStudents', JSON.stringify(registeredStudents));

      const loggedInUser = {
        name,
        email,
        role: 'student'
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
          <h1>👨‍🎓 Student Sign Up</h1>
          <p>Start Your Learning Journey</p>
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
            {loading ? 'Creating Account...' : 'Create Student Account'}
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

export default StudentSignup;