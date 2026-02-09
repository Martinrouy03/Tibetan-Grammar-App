// Lesson Actions

// Action Types
export const LOAD_LESSONS_BEGIN = "LOAD_LESSONS_BEGIN";
export const LOAD_LESSONS_SUCCESS = "LOAD_LESSONS_SUCCESS";
export const LOAD_LESSONS_FAILURE = "LOAD_LESSONS_FAILURE";

export const LOAD_LESSON_BEGIN = "LOAD_LESSON_BEGIN";
export const LOAD_LESSON_SUCCESS = "LOAD_LESSON_SUCCESS";
export const LOAD_LESSON_FAILURE = "LOAD_LESSON_FAILURE";

export const COMPLETE_LESSON = "COMPLETE_LESSON";
export const START_LESSON = "START_LESSON";

// Action Creators
export const loadLessonsBegin = () => ({
  type: LOAD_LESSONS_BEGIN
});

export const loadLessonsSuccess = (lessons) => ({
  type: LOAD_LESSONS_SUCCESS,
  payload: { lessons }
});

export const loadLessonsFailure = (error) => ({
  type: LOAD_LESSONS_FAILURE,
  payload: { error }
});

export const loadLessonBegin = () => ({
  type: LOAD_LESSON_BEGIN
});

export const loadLessonSuccess = (lesson) => ({
  type: LOAD_LESSON_SUCCESS,
  payload: { lesson }
});

export const loadLessonFailure = (error) => ({
  type: LOAD_LESSON_FAILURE,
  payload: { error }
});

export const completeLesson = (lessonId) => ({
  type: COMPLETE_LESSON,
  payload: { lessonId }
});

export const startLesson = (lessonId) => ({
  type: START_LESSON,
  payload: { lessonId }
});

// Thunk Actions
export function loadLessons() {
  return (dispatch) => {
    dispatch(loadLessonsBegin());

    // Load lessons from JSON file
    import('../data/lessonsIndex.json')
      .then(data => {
        dispatch(loadLessonsSuccess(data.lessons || data.default?.lessons || []));
      })
      .catch(error => {
        console.error("Error loading lessons:", error);
        dispatch(loadLessonsFailure(error.message));
      });
  };
}

export function loadLesson(lessonId) {
  return (dispatch) => {
    dispatch(loadLessonBegin());

    // Load specific lesson from JSON file
    import(`../data/lessons/${lessonId}.json`)
      .then(data => {
        const lessonData = data.default || data;
        dispatch(loadLessonSuccess(lessonData));
        dispatch(startLesson(lessonId));
      })
      .catch(error => {
        console.error(`Error loading lesson ${lessonId}:`, error);
        dispatch(loadLessonFailure(error.message));
      });
  };
}

export function completeLessonAction(lessonId) {
  return (dispatch) => {
    dispatch(completeLesson(lessonId));
  };
}
