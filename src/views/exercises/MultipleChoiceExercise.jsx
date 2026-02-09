import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitAnswer, resetExercise } from '../../services/ExerciseActions';
import { updateExerciseProgress } from '../../services/ProgressActions';
import { goBack, changeView } from '../../services/NavigationActions';
import { VIEWS } from '../../Constant';
import './MultipleChoiceExercise.scss';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const MultipleChoiceExercise = () => {
  const dispatch = useDispatch();
  const {
    currentExercise,
    userAnswer,
    isCorrect,
    submitted,
    feedback
  } = useSelector(state => state.exerciseReducer);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const questions = currentExercise?.questions;
  const currentQuestion = questions?.[currentQuestionIndex];

  // Shuffle options each time the question changes (must be called before any early return)
  const shuffledOptions = useMemo(
    () => currentQuestion?.options ? shuffleArray(currentQuestion.options) : [],
    [currentQuestionIndex, shuffleSeed, currentQuestion]
  );

  if (!currentExercise || !questions) {
    return <div>No exercise data available</div>;
  }

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleOptionSelect = (optionId) => {
    if (!submitted) {
      setSelectedOption(optionId);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      dispatch(submitAnswer(selectedOption, currentQuestion));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentExercise.questions.length - 1) {
      if (isCorrect) setCorrectCount(prev => prev + 1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShuffleSeed(prev => prev + 1);
      dispatch(resetExercise());
    }
  };

  const handleReset = () => {
    const finalCorrect = correctCount + (isCorrect ? 1 : 0);
    const score = Math.round((finalCorrect / currentExercise.questions.length) * 100);
    dispatch(updateExerciseProgress(currentExercise.id, score));
    dispatch(resetExercise());
    dispatch(changeView(VIEWS.LESSON, { activeTab: 'exercises' }));
  };

  const handleBackToLesson = () => {
    dispatch(goBack());
  };

  return (
    <div className="multiple-choice-exercise">
      <button className="back-button" onClick={handleBackToLesson}>
        ← Back to Lesson
      </button>

      <div className="exercise-header">
        <h2 className="exercise-title">{currentExercise.title}</h2>
        <p className="exercise-instruction">{currentExercise.instruction}</p>
        <div className="question-progress">
          Question {currentQuestionIndex + 1} of {currentExercise.questions.length}
        </div>
      </div>

      <div className="question-container">
        <div className="question-header">
          <h3 className="question-text">{currentQuestion.question}</h3>
          {currentQuestion.questionTibetan && (
            <p className="question-tibetan tibetan-text">{currentQuestion.questionTibetan}</p>
          )}
          {currentQuestion.transliteration && (
            <p className="question-transliteration">{currentQuestion.transliteration}</p>
          )}
          {currentQuestion.english && (
            <p className="question-english">{currentQuestion.english}</p>
          )}
        </div>

        <div className="options-container">
          {shuffledOptions.map((option) => (
            <div
              key={option.id}
              className={`option-card ${
                selectedOption === option.id ? 'selected' : ''
              } ${
                submitted && option.id === selectedOption
                  ? isCorrect
                    ? 'correct'
                    : 'incorrect'
                  : ''
              } ${
                submitted && option.isCorrect ? 'show-correct' : ''
              }`}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="option-content">
                <div className="option-text tibetan-text">{option.text}</div>
                {option.transliteration && (
                  <div className="option-transliteration">{option.transliteration}</div>
                )}
              </div>
              {submitted && option.isCorrect && (
                <div className="option-indicator correct-indicator">✓</div>
              )}
              {submitted && option.id === selectedOption && !isCorrect && (
                <div className="option-indicator incorrect-indicator">✗</div>
              )}
            </div>
          ))}
        </div>

        {currentQuestion.hint && !submitted && (
          <div className="hint-box">
            <strong>Hint:</strong> {currentQuestion.hint}
          </div>
        )}

        {submitted && (
          <div className={`feedback-box ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
            <div className="feedback-icon">{isCorrect ? '✓' : '✗'}</div>
            <div className="feedback-text">{feedback}</div>
          </div>
        )}

        <div className="action-buttons">
          {!submitted ? (
            <button
              className="btn btn-primary submit-btn"
              onClick={handleSubmit}
              disabled={!selectedOption}
            >
              Submit Answer
            </button>
          ) : (
            <>
              {!isLastQuestion ? (
                <button
                  className="btn btn-primary next-btn"
                  onClick={handleNextQuestion}
                >
                  Next Question →
                </button>
              ) : (
                <button
                  className="btn btn-success finish-btn"
                  onClick={handleReset}
                >
                  Finish Exercise
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceExercise;
