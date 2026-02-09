import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faTrophy } from '@fortawesome/free-solid-svg-icons';
import './ProgressTracker.scss';

const ProgressTracker = () => {
  const progressData = useSelector(state => state.progressReducer.userProgress);
  const allLessons = useSelector(state => state.lessonReducer.allLessons);

  const lessonsCompleted = progressData.statistics.totalLessonsCompleted || 0;
  const totalLessons = allLessons.length;
  const exercisesCompleted = progressData.statistics.totalExercisesCompleted || 0;
  const streak = progressData.statistics.currentStreak || 0;

  const progressPercentage = totalLessons > 0
    ? Math.round((lessonsCompleted / totalLessons) * 100)
    : 0;

  return (
    <div className="progress-tracker">
      <div className="progress-card">
        <div className="progress-stat">
          <FontAwesomeIcon icon={faCheckCircle} className="stat-icon" />
          <div className="stat-info">
            <div className="stat-value">{lessonsCompleted}/{totalLessons}</div>
            <div className="stat-label">Lessons Completed</div>
          </div>
        </div>

        <div className="progress-stat">
          <FontAwesomeIcon icon={faClock} className="stat-icon" />
          <div className="stat-info">
            <div className="stat-value">{exercisesCompleted}</div>
            <div className="stat-label">Exercises Done</div>
          </div>
        </div>

        <div className="progress-stat">
          <FontAwesomeIcon icon={faTrophy} className="stat-icon" />
          <div className="stat-info">
            <div className="stat-value">{streak} days</div>
            <div className="stat-label">Current Streak</div>
          </div>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-label">
          <span>Overall Progress</span>
          <span className="progress-percent">{progressPercentage}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
