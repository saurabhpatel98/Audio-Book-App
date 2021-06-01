import {
  GOOGLE_OAUTH2,
  SIGN_OUT,
  SIGN_IN,
  GOOGLESIGN,
  LOGIN_SUCCESS,
  STATUSCODES,
  PLAY,
  PAUSE,
  STOP,
  STARTED_PLAY,
  SUBSCRIPTION_PAID,
  SETUP_PLAYER,
  CURRENT_TRACK,
  CURRENT_TRACK_IMAGE,
  CURRENT_AUDIOBOOK_NAME,
  CURRENT_TRACK_NAME,
  SEARCH_START,
  SEARCH_END,
  SEARCHING,
  SEARCH_START_FILTER,
} from '../constants';
import axios from 'axios';
import NavigationService from '../navigationservice';
export const googleOAuth2 = {
  login,
  logout,
  play,
  pause,
  stop,

  updateSubscription,
  playTrack,
  pauseTrack,
  checkTrackplayerSetup,
  trackseek,
  trackback,
  trackforward,
  trackplaybackrate,
  trackprevious,
  tracknext,
  setCurrentTrack,
  setaudiobookimage,
  setaudiobookname,
  searchcategory,
  searchbooks,
  clearSearchData,
};
import AsyncStorage from '@react-native-community/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {connect} from '../recontext/store';
import {useSelector} from 'react-redux';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import localTrack from '../resources/pure.m4a';
import { API_URL } from '../config';
GoogleSignin.configure({
  webClientId:
    '259092449158-sdc80kc3mlrl7kv9uail482tkhv146ck.apps.googleusercontent.com',
  offlineAccess: false, // if you want to access Google API on behalf
});

const signIn = async () => {
  let userInfo = [];
  await GoogleSignin.isSignedIn().then(isSignedIn => {
    if (isSignedIn) {
      try {
        GoogleSignin.signOut().then(r => {});
      } catch (error) {
        console.error('jghjghjh'.error);
      }
    }
  });

  //  try {

  await GoogleSignin.hasPlayServices();
  userInfo = await GoogleSignin.signIn();
  console.log('googledata');
  console.log(userInfo);
  // return userInfo.user;

  if (userInfo.user.id != '') {
    //     alert(userInfo.user.id);

    var today = new Date(),
      date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();

    user = {
      active: 'A',
      created: date,
      email: userInfo.user.email,
      name: userInfo.user.name,
    };
  }

  return user;

  /* } catch (error) {
            if (error.code === STATUSCODES.SIGN_IN_CANCELLED) {
              console.log("e 1"+error);
            } else if (error.code === STATUSCODES.IN_PROGRESS) {
              console.log("e 2"+error);
            } else if (error.code === STATUSCODES.PLAY_SERVICES_NOT_AVAILABLE) {
              console.log("e 3"+error);
            } else {
              console.log(error);
            }
          }*/
};

export function login() {
  return async dispatch => {
    dispatch({type: SIGN_IN, payload: 'onprocess'});
    let user = await signIn();
    //console.log("n sak");
    console.log(user);
    axios
      .post(API_URL + 'addmember', user, {})
      .then(res => {
        //if(res.data['status']='200'){

        // console.log(res.data)

        AsyncStorage.setItem('email', res.data.data['email']);
        AsyncStorage.setItem('name', res.data.data['firstName']);

        AsyncStorage.setItem('user', JSON.stringify(res.data.data));
        AsyncStorage.setItem('id', JSON.stringify(res.data.data['ai']));

        //alert(res.data.data['firstName']);
        console.log(res.data.data['firstName']);
        console.log(res.data);
        /*  */
        dispatch({type: LOGIN_SUCCESS, payload: res.data.data});

        // return(res.data.data);
        //  NavigationService.navigate('DashboardScreen',{
        //   username:res.data.data['email']
        //   })
      })
      .catch(error => console.log('api'.error));

    // let userInfo ="signedin";
    console.log('login');
    //dispatch({type:SIGN_IN, payload: userInfo })
    // console.log(userInfo);
    // dispatch({type:LOGIN_SUCCESS, payload:  signIn() })
    // return
  };
}

export function startedplay(gh, track) {
  //  alert('123');
  return dispatch => {
    //  console.log('playing')
    dispatch({type: STARTED_PLAY, payload: track});
  };
}

export function skipPlayTrack(track) {
  return dispatch => {
    dispatch({type: PLAY, payload: track});
  };
}

export function skipPauseTrack(track) {
  return async dispatch => {
    dispatch({type: PAUSE, payload: track});
  };
}

export function play(PLAYS, track, playbackState, GetTotalDuration) {
  //  alert('123');
  return dispatch => {
    togglePlayback(track, playbackState, GetTotalDuration);
    //  console.log(track)
    //  console.log('trackkkkkkk')
    dispatch({type: PLAY, payload: track});
    // dispatch({type: UPDATE_PLAYLIST, payload: {item,rating}});
  };
}

