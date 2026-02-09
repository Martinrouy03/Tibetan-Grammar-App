// Exercise Actions

// Action Types
export const LOAD_EXERCISE_BEGIN = "LOAD_EXERCISE_BEGIN";
export const LOAD_EXERCISE_SUCCESS = "LOAD_EXERCISE_SUCCESS";
export const LOAD_EXERCISE_FAILURE = "LOAD_EXERCISE_FAILURE";

export const SUBMIT_ANSWER_BEGIN = "SUBMIT_ANSWER_BEGIN";
export const SUBMIT_ANSWER_SUCCESS = "SUBMIT_ANSWER_SUCCESS";

export const RESET_EXERCISE = "RESET_EXERCISE";
export const NEXT_EXERCISE = "NEXT_EXERCISE";

// Action Creators
export const loadExerciseBegin = () => ({
  type: LOAD_EXERCISE_BEGIN
});

export const loadExerciseSuccess = (exercise) => ({
  type: LOAD_EXERCISE_SUCCESS,
  payload: { exercise }
});

export const loadExerciseFailure = (error) => ({
  type: LOAD_EXERCISE_FAILURE,
  payload: { error }
});

export const submitAnswerBegin = () => ({
  type: SUBMIT_ANSWER_BEGIN
});

export const submitAnswerSuccess = (answer, isCorrect, feedback) => ({
  type: SUBMIT_ANSWER_SUCCESS,
  payload: { answer, isCorrect, feedback }
});

export const resetExercise = () => ({
  type: RESET_EXERCISE
});

export const nextExercise = () => ({
  type: NEXT_EXERCISE
});

// Thunk Actions
export function loadExercise(exerciseId) {
  return (dispatch) => {
    dispatch(loadExerciseBegin());

    import(`../data/exercises/${exerciseId}.json`)
      .then(data => {
        const exerciseData = data.default || data;
        dispatch(loadExerciseSuccess(exerciseData));
      })
      .catch(error => {
        console.error(`Error loading exercise ${exerciseId}:`, error);
        dispatch(loadExerciseFailure(error.message));
      });
  };
}

export function submitAnswer(answer, questionData = null) {
  return (dispatch, getState) => {
    dispatch(submitAnswerBegin());

    const { currentExercise } = getState().exerciseReducer;

    if (!currentExercise) {
      return;
    }

    // Check answer based on exercise type
    let isCorrect = false;
    let feedback = "";

    switch (currentExercise.type) {
      case "multipleChoice":
        // For questions with options array
        if (questionData && questionData.options) {
          const correctOption = questionData.options.find(opt => opt.isCorrect);
          isCorrect = answer === correctOption.id;
        } else if (currentExercise.options) {
          // Fallback to exercise-level options
          const correctOption = currentExercise.options.find(opt => opt.isCorrect);
          isCorrect = answer === correctOption.id;
        }
        feedback = isCorrect
          ? currentExercise.correctFeedback
          : currentExercise.incorrectFeedback;
        break;

      case "fillInBlank":
        const correctAnswers = currentExercise.blanks[0].correctAnswers;
        isCorrect = correctAnswers.some(
          correct => correct.toLowerCase() === answer.toLowerCase()
        );
        feedback = isCorrect
          ? currentExercise.correctFeedback
          : currentExercise.incorrectFeedback;
        break;

      case "translation":
        // Validation par réponse exacte (case-insensitive, trim whitespace)
        const correctAnswer = questionData?.correctAnswer || currentExercise.correctAnswer;
        const alternativeAnswers = questionData?.alternativeAnswers || [];

        if (correctAnswer) {
          const normalizedAnswer = answer.trim().toLowerCase();
          isCorrect = normalizedAnswer === correctAnswer.toLowerCase();

          // Check alternative answers if main answer is not correct
          if (!isCorrect && alternativeAnswers.length > 0) {
            isCorrect = alternativeAnswers.some(
              alt => normalizedAnswer === alt.toLowerCase()
            );
          }
        }
        feedback = isCorrect
          ? currentExercise.correctFeedback
          : currentExercise.incorrectFeedback;
        break;

      default:
        isCorrect = false;
        feedback = "Type d'exercice non reconnu";
    }

    dispatch(submitAnswerSuccess(answer, isCorrect, feedback));
  };
}
