// Navigation Reducer
import {
  CHANGE_VIEW,
  GO_BACK,
  OPEN_MODAL,
  CLOSE_MODAL,
  CLEAR_HISTORY
} from './NavigationActions';
import { VIEWS } from '../Constant';

const initialState = {
  currentView: VIEWS.DASHBOARD,
  viewHistory: [],
  viewData: null,
  modalOpen: null,
  previousView: null
};

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VIEW:
      return {
        ...state,
        previousView: state.currentView,
        currentView: action.payload.view,
        viewData: action.payload.data,
        viewHistory: [...state.viewHistory, state.currentView]
      };

    case GO_BACK:
      if (state.viewHistory.length === 0) {
        return state;
      }
      const newHistory = [...state.viewHistory];
      const previousView = newHistory.pop();
      return {
        ...state,
        currentView: previousView,
        viewHistory: newHistory,
        previousView: newHistory[newHistory.length - 1] || VIEWS.DASHBOARD,
        viewData: null
      };

    case OPEN_MODAL:
      return {
        ...state,
        modalOpen: action.payload.modalType
      };

    case CLOSE_MODAL:
      return {
        ...state,
        modalOpen: null
      };

    case CLEAR_HISTORY:
      return {
        ...state,
        viewHistory: [],
        previousView: null
      };

    default:
      return state;
  }
};

export default navigationReducer;