export function pause(pauses, track, playbackState) {
  return async dispatch => {
    togglePlayback(track, playbackState);
    // console.log(track)
    //  console.log('trackkkkkkk1111')
    dispatch({type: PAUSE, payload: track});
  };
}
export function stop(stops, track) {
  return async dispatch => {
    dispatch({type: STOP, payload: track});
    togglePlayback(track);
  };
}

export function updateSubscription(
  subscription_id,
  paymentid,
  email,
  expire_by,
  paidAmount,
) {
  return async dispatch => {
    dispatch({type: SUBSCRIPTION_PAID, payload: [{payment: 'payment'}]});
    NavigationService.navigate('Success', {
      subid: subscription_id,
      payid: paymentid,
      email: email,
      expire_by:expire_by,
      paidAmount,
    });
  };
}
export function playTrack(stop, track) {
  return async (dispatch, getState) => {
    const state = getState();
    togglePlayback(state.track, 2);
    dispatch({type: PLAY, payload: state});
  };
}

export function pauseTrack(stop, track) {
  return async (dispatch, getState) => {
    const state = getState();
    togglePlayback(state.track, 3);
    dispatch({type: PAUSE, payload: state});
  };
}

export function endPlayer() {
  return async dispatch => {
    try {
      await TrackPlayer.stop();
    } catch (error) {
      console.error('exitPlayer', error);
    }
    dispatch({type: STOP, payload: []});
  };
}

export function checkTrackplayerSetup(stop, track) {
  return async (dispatch, getState) => {
    // const playbackState = TrackPlayer.getState();
    //  console.log('setup')
    setUp();
    dispatch({type: SETUP_PLAYER, payload: ''});
  };
}
export function trackseek(value) {
  return async (dispatch, getState) => {
    onSeek(value);
  };
}
export function trackback() {
  return async (dispatch, getState) => {
    skipToBack();
  };
}
export function trackforward(track) {
  return async (dispatch, getState) => {
    skipToForward();
  };
}
export function trackplaybackrate(rate) {
  return async (dispatch, getState) => {
    setPlaybackRate(rate);
  };
}
export function tracknext(GetTotalDuration) {
  return async (dispatch, getState) => {
    skipToNext(GetTotalDuration);
  };
}
export function trackprevious(GetTotalDuration) {
  return async (dispatch, getState) => {
    skipToPrevious(GetTotalDuration);
  };
}
export function setCurrentTrack() {
  return async (dispatch, getState) => {
    const store = getState();
    let currenttrack = await TrackPlayer.getCurrentTrack();
    let currentTrackData = await TrackPlayer.getTrack(currenttrack);
    dispatch({type: CURRENT_TRACK, payload: currentTrackData});
    dispatch({type: CURRENT_TRACK_NAME, payload: currentTrackData?.title});
    if (currentTrackData?.id) {
      await TrackPlayer.updateMetadataForTrack(currentTrackData?.id, {
        title: currentTrackData?.title ?? '',
        artist: store?.currentAudiobookName ?? '',
      });
    }
  };
}
export function setaudiobookimage(image) {
  console.log(image);
  console.log('eeeeeeeeeeeeeeeeeeeeeeeeee');
  return async (dispatch, getState) => {
    dispatch({type: CURRENT_TRACK_IMAGE, payload: image});
  };
}
export function setaudiobookname(audiobook) {
  return async (dispatch, getState) => {
    dispatch({type: CURRENT_AUDIOBOOK_NAME, payload: audiobook});
  };
}

/* export function navigateToPlayer() {
          const email = AsyncStorage.getItem('email');
          const userf = {
            userid: email,
            audionbookid:rowData._id
          };  
          axios.post("https://app.almosteverythingapp.com:3002/v2/getuserrating",userf).then(res =>  
          {
            let ratt='0';
            if(res.data.data.length==0){
              ratt=0;
            }
            else{
              ratt=res.data.data[0]['ratings'];
            }
            this.props.navigation.push('PlaylistScreen', {
              id: rowData._id,
              item: rowData,
              ratings:ratt
            })  
          })
        } */

async function setUp() {
  await TrackPlayer.setupPlayer({});
  TrackPlayer.updateOptions({
    stopWithApp: true,
    alwaysPauseOnInterruption: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_PLAY_FROM_ID,
      TrackPlayer.CAPABILITY_SKIP,
    ],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_PLAY_FROM_ID,
      TrackPlayer.CAPABILITY_SKIP,
    ],
  });
}

