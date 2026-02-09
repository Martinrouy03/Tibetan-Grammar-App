import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadLesson } from '../services/LessonActions';
import { changeView } from '../services/NavigationActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faLock, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { VIEWS } from '../Constant';
import './LessonList.scss';

const LessonList = () => {
  const dispatch = useDispatch();
  const allLessons = useSelector(state => state.lessonReducer.allLessons);
  const progressData = useSelector(state => state.progressReducer.userProgress);

  const handleLessonClick = (lesson) => {
    if (lesson.locked) {
      return;
    }
    dispatch(loadLesson(lesson.id));
    dispatch(changeView(VIEWS.LESSON, { lessonId: lesson.id }));
  };

  const isLessonCompleted = (lessonId) => {
    return progressData.lessons[lessonId]?.completed || false;
  };

  return (
    <div className="lesson-list">
      {allLessons.map((lesson) => {
        const completed = isLessonCompleted(lesson.id);
        const locked = lesson.locked;

        return (
          <div
            key={lesson.id}
            className={`lesson-card ${locked ? 'locked' : ''} ${completed ? 'completed' : ''}`}
            onClick={() => handleLessonClick(lesson)}
          >
            <div className="lesson-icon">
              {locked ? (
                <FontAwesomeIcon icon={faLock} />
              ) : completed ? (
                <FontAwesomeIcon icon={faCheckCircle} />
              ) : (
                <FontAwesomeIcon icon={faBookOpen} />
              )}
            </div>

            <div className="lesson-content">
              <div className="lesson-header">
                <h3 className="lesson-title">{lesson.title}</h3>
                <span className="lesson-title-tibetan tibetan-text">{lesson.titleTibetan}</span>
              </div>

              <p className="lesson-description">{lesson.description}</p>

              <div className="lesson-meta">
                <span className="lesson-badge">{lesson.level}</span>
                <span className="lesson-info">
                  {lesson.exerciseCount} exercises • {lesson.estimatedTime} min
                </span>
              </div>
            </div>

            <div className="lesson-status">
              {locked && <span className="status-label locked">Locked</span>}
              {completed && <span className="status-label completed">Completed</span>}
              {!locked && !completed && <span className="status-label available">Start</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LessonList;
