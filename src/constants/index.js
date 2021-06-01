export const CHECK_FOR_SUBSCRIPTION = "CHECK_FOR_SUBSCRIPTION";
export const GOOGLE_OAUTH2 = "GOOGLE_OAUTH2";

export const SIGN_IN = "SIGN_IN";
export const LOGIN_START = "LOGIN_START";

export const SIGN_OUT = "SIGN_OUT";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const PLAY = "PLAY";
export const PAUSE = "PAUSE";
export const STOP = "STOP";
export const STARTED_PLAY = "STARTED_PLAY";
export const SUBSCRIPTION_PAID = "SUBSCRIPTION_PAID";
export const SUBSCRIPTION_FREE = "SUBSCRIPTION_FREE";
export const PLAY_TRACK = "PLAY_TRACK";
export const PAUSE_TRACK = "PAUSE_TRACK";
export const SETUP_PLAYER = "SETUP_PLAYER";
export const CURRENT_TRACK = "CURRENT_TRACK";
export const CURRENT_TRACK_IMAGE = "CURRENT_TRACK_IMAGE";
export const CURRENT_AUDIOBOOK_NAME = "CURRENT_AUDIOBOOK_NAME";
export const CURRENT_TRACK_NAME = "CURRENT_TRACK_NAME";
export const UPDATE_TRACK = "UPDATE_TRACK";

export const SEARCH_START_FILTER = "SEARCH_START_FILTER";
export const SEARCH_START = "SEARCH_START";
export const SEARCHING = "SEARCHING"
export const SEARCH_END = "SEARCH_END";

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';
export const STATUSCODES =statusCodes;
export const GOOGLESIGN= GoogleSignin.configure({
	
    webClientId: '259092449158-sdc80kc3mlrl7kv9uail482tkhv146ck.apps.googleusercontent.com',
    offlineAccess: false, // if you want to access Google API on behalf 
    
  });
  
