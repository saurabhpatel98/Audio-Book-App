/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
// import {connect} from '../recontext/store';
import {connect} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  FlatList,
  Button,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Text,
  TextInput,
  Keyboard,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Share,
  RefreshControl,
} from 'react-native';
import {Icon} from 'native-base';
import TabbarStack from '../tabbar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Card, Header} from 'react-native-elements';
import AnimatedFlatList from '../components/AnimatedFlatList';
import PrimaryHeader from '../components/PrimaryHeader';
import {AnimatedTitle, Title, Subtitle} from '../components/Typos';
import {colors, metrics} from '../utils/themes';
import {AnimatedHeading} from '../components/Typos';
import zget from 'zget';
import HomeScreen from './HomeScreen';
import AccountScreen from './AccountScreen';
import {
  playTrack,
  pauseTrack,
  setCurrentTrack,
  endPlayer,
} from '../../src/actions/google';
import {API_URL} from '../config';
const LOGO_SIZE = 24;
const HEADER_OFFSET = metrics.screenWidth / 2 - 10;
const PAGE_SIZE = 10;
const playimg = require('../components/resources/play.png');
const pauseimg = require('../components/resources/pause.png');
export const crossIcon = require('../images/cross_icon.png');
let screenHeight = Dimensions.get('window').height;

