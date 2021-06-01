/* eslint-disable react-native/no-inline-styles */
/**
 * @format
 * @flow
 */
import React, {PureComponent} from 'react';
import {
  Animated,
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
// import {connect} from '../recontext/store';
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import {AnimatedHeading, Text} from '../components/Typos';
import AnimatedFlatList from '../components/AnimatedFlatList';
import PrimaryHeader from '../components/PrimaryHeader';
import CardBooks from '../components/CardBooks';
import PlaylistScreen from '../screens/PlaylistScreen';
import RnmSc from '../screens/BookScreen';
import {colors, metrics} from '../utils/themes';
import Api from '../helpers/Api';
import Header from '../components/Header';
import zget from 'zget';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
  playTrack,
  pauseTrack,
  setCurrentTrack,
  endPlayer,
} from '../../src/actions/google';
import {API_URL} from '../config';
const pickRandomProperty = obj => {
  var result;
  var count = 0;
  for (var prop in obj) {
    if (Math.random() < 1 / ++count) {
      result = prop;
    }
  }
  return result;
};
const playimg = require('../components/resources/play.png');
const pauseimg = require('../components/resources/pause.png');
export const crossIcon = require('../images/cross_icon.png');
const LOGO_SIZE = 24;
const HEADER_OFFSET = metrics.screenWidth / 2 - 20;
const PAGE_SIZE = 10;

