// Progress Actions
import { PROGRESS_STORAGE_KEY, PROGRESS_VERSION } from '../Constant';

// Action Types
export const INITIALIZE_PROGRESS = "INITIALIZE_PROGRESS";
export const UPDATE_LESSON_PROGRESS = "UPDATE_LESSON_PROGRESS";
export const UPDATE_EXERCISE_PROGRESS = "UPDATE_EXERCISE_PROGRESS";
export const SAVE_PROGRESS = "SAVE_PROGRESS";
export const RESET_PROGRESS = "RESET_PROGRESS";

// Action Creators
export const initializeProgressAction = (progressData) => ({
  type: INITIALIZE_PROGRESS,
  payload: { progressData }
});

export const updateLessonProgressAction = (lessonId, data) => ({
  type: UPDATE_LESSON_PROGRESS,
  payload: { lessonId, data }
});

export const updateExerciseProgressAction = (exerciseId, score, timeSpent) => ({
  type: UPDATE_EXERCISE_PROGRESS,
  payload: { exerciseId, score, timeSpent }
});

export const saveProgress = () => ({
  type: SAVE_PROGRESS
});

export const resetProgress = () => ({
  type: RESET_PROGRESS
});

// Thunk Actions
export function initializeProgress() {
  return (dispatch) => {
    try {
      const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        // Reset progress if version doesn't match (exercise IDs may have changed)
        if (progressData.version !== PROGRESS_VERSION) {
          const freshProgress = createDefaultProgress();
          localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(freshProgress));
          dispatch(initializeProgressAction(freshProgress));
          return;
        }
        dispatch(initializeProgressAction(progressData));
      } else {
        const defaultProgress = createDefaultProgress();
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(defaultProgress));
        dispatch(initializeProgressAction(defaultProgress));
      }
    } catch (error) {
      console.error("Error initializing progress:", error);
    }
  };
}

function createDefaultProgress() {
  return {
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
  };
}

export function updateLessonProgress(lessonId, data) {
  return (dispatch, getState) => {
    dispatch(updateLessonProgressAction(lessonId, data));

    // Save to localStorage
    const state = getState().progressReducer;
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state.userProgress));
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };
}

export function updateExerciseProgress(exerciseId, score, timeSpent = 0) {
  return (dispatch, getState) => {
    dispatch(updateExerciseProgressAction(exerciseId, score, timeSpent));

    // Save to localStorage
    const state = getState().progressReducer;
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state.userProgress));
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };
}