/* const mapStateToProps = state => ({
  books: state.books,
  quotes: state.quotes,
}); */
var subscriptionid = '';
var expirydate = '';
var acc = '';
var subid = '';
var expirydat = '';
class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);

    acc = zget(props, 'navigation.state.params.acc');
    subid = zget(props, 'navigation.state.params.subscriptionid');
    expirydat = zget(props, 'navigation.state.params.expirydat');
    this.getcate = this.getcate.bind(this);
    this.getallcate = this.getallcate.bind(this);
    this.state = {
      bannerData: [],
      tableData: [],
      categorydata: [],
      isFocused: false,
      name: '',
      email: '',
      user: [],
      username: '',
      rat: '',
      isloaded: false,
      keyword: '',
      recentAudio: [],
      popularAudio: [],
      refreshing: false,
    };
    console.log(AsyncStorage.getItem('email'));
    console.log(AsyncStorage.getItem('user'));
    //this.state.name=AsyncStorage.getItem('email');
    this._contentOffset = new Animated.Value(-metrics.headerHeight);
    this.onChangeText = this.onChangeText.bind(this);
    this.renderCategoryItem = this.renderCategoryItem.bind(this);
    this.onTextInputFocus = this.onTextInputFocus.bind(this);
    this.doClearKeywords = this.doClearKeywords.bind(this);
    //this._OnButtonPress = this._OnButtonPress.bind(this);
    AsyncStorage.getItem('email').then(token => {
      console.log('dddddddddddd');
      console.log(token);
      this.state.email = token;
    });
    AsyncStorage.getItem('name').then(name => {
      this.state.username = name;
    });
  }

  componentDidMount() {
    //const {navigation} = this.props;
    const {navigation} = this.props;
    /* this._navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content', true);
    });*/
    // Api.loadRecentBooks();
    //Api.loadQuotes();
    // alert("guguy");
    this.getBanner();
    this.getcate();
    this.getallcate();
    this.getRecentAudioBooks();
    this.getPopularAudioBooks();

    //console.log(data);
    AsyncStorage.getItem('email').then(token => {
      console.log('dddddddddddd');
      console.log(token);
      this.state.email = token;
    });
    AsyncStorage.getItem('name').then(name => {
      this.state.username = name;
    });
    this.setCurrentTrack();
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    this.getcate();
    this.getallcate();
    this.getRecentAudioBooks();
    this.getPopularAudioBooks();
  };

  getcate() {
    AsyncStorage.getItem('subscriptionid').then(subscriptionid => {
      subscriptionid = subscriptionid;
    });
    AsyncStorage.getItem('expirydate').then(expirydate => {
      expirydate = expirydate;
    });
    console.log('expirydate');
    console.log(expirydate);
    axios
      .get(API_URL + 'audiobook')
      .then(response => {
        this.state.data = response.data.data;
        // console.warn('get audio books', response);
        this.setState({
          isloaded: true,
          // tableData: response.data
          tableData: response.data.data,
        });
      })
      .catch(error => {
        console.log('error');
      });
    if (subscriptionid != '') {
      const user = {
        email: this.state.email,
        subscriptionid: subscriptionid,
      };
      console.log(user);
      axios
        .post(API_URL + 'getmysubscription', user)
        .then(response => {
          console.log('mysubscrition details');
          console.log(response);
        })
        .catch(error => {
          console.log('error');
        });
    }
    //console.log(data);
  }

  jewelStyle = function(options) {
    return {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: options,
      padding: 10,
      borderRadius: 5,
      marginRight: 12,
    };
  };

  getBanner = () => {
    axios
      .get(API_URL + 'banner')
      .then(response => {
        // console.log(JSON.stringify(response.data.data));
        this.setState({
          bannerData: response.data.data,
        });
      })
      .catch(error => {
        console.log('error');
      });
    //console.log(data);
  };

  getallcate() {
    axios
      .get(API_URL + 'category')
      .then(response => {
        this.state.data = response.data.data;
        this.setState({
          // tableData: response.data
          categorydata: response.data.data,
        });
      })
      .catch(error => {
        console.log('error');
      });
    //console.log(data);
  }

  onChangeText(text) {
    this.setState({
      keyword: text,
    });
  }

  onTextInputFocus() {
    this.setState({
      isFocused: true,
    });
    Animated.spring(this._contentOffset, {
      toValue: -metrics.headerHeightX2,
      useNativeDriver: true,
    }).start();
  }

  getRecentAudioBooks = async () => {
    try {
      let response = await axios.get(API_URL + 'recent_audiobooks');
      if (response.data.status == 200) {
        this.setState({
          recentAudio: response.data.data,
          refreshing: false,
        });
      }
      console.warn('Recent books response ', response);
    } catch (e) {
      console.warn('Get recent books error', e);
    }
  };

  getPopularAudioBooks = async () => {
    try {
      let response = await axios.get(API_URL + 'popular_audiobooks');
      if (response.data.status == 200) {
        this.setState({
          popularAudio: response.data.data,
          refreshing: false,
        });
      }
      console.warn('Recent books response ', response);
    } catch (e) {
      console.warn('Get recent books error', e);
    }
  };

  doClearKeywords() {
    this.setState({
      keyword: '',
      isFocused: false,
    });
    Keyboard.dismiss();
    Animated.spring(this._contentOffset, {
      toValue: -metrics.headerHeight,
      useNativeDriver: true,
    }).start();
  }

  renderCategoryItem({item}) {
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        key={item.key}
        onPress={() =>
          navigation.push('CategoryScreen', {
            category: item,
          })
        }>
        <View style={styles.category}>
          <Title>{item.name}</Title>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const AppNavigator = createAppContainer(TabbarStack);
    const {tableData} = this.state;
    const {categorydata} = this.state;
    const {isPlaying} = this.props;
    const {currentTrackImage} = this.props;
    const {currentAudiobookName} = this.props;

    const {currentTrack} = this.props;
    const {currentTrackTitle} = this.props;
    const {email, rat} = this.state;
    const {username} = this.state;
    AsyncStorage.getItem('email').then(token => {
      console.log('dddddddddddd');
      console.log(token);
      this.state.email = token;
    });
    AsyncStorage.getItem('name').then(name => {
      this.state.username = name;
    });
    console.log(':kjashjhsdaf');
    console.log(tableData);
    const {keyword, isFocused} = this.state;
    const {navigation, books, quotes} = this.props;
    const fadeOutAnimation = {
      opacity: this._contentOffset.interpolate({
        inputRange: [-metrics.headerHeightX2, -metrics.headerHeight],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    };
    const switchPageAnimation = {
      transform: [
        {
          translateY: this._contentOffset.interpolate({
            inputRange: [-metrics.headerHeightX2, -metrics.headerHeight],
            outputRange: [0, -metrics.screenHeight],
            extrapolateRight: 'clamp',
          }),
        },
      ],
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
    const fadeInAnimation = {
      opacity: this._contentOffset.interpolate({
        inputRange: [0, metrics.headerHeight * 0.8, metrics.headerHeight],
        outputRange: [0.2, 0.5, 1],
        extrapolate: 'clamp',
      }),
    };
    const backgroundImage = require('../images/bg.png');
    const searchfilter = require('../images/searchfilters.png');
    const donaldDuck = require('../images/audiobookicon.png');

    const animatedY = this._contentOffset.interpolate({
      inputRange: [-metrics.screenHeight / 2, 0, metrics.headerHeight],
      outputRange: [
        metrics.headerHeight - 10,
        -metrics.headerHeight,
        -metrics.headerHeightX2,
      ],
      extrapolate: 'clamp',
    });
    const renderCustomIconA = () => {
      const {navigation} = this.props;
      return (
        <View style={styles.searchContainers}>
          <TouchableOpacity
            onPress={() => onAcc()}
            //() => {console.log('fgfd');}
            // this.props.navigation.navigate('Account')}
            style={{flexDirection: 'row'}}>
            {/* <Image
              source={donaldDuck}
              onPress={() => {
                console.log('give link');
              }}
              resizeMode="contain"
              style={(styles.profileImg, {width: 30, height: 30})}
            /> */}
            <Icon name="menu" type="SimpleLineIcons" style={[{fontSize: 26}]} />
          </TouchableOpacity>
          <View style={{paddingLeft: 14, alignItems: 'center', width: '430%'}}>
            <Image
              source={donaldDuck}
              resizeMode="contain"
              style={(styles.profileImg, {width: 50, height: 50})}
            />
            {/* <Text
              style={{
                color: '#a5a8ad',
                fontSize: 13,
                fontWeight: 'bold',
                width: 200,
              }}>
              Hey, {username}
            </Text>
            <Text
              style={{color: colors.black, fontSize: 13, fontWeight: 'bold'}}>
              Welcome to Almost Everything
            </Text> */}
          </View>
        </View>
      );
    };

    const renderCustomIcon = () => {
      return (
        <TouchableOpacity
          onPress={() => {
            console.log('A Pressed!');
          }}
          style={{backgroundColor: '#eff2f7'}}>
          <View style={{paddingLeft: 0}}>
            <Text style={{color: '#a5a8ad', fontSize: 10, fontWeight: 'bold'}}>
              Hey Narmatha
            </Text>
            <Text
              style={{color: colors.black, fontSize: 6, fontWeight: 'bold'}}>
              Welcome to Almost Everthing
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    const renderCustomIconB = () => {
      return (
        <TouchableOpacity
          onPress={() => onShare()}
          style={{backgroundColor: '#F5F8FA', marginTop: 10}}>
          {/* <Image
            style={{width: 20, height: 20}}
            source={require('../images/black.png')}
          /> */}
          <AntDesign name="sharealt" size={22} />
        </TouchableOpacity>
      );
    };

    const onAcc = async () => {
      // this.props.navigation.navigate('AccountScreen');
      const {navigation} = this.props;
      this.props.navigation.navigate('AccountScreen');
      //	alert("dfhjdfhgkj");
    };

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
        //(error.message);
      }
    };

    const getCategory = () => {
      //const{navigation}=this.props;
      return (
        <View style={{paddingLeft: 10}}>
          <Text style={styles.baseText}>Audiobooks Category</Text>
          {/* <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 0,
              marginBottom: 0,
              // paddingLeft: 10,
              flexGrow: 1,
            }}
            style={{
              maxHeight: 5,
              // paddingLeft: 50,
              marginTop: 5,
              // marginLeft: 10,
            }}
          /> */}

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            // contentContainerStyle={{paddingTop: 0, marginTop: 0, flexGrow: 1}}
            style={{marginTop: 10}}
            data={categorydata}
            renderItem={({item: rowData}) => {
              return (
                <TouchableOpacity
                  style={this.jewelStyle(rowData.colorcode)}
                  onPress={() => {
                    console.log('CAt Pressed!');
                    console.log(rowData.name);
                    acc = zget(this.props, 'navigation.state.params.acc');
                    var type = '';
                    if (subscriptionid != '') {
                      type = 'paid';
                    } else {
                      type = 'free';
                    }

                    this.props.navigation.push(
                      'Home',
                      {
                        id: rowData.name,
                        item: rowData,
                        type: acc,
                        title: 'zcz',
                      },
                      {name: 'Custom profile header'},
                    );
                  }}>
                  <Image
                    source={{uri: rowData.img}}
                    resizeMode="contain"
                    style={styles.profileImg}
                  />
                  <View style={{paddingLeft: 10}}>
                    <Text
                      style={{color: '#fff', fontSize: 13, fontWeight: 'bold'}}>
                      {rowData.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
    };

    const getfree = () => {
      return (
        <View style={{paddingLeft: 10}}>
          <View style={[styles.navBar, {marginBottom: -3}]}>
            <View style={styles.leftContainer}>
              <Text style={[styles.baseText, {textAlign: 'left'}]}>
                Free Summaries
              </Text>
            </View>

            <View style={styles.rightContainer} />
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            // contentContainerStyle={{paddingTop: 0, marginTop: 0, flexGrow: 1}}
            style={{}}
            data={tableData}
            renderItem={({item: rowData}) => {
              if (rowData.type == 'Free') {
                return (
                  <TouchableOpacity
                    key={rowData._id}
                    onPress={() => {
                      const userf = {
                        userid: email,
                        audionbookid: rowData._id,
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
                          this.props.navigation.push('PlaylistScreen', {
                            // id: rowData._id,
                            item: rowData,
                            ratings: ratt,
                          });
                          //  playlistDatads.push([{'rat':res.data.data[0]['ratings']}]);
                        })
                        .catch(error => console.log(error));
                      console.log('CAt Pressed!');
                      // console.log(rowData._id);

                      //  console.log("rating");

                      // console.log(rat);
                    }}>
                    <Card
                      containerStyle={{
                        // display: 'flex',
                        margin: 0,
                        padding: 0,
                        paddingRight: 5,
                        // height: '100%',
                        elevation: 0,
                        borderColor: '#F5F8FA',
                        bottom: 0,
                        backgroundColor: '#F5F8FA',
                        flexDirection: 'row',
                        borderBottomWidth: 0.5,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      button={true}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#eee',
                        }}>
                        <View
                          style={{
                            backgroundColor: '#F5F8FA',
                            overflow: 'hidden',
                            paddingTop: 5,
                          }}>
                          <View>
                            <Image
                              source={{uri: rowData.image}}
                              style={{
                                height: 200,
                                resizeMode: 'cover',
                                width: 150,
                                padding: 33,
                                borderRadius: 3,
                              }}
                            />
                          </View>
                          <View style={{padding: 0, width: 130, flex: 1}}>
                            <Text numberOfLines={1}>{rowData.name}</Text>
                          </View>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              }
            }}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
    };

    const getpremium = props => {
      return (
        <View style={{paddingLeft: 10}}>
          <View style={styles.navBar}>
            <View style={styles.leftContainer}>
              <Text style={[styles.baseText, {textAlign: 'left'}]}>
                Premium Summaries
              </Text>
            </View>

            <View style={styles.rightContainer} />
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            // contentContainerStyle={{paddingTop: 0, marginTop: 0, flexGrow: 1}}
            style={{}}
            data={tableData}
            renderItem={({item: rowData}) => {
              console.log(rowData.type);
              if (rowData.type == 'Paid') {
                return (
                  <TouchableOpacity
                    key={rowData._id}
                    onPress={() => {
                      const userf = {
                        userid: email,
                        audionbookid: rowData._id,
                      };
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
                          acc = zget(props, 'navigation.state.params.acc');
                          var type = '';
                          if (this.props.subscriptionType == 'FREE') {
                            type = 'free';
                          } else {
                            type = 'paid';
                          }
                          type == 'free'
                            ? navigation.push('SubscribeScreen', {
                                id: rowData._id,
                                item: rowData,
                                ratings: ratt,
                              })
                            : navigation.push('PlaylistScreen', {
                                // id: rowData._id,
                                item: rowData,
                                ratings: ratt,
                              });

                          //  playlistDatads.push([{'rat':res.data.data[0]['ratings']}]);
                        })
                        .catch(error => console.log(error));
                      console.log('CAt Pressed!');
                      // console.log(rowData._id);

                      //  console.log("rating");

                      // console.log(rat);
                    }}>
                    <Card
                      containerStyle={{
                        // display: 'flex',
                        margin: 0,
                        padding: 0,
                        paddingRight: 5,
                        // height: '100%',
                        elevation: 0,
                        borderColor: '#F5F8FA',
                        bottom: 0,
                        backgroundColor: '#F5F8FA',
                        flexDirection: 'row',
                        borderBottomWidth: 0.5,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      button={true}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#eee',
                        }}>
                        <View
                          style={{
                            backgroundColor: '#F5F8FA',
                            overflow: 'hidden',
                            paddingTop: 5,
                          }}>
                          <View>
                            <Image
                              source={{uri: rowData.image}}
                              style={{
                                height: 200,
                                resizeMode: 'cover',
                                width: 150,
                                padding: 33,
                                borderRadius: 3,
                              }}
                            />
                          </View>
                          <View
                            style={{
                              padding: 4,
                              paddingLeft: 0,
                              width: 130,
                              flex: 1,
                            }}>
                            <Text numberOfLines={1}>{rowData.name}</Text>
                            <View
                              style={{
                                position: 'absolute',
                                right: -18,
                                padding: 3,
                              }}>
                              {rowData.type == 'Paid' &&
                              this.props.subscriptionType == 'FREE' ? (
                                <Image
                                  source={require('./resources/lock.png')}
                                  style={{width: 15, height: 19}}
                                />
                              ) : null}
                            </View>
                          </View>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              }
            }}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
    };

    return (
      //!this.state.isloaded?"Loading.": (

      <View style={{flex: 1, backgroundColor: '#F5F8FA'}}>
        {/* <StatusBar backgroundColor="#000" barStyle="light-content" /> */}
        <Header
          statusBarProps={{backgroundColor: '#000', barStyle: 'light-content'}}
          containerStyle={{
            backgroundColor: '#F5F8FA',
            width: '100%',
            // paddingLeft: 20,
            marginTop: StatusBar.currentHeight,
            borderColor: '#E0E0E0',
            borderBottomWidth: 1,
          }}
          leftComponent={() => renderCustomIconA()}
          rightComponent={() => renderCustomIconB()}
        />

        <ScrollView
          style={{backgroundColor: '#F5F8FA'}}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          {this.state.bannerData?.[0] && (
            <View style={styles.searchContainer}>
              {this.props.subscriptionType === 'FREE' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.push('SubscribeScreen');
                  }}
                  style={{
                    backgroundColor: '#F5F8FA',
                    height: 150,
                    width: '95%',
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}>
                  <Image
                    source={{uri: this.state.bannerData?.[0]?.free}}
                    style={styles.image}
                  />
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    backgroundColor: '#F5F8FA',
                    height: 150,
                    width: '95%',
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}>
                  <Image
                    source={{uri: this.state.bannerData?.[0]?.premium}}
                    style={styles.image}
                  />
                </View>
              )}
            </View>
          )}
          <View style={{marginTop: 10}}>
            {getCategory()}

            {getfree(this.props)}

            {getpremium(this.props)}

            <View style={styles.navBar}>
              <View style={{...styles.leftContainer, paddingLeft: 10}}>
                <Text style={[styles.baseText]}>Popular Audiobooks</Text>
              </View>

              <View style={styles.rightContainer} />
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                // paddingTop: 0,
                paddingLeft: 10,
                // marginTop: 0,
                // flexGrow: 1,
                // marginBottom: 0,
              }}
              style={{}}
              data={this.state.popularAudio}
              renderItem={({item: rowData}) => {
                return (
                  <TouchableOpacity
                    key={rowData._id}
                    onPress={() => {
                      const userf = {
                        userid: email,
                        audionbookid: rowData._id,
                      };
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

                          if (rowData.type == 'Free') {
                            this.props.navigation.push('PlaylistScreen', {
                              // id: rowData._id,
                              item: rowData,
                              ratings: ratt,
                            });
                          } else {
                            acc = zget(
                              this.props,
                              'navigation.state.params.acc',
                            );
                            var type = '';
                            if (this.props.subscriptionType == 'FREE') {
                              type = 'free';
                            } else {
                              type = 'paid';
                            }

                            type == 'free'
                              ? navigation.push('SubscribeScreen', {
                                  id: rowData._id,
                                  item: rowData,
                                  ratings: ratt,
                                })
                              : navigation.push('PlaylistScreen', {
                                  // id: rowData._id,
                                  item: rowData,
                                  ratings: ratt,
                                });
                          }

                          //  playlistDatads.push([{'rat':res.data.data[0]['ratings']}]);
                        })
                        .catch(error => console.log(error));
                      console.log('CAt Pressed!');
                      // console.log(rowData._id);

                      //  console.log("rating");

                      // console.log(rat);
                    }}>
                    <Card
                      containerStyle={{
                        // display: 'flex',
                        margin: 0,
                        padding: 0,
                        paddingRight: 5,
                        // height: '100%',
                        elevation: 0,
                        borderColor: '#F5F8FA',
                        bottom: 0,
                        backgroundColor: '#F5F8FA',
                        flexDirection: 'row',
                        borderBottomWidth: 0.5,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      button={true}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#eee',
                        }}>
                        <View
                          style={{
                            backgroundColor: '#F5F8FA',
                            overflow: 'hidden',
                            paddingTop: 5,
                          }}>
                          <View>
                            <Image
                              source={{uri: rowData.image}}
                              style={{
                                height: 200,
                                resizeMode: 'cover',
                                width: 150,
                                padding: 33,
                                borderRadius: 3,
                              }}
                            />
                          </View>

                          <View
                            style={{
                              padding: 4,
                              paddingLeft: 0,
                              width: 130,
                              flex: 1,
                            }}>
                            <Text numberOfLines={1}>{rowData.name}</Text>
                            <View
                              style={{
                                position: 'absolute',
                                right: -18,
                                padding: 3,
                              }}>
                              {rowData.type == 'Paid' &&
                              this.props.subscriptionType == 'FREE' ? (
                                <Image
                                  source={require('./resources/lock.png')}
                                  style={{width: 15, height: 19}}
                                />
                              ) : null}
                            </View>
                          </View>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index}
            />

            <View style={styles.navBar}>
              <View style={{...styles.leftContainer, paddingLeft: 10}}>
                <Text style={[styles.baseText]}>Recent AudioBooks</Text>
              </View>

              <View style={styles.rightContainer} />
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingLeft: 10}}
              // style={{height: '100%', padding: 0}}
              data={this.state.recentAudio}
              renderItem={({item: rowData}) => {
                return (
                  <TouchableOpacity
                    key={rowData._id}
                    onPress={() => {
                      const userf = {
                        userid: email,
                        audionbookid: rowData._id,
                      };
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
                          if (rowData.type == 'Free') {
                            this.props.navigation.push('PlaylistScreen', {
                              // id: rowData._id,
                              item: rowData,
                              ratings: ratt,
                            });
                          } else {
                            acc = zget(
                              this.props,
                              'navigation.state.params.acc',
                            );
                            var type = '';
                            if (this.props.subscriptionType == 'FREE') {
                              type = 'free';
                            } else {
                              type = 'paid';
                            }
                            type == 'free'
                              ? navigation.push('SubscribeScreen', {
                                  id: rowData._id,
                                  item: rowData,
                                  ratings: ratt,
                                })
                              : navigation.push('PlaylistScreen', {
                                  // id: rowData._id,
                                  item: rowData,
                                  ratings: ratt,
                                });
                          }
                          //  playlistDatads.push([{'rat':res.data.data[0]['ratings']}]);
                        })
                        .catch(error => console.log(error));
                      console.log('CAt Pressed!');
                      // console.log(rowData._id);

                      //  console.log("rating");

                      // console.log(rat);
                    }}>
                    <Card
                      containerStyle={{
                        // display: 'flex',
                        margin: 0,
                        padding: 0,
                        paddingRight: 5,
                        // height: '100%',
                        elevation: 0,
                        borderColor: '#F5F8FA',
                        bottom: 0,
                        backgroundColor: '#F5F8FA',
                        flexDirection: 'row',
                        borderBottomWidth: 0.5,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          // flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#F5F8FA',
                        }}>
                        <View
                          style={{
                            backgroundColor: '#F5F8FA',
                            overflow: 'hidden',
                            paddingTop: 5,
                          }}>
                          <View>
                            <Image
                              source={{uri: rowData.image}}
                              style={{
                                height: 200,
                                resizeMode: 'cover',
                                width: 150,
                                padding: 33,
                                borderRadius: 3,
                              }}
                            />
                          </View>

                          <View
                            style={{
                              padding: 4,
                              paddingLeft: 0,
                              paddingBottom: 10,
                              width: 130,
                              flex: 1,
                            }}>
                            <Text numberOfLines={1}>{rowData.name}</Text>
                            <View
                              style={{
                                position: 'absolute',
                                right: -18,
                                padding: 3,
                              }}>
                              {rowData.type == 'Paid' &&
                              this.props.subscriptionType == 'FREE' ? (
                                <Image
                                  source={require('./resources/lock.png')}
                                  style={{width: 15, height: 19}}
                                />
                              ) : null}
                            </View>
                          </View>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index}
            />
          </View>
        </ScrollView>
        <View>
          {isPlaying == 'Play' ||
          isPlaying == 'Pause' ||
          isPlaying == 'STARTED_PLAY' ? (
            <TouchableOpacity
              onPress={() => {
                navigation.push('PlaylistScreen', {
                  // id: rowData._id,
                  item: this.props.trackData?.item,
                  ratings: this.props.trackData?.ratingsvalue,
                  type: 'mini',
                  required: true
                });
              }}
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                backgroundColor: '#292929',
                borderColor: 'rgba(255, 255, 255, 0.6)',
                borderBottomWidth: 0.5,
                // marginBottom: 70,
                // paddingLeft: 10,
              }}>
              <View
                style={{
                  // paddingTop: 8,
                  flexDirection: 'row',
                  // paddingVertical: 8,
                  // justifyContent:'space-around',
                  alignItems: 'center',
                  // paddingLeft: 15,
                  // marginBottom: 9,
                  paddingRight: 10,
                }}>
                <Image
                  source={{uri: this.props.currentTrackImage}}
                  style={{height: 55, width: 55}}
                />
                <View style={{flex: 1}}>
                  {/* <TouchableOpacity onPress={() => { this.props.navigation.push('PlaylistScreen')}}> */}
                  <Text style={{color: 'white', paddingLeft: 20}}>
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
                  {/* </TouchableOpacity> */}
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
const mapStateToProps = state => {
  // console.log(state)
  // console.log('state')
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
)(DashboardScreen);

const styles = StyleSheet.create({
  userImage: {
    width: 50,
    height: 50,
    marginHorizontal: 15,
    position: 'absolute',
    top: 70,
  },

  foregroundContainer: {
    width: Dimensions.get('window').width,
    height: 550,
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    marginHorizontal: 15,
    top: 70,
    right: 15,
  },
  profileImg: {
    width: 20,
    height: 20,
    right: 10,
    left: 5,
  },
  cardImg: {
    width: '100%',
    height: 100,
    margin: 0,
    padding: 0,
  },

  baseText: {
    fontSize: 16,
    fontFamily: 'TTCommons-Regular',
    // padding: 10,
    marginTop: 5,
    fontWeight: 'bold',
    color: colors.black,
  },

  horcattext: {
    color: colors.powderblue,
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 0,
    flex: 1,
  },
  contentContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flexGrow: 1,
    paddingTop: 10,
  },
  container: {
    flex: 2,
    backgroundColor: colors.background,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    // justifyContent: 'center',
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
    height: metrics.headerHeightX2,
  },
  container: {
    paddingTop: metrics.statusBarHeight + metrics.padding,
    paddingHorizontal: metrics.padding,
    backgroundColor: colors.white,
  },
  headerText: {
    position: 'relative',
    bottom: 0,
    width: metrics.screenWidth,
    paddingHorizontal: metrics.extraPadding,
    paddingVertical: metrics.lessPadding,
  },
  searchContainer: {
    flex: 1,
    // width: '100%',
    // backgroundColor:'pink',
    // justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 480,
    //marginTop:280,
    // flexDirection: 'column',
  },
  searchContainers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: metrics.radius,
    backgroundColor: colors.lightOpacity,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: metrics.lessPadding,
  },
  textInput: {
    flex: 1,
    padding: 6,
    color: colors.black,
  },
  buttonClear: {
    paddingHorizontal: metrics.lessPadding,
  },
  searchResult: {
    position: 'relative',
    width: metrics.screenWidth,
    height: metrics.screenHeight * 2,
    backgroundColor: colors.background,
  },
  page: {
    paddingTop: metrics.headerHeight,
    width: metrics.screenWidth,
    height: metrics.screenHeight,
  },
  result: {
    alignItems: 'center',
  },
  categories: {
    paddingTop: metrics.headerHeightX2 + metrics.padding,
  },
  category: {
    width: (metrics.screenWidth - metrics.lessPadding * 2) / 2,
    margin: metrics.lessPadding / 2,
    padding: metrics.lessPadding,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: metrics.radius,
  },
  textWhite: {
    color: colors.white,
    paddingTop: metrics.headerHeightX2 + metrics.padding,
  },
  footerComponent: {
    height: 2000,
  },
  navBar: {
    height: 20,
    paddingTop: 25,
    paddingBottom: 18,
    paddingLeft: 0,
    paddingRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    fontSize: 12,
    alignItems: 'center',
    backgroundColor: '#F5F8FA',
  },
  rightIcon: {
    color: '#54b676',
    fontWeight: 'bold',
    fontSize: 12,
    right: 15,
  },
});