async function togglePlayback(
  playlistData,
  playbackState,
  GetTotalDuration = () => {},
) {
  // const playbackState = TrackPlayer.usePlaybackState(());
  console.warn('Toggle playback function');
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack == null) {
    await TrackPlayer.reset();
    await TrackPlayer.add([...playlistData]);
    /* await TrackPlayer.add({
              id:"ih",
              url: localTrack,
              title:"",
              artist: "",
              artwork:"",
              duration: 28
            }); */
    // console.log(selector);
    await TrackPlayer.play();
    GetTotalDuration();
  } else {
    console.log('playbackState',playbackState, TrackPlayer.STATE_STOPPED)
    if (playbackState === TrackPlayer.STATE_PAUSED || playbackState === TrackPlayer.STATE_STOPPED) {
      await TrackPlayer.play();
      GetTotalDuration();
    } else {
      await TrackPlayer.pause();
    }
  }
}
async function onSeek(value) {
  const position = await TrackPlayer.getPosition();
  const duration = await TrackPlayer.getDuration();

  if (value > position) {
    await TrackPlayer.seekTo(value);
  } else {
    await TrackPlayer.seekTo(value);
  }
}

async function skipToBack() {
  const position = await TrackPlayer.getPosition();
  await TrackPlayer.seekTo(position - 10);
}
async function skipToForward() {
  const position = await TrackPlayer.getPosition();
  await TrackPlayer.seekTo(position + 10);
}
async function setPlaybackRate(rate) {
  await TrackPlayer.setRate(rate);
}

async function skipToNext(GetTotalDuration) {
  try {
    await TrackPlayer.skipToNext();
    GetTotalDuration();
  } catch (_) {}
}
async function skipToPrevious(GetTotalDuration) {
  try {
    await TrackPlayer.skipToPrevious();
    GetTotalDuration();
  } catch (_) {}
}

const signout = async () => {
  // await GoogleSignin.revokeAccess();
  // await GoogleSignin.signOut();
  GoogleSignin.revokeAccess()
    .then(() => GoogleSignin.signOut())
    .then(() => {
      // this.setState({ userGoogleInfo: null })
      try {
        AsyncStorage.removeItem('name');
        AsyncStorage.removeItem('email');
        //return true;
        //na
      } catch (exception) {
        // return false;
      }
    })
    .done();
  //  dispatch({type:SIGN_OUT, payload: "Logged out" })
  //  NavigationService.navigate('Googlesigninlogin')

  // this.setState({ user: null, loaded: false });

  // Remember to remove the user from your app's state as well
};

export function logout() {
  return async dispatch => {
    //dispatch({type:SIGN_IN, payload: "onprocess" })
    await signout();
    await TrackPlayer.reset();
    dispatch({type: SIGN_OUT, payload: 'Loggedout'});
    console.log('logout');
  };
}
export function searchcategory() {
  return async dispatch => {
    dispatch({type: SEARCH_START, payload: 'searchresults'});

    axios
      .get(API_URL + 'category')
      .then(response => {
        // this.state.categorydata = response.data.data;
        // this.setState({
        // tableData: response.data
        // categorydata :response.data.data
        //  });
        dispatch({type: SEARCH_END, payload: response.data.data});
        console.log('djjjjjj');
        // console.log(this.state.categorydata);
      })
      .catch(error => {
        console.log('nnnnnnnnnn');
        console.log(error);
      });
  };
}
const setupsearch = async () => {
  return async dispatch => {
    //dispatch({type:SEARCH_START, payload: "searchresults" })
    axios
      .post(API_URL + 'search', userf, {})
      .then(res => {
        console.log('sssssssssssssssssssssssssssssssssssssssssssssssssssss');
        console.log(res.data.data);
        dispatch({type: SEARCH_START_FILTER, payload: res.data.data});
        //this.setState({ loading: true })
        //  this.state.dataSource=res.data.data;
        /* this.setState({
         // dataSource: [],
          dataSource :res.data.data
      });*/
      })
      .catch(error =>
        //console.log(error)
        this.setState({loading: false}),
      );
  };
};
export function searchbooks(userf) {
  return async dispatch => {
    //dispatch({type:SEARCH_START, payload: "searchresults" })
    console.log('seeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    console.log(userf);
    axios
      .post(API_URL + 'search', userf, {})
      .then(res => {
        console.log('sssssssssssssssssssssssssssssssssssssssssssssssssssss');
        console.log(res.data.data);
        dispatch({type: SEARCH_START_FILTER, payload: res.data.data});
        //this.setState({ loading: true })
        //  this.state.dataSource=res.data.data;
        /* this.setState({
          // dataSource: [],
           dataSource :res.data.data
       });*/
      })
      .catch(error => {
        console.log('nnnnnnnnnn');
        console.log(error);
      });
  };
}
export function clearSearchData() {
  return dispatch => {
    dispatch({type: SEARCH_START_FILTER, payload: []});
  };
}
