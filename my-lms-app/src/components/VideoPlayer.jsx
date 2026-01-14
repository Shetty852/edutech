import React, { useRef, useEffect, useState } from 'react';
import { saveVideoProgress, getVideoProgress, markCourseCompleted } from '../utils/localStorage';
import './VideoPlayer.css';

const VideoPlayer = ({ course, onBack }) => {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Load saved progress when component mounts
  useEffect(() => {
    const savedProgress = getVideoProgress(course.id);
    
    if (savedProgress && videoRef.current) {
      // Resume from last watched position
      videoRef.current.currentTime = savedProgress.currentTime;
      setProgress(savedProgress.percentage);
      setIsCompleted(savedProgress.completed || false);
    }
  }, [course.id]);

  // Update duration when metadata is loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Update current time and progress
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      const progressPercentage = (current / total) * 100;
      
      setCurrentTime(current);
      setProgress(progressPercentage);
      
      // Save progress every 5 seconds
      if (Math.floor(current) % 5 === 0) {
        saveVideoProgress(course.id, current, total);
      }

      // Mark as completed when 95% watched
      if (progressPercentage >= 95 && !isCompleted) {
        markCourseCompleted(course.id);
        setIsCompleted(true);
      }
    }
  };

  // Save progress when video ends
  const handleEnded = () => {
    if (videoRef.current) {
      saveVideoProgress(course.id, videoRef.current.duration, videoRef.current.duration);
      markCourseCompleted(course.id);
      setIsCompleted(true);
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Format time (seconds to MM:SS)
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Seek to specific position
  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
    const newTime = clickPosition * duration;
    
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="video-player-container">
      <div className="video-player-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Courses
        </button>
        <h2>{course.title}</h2>
      </div>

      <div className="video-wrapper">
        <video
          ref={videoRef}
          className="video-element"
          src={course.videoUrl}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        <div className="video-controls">
          <button className="play-pause-btn" onClick={togglePlayPause}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          
          <div className="progress-bar-container" onClick={handleProgressClick}>
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>

      <div className="course-info">
        <div className="course-details">
          <h3>Course Details</h3>
          <p><strong>Instructor:</strong> {course.instructor}</p>
          <p><strong>Description:</strong> {course.description}</p>
        </div>

        <div className="progress-stats">
          <h3>Your Progress</h3>
          <div className="progress-percentage">
            <div className="circular-progress">
              <span className="progress-text">{Math.round(progress)}%</span>
            </div>
          </div>
          
          {isCompleted && (
            <div className="completion-badge">
              ✓ Course Completed!
            </div>
          )}
          
          {!isCompleted && progress > 0 && (
            <div className="in-progress-badge">
              📚 In Progress
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
