import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playAudio, pauseAudio, setPlaybackRate } from '../services/AudioActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import './AudioPronunciation.scss';

const AudioPronunciation = ({ audioPath, audioId, autoPlay = false }) => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const audioState = useSelector(state => state.audioReducer);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRate, setCurrentRate] = useState(1.0);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      dispatch(playAudio(audioPath, audioId, 'vocabulary'));
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      dispatch(pauseAudio());
    }
  };

  const handleSpeedChange = () => {
    const rates = [0.5, 0.75, 1.0, 1.5];
    const currentIndex = rates.indexOf(currentRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const nextRate = rates[nextIndex];

    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
      setCurrentRate(nextRate);
      dispatch(setPlaybackRate(nextRate));
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="audio-pronunciation">
      <audio
        ref={audioRef}
        src={audioPath}
        onEnded={handleAudioEnd}
        preload="metadata"
      />

      <button
        className="audio-btn play-btn"
        onClick={isPlaying ? handlePause : handlePlay}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
      </button>

      <button
        className="audio-btn speed-btn"
        onClick={handleSpeedChange}
        title={`Speed: ${currentRate}x`}
      >
        <FontAwesomeIcon icon={faTachometerAlt} />
        <span className="speed-label">{currentRate}x</span>
      </button>
    </div>
  );
};

export default AudioPronunciation;
