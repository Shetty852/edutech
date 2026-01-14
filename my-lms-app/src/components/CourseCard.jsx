import React, { useEffect, useState } from 'react';
import { getVideoProgress } from '../utils/localStorage';
import ProgressBar from './ProgressBar';
import './CourseCard.css';

const CourseCard = ({ course, onSelectCourse }) => {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastWatched, setLastWatched] = useState(null);

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = getVideoProgress(course.id);
    if (savedProgress) {
      setProgress(savedProgress.percentage || 0);
      setIsCompleted(savedProgress.completed || false);
      setLastWatched(savedProgress.lastUpdated);
    }
  }, [course.id]);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  const formatLastWatched = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="course-card" onClick={() => onSelectCourse(course)}>
      <div className="course-card-image">
        <img src={course.thumbnail} alt={course.title} />
        <div className="course-duration-badge">
          {formatDuration(course.duration)}
        </div>
        {isCompleted && (
          <div className="completed-overlay">
            <span className="completed-checkmark">✓</span>
          </div>
        )}
      </div>
      
      <div className="course-card-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-instructor">By {course.instructor}</p>
        <p className="course-description">{course.description}</p>
        
        <div className="course-progress-section">
          {progress > 0 ? (
            <>
              <ProgressBar percentage={progress} height="8px" showLabel={false} />
              <div className="progress-info">
                <span className="progress-text">{Math.round(progress)}% complete</span>
                {lastWatched && (
                  <span className="last-watched">
                    {formatLastWatched(lastWatched)}
                  </span>
                )}
              </div>
            </>
          ) : (
            <button className="start-course-btn">
              Start Course
            </button>
          )}
        </div>

        {isCompleted && (
          <div className="completion-status">
            <span className="completion-icon">🎓</span> Completed
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
