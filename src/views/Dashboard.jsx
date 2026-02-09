import React from 'react';
import { useSelector } from 'react-redux';
import LessonList from './LessonList';
import ProgressTracker from './ProgressTracker';
import './Dashboard.scss';

const Dashboard = () => {
  const allLessons = useSelector(state => state.lessonReducer.allLessons);

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome to Tibetan Grammar Master</h1>
        <p className="welcome-subtitle">Start your journey to learn Tibetan language</p>
      </div>

      <ProgressTracker />

      <div className="lessons-section">
        <h2 className="section-title">Your Lessons</h2>
        {allLessons.length === 0 ? (
          <div className="no-lessons">No lessons available yet.</div>
        ) : (
          <LessonList />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
