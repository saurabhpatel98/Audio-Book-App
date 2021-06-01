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
import {Icon} from 'native-base';
// import {connect} from '../recontext/store';
import {AnimatedHeading, Text} from '../components/Typos';
import AnimatedFlatList from '../components/AnimatedFlatList';
import PrimaryHeader from '../components/PrimaryHeader';
import CardBook from '../components/CardBook';
import PlaylistScreen from '../screens/PlaylistScreen';
import RnmSc from '../screens/BookScreen';
import {colors, metrics} from '../utils/themes';
import Api from '../helpers/Api';
import Header from '../components/Header';
import zget from 'zget';
import axios from 'axios';
import {connect} from 'react-redux';
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
var type = '';
class HomeScreen extends PureComponent {
  constructor(props) {
    type = zget(props, 'navigation.state.params.type');
    //  subid = zget(props, 'navigation.state.params.subscriptionid');
    // expirydat = zget(props, 'navigation.state.params.expirydat');
    console.log('type');
    console.log(type);
    super(props);
    this.getcate = this.getcate.bind(this);
    this.state = {
      tableData: [],
      categorydata: [],
      isFocused: false,
      keyword: '',
      email: '',
    };

    this._contentOffset = new Animated.Value(0);
  }

  componentDidMount() {
    const {navigation} = this.props;
    const name = zget(this.props, 'navigation.state.params.id');
    console.log('kjkljkl' + name);
    this._navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content', true);

      const userf = {
        term: name,
      };
      this.getcate(userf);
    });
    // Api.loadRecentBooks();
    // Api.loadQuotes();

    this.setCurrentTrack();
  }
  getcate(userf) {
    axios
      .post(API_URL + 'searchbycategory', userf, {})
      .then(res => {
        this.state.categorydata = res.data.data;
        this.setState({
          // tableData: response.data
          tableData: res.data.data,
        });
        console.log('jhhhj', JSON.stringify(res.data.data));
      })
      .catch(error => console.log(error));

    //console.log(data);
  }
  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    const {subscriptionType} = this.props;
    // console.log('subscriptionType');
    // console.log(subscriptionType);
    const {navigation, quotes} = this.props;
    const randomQuoteKey = pickRandomProperty(quotes);
    const ids = zget(this.props, 'navigation.state.params.title');
    //  navigation.setOptions({ title: ids });
    //navigation.setParams({title: 'MyComponent'});
    //const categorydata=this.state;
    const {tableData} = this.state;
    const {isPlaying} = this.props;
    const {currentTrackImage} = this.props;
    const {currentAudiobookName} = this.props;
    const {email, rat} = this.state;
    const {currentTrack} = this.props;
    const {currentTrackTitle} = this.props;
    AsyncStorage.getItem('email').then(token => {
      this.state.email = token;
    });
    type = zget(this.props, 'navigation.state.params.type');
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
    navigateTo = item => {
      type = zget(this.props, 'navigation.state.params.type');
      //  subid = zget(props, 'navigation.state.params.subscriptionid');
      // expirydat = zget(props, 'navigation.state.params.expirydat');
      console.log('type');
      //  alert(type);
      let expirydate = AsyncStorage.getItem('expirydate').then(expirydate => {
        expirydate = expirydate;
      });
      let today = new Date();
      expirydate = new Date(expirydate);
      if (subscriptionType == 'PAID' && expirydate < today) {
        subscriptionType = 'FREE';
      }
      if (subscriptionType == 'PAID') {
        item.type == 'Paid';
        type = 'paid';
      }
      //  alert(type);
      //  alert(item.type);
      if (item.type == 'Free') {
        // this.props.navigation.navigate('MainView')
        const userf = {
          userid: email,
          audionbookid: item._id,
        };
        console.log(userf);
        console.log('userf1');
        axios
          .post(API_URL + 'getuserrating', userf)
          .then(res => {
            //console.log(res);
            // rat=res.data.data[0]['ratings'];
            let ratt = '0';
            if (res.data.data.length == 0) {
              ratt = 0;
            } else {
              ratt = res.data.data[0].ratings;
            }
            navigation.push('PlaylistScreen', {
              id: item.id,
              item: item,
              ratings: ratt,
            });
          })
          .catch(error => console.log(error));
      } else if (item.type == 'Paid') {
        if (type == 'free') {
          navigation.push('SubscribeScreen', {
            id: item.id,
            item: item,
          });
        } else if (type == 'paid') {
          const userf = {
            userid: email,
            audionbookid: item._id,
          };
          console.log(userf);
          console.log('userf');
          axios
            .post(API_URL + 'getuserrating', userf)
            .then(res => {
              //console.log(res);
              // rat=res.data.data[0]['ratings'];
              let ratt = '0';
              if (res.data.data.length == 0) {
                ratt = 0;
              } else {
                ratt = res.data.data[0].ratings;
              }
              navigation.push('PlaylistScreen', {
                id: item.id,
                item: item,
                ratings: ratt,
              });
            })
            .catch(error => console.log(error));
        }
      }
    };
    renderFavouites = props => {
      const {tableData} = this.state;
      return (
        <AnimatedFlatList
          data={tableData}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            console.warn('Hello ', item.type);
            return (
              <CardBook
                item={item}
                index={index % PAGE_SIZE}
                onPress={() => navigateTo(item)}
                subscriptionType={this.props.subscriptionType}
              />
            );
          }}
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
    return (
      <View style={styles.container}>
        {/* <StatusBar backgroundColor="#000" barStyle="light-content" /> */}

        {renderFavouites()}
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
                <View style={{flex: 1, paddingRight: 5}}>
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
/*
const mapStateToProps = state => ({
  books: state.categorydata,
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
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
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
