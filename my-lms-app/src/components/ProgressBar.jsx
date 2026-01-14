import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ percentage, showLabel = true, height = '20px' }) => {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="progress-bar-wrapper">
      {showLabel && (
        <div className="progress-label">
          <span>{Math.round(clampedPercentage)}% Complete</span>
        </div>
      )}
      <div className="progress-bar" style={{ height }}>
        <div 
          className="progress-bar-inner" 
          style={{ width: `${clampedPercentage}%` }}
        >
          {clampedPercentage > 10 && (
            <span className="progress-percentage-text">
              {Math.round(clampedPercentage)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
