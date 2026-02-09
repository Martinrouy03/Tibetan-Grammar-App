import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitAnswer, resetExercise } from '../../services/ExerciseActions';
import { updateExerciseProgress } from '../../services/ProgressActions';
import { goBack, changeView } from '../../services/NavigationActions';
import { VIEWS } from '../../Constant';
import './TranslationExercise.scss';

const TranslationExercise = () => {
  const dispatch = useDispatch();
  const {
    currentExercise,
    userAnswer,
    isCorrect,
    submitted,
    feedback
  } = useSelector(state => state.exerciseReducer);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [correctCount, setCorrectCount] = useState(0);

  if (!currentExercise || !currentExercise.questions) {
    return <div>No exercise data available</div>;
  }

  const currentQuestion = currentExercise.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentExercise.questions.length - 1;

  const handleAnswerChange = (e) => {
    if (!submitted) {
      setAnswerText(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (answerText.trim()) {
      dispatch(submitAnswer(answerText, currentQuestion));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentExercise.questions.length - 1) {
      if (isCorrect) setCorrectCount(prev => prev + 1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerText('');
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey && !submitted && answerText.trim()) {
      handleSubmit();
    }
  };

  return (
    <div className="translation-exercise">
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
        {currentQuestion.title && (
          <div className="question-title-box">
            <h4>{currentQuestion.title}</h4>
          </div>
        )}

        <div className="question-header">
          {currentQuestion.questionPrompt && (
            <p className="question-prompt">{currentQuestion.questionPrompt}</p>
          )}

          {currentQuestion.tibetan && (
            <div className="tibetan-content">
              <p className="question-tibetan tibetan-text">{currentQuestion.tibetan}</p>
            </div>
          )}

          {currentQuestion.transliteration && (
            <p className="question-transliteration">{currentQuestion.transliteration}</p>
          )}

          {currentQuestion.english && !currentQuestion.questionPrompt && (
            <p className="question-english">{currentQuestion.english}</p>
          )}

          {currentQuestion.vocabularyHint && (
            <div className="vocabulary-hint">
              <strong>Vocabulary:</strong> {currentQuestion.vocabularyHint}
            </div>
          )}
        </div>

        <div className="answer-section">
          <label htmlFor="answer-input" className="answer-label">
            Your Answer:
          </label>
          <textarea
            id="answer-input"
            className={`answer-input ${submitted ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
            value={answerText}
            onChange={handleAnswerChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer here..."
            disabled={submitted}
            rows={3}
          />
          <p className="input-hint">Tip: Press Ctrl + Enter to submit</p>
        </div>

        {submitted && !isCorrect && (
          <div className="correct-answer-box">
            <strong>Correct Answer:</strong>
            <p className="correct-answer-text">{currentQuestion.correctAnswer}</p>
            {currentQuestion.analysis && (
              <div className="analysis-box">
                <strong>Analysis:</strong>
                <p>{currentQuestion.analysis}</p>
              </div>
            )}
            {currentQuestion.breakdown && (
              <div className="breakdown-box">
                <strong>Breakdown:</strong>
                <ul>
                  {Object.entries(currentQuestion.breakdown).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
              disabled={!answerText.trim()}
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

export default TranslationExercise;
