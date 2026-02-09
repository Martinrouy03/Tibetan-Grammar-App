import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadExercise } from '../services/ExerciseActions';
import { navigateToExercise } from '../services/NavigationActions';
import './ExerciseCard.scss';

const ExerciseCard = ({ exerciseId, isCompleted, score }) => {
  const [exercise, setExercise] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Load exercise metadata
    import(`../data/exercises/${exerciseId}.json`)
      .then(data => {
        const exerciseData = data.default || data;
        setExercise(exerciseData);
      })
      .catch(error => {
        console.error(`Error loading exercise metadata ${exerciseId}:`, error);
      });
  }, [exerciseId]);

  const handleClick = () => {
    dispatch(loadExercise(exerciseId));
    dispatch(navigateToExercise(exerciseId));
  };

  if (!exercise) {
    return (
      <div className="exercise-card loading">
        <div className="card-content">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const getTypeBadge = (type) => {
    const badges = {
      translation: { label: 'Translation', icon: '📝' },
      multipleChoice: { label: 'Multiple Choice', icon: '✓' },
      fillInBlank: { label: 'Fill in Blank', icon: '✏️' }
    };
    return badges[type] || { label: type, icon: '📋' };
  };

  const typeBadge = getTypeBadge(exercise.type);

  return (
    <div
      className={`exercise-card ${isCompleted ? 'completed' : ''}`}
      onClick={handleClick}
    >
      <div className="card-header">
        <div className="type-badge">
          <span className="badge-icon">{typeBadge.icon}</span>
          <span className="badge-label">{typeBadge.label}</span>
        </div>
        {isCompleted && (
          <div className="completion-indicator">
            <span className="checkmark">✓</span>
          </div>
        )}
      </div>

      <div className="card-content">
        <h4 className="exercise-title">{exercise.title}</h4>
        <p className="exercise-instruction">{exercise.instruction}</p>

        <div className="card-footer">
          <span className="difficulty-badge">{exercise.difficulty || 'beginner'}</span>
          {score !== undefined && score !== null && (
            <span className="score-badge">Score: {score}%</span>
          )}
        </div>
      </div>

      <div className="card-hover-indicator">
        <span>Click to start →</span>
      </div>
    </div>
  );
};

export default ExerciseCard;
