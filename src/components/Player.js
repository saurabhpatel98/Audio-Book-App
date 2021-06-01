import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TrackPlayer, {
  useTrackPlayerProgress,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Slider from 'react-native-slider';
import { useDispatch, useSelector } from 'react-redux';
import StarRating from './StarRating';
import { colors, metrics } from '../utils/themes';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SvgUri } from 'react-native-svg';
import {
  Image,
  StyleSheet,
  Text,
  AnimatedIcon,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';
import Award from './resources/play.png';
import { Dimensions } from 'react-native';
import { setCurrentTrack } from '../actions/google';
const img_speaker = require('./resources/play.png');
const img_pause = require('./resources/pause.png');
const img_play = require('./resources/play.png');
const img_playjumpleft = require('./resources/prev10.png');
const img_playjumpright = require('./resources/next10.png');
const Playerprevicon = require('./resources/prev.png');
const Playernexticon = require('./resources/next.png');
const Bookicon = require('./resources/Bookicon.png');
function ProgressBar(props) {
  const progress = useTrackPlayerProgress();
  //const { position, buffe redPosition, duration } = useTrackPlayerProgress()

  const { onSeek } = props;

  return (
    <View style={styles.progress}>
      <View style={{ flex: progress.position, backgroundColor: 'green' }} />

      <Slider
        style={{ width: '120%', height: 30, borderWidth: 0, borderColor: '#fff' }}
        minimumValue={0}
        maximumValue={progress.duration}
        value={progress.position}
        onSlidingComplete={value => {
          onSeek(value);
        }}
        minimumTrackTintColor="#11c64b"
        maximumTrackTintColor="grey"
        thumbTintColor="white"
      />
      <View
        style={{
          flex: progress.duration - progress.position,
          backgroundColor: 'grey',
        }}
      />
    </View>
  );
}

durationCounter = async () => {
  clearInterval(this.timer);
  this.timer = setInterval(async () => {
    const songCurrent = await TrackPlayer.getPosition();
    const current = this.GetMinsSec(songCurrent);
    this.setState({
      currentTime: {
        min: current.minutes,
        sec: current.seconds,
        total: songCurrent,
      },
    });
  }, 500);
};


const getTrackRate = async () => {
  const rate = await TrackPlayer.getRate()
};

/*function ControlButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer,{marginLeft:35}} onPress={onPress}>

    <SvgUri
    width="20"
    height="30"
    uri={title}
  />
    </TouchableOpacity>
  );
}
function ControlButton2({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer,{marginLeft:30}} onPress={onPress}>

  <SvgUri
    width="60"
    height="50"
    uri={title}
  />
    </TouchableOpacity>
  );
}*/
function ControlButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      {/* <Image source={title} style={{width: 20, height: 20}} /> */}
      <MaterialIcons name={title} color="#fff" style={{ fontSize: 35 }} />
    </TouchableOpacity>
  );
}
function ControlButton2({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      {/* <Image source={title} style={{width: 55, height: 55}} /> */}
      <AntDesign name={title} color="#fff" style={{ fontSize: 60 }} />
    </TouchableOpacity>
  );
}

