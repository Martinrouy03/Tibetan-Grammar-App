import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { goBack } from '../services/NavigationActions';
import LessonContent from './LessonContent';
import PracticeSection from './PracticeSection';
import './LessonView.scss';

const LessonView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [learningSubSection, setLearningSubSection] = useState(null);
  const currentLesson = useSelector(state => state.lessonReducer.currentLesson);
  const loading = useSelector(state => state.lessonReducer.loading);
  const error = useSelector(state => state.lessonReducer.error);
  const viewData = useSelector(state => state.navigationReducer.viewData);
  const dispatch = useDispatch();

  // When returning from an exercise, viewData may contain activeTab: 'exercises'
  useEffect(() => {
    if (viewData?.activeTab) {
      setActiveTab(viewData.activeTab);
    }
  }, [viewData]);

  if (loading) {
    return <div className="loading">Loading lesson...</div>;
  }

  if (error) {
    return <div className="error">Error loading lesson: {error}</div>;
  }

  if (!currentLesson) {
    return <div className="error">No lesson selected</div>;
  }

  const practiceSection = currentLesson.sections?.find(s => s.type === 'practice');
  const grammarSections = currentLesson.sections?.filter(s => s.type === 'grammar') || [];
  const hasMultipleGrammarSections = grammarSections.length > 1;

  if (activeTab === 'learning') {
    // If lesson has multiple grammar sections and none selected yet, show sub-navigation
    if (hasMultipleGrammarSections && learningSubSection === null) {
      const introSection = currentLesson.sections.find(s => s.type === 'introduction');
      return (
        <div className="lesson-view">
          <button className="back-to-overview" onClick={() => setActiveTab('overview')}>
            ← Back to Lesson
          </button>
          <div className="lesson-header">
            <h1 className="lesson-title">{currentLesson.title}</h1>
            <h2 className="lesson-title-tibetan tibetan-text">{currentLesson.titleTibetan}</h2>
          </div>
          {introSection && (
            <div className="learning-intro">
              <p>{introSection.content}</p>
              {introSection.contentTibetan && (
                <p className="tibetan-text">{introSection.contentTibetan}</p>
              )}
            </div>
          )}
          <div className="learning-sub-nav">
            <h3 className="sub-nav-heading">Choose a topic to study</h3>
            <button
              className="sub-nav-btn vocabulary-btn"
              onClick={() => setLearningSubSection('vocabulary')}
            >
              <span className="sub-nav-btn-number">✦</span>
              <span className="sub-nav-btn-label">Vocabulary</span>
            </button>
            {grammarSections.map((section, index) => (
              <button
                key={index}
                className="sub-nav-btn"
                onClick={() => setLearningSubSection(index)}
              >
                <span className="sub-nav-btn-number">{index + 1}</span>
                <span className="sub-nav-btn-label">{section.title}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // Show filtered content based on selected sub-section
    const filteredLesson = hasMultipleGrammarSections
      ? {
          ...currentLesson,
          sections: currentLesson.sections
            .filter(s => {
              if (s.type === 'introduction' || s.type === 'practice') return false;
              if (learningSubSection === 'vocabulary') {
                return s.type === 'vocabulary';
              }
              if (s.type === 'vocabulary') return false;
              if (s.type === 'grammar') {
                return grammarSections[learningSubSection] === s;
              }
              return true;
            })
            .map(s => {
              if (s.type === 'summary' && typeof learningSubSection === 'number' && s.keyPoints) {
                return {
                  ...s,
                  keyPoints: s.keyPoints.filter(
                    p => p.topics && p.topics.includes(learningSubSection)
                  )
                };
              }
              return s;
            })
        }
      : currentLesson;

    return (
      <div className="lesson-view">
        <button className="back-to-overview" onClick={() => {
          if (hasMultipleGrammarSections) {
            setLearningSubSection(null);
          } else {
            setActiveTab('overview');
          }
        }}>
          {hasMultipleGrammarSections ? '← Back to Topics' : '← Back to Lesson'}
        </button>
        <div className="lesson-header">
          <h1 className="lesson-title">{currentLesson.title}</h1>
          <h2 className="lesson-title-tibetan tibetan-text">{currentLesson.titleTibetan}</h2>
        </div>
        <LessonContent lesson={filteredLesson} />
      </div>
    );
  }

  if (activeTab === 'exercises') {
    return (
      <div className="lesson-view">
        <button className="back-to-overview" onClick={() => setActiveTab('overview')}>
          ← Back to Lesson
        </button>
        <div className="lesson-header">
          <h1 className="lesson-title">{currentLesson.title}</h1>
          <h2 className="lesson-title-tibetan tibetan-text">{currentLesson.titleTibetan}</h2>
        </div>
        {practiceSection ? (
          <PracticeSection section={practiceSection} />
        ) : (
          <div className="no-exercises">No exercises available for this lesson yet.</div>
        )}
      </div>
    );
  }

  // Overview tab (default)
  return (
    <div className="lesson-view">
      <button className="back-to-dashboard" onClick={() => dispatch(goBack())}>
        ← Back to Dashboard
      </button>
      <div className="lesson-header">
        <h1 className="lesson-title">{currentLesson.title}</h1>
        <h2 className="lesson-title-tibetan tibetan-text">{currentLesson.titleTibetan}</h2>
        <p className="lesson-description">{currentLesson.description}</p>
      </div>

      <div className="lesson-nav-buttons">
        <button className="nav-btn learning-btn" onClick={() => { setLearningSubSection(null); setActiveTab('learning'); }}>
          <span className="nav-btn-icon">📖</span>
          <span className="nav-btn-label">Learning</span>
          <span className="nav-btn-desc">Study vocabulary, grammar and sentence structure</span>
        </button>

        <button className="nav-btn exercises-btn" onClick={() => setActiveTab('exercises')}>
          <span className="nav-btn-icon">✍️</span>
          <span className="nav-btn-label">Exercises</span>
          <span className="nav-btn-desc">Practice with translation, composition and quizzes</span>
        </button>
      </div>
    </div>
  );
};

export default LessonView;
