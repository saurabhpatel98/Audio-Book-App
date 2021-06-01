/**
 * @format
 * @flow
 */
import React, { PureComponent } from 'react';
import {
  ScrollView,
  Animated,
  View,
  Slider,
  Alert,
  Platform,
  TouchableOpacity,
  StatusBar,
  StyleSheet, Image,
} from 'react-native';
import zget from 'zget';
import Sound from 'react-native-sound';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from '../recontext/store';
import Header from '../components/Header';
import BookCover from '../components/BookCover';
import Category from '../components/Category';
import StarRating from '../components/StarRating';
import FooterSpace from '../components/FooterSpace';
import Reviews from '../components/Reviews';
import ButtonNewReview from '../components/ButtonNewReview';
import { Title, Text, SubText, TextButton } from '../components/Typos';
import { Icon } from 'react-native-elements';
import { colors, metrics } from '../utils/themes';
import ButtonPlay from '../components/ButtonPlay';
import SectionHeader from '../components/SectionHeader';
import PlayerControl from '../helpers/PlayerControl';
import PLAYER_STATUS from '../utils/playerStatus';
const img_speaker = require('./resources/play.png');
const img_pause = require('./resources/play.png');
const img_play = require('./resources/play.png');
const img_playjumpleft = require('./resources/play.png');
const img_playjumpright = require('./resources/play.png');
const Playerprevicon = require('./resources/play.png');
const Playernexticon = require('./resources/play.png');

class BookScreen extends PureComponent {
  constructor(props) {
    super(props);
    this._contentOffset = new Animated.Value(0);
    this.play = this.play.bind(this);

    this.pause = this.pause.bind(this);
    this.playsound = this.playsound.bind(this);
    this.state = {
      collapsed: true,
      playState: 'paused', //playing, paused
      playSeconds: 0,
      duration: 0
    };

    this.sliderEditing = false;
  }

