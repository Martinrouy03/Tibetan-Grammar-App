import React from 'react';
import { useSelector } from 'react-redux';
import ExerciseCard from './ExerciseCard';
import './PracticeSection.scss';

const PracticeSection = ({ section }) => {
  const progressState = useSelector(state => state.progressReducer);

  if (!section || !section.exerciseIds) {
    return null;
  }

  const { exerciseIds, title, description } = section;

  // Calculate progress
  const completedExercises = exerciseIds.filter(id => {
    const exerciseProgress = progressState.userProgress?.exercises?.[id];
    return exerciseProgress && exerciseProgress.attempts > 0 && exerciseProgress.bestScore === 100;
  });

  const progressPercentage = exerciseIds.length > 0
    ? Math.round((completedExercises.length / exerciseIds.length) * 100)
    : 0;

  return (
    <div className="section practice-section">
      <div className="practice-header">
        <h3 className="section-title">{title}</h3>
        <p className="section-description">{description}</p>

        <div className="progress-indicator">
          <div className="progress-text">
            <span className="progress-label">Progress:</span>
            <span className="progress-count">
              {completedExercises.length} / {exerciseIds.length} completed
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            >
              {progressPercentage > 0 && (
                <span className="progress-percentage">{progressPercentage}%</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="exercises-grid">
        {exerciseIds.map((exerciseId) => {
          const exerciseProgress = progressState.userProgress?.exercises?.[exerciseId];
          const isCompleted = exerciseProgress &&
            exerciseProgress.attempts > 0 &&
            exerciseProgress.bestScore === 100;
          const score = exerciseProgress?.bestScore;

          return (
            <ExerciseCard
              key={exerciseId}
              exerciseId={exerciseId}
              isCompleted={isCompleted}
              score={score}
            />
          );
        })}
      </div>

      {completedExercises.length === exerciseIds.length && exerciseIds.length > 0 && (
        <div className="completion-message">
          <div className="completion-icon">🎉</div>
          <h4>Congratulations!</h4>
          <p>You have completed all exercises in this section.</p>
        </div>
      )}
    </div>
  );
};

export default PracticeSection;
