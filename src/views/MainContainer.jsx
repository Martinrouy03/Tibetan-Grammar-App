import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeProgress } from '../services/ProgressActions';
import { loadLessons } from '../services/LessonActions';
import Header from './Header';
import Dashboard from './Dashboard';
import LessonView from './LessonView';
import ExerciseContainer from './ExerciseContainer';
import { VIEWS } from '../Constant';
import './MainContainer.scss';

const MainContainer = () => {
  const dispatch = useDispatch();
  const currentView = useSelector(state => state.navigationReducer.currentView);
  const loading = useSelector(state => state.lessonReducer.loading);

  useEffect(() => {
    // Initialize progress from localStorage
    dispatch(initializeProgress());

    // Load all lessons
    dispatch(loadLessons());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="main-container">
        <Header />
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <Header />

      <div className="content-area">
        {currentView === VIEWS.DASHBOARD && <Dashboard />}
        {currentView === VIEWS.LESSON && <LessonView />}
        {currentView === VIEWS.EXERCISE && <ExerciseContainer />}
        {currentView === VIEWS.PROGRESS && <div className="coming-soon">Progress View - Coming Soon</div>}
        {currentView === VIEWS.SETTINGS && <div className="coming-soon">Settings View - Coming Soon</div>}
      </div>
    </div>
  );
};

export default MainContainer;