  /* componentDidMount() {
   
   }
 
   componentWillUnmount() {
     this._navListener.remove();
   }*/
  componentDidMount() {
    const { navigation, player } = this.props;
    this._navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content', true);
    });
    if (!player.book) {
      //  this.play(0);
    }


    this.timeout = setInterval(() => {
      if (this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing) {
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState({ playSeconds: seconds });
        })
      }
    }, 100);
    this.pause();
    //this.setState({playSeconds:seconds});
  }
  componentWillUnmount() {
    if (this.sound) {
      this.sound.release();
      this.sound = null;
    }
    if (this.timeout) {
      clearInterval(this.timeout);
    }
    this._navListener.remove();
  }

  play(trackIndex = 0) {
    const item = zget(this.props, 'navigation.state.params.item');
    // PlayerControl.load(item, trackIndex);
    const track = zget(item, ['tracks', trackIndex]);

    if (this.sound) {
      this.sound.play(this.playComplete);
      this.setState({ playState: 'playing' });
      this.playsound('play');
    } else {
      // const filepath = zget(this.props, 'navigation.state.params.item');
      console.log('[Play]', track.link);

      this.sound = new Sound(track.link, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          Alert.alert('Notice', 'audio file error. (Error code : 1)');
          this.setState({ playState: 'paused' });
        } else {
          this.setState({ playState: 'playing', duration: this.sound.getDuration() });
          this.sound.play(this.playComplete);
        }
      });
    }
  }
  pause() {

    //alert("kjhh");
    if (this.sound) {
      this.sound.pause();
      if (this.state.playState == 'playing') {
        this.setState({ playState: 'paused' });
        this.state.playState = 'paused';
      }
      //this.sound.setCurrentTime(0);
    }
    this.setState({ playState: 'paused', playSeconds: 0 });
    //this.sound.setCurrentTime(0);
    console.log(this.state.playState);
    //
    this.playsound('pause');

  }
  playsound(playstate) {
    const { playState } = this.state;
    if (this.state.playState == 'playing') {
      return (

        <TouchableOpacity onPress={() => this.pause} style={{ marginHorizontal: 20 }}>
          <Image source={img_pause} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>


      );
    }
    else {
      return (
        <TouchableOpacity onPress={() => this.play(0)} style={{ marginHorizontal: 20 }}>
          <Image source={img_play} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      );
    }
  }



  onSliderEditStart = () => {
    this.sliderEditing = true;
  }
  onSliderEditEnd = () => {
    this.sliderEditing = false;
  }
  onSliderEditing = value => {
    if (this.sound) {
      this.sound.setCurrentTime(value);
      this.setState({ playSeconds: value });
    }
  }

  /*   play = async (trackIndex = 0) => {
      const item = zget(this.props, 'navigation.state.params.item');
     //PlayerControl.load(item, trackIndex);
 	
 	
 	
         if(this.sound){
             this.sound.play(this.playComplete);
             this.setState({playState:'playing'});
         }else{
             const filepath = zget(this.props, 'navigation.state.params.item');
             console.log('[Play]', filepath.link);
     
             this.sound = new Sound(filepath.link, '', (error) => {
                 if (error) {
                     console.log('failed to load the sound', error);
                     Alert.alert('Notice', 'audio file error. (Error code : 1)');
                     this.setState({playState:'paused'});
                 }else{
                     this.setState({playState:'playing', duration:this.sound.getDuration()});
                     this.sound.play(this.playComplete);
                 }
             });    
         }
     }
    pause = () => {
         if(this.sound){
             this.sound.pause();
         }
 
         this.setState({playState:'paused'});
     }
 	
   */
  playComplete = (success) => {
    if (this.sound) {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        Alert.alert('Notice', 'audio file error. (Error code : 2)');
      }
      this.setState({ playState: 'paused', playSeconds: 0 });
      this.sound.setCurrentTime(0);
    }
  }



  jumpPrev15Seconds = () => { this.jumpSeconds(-15); }
  jumpNext15Seconds = () => { this.jumpSeconds(15); }
  jumpSeconds = (secsDelta) => {
    if (this.sound) {
      this.sound.getCurrentTime((secs, isPlaying) => {
        let nextSecs = secs + secsDelta;
        if (nextSecs < 0) nextSecs = 0;
        else if (nextSecs > this.state.duration) nextSecs = this.state.duration;
        this.sound.setCurrentTime(nextSecs);
        this.setState({ playSeconds: nextSecs });
      })
    }
  }

  getAudioTimeString(seconds) {
    const h = parseInt(seconds / (60 * 60));
    const m = parseInt(seconds % (60 * 60) / 60);
    const s = parseInt(seconds % 60);

    return ((h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
  }

  render() {
    const { navigation, player } = this.props;
    const { collapsed } = this.state;
    const { playState } = this.state;
    const item = navigation.state.params.item;

    const isPlaying = player.status === PLAYER_STATUS.P && zget(player, 'book.id') === item._id;
    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);

    return (
      <View style={styles.container}>
        <Animated.ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.list}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: this._contentOffset } },
              },
            ],
            { useNativeDriver: true },
          )}>
          <View style={{ paddingLeft: 15, paddingTop: 15 }}>


            <Image
              style={{ height: 360, width: 300 }}
              source={{ uri: item.image }}
            />

          </View>
          <View style={{ paddingLeft: 15, paddingTop: 15, flexDirection: 'row', flex: 1, }}>
            <Title numberOfLines={3} style={{ color: colors.white }}>{item.name}</Title>
            <View style={{ alignSelf: 'flex-end' }}>

              <Feather
                name="heart"
                size={24}
                color={colors.primary}
                style={styles.chapterIcon}
              /></View>
          </View>
          <ScrollView style={styles.playlist}>
            {item.tracks &&
              item.tracks.map((track, index) => (
                <TouchableOpacity key={index}>
                  <View style={styles.chapter}>
                    <Feather
                      name="play-circle"
                      size={24}
                      color={colors.primary}
                      style={styles.chapterIcon}
                    />
                    <View>
                      <TextButton>{track.title}</TextButton>

                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>

          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}>
            <View style={{ marginVertical: 15, marginHorizontal: 15, flexDirection: 'row' }}>
              <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString}</Text>
              <Slider
                onTouchStart={this.onSliderEditStart}
                // onTouchMove={() => console.log('onTouchMove')}
                onTouchEnd={this.onSliderEditEnd}
                // onTouchEndCapture={() => console.log('onTouchEndCapture')}
                // onTouchCancel={() => console.log('onTouchCancel')}
                onValueChange={this.onSliderEditing}
                value={this.state.playSeconds} maximumValue={this.state.duration} maximumTrackTintColor='gray' minimumTrackTintColor='white' thumbTintColor='white'
                style={{ flex: 1, alignSelf: 'center', marginHorizontal: Platform.select({ ios: 5 }) }} />
              <Text style={{ color: 'white', alignSelf: 'center' }}>{durationString}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 15 }}>
              <TouchableOpacity onPress={this.jumpPrev15Seconds} style={{ justifyContent: 'center' }}>
                <Image source={img_playjumpleft} style={{ width: 30, height: 30 }} />
                <Text style={{ position: 'absolute', alignSelf: 'center', marginTop: 1, color: 'white', fontSize: 12 }}>15</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.jumpNext15Seconds} style={{ justifyContent: 'center', marginLeft: 30, paddingRight: 30 }}>
                <Image source={Playerprevicon} style={{ width: 30, height: 30 }} />
                <Text style={{ position: 'absolute', alignSelf: 'center', marginTop: 1, color: 'white', fontSize: 12 }}></Text>
              </TouchableOpacity>

              {playState == 'playing' &&
                <TouchableOpacity onPress={() => this.pause()} style={{ marginHorizontal: 20 }}>
                  <Image source={img_pause} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>}
              {playState == 'paused' &&
                <TouchableOpacity onPress={() => this.play(0)} style={{ marginHorizontal: 20 }}>
                  <Image source={img_play} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>}

              <TouchableOpacity onPress={this.jumpNext15Seconds} style={{ justifyContent: 'center', marginLeft: 30, paddingRight: 30 }}>
                <Image source={Playernexticon} style={{ width: 30, height: 30, paddingRight: 30 }} />
                <Text style={{ position: 'absolute', alignSelf: 'center', marginTop: 1, color: 'white', fontSize: 12 }}></Text>
              </TouchableOpacity>


              <TouchableOpacity onPress={this.jumpNext15Seconds} style={{ justifyContent: 'center' }}>
                <Image source={img_playjumpright} style={{ width: 30, height: 30 }} />
                <Text style={{ position: 'absolute', alignSelf: 'center', marginTop: 1, color: 'white', fontSize: 12 }}>15</Text>
              </TouchableOpacity>
            </View>

          </View>





          <StarRating rating={item.rating} />
          <FooterSpace />
        </Animated.ScrollView>
        <Header
          title={item.name}
          rightButton={{
            onPress: () => this.play(0),
            iconName: 'share',
          }}
          animatedY={this._contentOffset.interpolate({
            inputRange: [0, 70],
            outputRange: [60, 0],
            extrapolate: 'clamp',
          })}
          animatedOpacity={this._contentOffset.interpolate({
            inputRange: [0, 60, 70],
            outputRange: [0, 0.3, 1],
            extrapolate: 'clamp',
          })}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(mapStateToProps)(BookScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingTop: metrics.headerHeight,
  },
  list: {
    padding: metrics.lessPadding,
  },
  paddingLeft: {
    alignItems: 'center',
    paddingLeft: metrics.coverWidth + metrics.padding,
    paddingBottom: metrics.padding,
    minHeight: metrics.coverHeight,
  },
  chapter: {
    paddingTop: metrics.lessPadding,
    flexDirection: 'row',
  },
  chapterIcon: {
    marginHorizontal: metrics.lessPadding,
  },
});
