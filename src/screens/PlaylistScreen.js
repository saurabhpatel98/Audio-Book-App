import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer, {
  getPosition,
  usePlaybackState,
} from 'react-native-track-player';
import { colors, metrics } from '../utils/themes';
import Player from '../components/Player';
// import StarRating from '../components/StarRating';
// import {SvgUri} from 'react-native-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';

//import playlistData from "../data/playlist.json";
import localTrack from '../resources/pure.m4a';
const Bookicon = require('../resources/fav.png');
import zget from 'zget';
//import Icon from 'react-native-vector-icons/AntDesign';
import Stars from 'react-native-stars';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
  play,
  pause,
  skipPlayTrack,
  skipPauseTrack,
  checkTrackplayerSetup,
  trackseek,
  trackback,
  trackforward,
  trackplaybackrate,
  trackprevious,
  tracknext,
  setaudiobookimage,
  setaudiobookname,
} from '../../src/actions/google';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_TRACK } from '../constants';
import { ScrollView } from 'react-native';
import { API_URL } from '../config';

let playlistDatads = '';
let ratingsvalue = '';
let playlistData = '';
let email = '';
let rat = 0;
let timer = 0;

export default function PlaylistScreen(props) {
  const [favcolor, setFavColor] = useState('#eff2f7');
  const [totalDuration, setTotalDuration] = useState('0');
  const [currentTrack, setCurrentTrack] = useState('');
  const [position, setPosition] = useState('0');
  const [playerSpeed, setPlayerSpeed] = useState(1);

  const selector = useSelector(state => state);
  const dispatch = useDispatch();
  const playbackState = usePlaybackState();

  useEffect(() => {
    setup(props);
    // console.log(playbackState);
    AsyncStorage.getItem('email').then(email => {
      email = email;
      const userf = {
        userid: email,
        audionbookid: playlistDatads._id,
      };
      // alert(JSON.stringify(userf))
      axios.post(API_URL + 'getuserrating', userf).then(res => {
        // alert(res.data?.data?.[0]?.ratings)
        ratingsvalue = res.data?.data?.[0]?.ratings ?? 0;
      });
    });
    console.log('emai;');
    console.log(email);

    // axios
    //   .get(API_URL + 'byrating', {
    //     params: {
    //       id: email,
    //       audioid: playlistDatads._id,
    //     },
    //   })
    //   .then(res => {
    //     rat = res.data.data[0]['ratings'];
    //     //  playlistDatads.push([{'rat':res.data.data[0]['ratings']}]);
    //   })
    //   .catch(error => console.log(error));
    console.log('rating');
    //	 console.log(res.data.data[0]['ratings']);
    console.log(rat);
    console.log('rar');
    console.log(rat);
    return () => {
      clearInterval(timer);
    };
  }, []);

  async function setup(props) {
    let item = zget(props, 'navigation.state.params.item');
    let ratingsvu = zget(props, 'navigation.state.params.ratings');
    let type = zget(props, 'navigation.state.params.type');
    let required = zget(props, 'navigation.state.params.required');

    const currentSpeed = await TrackPlayer.getRate()

    //  console.log("ahdjhjkkj");
    //  console.log(item.tracks);
    if (item && item.tracks && item.tracks.length > 0) {
      item.tracks.forEach((element, index) => {
        item.tracks[index].id = element.id.toString()
      });
    }
    playlistDatads = item;
    // ratingsvalue = ratingsvu;
    playlistData = item.tracks;
    const trackId = await TrackPlayer.getCurrentTrack();
    // const trackObject = await TrackPlayer.getTrack(trackId);
    // // const track = await TrackPlayer.getTrack(trackId);
    // console.log(playlistDatads.image);
    // console.log('e1e1e1e1e1e1e1e1e1e1e1e1e1e');
    if (required) {
      setPlaybackRate(currentSpeed)
      setCurrentTrack(trackId)
    } else if (playlistData && playlistData.length > 0) {
      togglePlayback()
      setCurrentTrack(playlistData[0].id)
    }

    dispatch(setaudiobookimage(playlistDatads.image));
    dispatch(setaudiobookname(playlistDatads.name));
    dispatch({ type: UPDATE_TRACK, payload: { item, ratingsvalue } });
    var ifLiked;
    AsyncStorage.getItem('email').then(email => {
      const userf = {
        userid: email,
        audionbookid: playlistDatads._id,
      };
      axios
        .post(API_URL + 'getlike', userf, {})
        .then(res => {
          if (res.data.data != null) {
            setFavColor('#dc3545');
          }
        })
        .catch(error => console.log(error));
    });

    //  console.log("ratingsvalue");
    //  console.log(ratingsvalue);

    //console.log(playlistDatads.image);
    //let email='';
    //console.log(playlistDatads.image);
    if (type != 'mini') {
      // console.warn('type');
      dispatch(checkTrackplayerSetup());
    }
    GetTotalDuration();
    durationCounter();
    // let {liked} = props;
    // this.lastPress = 0;
    // this._visibility = new Animated.Value(0);
    let favoriteTopicsData = [];
    /* favoriteTopicsData.push(
      this.props.topicNames						
                ) */
    this.state = {
      liked: true,
      userid: '',
      favoriteTopicsData: favoriteTopicsData,
    };

    // this.setState({ liked:true });

    /* await TrackPlayer.setupPlayer({});
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP
      ]
    }); */
  }

  async function onSeek(value) {
    dispatch(trackseek(value));
    /* const position = await TrackPlayer.getPosition();
      const duration = await TrackPlayer.getDuration();
     if(value>position){
       await TrackPlayer.seekTo( value);
     }
     else{
       await TrackPlayer.seekTo( value);
     }
     
        
  	
  	
     alert(await TrackPlayer.getPosition());
     console.log("seek"+await TrackPlayer.getPosition()); */
  }
  async function setPlaybackRate(rate) {
    dispatch(trackplaybackrate(rate));
    setPlayerSpeed(rate);
    // GetTotalDuration();
    /* const position = await TrackPlayer.getPosition();
      await TrackPlayer.seekTo(position + 20); */
  }

  async function skipToBack() {
    dispatch(trackback(GetTotalDuration));
    // GetTotalDuration();
    /* const position = await TrackPlayer.getPosition();
        await TrackPlayer.seekTo(position - 20); */
  }
  async function skipToForward() {
    dispatch(trackforward(GetTotalDuration));
    // GetTotalDuration();
    /* const position = await TrackPlayer.getPosition();
      await TrackPlayer.seekTo(position + 20); */
  }
  async function skipToNext() {
    dispatch(tracknext(GetTotalDuration));
    // GetTotalDuration();
    /* try {
      await TrackPlayer.skipToNext();
    } catch (_) {} */
  }
  /* async function onSeek() {
    try {
      await TrackPlayer.onSeek();
    } catch (_) {}
  } */
  async function skipToPrevious() {
    // GetTotalDuration();
    dispatch(trackprevious(GetTotalDuration));
    /* try {
      await TrackPlayer.skipToPrevious();
    } catch (_) {} */
  }
  function onCount(id) {
    AsyncStorage.getItem('email').then(email => {
      axios
        .get(API_URL + 'byrating', {
          params: {
            id: email,
            audioid: id,
          },
        })
        .then(res => {
          console.log('jhsajhfvjhsdvjhvasdjh');

          console.log(res.data.data);
          // this.state.ratings=res.data.data['ratings'];
          console.log('rating');
          console.log(res.data.data[0]['ratings']);
          return res.data.data[0]['ratings'];
        })

        .catch(error => console.log(error));
    });
  }
  function onRating(val, id, ratingsvalue) {
    const rating = val;
    console.log(rating);
    var likedata;
    AsyncStorage.getItem('email').then(email => {
      likedata = email;
      console.log(likedata);
      const userf = {
        userid: likedata,
        audionbookid: id,
        ratings: val,
      };
      if (ratingsvalue == 0) {
        axios
          .post(API_URL + 'byrating', userf, {})
          .then(res => {
            console.log(res);
          })
          .catch(error => console.log(error));
      } else {
        const userf = {
          userid: likedata,
          audionbookid: id,
          ratings: val,
        };
        axios
          .put(API_URL + 'updaterating', userf, {})
          .then(res => {
            console.log(res.data.data);
          })
          .catch(error => console.log(error));
      }
    });

    // console.log("sdfsdF");
    //  console.log(userf);
  }

  function GetMinsSec(time) {
    return { minutes: Math.floor(time / 60), seconds: (time % 60).toFixed(0) };
  }

  const durationCounter = async () => {
    clearInterval(timer);
    timer = setInterval(async () => {
      const songCurrent = await TrackPlayer.getPosition();
      const current = GetMinsSec(songCurrent);
      setPosition({
        min: current.minutes,
        sec: current.seconds,
        total: songCurrent,
      });

      // this.setState({
      //   currentTime: {
      //     min: current.minutes,
      //     sec: current.seconds,
      //     total: songCurrent,
      //   },
      // });
    }, 100);
  };

  async function GetTotalDuration() {
    let duration = await TrackPlayer.getDuration();
    const current = GetMinsSec(duration);
    setTotalDuration({
      min: current.minutes,
      sec: current.seconds,
    });
    getCurrentTrack()
    // return;
  }

  async function togglePlayback() {
    //dispatch(play('Play', playlistData))
    console.log('playbackState', playbackState)
    // console.log(TrackPlayer.CAPABILITY_STOP)
    if (playbackState == 2 || playbackState == 1) {
      // alert(12)
      dispatch(play('Play', playlistData, playbackState, GetTotalDuration));
      durationCounter();

      // console.warn(await TrackPlayer.getDuration())
    } else if (playbackState == 3) {
      // alert(123)
      clearInterval(timer);
      dispatch(pause('Pause', playlistData, playbackState));
    }
    // dispatch(setCurrentTrack())
    /* const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add(playlistData);
      await TrackPlayer.add({
        id:"ih",
        url: localTrack,
        title:"",
        artist: "",
        artwork:"",
        duration: 28
      });
      // console.log(selector);
      await TrackPlayer.play();
      dispatch(startedplay('StartedPlay', playlistData))
      dispatch(play('Play', playlistData))
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
        dispatch(pause('Play', playlistData))
      } else {
        await TrackPlayer.pause();
        dispatch(play('Pause', playlistData))
      }
    }
    console.log(selector); */
  }

  // animateIcon = () => {
  //   const {liked} = this.state;
  //   this.largeAnimatedIcon.stopAnimation();

  //   if (liked) {
  //     this.largeAnimatedIcon
  //       .bounceIn()
  //       .then(() => this.largeAnimatedIcon.bounceOut());
  //     this.smallAnimatedIcon.pulse(200);
  //   } else {
  //     this.largeAnimatedIcon
  //       .bounceIn()
  //       .then(() => {
  //         this.largeAnimatedIcon.bounceOut();
  //         // this.smallAnimatedIcon.bounceIn()
  //       })
  //       .then(() => {
  //         if (!liked) {
  //           this.setState(prevState => ({liked: !prevState.liked}));
  //         }
  //       });
  //   }
  // };
  /* handleOnPressLike = (id,name) => {
    alert(1)
    AsyncStorage.getItem('email')
      .then((email) => { 
      const userf = {
        userid:email,
        audionbookid:name,
      }; 
      axios.post("https://app.almosteverythingapp.com:3002/v2/addlike", userf, {
      }).then(res => {
        console.log(res);
      })
      .catch(error => console.log(error));
    });
  } */

  const getLike = id => {
    AsyncStorage.getItem('email').then(email => {
      const userf = {
        userid: email,
        audionbookid: id,
      };
      axios
        .post(API_URL + 'getlike', userf, {})
        .then(res => {
          if (res.data.data != null) {
            axios
              .post(API_URL + 'removelike', userf, {})
              .then(res => {
                setFavColor('#eff2f7');
              })
              .catch(error => console.log(error));
          } else {
            axios
              .post(API_URL + 'addlike', userf, {})
              .then(res => {
                setFavColor('#dc3545');
              })
              .catch(error => console.log(error));
          }
        })
        .catch(error => console.log(error));
    });
  };

  /* handleOnPressLikes = (id,topicName) => {
    alert(3)
    AsyncStorage.getItem('email').then((email) => { 
      const userf = {
        userid:email,
        audionbookid:topicName,
      }; 
      axios.post("https://app.almosteverythingapp.com:3002/v2/removelike", userf, {}).then(res => {
        console.log(res);
      })
      .catch(error => console.log(error));
    });
  } */

  async function getCurrentTrack() {
    const trackId = await TrackPlayer.getCurrentTrack();
    if (trackId) {
      setCurrentTrack(trackId)
    }
  }

  async function setCurrentTrackData(trackId) {
    console.log('trackId------------>', trackId)
    try {
      await TrackPlayer.skip(trackId);
      await TrackPlayer.play()
      dispatch(skipPlayTrack(playlistData))
      // togglePlayback()
      setCurrentTrack(trackId)
    } catch (error) {
      console.log('trackchange-err', error)
      await TrackPlayer.reset();
      await TrackPlayer.add([...playlistData]);
      await TrackPlayer.skip(trackId);
      togglePlayback()
      GetTotalDuration();
    }
  }

  const renderTrackList = () => {
    var showPause = false;

    if (
      playbackState === TrackPlayer.STATE_PLAYING ||
      playbackState === TrackPlayer.STATE_BUFFERING
    ) {
      showPause = true;
    }
    return (
      <View style={styles.trackListContainer}>
        {playlistData.map((item, index) => (
          <View key={index}>
            <TouchableOpacity style={[styles.trackList]}
              delayPressIn={1000}
              onPress={async () => {
                if (showPause && currentTrack == item.id) {
                  await TrackPlayer.pause()
                  dispatch(skipPauseTrack(playlistData))
                } else {
                  setCurrentTrackData(item.id)
                }
              }}
            >
              <Text style={{ fontWeight: currentTrack == item.id ? 'bold' : 'normal', fontSize: 16, color: 'white', width: '80%' }}>{item.title}</Text>
              <Ionicons
                name={currentTrack == item.id && showPause ? "pause" : "play"}
                size={35}
                color={currentTrack == item.id && showPause ? '#30a960' : 'white'}
              />
            </TouchableOpacity>
            <View style={styles.hzLine}></View>
          </View>
        ))}
      </View>
    )
  }

  const setupplaylist = () => {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View
            style={(styles.container, { alignItems: 'center', paddingTop: 20 })}>
            <Image
              source={{ uri: playlistDatads.image }}
              style={{
                height: 320,
                width: 260,
                margin: 20,
                paddingLeft: 60,
                borderRadius: 5,
                marginTop: 0,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                color: '#fff',
                alignItems: 'flex-start',
                marginLeft: 20,
                fontSize: 21,
                width: '80%',
              }}>
              {playlistDatads.name}
            </Text>
            <TouchableOpacity
              onPress={event => getLike(playlistDatads._id)}
              style={{
                backgroundColor: '#000',
                marginTop: 0,
                marginLeft: 10,
                alignSelf: 'flex-end',
                width: '20%',
              }}>
              {/*  <AnimatedIcon
                        ref={handleSmallAnimatedIconRef}
                      onPress={(event) => getLike(playlistDatads._id)?handleOnPressLikes(event,playlistDatads._id):handleOnPressLike(event,playlistDatads._id)}
                        // onPress={this.handleOnPressLike}
                        name={getLike(playlistDatads._id) ? 'heart' : 'heart'}
                        color={getLike(playlistDatads._id )? 'red' : '#d4d5d7'}
                        size={15}
                        
                              />*/}
              <Feather
                name="heart"
                size={18}
                color={favcolor}
                style={{ marginRight: 15, paddingRight: 20 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <Player
              onSeek={onSeek}
              setPlaybackRate={setPlaybackRate}
              playerSpeed={playerSpeed}
              onBack={skipToBack}
              onForward={skipToForward}
              style={styles.player}
              totalDuration={totalDuration}
              position={position}
              onNext={skipToNext}
              onPrevious={skipToPrevious}
              onTogglePlayback={togglePlayback}
              getTotalDuration={GetTotalDuration}
            />
          </View>

          {playlistData && playlistData.length > 0 ? renderTrackList() : null}



          {/* --------------------------  star section commented ---------------------------------- */}
          {/* <View
            style={{
              alignItems: 'center',
              backgroundColor: '#13181e',
              // paddingBottom: 30,
              paddingVertical: 20,
              // paddingTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  // position: 'absolute',
                  // marginLeft: -60,
                }}>
                Loved it ?{' '}
              </Text>
              <Stars
                half={true}
                default={ratingsvalue}
                update={val => {
                  onRating(val, playlistDatads._id, ratingsvalue);
                }}
                spacing={5}
                // style={{paddingLeft: 4}}
                starSize={20}
                count={5}
                fullStar={require('./img/starFilledN.png')}
                emptyStar={require('./img/starEmptyN.png')}
                halfStar={require('./img/starHalfN.png')}
              />
            </View>
          </View> */}
          {/* --------------------------  star section commented ---------------------------------- */}
        </ScrollView>
      </View>
    );
  };

  return setupplaylist();
}

const onShare = async () => {
  try {
    const result = await Share.share({
      title: 'Almost Everything',
      message:
        'Hello Nanba, This app is really good. Have a look - https://play.google.com/store/apps/details?id=com.almosteverything.booksummaries.podcasts.audiobooksapp',
      url:
        'https://play.google.com/store/apps/details?id=com.almosteverything.booksummaries.podcasts.audiobooksapp',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    //alert(error.message);
  }
};

PlaylistScreen.navigationOptions = ({ navigation }) => ({
  title: '',
  headerLeft: (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Image
          style={{ width: 30, height: '10%', marginLeft: 15, paddingBottom: 30 }}
          source={require('../images/backwhite.png')}
        />
      </TouchableOpacity>
    </View>
  ),
  headerRight: (
    <TouchableOpacity
      style={{ paddingHorizontal: 5, marginRight: 5 }}
      onPress={() => onShare()}>
      {/* <SvgUri
          style={{marginRight: 15}}
          width="20"
          height="30"
          uri="https://mayduke.in/demo/audiobook/svg/Shareicon.svg"
        /> */}
      <AntDesign name="sharealt" size={22} color="#fff" />
    </TouchableOpacity>
  ),
  headerTintColor: '#ffffff',
  style: {
    height: 100,
    paddingBottom: 80,
  },
  headerStyle: {
    backgroundColor: '#2F95D6',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 3,
  },
  headerTitleStyle: {
    fontSize: 18,
  },
});

function getStateName(state) {
  switch (state) {
    case TrackPlayer.STATE_NONE:
      return 'None';
    case TrackPlayer.STATE_PLAYING:
      return 'Playing';
    case TrackPlayer.STATE_PAUSED:
      return 'Paused';
    case TrackPlayer.STATE_STOPPED:
      return 'Stopped';
    case TrackPlayer.STATE_BUFFERING:
      return 'Buffering';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#000',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 120,
  },
  description: {
    width: '80%',
    marginTop: 20,
    textAlign: 'center',
  },
  player: {
    marginTop: 5,
  },
  state: {
    marginTop: 20,
  },
  trackList: {
    // borderBottomWidth: 1,
    // borderColor: 'rgba(158, 150, 150, .5)',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  trackListContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  hzLine: { height: 1, backgroundColor: 'rgba(158, 150, 150, .5)' }
});
