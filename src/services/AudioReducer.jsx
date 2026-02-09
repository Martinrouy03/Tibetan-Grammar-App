// Audio Reducer
import {
  PLAY_AUDIO,
  PAUSE_AUDIO,
  STOP_AUDIO,
  AUDIO_ENDED,
  SET_PLAYBACK_RATE,
  SET_VOLUME
} from './AudioActions';

const initialState = {
  currentAudio: null,
  isPlaying: false,
  isPaused: false,
  playbackRate: 1.0,
  volume: 1.0
};

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_AUDIO:
      return {
        ...state,
        currentAudio: {
          path: action.payload.audioPath,
          id: action.payload.audioId,
          type: action.payload.audioType
        },
        isPlaying: true,
        isPaused: false
      };

    case PAUSE_AUDIO:
      return {
        ...state,
        isPlaying: false,
        isPaused: true
      };

    case STOP_AUDIO:
    case AUDIO_ENDED:
      return {
        ...state,
        isPlaying: false,
        isPaused: false,
        currentAudio: null
      };

    case SET_PLAYBACK_RATE:
      return {
        ...state,
        playbackRate: action.payload.rate
      };

    case SET_VOLUME:
      return {
        ...state,
        volume: action.payload.volume
      };

    default:
      return state;
  }
};

export default audioReducer;
