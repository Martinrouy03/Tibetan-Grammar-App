import React from 'react';
import AudioPronunciation from './AudioPronunciation';
import './GrammarSection.scss';

const GrammarSection = ({ section }) => {
  return (
    <div className="section grammar-section">
      <h3 className="section-title">{section.title}</h3>

      <div className="grammar-rule">
        <h4 className="rule-title">{section.rule}</h4>
        <p className="rule-explanation">{section.explanation}</p>
      </div>

      {section.examples && section.examples.length > 0 && (
        <div className="grammar-examples">
          <h4 className="examples-title">Examples:</h4>
          {section.examples.map((example, idx) => (
            <div key={idx} className="grammar-example">
              <div className="example-sentence">
                <p className="example-tibetan tibetan-text">{example.tibetan}</p>
                <p className="example-transliteration">{example.transliteration}</p>
                <p className="example-english">{example.english}</p>
              </div>

              {example.audioPath && (
                <div className="audio-control">
                  <AudioPronunciation audioPath={example.audioPath} audioId={`grammar-${idx}`} />
                </div>
              )}

              {example.breakdown && example.breakdown.length > 0 && (
                <div className="word-breakdown">
                  <p className="breakdown-title">Breakdown:</p>
                  <div className="breakdown-grid">
                    {example.breakdown.map((part, partIdx) => (
                      <div key={partIdx} className="breakdown-part">
                        <span className="part-word tibetan-text">{part.word}</span>
                        <span className="part-meaning">{part.meaning}</span>
                        <span className="part-role">({part.role})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GrammarSection;
