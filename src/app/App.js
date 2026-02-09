import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MainContainer from '../views/MainContainer';
import navigationReducer from '../services/NavigationReducer';
import lessonReducer from '../services/LessonReducer';
import exerciseReducer from '../services/ExerciseReducer';
import progressReducer from '../services/ProgressReducer';
import audioReducer from '../services/AudioReducer';
import './App.scss';

// Configure Redux Store
const store = configureStore({
  reducer: {
    navigationReducer,
    lessonReducer,
    exerciseReducer,
    progressReducer,
    audioReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['PLAY_AUDIO'],
      },
    }),
});

function App() {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
}

export default App;
