// Exercise Reducer
import {
  LOAD_EXERCISE_BEGIN,
  LOAD_EXERCISE_SUCCESS,
  LOAD_EXERCISE_FAILURE,
  SUBMIT_ANSWER_BEGIN,
  SUBMIT_ANSWER_SUCCESS,
  RESET_EXERCISE
} from './ExerciseActions';

const initialState = {
  currentExercise: null,
  userAnswer: null,
  isCorrect: null,
  submitted: false,
  attempts: 0,
  feedback: "",
  loading: false,
  error: null
};

const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EXERCISE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_EXERCISE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentExercise: action.payload.exercise,
        userAnswer: null,
        isCorrect: null,
        submitted: false,
        attempts: 0,
        feedback: "",
        error: null
      };

    case LOAD_EXERCISE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case SUBMIT_ANSWER_BEGIN:
      return {
        ...state,
        submitted: false
      };

    case SUBMIT_ANSWER_SUCCESS:
      return {
        ...state,
        userAnswer: action.payload.answer,
        isCorrect: action.payload.isCorrect,
        feedback: action.payload.feedback,
        submitted: true,
        attempts: state.attempts + 1
      };

    case RESET_EXERCISE:
      return {
        ...state,
        userAnswer: null,
        isCorrect: null,
        submitted: false,
        feedback: ""
      };

    default:
      return state;
  }
};

export default exerciseReducer;
