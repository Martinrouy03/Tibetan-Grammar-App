import React from 'react';
import VocabularyCard from './VocabularyCard';
import GrammarSection from './GrammarSection';
import './LessonContent.scss';

const LessonContent = ({ lesson }) => {
  if (!lesson || !lesson.sections) {
    return <div>No content available</div>;
  }

  // Filter out practice sections - they are shown separately via the Exercises tab
  const learningSections = lesson.sections.filter(s => s.type !== 'practice');

  return (
    <div className="lesson-content">
      {learningSections.map((section, index) => {
        switch (section.type) {
          case 'introduction':
            return (
              <div key={index} className="section introduction-section">
                <h3 className="section-title">{section.title}</h3>
                <p className="section-content">{section.content}</p>
                {section.contentTibetan && (
                  <p className="section-content-tibetan tibetan-text">{section.contentTibetan}</p>
                )}
              </div>
            );

          case 'vocabulary':
            return (
              <div key={index} className="section vocabulary-section">
                <h3 className="section-title">{section.title}</h3>
                <div className="vocabulary-grid">
                  {section.words && section.words.map((word) => (
                    <VocabularyCard key={word.id} word={word} />
                  ))}
                </div>
              </div>
            );

          case 'grammar':
            return (
              <GrammarSection key={index} section={section} />
            );

          case 'summary':
            return (
              <div key={index} className="section summary-section">
                <h3 className="section-title">{section.title}</h3>
                <ul className="key-points">
                  {section.keyPoints && section.keyPoints.map((point, idx) => (
                    <li key={idx} className="key-point">{typeof point === 'string' ? point : point.text}</li>
                  ))}
                </ul>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default LessonContent;
