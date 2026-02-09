// Navigation Actions
import { VIEWS } from '../Constant';

// Action Types
export const CHANGE_VIEW = "CHANGE_VIEW";
export const GO_BACK = "GO_BACK";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const CLEAR_HISTORY = "CLEAR_HISTORY";

// Action Creators
export const changeView = (view, data = null) => ({
  type: CHANGE_VIEW,
  payload: { view, data }
});

export const goBack = () => ({
  type: GO_BACK
});

export const openModal = (modalType) => ({
  type: OPEN_MODAL,
  payload: { modalType }
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export const clearHistory = () => ({
  type: CLEAR_HISTORY
});

// Navigation helper functions
export function navigateToDashboard() {
  return (dispatch) => {
    dispatch(changeView(VIEWS.DASHBOARD));
  };
}

export function navigateToLesson(lessonId) {
  return (dispatch) => {
    dispatch(changeView(VIEWS.LESSON, { lessonId }));
  };
}

export function navigateToExercise(exerciseId) {
  return (dispatch) => {
    dispatch(changeView(VIEWS.EXERCISE, { exerciseId }));
  };
}

export function navigateToProgress() {
  return (dispatch) => {
    dispatch(changeView(VIEWS.PROGRESS));
  };
}

export function navigateToSettings() {
  return (dispatch) => {
    dispatch(changeView(VIEWS.SETTINGS));
  };
}
