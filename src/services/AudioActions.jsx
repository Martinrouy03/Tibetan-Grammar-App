// Audio Actions

// Action Types
export const PLAY_AUDIO = "PLAY_AUDIO";
export const PAUSE_AUDIO = "PAUSE_AUDIO";
export const STOP_AUDIO = "STOP_AUDIO";
export const AUDIO_ENDED = "AUDIO_ENDED";
export const SET_PLAYBACK_RATE = "SET_PLAYBACK_RATE";
export const SET_VOLUME = "SET_VOLUME";

// Action Creators
export const playAudio = (audioPath, audioId, audioType) => ({
  type: PLAY_AUDIO,
  payload: { audioPath, audioId, audioType }
});

export const pauseAudio = () => ({
  type: PAUSE_AUDIO
});

export const stopAudio = () => ({
  type: STOP_AUDIO
});

export const audioEnded = () => ({
  type: AUDIO_ENDED
});

export const setPlaybackRate = (rate) => ({
  type: SET_PLAYBACK_RATE,
  payload: { rate }
});

export const setVolume = (volume) => ({
  type: SET_VOLUME,
  payload: { volume }
});
