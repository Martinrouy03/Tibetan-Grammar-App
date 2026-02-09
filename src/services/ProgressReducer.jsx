// Progress Reducer
import {
  INITIALIZE_PROGRESS,
  UPDATE_LESSON_PROGRESS,
  UPDATE_EXERCISE_PROGRESS,
  RESET_PROGRESS
} from './ProgressActions';
import { PROGRESS_VERSION } from '../Constant';

const initialState = {
  userProgress: {
    version: PROGRESS_VERSION,
    userId: "guest",
    lastUpdated: new Date().toISOString(),
    lessons: {},
    exercises: {},
    statistics: {
      totalLessonsCompleted: 0,
      totalExercisesCompleted: 0,
      totalTimeSpent: 0,
      currentStreak: 0,
      lastActivityDate: new Date().toISOString().split('T')[0],
      vocabularyMastered: 0
    }
  },
  loading: false,
  error: null
};

const progressReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_PROGRESS:
      return {
        ...state,
        userProgress: action.payload.progressData
      };

    case UPDATE_LESSON_PROGRESS:
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          lessons: {
            ...state.userProgress.lessons,
            [action.payload.lessonId]: {
              ...state.userProgress.lessons[action.payload.lessonId],
              ...action.payload.data,
              lastUpdated: new Date().toISOString()
            }
          },
          lastUpdated: new Date().toISOString()
        }
      };

    case UPDATE_EXERCISE_PROGRESS:
      const { exerciseId, score, timeSpent } = action.payload;
      const existingExercise = state.userProgress.exercises[exerciseId] || {
        attempts: 0,
        bestScore: 0,
        history: []
      };

      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          exercises: {
            ...state.userProgress.exercises,
            [exerciseId]: {
              ...existingExercise,
              attempts: existingExercise.attempts + 1,
              bestScore: Math.max(existingExercise.bestScore, score),
              lastAttemptDate: new Date().toISOString(),
              history: [
                ...existingExercise.history,
                {
                  timestamp: new Date().toISOString(),
                  score,
                  timeSpent
                }
              ]
            }
          },
          statistics: {
            ...state.userProgress.statistics,
            totalExercisesCompleted: state.userProgress.statistics.totalExercisesCompleted + 1,
            totalTimeSpent: state.userProgress.statistics.totalTimeSpent + timeSpent
          },
          lastUpdated: new Date().toISOString()
        }
      };

    case RESET_PROGRESS:
      return initialState;

    default:
      return state;
  }
};

export default progressReducer;
