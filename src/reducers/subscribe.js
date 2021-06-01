import {
  CHECK_FOR_SUBSCRIPTION,
  SIGN_IN,
  SIGN_OUT,
  LOGIN_START,
  LOGIN_SUCCESS,
  PLAY,
  PAUSE,
  STOP,
  STARTED_PLAY,
  SUBSCRIPTION_PAID,
  SUBSCRIPTION_FREE,
  PLAY_TRACK,
  PAUSE_TRACK,
  SETUP_PLAYER,
  CURRENT_TRACK,
  CURRENT_TRACK_IMAGE,
  CURRENT_AUDIOBOOK_NAME,
  CURRENT_TRACK_NAME,
  SEARCH_START,
  SEARCHING,
  SEARCH_END,
  SEARCH_START_FILTER,
  UPDATE_TRACK,
} from '../constants';

const initialState = {
  //loading : true,
  isSubscribed: [],
  isSignedIn: null,
  userId: null,
  loading: false,
  data: [],
  error: 'nologin',
  isPlaying: 'Stop',
  setupPlayer: false,
  track: [],
  subscriptionType: 'FREE',
  subscriptionPayment: [],
  currentTrack: {},
  currentTrackImage: 'https://mayduke.in/demo/audiobook/thumbnail.png',
  currentAudiobookName: '',
  currentTrackTitle: '',
  categorydata: [],
  searchbooksdata: [],
  searchbookstest: '',
  trackData: {},
};

export default (subscribe = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIPTION_PAID:
      return {
        ...state,
        subscriptionType: 'PAID',
        subscriptionPayment: action.payload,
      };
    case SUBSCRIPTION_FREE:
      return {
        ...state,
        subscriptionType: 'FREE',
        subscriptionPayment: action.payload,
      };
    case STARTED_PLAY:
      return {...state, isPlaying: 'STARTED_PLAY', track: action.payload};
    case PLAY:
      return {...state, isPlaying: 'Play', track: action.payload};
    case PAUSE:
      return {...state, isPlaying: 'Pause', track: action.payload};
    case STOP:
      return {...state, isPlaying: 'Stop', track: action.payload};
    case SETUP_PLAYER:
      return {...state, setupPlayer: true};
    case CURRENT_TRACK:
      return {...state, currentTrack: action.payload};
    case CURRENT_TRACK_IMAGE:
      return {...state, currentTrackImage: action.payload};
    case CURRENT_AUDIOBOOK_NAME:
      return {...state, currentAudiobookName: action.payload};
    case CURRENT_TRACK_NAME:
      return {...state, currentTrackTitle: action.payload};
    case UPDATE_TRACK:
      return {...state, trackData: action.payload};
    case CHECK_FOR_SUBSCRIPTION:
      return {...state, isSubscribed: action.payload};
    case SEARCH_START:
      return {...state, searchbookstest: action.payload};
    case SEARCH_START_FILTER:
      return {...state, searchbooksdata: action.payload};
    case SEARCHING:
      return {...state, categorydata: action.payload};
    case SEARCH_END:
      return {...state, categorydata: action.payload};

    case LOGIN_START:
      return {...state, loading: true, data: [], error: 'start'};
    case SIGN_IN:
      console.log(action);
      return {
        ...state,
        loading: true,
        data: action.payload,
        error: 'no error',
      };

    case LOGIN_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: 'SUCCESS',
      };

    case SIGN_OUT:
      return {
        ...state,
        loading: false,
        data: null,
        error: 'SIGNOUT',
        subscriptionType: 'FREE',
        currentTrack:{}
      };

    default:
      return state;
  }
});

/*
  export default googlesiginreducer =  (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_START:
        return { ...state, loading: false, data: action.payload };  
      case SIGN_IN:
        console.log(action);
        return {
            
             ...state, loading: true, data: action.payload ,error:''
            };
      case SIGN_OUT:
        return { ...state, loading: false, data: null };
      default:
        return state;
    }
  }*/
