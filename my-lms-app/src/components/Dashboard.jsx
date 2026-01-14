import React, { useEffect, useState } from 'react';
import { getAllProgress } from '../utils/localStorage';
import { courses } from '../data/courses';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    averageProgress: 0
  });

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    const allProgress = getAllProgress();
    
    // Count completed and in-progress from saved progress
    const progressArray = Object.values(allProgress);
    const completed = progressArray.filter(p => p.completed).length;
    const inProgress = progressArray.filter(p => p.percentage > 0 && !p.completed).length;
    
    // Calculate average progress across ALL courses (including not started)
    let totalProgress = 0;
    courses.forEach(course => {
      const progress = allProgress[course.id];
      totalProgress += progress ? (progress.percentage || 0) : 0;
    });
    const average = courses.length > 0 ? totalProgress / courses.length : 0;

    setStats({
      totalCourses: courses.length, // Total available courses
      completedCourses: completed,
      inProgressCourses: inProgress,
      averageProgress: average
    });
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Your Learning Dashboard</h2>
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalCourses}</div>
            <div className="stat-label">Total Courses</div>
          </div>
        </div>

        <div className="stat-card completed">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{stats.completedCourses}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        <div className="stat-card in-progress">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">{stats.inProgressCourses}</div>
            <div className="stat-label">In Progress</div>
          </div>
        </div>

        <div className="stat-card average">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{Math.round(stats.averageProgress)}%</div>
            <div className="stat-label">Avg. Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
