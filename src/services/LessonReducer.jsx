// Lesson Reducer
import {
  LOAD_LESSONS_BEGIN,
  LOAD_LESSONS_SUCCESS,
  LOAD_LESSONS_FAILURE,
  LOAD_LESSON_BEGIN,
  LOAD_LESSON_SUCCESS,
  LOAD_LESSON_FAILURE,
  COMPLETE_LESSON,
  START_LESSON
} from './LessonActions';

const initialState = {
  currentLesson: null,
  allLessons: [],
  loading: false,
  error: null,
  startedAt: null
};

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LESSONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_LESSONS_SUCCESS:
      return {
        ...state,
        loading: false,
        allLessons: action.payload.lessons,
        error: null
      };

    case LOAD_LESSONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case LOAD_LESSON_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_LESSON_SUCCESS:
      return {
        ...state,
        loading: false,
        currentLesson: action.payload.lesson,
        error: null
      };

    case LOAD_LESSON_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case START_LESSON:
      return {
        ...state,
        startedAt: new Date().toISOString()
      };

    case COMPLETE_LESSON:
      return {
        ...state,
        allLessons: state.allLessons.map(lesson =>
          lesson.id === action.payload.lessonId
            ? { ...lesson, completed: true }
            : lesson
        )
      };

    default:
      return state;
  }
};

export default lessonReducer;
