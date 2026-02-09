import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { goBack, changeView } from '../services/NavigationActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHome, faCog } from '@fortawesome/free-solid-svg-icons';
import { VIEWS } from '../Constant';
import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const currentView = useSelector(state => state.navigationReducer.currentView);
  const viewHistory = useSelector(state => state.navigationReducer.viewHistory);
  const progressData = useSelector(state => state.progressReducer.userProgress);

  const getViewTitle = () => {
    switch (currentView) {
      case VIEWS.DASHBOARD:
        return 'Tibetan Grammar Master';
      case VIEWS.LESSON:
        return 'Lesson';
      case VIEWS.EXERCISE:
        return 'Exercise';
      case VIEWS.PROGRESS:
        return 'Your Progress';
      case VIEWS.SETTINGS:
        return 'Settings';
      default:
        return 'Tibetan Grammar Master';
    }
  };

  const handleBack = () => {
    if (viewHistory.length > 0) {
      dispatch(goBack());
    }
  };

  const handleHome = () => {
    dispatch(changeView(VIEWS.DASHBOARD));
  };

  const calculateOverallProgress = () => {
    const lessons = Object.values(progressData.lessons || {});
    if (lessons.length === 0) return 0;
    const completed = lessons.filter(l => l.completed).length;
    return Math.round((completed / lessons.length) * 100);
  };

  return (
    <header className="header">
      <div className="header-left">
        {viewHistory.length > 0 && currentView !== VIEWS.DASHBOARD && (
          <button className="header-btn" onClick={handleBack} title="Go Back">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}

        {currentView !== VIEWS.DASHBOARD && (
          <button className="header-btn" onClick={handleHome} title="Home">
            <FontAwesomeIcon icon={faHome} />
          </button>
        )}
      </div>

      <div className="header-center">
        <h1 className="header-title">{getViewTitle()}</h1>
      </div>

      <div className="header-right">
        <div className="progress-indicator">
          <span className="progress-text">{calculateOverallProgress()}%</span>
        </div>
        <button
          className="header-btn"
          onClick={() => dispatch(changeView(VIEWS.SETTINGS))}
          title="Settings"
        >
          <FontAwesomeIcon icon={faCog} />
        </button>
      </div>
    </header>
  );
};

export default Header;
