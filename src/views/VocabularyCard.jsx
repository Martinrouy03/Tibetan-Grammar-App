import React, { useState } from 'react';
import AudioPronunciation from './AudioPronunciation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import './VocabularyCard.scss';

const VocabularyCard = ({ word }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`vocabulary-card ${isFlipped ? 'flipped' : ''}`}>
      <div className="card-inner">
        {/* Front Side */}
        <div className="card-front">
          <div className="word-tibetan tibetan-text">{word.tibetan}</div>
          <div className="word-transliteration">{word.transliteration}</div>

          {word.audioPath && (
            <div className="audio-control">
              <AudioPronunciation audioPath={word.audioPath} audioId={word.id} />
            </div>
          )}

          <button className="flip-button" onClick={handleFlip}>
            <FontAwesomeIcon icon={faSync} /> See Meaning
          </button>
        </div>

        {/* Back Side */}
        <div className="card-back">
          <div className="word-english">{word.english}</div>

          {word.example && (
            <div className="word-example">
              <p className="example-title">Example:</p>
              <p className="example-tibetan tibetan-text">{word.example.tibetan}</p>
              <p className="example-transliteration">{word.example.transliteration}</p>
              <p className="example-english">{word.example.english}</p>

              {word.example.audioPath && (
                <div className="audio-control">
                  <AudioPronunciation audioPath={word.example.audioPath} audioId={`${word.id}-example`} />
                </div>
              )}
            </div>
          )}

          <button className="flip-button" onClick={handleFlip}>
            <FontAwesomeIcon icon={faSync} /> Back to Word
          </button>
        </div>
      </div>
    </div>
  );
};

export default VocabularyCard;
