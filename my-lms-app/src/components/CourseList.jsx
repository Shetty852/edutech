import React from 'react';
import CourseCard from './CourseCard';
import './CourseList.css';

const CourseList = ({ courses, onSelectCourse }) => {
  return (
    <div className="course-list">
      <div className="course-list-header">
        <h2>My Courses</h2>
        <p className="course-count">{courses.length} {courses.length === 1 ? 'Course' : 'Courses'} Available</p>
      </div>
      
      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onSelectCourse={onSelectCourse}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
