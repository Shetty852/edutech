import { useState } from 'react';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';
import VideoPlayer from './components/VideoPlayer';
import { courses } from './data/courses';
import './App.css';

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">🎓 My Learning Management System</h1>
          <p className="app-subtitle">Learn at your own pace</p>
        </div>
      </header>

      <main className="app-main">
        {selectedCourse ? (
          <VideoPlayer 
            course={selectedCourse} 
            onBack={handleBackToCourses}
          />
        ) : (
          <>
            <Dashboard />
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
