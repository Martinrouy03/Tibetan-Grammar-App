import React from 'react';
import { useSelector } from 'react-redux';
import MultipleChoiceExercise from './exercises/MultipleChoiceExercise';
import TranslationExercise from './exercises/TranslationExercise';
import './ExerciseContainer.scss';

const ExerciseContainer = () => {
  const { currentExercise, loading, error } = useSelector(state => state.exerciseReducer);

  if (loading) {
    return (
      <div className="exercise-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading exercise...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="exercise-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Exercise</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!currentExercise) {
    return (
      <div className="exercise-container">
        <div className="no-exercise-state">
          <div className="info-icon">📋</div>
          <h3>No Exercise Selected</h3>
          <p>Please select an exercise from the lesson to begin practicing.</p>
        </div>
      </div>
    );
  }

  const renderExercise = () => {
    switch (currentExercise.type) {
      case 'multipleChoice':
        return <MultipleChoiceExercise />;

      case 'translation':
        return <TranslationExercise />;

      case 'fillInBlank':
        // TODO: Implement FillInBlankExercise when needed
        return (
          <div className="not-implemented">
            <p>Fill-in-blank exercises are not yet implemented.</p>
          </div>
        );

      default:
        return (
          <div className="unknown-type">
            <p>Unknown exercise type: {currentExercise.type}</p>
          </div>
        );
    }
  };

  return (
    <div className="exercise-container">
      {renderExercise()}
    </div>
  );
};

export default ExerciseContainer;