function SpeedButton({ title, onPress, otherStyle, disabled }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.playbackTouch} disabled={disabled}>
      <Text style={[styles.playbackText, otherStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

ControlButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default function Player(props) {
  const data = useSelector(state => state);
  // console.log('playbackStateeeeeeee')
  let playbackState = usePlaybackState();
  // console.log('playbackState')
  // console.log(playbackState)
  const dispatch = useDispatch();

  useEffect(() => {
    console.warn('Use effect working');

    dispatch(setCurrentTrack());

    if (playbackState === 1) {
      onTogglePlayback();
    }

    // const dispatch = useDispatch();
    // dispatch(setCurrentTrack());
    props.getTotalDuration();
  }, [dispatch, onTogglePlayback, playbackState, data?.currentTrackTitle]);

  // useTrackPlayerEvents(['playback-track-changed'], async event => {
  //   if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
  //     let track = await TrackPlayer.getTrack(event.nextTrack);
  //     let {title} = track || {};
  //     setTrackTitle(title);
  //     setTrackArtist(title);
  //     setTrackArtwork(title);
  //     // console.warn(title);

  //     props.getTotalDuration();
  //   }
  // });

  // useEffect(async () => {
  //   // const songTotalTime = await TrackPlayer.getDuration();
  //   // console.warn("Song total time",songTotalTime);
  //   // // const totalTime = this.GetMinsSec(songTotalTime);
  //   // setDuration({
  //   //   min: totalTime.minutes,
  //   //   sec: totalTime.seconds,
  //   //   total: JSON.parse(songTotalTime.toFixed(0)),
  //   // });
  // }, []);

  let {
    style,
    onNext,
    onPrevious,
    onTogglePlayback,
    onBack,
    onForward,
    onSeek,
    setPlaybackRate,
    playerSpeed
  } = props;

  var middleButtonText = 'play';

  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    middleButtonText = 'pausecircle';
  } //console.log(123123)
  const { liked } = props;
  const { item, onPress } = props;
  const AnimatedIcon = Animatable.createAnimatableComponent(Icon);
  return (
    <View style={[styles.card, style]}>
      <View style={{ paddingTop: 0, marginTop: 0 }}>
        <Text style={styles.title}>
          <Image
            source={Bookicon}
            style={{ width: 15, height: 15, paddingLeft: 10 }}
          />

          <Text style={(styles.title, { paddingLeft: 30, marginLeft: 30 })}>
            {'   '}
            {data?.currentTrackTitle}
          </Text>
        </Text>
      </View>
      <View style={{ marginLeft: 15 }}>
        <ProgressBar onSeek={onSeek} />
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '84%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ color: '#fff' }}>
            {props.position?.min ? `0${props.position?.min}`.slice(-2) : '00'} :
            {props.position?.sec ? `0${props.position?.sec}`.slice(-2) : '00'}
          </Text>
          <Text style={{ color: '#fff' }}>
            {props.totalDuration?.min
              ? `0${props.totalDuration?.min}`.slice(-2)
              : '00'}{' '}
            :{' '}
            {props.totalDuration?.sec
              ? `0${props.totalDuration?.sec}`.slice(-2)
              : '00'}
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: Dimensions.get('screen').width,
          height: 120,
          marginVertical: 20,
        }}>
        <View style={styles.controls}>
                  {/*<ControlButton title='https://mayduke.in/demo/audiobook/svg/player_10_s_prev.svg' onPress={onBack} />
                <ControlButton  title='https://mayduke.in/demo/audiobook/svg/player_prev_icon.svg'  onPress={onPrevious} />
                <ControlButton2  title='https://mayduke.in/demo/audiobook/svg/player_play_icon.svg' onPress={onTogglePlayback} />
                <ControlButton  title='https://mayduke.in/demo/audiobook/svg/player_next_icon.svg'  onPress={onNext} />
            <ControlButton  title='https://mayduke.in/demo/audiobook/svg/player_10_s_next.svg'  onPress={onForward} />
          */}
          <ControlButton title="replay-10" onPress={onBack} />
          <ControlButton title="skip-previous" onPress={onPrevious} />
          <ControlButton2 title={middleButtonText} onPress={onTogglePlayback} />
          <ControlButton title="skip-next" onPress={onNext} />
          <ControlButton title="forward-10" onPress={onForward} />
        </View>
        <View style={[styles.controls, {marginTop: 10}]}>
          <SpeedButton title={'0.75X'} onPress={() => { setPlaybackRate(0.75) }} disabled={playerSpeed == 0.75}
            otherStyle={{
              color: playerSpeed == 0.75 ? '#30a960' : '#7e7e7e',
              fontWeight: playerSpeed == 0.75 ? 'bold' : 'normal'
            }}
          />
          <SpeedButton title={'1.00X'} onPress={() => { setPlaybackRate(1) }} disabled={playerSpeed == 1}
            otherStyle={{
              color: playerSpeed == 1 ? '#30a960' : '#7e7e7e',
              fontWeight: playerSpeed == 1 ? 'bold' : 'normal'
            }}
          />
          <SpeedButton title={'1.25X'} onPress={() => { setPlaybackRate(1.25) }} disabled={playerSpeed == 1.25}
            otherStyle={{
              color: playerSpeed == 1.25 ? '#30a960' : '#7e7e7e',
              fontWeight: playerSpeed == 1.25 ? 'bold' : 'normal'
            }}
          />
          <SpeedButton title={'1.50X'} onPress={() => { setPlaybackRate(1.5) }} disabled={playerSpeed == 1.5}
            otherStyle={{
              color: playerSpeed == 1.5 ? '#30a960' : '#7e7e7e',
              fontWeight: playerSpeed == 1.5 ? 'bold' : 'normal'
            }}
          />
          <SpeedButton title={'1.75X'} onPress={() => { setPlaybackRate(1.75) }} disabled={playerSpeed == 1.75}
            otherStyle={{
              color: playerSpeed == 1.75 ? '#30a960' : '#7e7e7e',
              fontWeight: playerSpeed == 1.75 ? 'bold' : 'normal'
            }}
          />
          <SpeedButton title={'2.00X'} onPress={() => { setPlaybackRate(2) }} disabled={playerSpeed == 2}
            otherStyle={{
              color: playerSpeed == 2 ? '#30a960' : '#7e7e7e',
              fontWeight: playerSpeed == 2 ? 'bold' : 'normal'
            }}
          />
        </View>
      </View>
    </View>
  );
}

Player.propTypes = {
  style: ViewPropTypes.style,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onTogglePlayback: PropTypes.func.isRequired,
};

Player.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    elevation: 1,
    borderRadius: 4,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    marginTop: 0,

    shadowColor: 'black',
    backgroundColor: 'black',
    shadowOffset: { width: 0, height: 1 },
  },
  cover: {
    width: 140,
    height: 140,
    marginTop: 20,
    backgroundColor: 'grey',
  },
  progress: {
    // height: 10,
    width: '80%',
    // marginTop: 10,

    flexDirection: 'row',
  },
  title: {
    marginTop: 1,
    marginLeft: 20,
    color: '#fff',
    textAlign: 'left',
    fontSize: 16,
    opacity: 0.7,
  },
  artist: {
    fontWeight: 'bold',
  },
  controls: {
    alignItems: 'center',
    // marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: 90,
    // marginBottom: 90,
    // marginLeft: 35,
    // backgroundColor: 'red',
    // paddingBottom: 20,
  },
  controlButtonContainer: {
    // flex: 1,
    paddingHorizontal: 15,
  },
  controlButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  playbackText: {
    fontSize: 12
  },
  playbackTouch: { paddingHorizontal: 7, paddingVertical: 20 }
});
