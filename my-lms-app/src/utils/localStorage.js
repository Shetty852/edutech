// Utility functions for localStorage operations

/**
 * Save video progress to localStorage
 * @param {string} courseId - The ID of the course
 * @param {number} currentTime - Current playback time in seconds
 * @param {number} duration - Total video duration in seconds
 */
export const saveVideoProgress = (courseId, currentTime, duration) => {
  const progress = {
    currentTime,
    duration,
    percentage: (currentTime / duration) * 100,
    lastUpdated: new Date().toISOString()
  };
  
  localStorage.setItem(`course_${courseId}`, JSON.stringify(progress));
};

/**
 * Get video progress from localStorage
 * @param {string} courseId - The ID of the course
 * @returns {Object|null} Progress object or null if not found
 */
export const getVideoProgress = (courseId) => {
  const savedProgress = localStorage.getItem(`course_${courseId}`);
  return savedProgress ? JSON.parse(savedProgress) : null;
};

/**
 * Mark course as completed
 * @param {string} courseId - The ID of the course
 */
export const markCourseCompleted = (courseId) => {
  const progress = getVideoProgress(courseId) || {};
  progress.completed = true;
  progress.completedAt = new Date().toISOString();
  localStorage.setItem(`course_${courseId}`, JSON.stringify(progress));
};

/**
 * Get all course progress
 * @returns {Object} Object with all course progress
 */
export const getAllProgress = () => {
  const progress = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('course_')) {
      const courseId = key.replace('course_', '');
      progress[courseId] = JSON.parse(localStorage.getItem(key));
    }
  }
  return progress;
};

/**
 * Clear progress for a specific course
 * @param {string} courseId - The ID of the course
 */
export const clearCourseProgress = (courseId) => {
  localStorage.removeItem(`course_${courseId}`);
};