class FavouriteScreen extends PureComponent {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'zds',
    };
  };

  constructor(props) {
    super(props);
    this.getcate = this.getcate.bind(this);
    this.state = {
      tableData: [],
      categorydata: [],
      isFocused: false,
      keyword: '',
    };

    this._contentOffset = new Animated.Value(0);
  }

  componentDidMount() {
    const {navigation} = this.props;
    /* this._navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content', true);
    });*/
    // Api.loadRecentBooks();
    // Api.loadQuotes();

    const name = zget(this.props, 'navigation.state.params.id');
    console.log('kjkljkl' + name);
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      AsyncStorage.getItem('email').then(email => {
        const userf = {
          email: email,
        };

        this.getcate(userf);
      });
      //Put your Data loading function here instead of my this.LoadData()
    });

    this.setCurrentTrack();
  }
  getcate(userf) {
    console.log(userf);
    axios
      .post(API_URL + 'getfavourites', userf, {})
      .then(res => {
        console.log('jhhhj', res?.data?.data);

        this.state.categorydata = res;
        this.setState({
          // tableData: response.data
          tableData: res?.data?.data,
        });
      })
      .catch(error => console.log(error));
    //console.log(data);
  }
  componentWillMount() {
    // this._navListener.remove();
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      AsyncStorage.getItem('email').then(email => {
        const userf = {
          email: email,
        };

        this.getcate(userf);
      });
      //Put your Data loading function here instead of my this.LoadData()
    });
  }
  renderFavouites = props => {
    const {tableData} = this.state;
    return (
      <AnimatedFlatList
        data={tableData}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <CardBooks
            item={item}
            index={index % PAGE_SIZE}
            onPress={() =>
              // this.props.navigation.navigate('MainView')
              this.props.navigation.navigate('PlaylistScreen', {
                id: item.id,
                item: item,
              })
            }
          />
        )}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: this._contentOffset}},
            },
          ],
          {useNativeDriver: true},
        )}
      />
    );
  };

  render() {
    const {navigation, quotes, tableData} = this.props;
    const randomQuoteKey = pickRandomProperty(quotes);
    const {isPlaying} = this.props;
    const {currentTrackImage} = this.props;
    const {currentAudiobookName} = this.props;

    const {currentTrack} = this.props;
    const {currentTrackTitle} = this.props;
    //navigation.setParams({title: 'MyComponent'});
    //const categorydata=this.state;

    console.log('jjjkjk' + this.state.tableData);
    const animatedY = this._contentOffset.interpolate({
      inputRange: [-metrics.screenHeight / 2, 0, metrics.headerHeight],
      outputRange: [
        metrics.headerHeight - 10,
        -metrics.headerHeight,
        -metrics.headerHeightX2,
      ],
      extrapolate: 'clamp',
    });

    const fadeOutAnimation = {
      opacity: this._contentOffset.interpolate({
        inputRange: [0, metrics.headerHeight * 0.5, metrics.headerHeight],
        outputRange: [1, 0.2, 0],
        extrapolate: 'clamp',
      }),
    };

    const fadeInAnimation = {
      opacity: this._contentOffset.interpolate({
        inputRange: [0, metrics.headerHeight * 0.8, metrics.headerHeight],
        outputRange: [0.2, 0.5, 1],
        extrapolate: 'clamp',
      }),
    };

    const scaleAnimation = {
      scale: this._contentOffset.interpolate({
        inputRange: [0, metrics.headerHeight * 0.8, metrics.headerHeight],
        outputRange: [1, 2, 1],
        extrapolate: 'clamp',
      }),
    };

    const titleLeftAnimation = {
      transform: [
        {
          translateX: this._contentOffset.interpolate({
            inputRange: [0, metrics.headerHeight],
            outputRange: [-HEADER_OFFSET + 40, 0],
            extrapolate: 'clamp',
          }),
        },
        scaleAnimation,
      ],
    };

    const titleRightAnimation = {
      transform: [
        {
          translateX: this._contentOffset.interpolate({
            inputRange: [0, metrics.headerHeight],
            outputRange: [HEADER_OFFSET, 0],
            extrapolate: 'clamp',
          }),
        },
        scaleAnimation,
      ],
    };

    return (
      <View style={styles.container}>
        {/* <StatusBar
                backgroundColor="#000"
                barStyle="light-content"
            /> */}

        {this.renderFavouites()}

        <View>
          {isPlaying == 'Play' ||
          isPlaying == 'Pause' ||
          isPlaying == 'STARTED_PLAY' ? (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.push('PlaylistScreen', {
                  // id: rowData._id,
                  item: this.props.trackData?.item,
                  ratings: this.props.trackData?.ratingsvalue,
                  type: 'mini',
                });
              }}
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                backgroundColor: '#292929',
                borderColor: 'rgba(255, 255, 255, 0.6)',
                borderBottomWidth: 0.5,
                // marginBottom: 1,
                // paddingLeft: 10,
              }}>
              <View
                style={{
                  // paddingTop: 8,
                  flexDirection: 'row',
                  // justifyContent:'space-around',
                  alignItems: 'center',
                  paddingRight: 10,
                }}>
                <Image
                  source={{uri: this.props.currentTrackImage}}
                  style={{width: 55, height: 55}}
                />
                <View style={{flex: 1}}>
                  <Text style={{color: 'white', paddingLeft: 20, fontSize: 14}}>
                    {currentAudiobookName}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      opacity: 0.7,
                      paddingLeft: 20,
                    }}>
                    {currentTrackTitle}
                  </Text>
                </View>
                <View
                  style={
                    {
                      // justifyContent: 'flex-end',
                      // position: 'absolute',
                      // right: 20,
                      // marginTop: 20,
                    }
                  }>
                  {isPlaying == 'Play' ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.pause();
                      }}>
                      <Icon
                        name="pause"
                        type="MaterialCommunityIcons"
                        style={[
                          {color: 'white', fontSize: 28, marginHorizontal: 15},
                        ]}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        this.play();
                      }}>
                      <Icon
                        name="play"
                        type="MaterialCommunityIcons"
                        style={[
                          {color: 'white', fontSize: 28, marginHorizontal: 15},
                        ]}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.endPlayer();
                  }}>
                  <Icon
                    name="close"
                    type="AntDesign"
                    style={[
                      {color: 'white', fontSize: 28, marginHorizontal: 15},
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }
  pause = async () => {
    await this.props.pause();
  };
  play = async () => {
    await this.props.play();
  };
  setCurrentTrack = async () => {
    await this.props.setCurrentTrack();
  };
  endPlayer = async () => {
    await this.props.endPlayer();
  };
}

/* const mapStateToProps = state => ({
  books: state.tableData,
  quotes: state.quotes,
});
 */
const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    play: async () => dispatch(playTrack()),
    pause: async () => dispatch(pauseTrack()),
    setCurrentTrack: async () => dispatch(setCurrentTrack()),
    endPlayer: async () => dispatch(endPlayer()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavouriteScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop:0,
    // marginTop:0,
    backgroundColor: '#f4f5f9',
  },
  headerTitle: {
    position: 'absolute',
    bottom: 0,
    width: metrics.screenWidth,
    padding: metrics.lessPadding,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerText: {
    position: 'absolute',
    bottom: 0,
    width: metrics.screenWidth,
    paddingHorizontal: metrics.extraPadding,
    paddingVertical: metrics.lessPadding,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    marginHorizontal: metrics.lessPadding,
  },
  textWhite: {
    color: colors.white,
  },
  list: {
    flex: 1,
  },
  headerComponent: {
    //height: metrics.headerHeightX2,
  },
});
