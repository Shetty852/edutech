import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';
import VideoPlayer from './components/VideoPlayer';
import RoleSelection from './pages/RoleSelection';
import StudentLogin from './components/StudentLogin';
import StudentSignup from './components/StudentSignup';
import TeacherLogin from './components/TeacherLogin';
import TeacherSignup from './components/TeacherSignup';
import { courses } from './data/courses';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('role-selection');
  const [user, setUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      setCurrentPage('dashboard');
    }
    setLoading(false);
  }, []);

  const handleSelectRole = (role) => {
    setCurrentPage(`${role}-login`);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleSignupSuccess = (userData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setSelectedCourse(null);
    setCurrentPage('role-selection');
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  const handleBackToRole = () => {
    setCurrentPage('role-selection');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Show Role Selection if user not logged in
  if (!user) {
    if (currentPage === 'role-selection') {
      return <RoleSelection onSelectRole={handleSelectRole} />;
    }

    if (currentPage === 'student-login') {
      return (
        <StudentLogin
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignup={() => setCurrentPage('student-signup')}
          onBack={handleBackToRole}
        />
      );
    }

    if (currentPage === 'student-signup') {
      return (
        <StudentSignup
          onSignupSuccess={handleSignupSuccess}
          onSwitchToLogin={() => setCurrentPage('student-login')}
          onBack={handleBackToRole}
        />
      );
    }

    if (currentPage === 'teacher-login') {
      return (
        <TeacherLogin
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignup={() => setCurrentPage('teacher-signup')}
          onBack={handleBackToRole}
        />
      );
    }

    if (currentPage === 'teacher-signup') {
      return (
        <TeacherSignup
          onSignupSuccess={handleSignupSuccess}
          onSwitchToLogin={() => setCurrentPage('teacher-login')}
          onBack={handleBackToRole}
        />
      );
    }
  }

  // Show main app after login
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="app-title">🎓 My Learning Management System</h1>
            <p className="app-subtitle">
              {user.role === 'teacher' ? `Welcome Teacher: ${user.name}` : `Welcome Student: ${user.name}`}
            </p>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="app-main">
        {selectedCourse ? (
          <VideoPlayer course={selectedCourse} onBack={handleBackToCourses} />
        ) : (
          <>
            <Dashboard user={user} />
            <CourseList
              courses={courses}
              onSelectCourse={handleSelectCourse}
            />
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2026 My LMS. Built with React & ❤️</p>
      </footer>
    </div>
  );
}

export default App;