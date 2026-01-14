import './RoleSelection.css';

function RoleSelection({ onSelectRole }) {
  return (
    <div className="role-container">
      <div className="role-content">
        <h1>🎓 EduLearn</h1>
        <p>Welcome to Learning Management System</p>

        <div className="role-selection">
          <div className="role-card student-card" onClick={() => onSelectRole('student')}>
            <div className="role-icon">👨‍🎓</div>
            <h2>Student Login</h2>
            <p>Access your courses and continue learning</p>
            <button className="role-button">Login as Student</button>
          </div>

          <div className="role-card teacher-card" onClick={() => onSelectRole('teacher')}>
            <div className="role-icon">👨‍🏫</div>
            <h2>Teacher Login</h2>
            <p>Manage your courses and students</p>
            <button className="role-button">Login as Teacher</button>
          </div>
        </div>

        <p className="role-footer">Choose your role to continue</p>
      </div>
    </div>
  );
}

export default RoleSelection;