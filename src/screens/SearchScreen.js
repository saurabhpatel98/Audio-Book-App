/**
 * @format
 * @flow
 */
import React, {PureComponent, Fragment} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Text,
  FlatList,
  TextInput,
  Keyboard,
  StatusBar,
  StyleSheet,
  Image,
} from 'react-native';
import {Icon} from 'native-base';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/MaterialIcons';
// import {connect} from '../recontext/store';
import AnimatedFlatList from '../components/AnimatedFlatList';
import PrimaryHeader from '../components/PrimaryHeader';
import {AnimatedTitle, Title, Subtitle} from '../components/Typos';
import Api from '../helpers/Api';
import {colors, metrics} from '../utils/themes';
import {ScrollView} from 'react-native-gesture-handler';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {NavigationActions} from 'react-navigation';
import CardBook from '../components/CardBook';
import AsyncStorage from '@react-native-community/async-storage';
import zget from 'zget';
import {connect} from 'react-redux';
import {googleOAuth2} from '../../src/actions/google';
import {
  playTrack,
  pauseTrack,
  setCurrentTrack,
  endPlayer,
  searchcategory,
  searchbooks,
} from '../../src/actions/google';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import {API_URL} from '../config';
//var items = [];
const LOGO_SIZE = 24;
const HEADER_OFFSET = metrics.screenWidth / 2 - 20;
const PAGE_SIZE = 10;
const donaldDuck = require('../images/audiobookicon.png');
const playimg = require('../components/resources/play.png');
const pauseimg = require('../components/resources/pause.png');
const crossIcon = require('../images/cross_icon.png');
var type = '';
var subscriptionid = '';
class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.getcate = this.getcate.bind(this);
    this.state = {
      isFocused: false,
      // categorydata:[],
      // categorydatas:[],
      loading: false,
      dataSource: [],
      items: [],
      selectedItems: [
        {
          id: 7,
          name: 'Go',
        },
        {
          id: 8,
          name: 'Swift',
        },
      ],
      keyword: '',
      currenttrackdata: {},
    };
    this._contentOffset = new Animated.Value(-metrics.headerHeight);
    //this.onChangeText = this.onChangeText.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.renderCategoryItem = this.renderCategoryItem.bind(this);
    this.onTextInputFocus = this.onTextInputFocus.bind(this);
    this.doClearKeywords = this.doClearKeywords.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    const {navigation} = this.props;

    AsyncStorage.getItem('subscriptionid').then(subscriptionid => {
      subscriptionid = subscriptionid;
    });

    this.setCurrentTrack();
    this.searchcategory();
    const userf = {
      term: '',
    };
    this.setemptysearch(userf);
    //this.setState({selectedItems:this.items,});
    // this.getcate();
    /* axios.get('https://app.almosteverythingapp.com:3002/v2/audiobook')
             .then(
               (response) => {
                 this.state.data = response.data.data;
                  this.setState({
                     // tableData: response.data
                       items :response.data.data
                     });
               }
             )
             .catch(
               (error) => {
                 console.log('error');
               }
             );
                 this._navListener = navigation.addListener('didFocus', () => {
                   StatusBar.setBarStyle('light-content', true);
                 });*/
    // Api.loadCategories();
  }

  componentWillUnmount() {
    //   this._navListener.remove();
  }
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }
  renderCustomIconA() {
    const {navigation} = this.props;
    return (
      <View style={styles.searchContainers}>
        <TouchableOpacity
          onPress={() => onAcc()}
          // this.props.navigation.navigate('Account')}
          style={{flexDirection: 'row'}}>
          <Image
            source={donaldDuck}
            onPress={() => {}}
            resizeMode="contain"
            style={(styles.profileImg, {width: 30, height: 30})}
          />
        </TouchableOpacity>
        <View style={{paddingLeft: 14}}>
          <Text
            style={{
              color: '#a5a8ad',
              fontSize: 13,
              fontWeight: 'bold',
              width: 200,
            }}>
            Hey, {username}
          </Text>
          <Text style={{color: colors.black, fontSize: 13, fontWeight: 'bold'}}>
            Welcome to Almost Everthing
          </Text>
        </View>
      </View>
    );
  }
  renderCustomIconB() {
    return (
      <TouchableOpacity
        onPress={() => onShare()}
        style={{backgroundColor: '#F5F8FA'}}>
        <Image
          style={{width: 20, height: 20, marginRight: 15}}
          source={require('../images/black.png')}
        />
      </TouchableOpacity>
    );
  }
  navigateTo = item => {
    const {navigation} = this.props;
    let f = '';
    if (item.type == 'Free') {
      // this.props.navigation.navigate('MainView')
      navigation.push('PlaylistScreen', {
        id: item.id,
        item: item,
      });
    } else if (item.type == 'Paid') {
      if (this.props.subscriptionType == 'FREE') {
        navigation.push('SubscribeScreen', {
          id: item.id,
          item: item,
        });
      } else if (this.props.subscriptionType == 'PAID') {
        navigation.push('PlaylistScreen', {
          id: item.id,
          item: item,
        });
      }
    }

    this.setState({keyword: ''});
    this.props.clearSearchData();
    //type = zget(this.props, 'navigation.state.params.type');
    //  subid = zget(props, 'navigation.state.params.subscriptionid');
    // expirydat = zget(props, 'navigation.state.params.expirydat');
    /* if (item.type=='Free'){

   // this.props.navigation.navigate('MainView')
   navigation.push('PlaylistScreen', {
     id: item.id,
     item: item,
   })


     }
     else if(type=='free'){

      navigation.push('SubscribeScreen', {
     id: item.id,
     item: item,
   })

     }
     else if(type=='paid'){
        navigation.push('PlaylistScreen', {
     id: item.id,
     item: item,
   })
     }*/
  };

  renderFavouites = props => {
    //const { dataSource } = this.state;
    // if (!this.state.loading) return null
    return (
      <View style={{paddingHorizontal: 10}}>
        <AnimatedFlatList
          data={this.props.searchbooksdata}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps="always"
          renderItem={({item, index}) => (
            <CardBook
              item={item}
              index={index % PAGE_SIZE}
              onPress={() => this.navigateTo(item)}
              subscriptionType={this.props.subscriptionType}
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
      </View>
    );
  };

  fetchData(text) {
    this.setState({
      keyword: text,
    });
    this.setState({loading: true});
    const userf = {
      term: text,
    };

    this.searchbooks(userf);
    /* return dispatch =>{
         // dispatch({type:'SEARCH_START'});
          dispatch({type:'SEARCH_START_FILTER',  payload : googleOAuth2.searchbooks(userf) });
         // dispatch({type:'SEARCH_START_FILTER', payload : googleOAuth2.searchbooks(userf) });
           //this.renderFavouites(this.props);
       }*/
  }

  getcate() {
    axios
      .get(API_URL + 'category')
      .then(response => {
        this.state.categorydata = response.data.data;
        this.setState({
          // tableData: response.data
          categorydata: response.data.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
    //console.log(data);
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
  jewelStyle = function(options) {
    return {
      flexDirection: 'row',
      padding: 50,

      borderRadius: 5,

      justifyContent: 'space-between',
      backgroundColor: options,
      width: '45%',
      margin: 10,
      marginRight: 5,
    };
  };
  renderCategoryItem({item}) {
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        key={item.key}
        onPress={() => {
          navigation.navigate(
            'LoginNavigator',
            {},
            NavigationActions.navigate({
              routeName: 'Home',
            }),
          );
          this.setState({keyword: ''});
          this.props.clearSearchData();
        }}>
        <View
          style={{
            width: (metrics.screenWidth - metrics.lessPadding * 2) / 2,
            margin: metrics.lessPadding / 2,
            padding: metrics.lessPadding,
            backgroundColor: item.color,

            borderRadius: metrics.radius,
          }}>
          <Title style={{color: '#ffffff'}}>{item.name}</Title>
          <Image source={{uri: item.img}} style={styles.profileImg} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    // const {categories} = this.props;
    const {isPlaying} = this.props;
    const {currentTrackImage} = this.props;

    const {keyword, isFocused, items} = this.state;
    const {categorydata} = this.state;
    const {dataSource} = this.state;

    const {currentTrack} = this.props;
    const {currentAudiobookName} = this.props;
    const {currentTrackTitle} = this.props;
    console.log('==========================', this.state.searchbooksdata);
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

    return (
      <View style={{flex: 1, backgroundColor: colors.black}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="always">
          <View>
            <Title
              style={{
                paddingTop: 10,
                color: '#fff',
                marginLeft: '5%',
                marginBottom: '3%',
                fontSize: 25,
              }}>
              Search
            </Title>
            <TextInput
              placeholder="Search Audiobooks here"
              style={{
                backgroundColor: '#fff',
                marginLeft: 20,
                marginRight: 20,
                borderRadius: 5,
                paddingLeft: 15,
              }}
              onChangeText={text => {
                this.fetchData(text);
              }}
              value={this.state.keyword}
            />
          </View>
          {this.renderFavouites(this.props)}

          <Title
            style={{
              paddingTop: 20,
              color: '#fff',
              marginLeft: '5%',
              marginBottom: 6,
            }}>
            Categories
          </Title>
          <View>
            <FlatList
              numColumns={2}
              style={{}}
              data={this.props.categorydata}
              ListFooterComponent={() => <View style={{height: 60}} />}
              renderItem={({item: rowData}) => {
                return (
                  <TouchableOpacity
                    style={this.jewelStyle(rowData.colorcode)}
                    onPress={() => {
                      this.setState({keyword: ''});
                      this.props.clearSearchData();

                      /*  this.props.navigation.navigate(NavigationActions.navigate({
 routeName: 'LoginNavigator',
 action: NavigationActions.navigate({ routeName: 'Home' })
 }))*/

                      this.props.navigation.push(
                        'Home',
                        {
                          id: rowData.name,
                          item: rowData,

                          title: 'zcz',
                        },
                        {name: 'sdfd'},
                      );
                      // console.log('CAfsddt Pressed!');
                    }}>
                    <View
                      style={{
                        position: 'absolute',
                        left: 10,
                        marginTop: 10,
                        marginBottom: 3,
                      }}>
                      <Text style={{color: '#fff', fontSize: 17}}>
                        {rowData.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        right: 0,
                        marginTop: 20,
                        marginRight: 10,
                        marginBottom: 90,
                      }}>
                      <Image
                        source={{uri: rowData.img}}
                        resizeMode="contain"
                        style={styles.profileImg}
                      />
                    </View>
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
                // marginBottom: -60,
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
                  <Text
                    style={{color: 'white', paddingLeft: 20, maxWidth: '80%'}}>
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
  searchcategory = async () => {
    await this.props.searchcategory();
  };
  searchbooks = async userf => {
    await this.props.searchbooks(userf);
  };
  setemptysearch = async userf => {
    await this.props.setemptysearch(userf);
  };
}

/* const mapStateToProps = state => ({
   // categories: state.categories,
 }); */
const middleware = () => {
  return dispatch => {
    // dispatch({type:'SEARCH_START'});
    dispatch(googleOAuth2.searchcategory());
  };
};
const middlewares = userf => {
  return dispatch => {
    // dispatch({type:'SEARCH_START'});
    dispatch(googleOAuth2.searchbooks(userf));
  };
};

const middlewaress = userf => {
  return dispatch => {
    // dispatch({type:'SEARCH_START'});
    dispatch(googleOAuth2.searchbooks(userf));
  };
};
const middlewaresss = () => {
  return dispatch => {
    // dispatch({type:'SEARCH_START'});
    dispatch(googleOAuth2.clearSearchData());
  };
};

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    play: async () => dispatch(playTrack()),
    pause: async () => dispatch(pauseTrack()),
    setCurrentTrack: async () => dispatch(setCurrentTrack()),
    endPlayer: async () => dispatch(endPlayer()),
    searchcategory: async () => dispatch(middleware()),
    searchbooks: async userf => dispatch(middlewares(userf)),
    clearSearchData: async userf => dispatch(middlewaresss()),
    setemptysearch: async () => dispatch(middlewaress()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchScreen);

const styles = StyleSheet.create({
  containerProducts: {
    // paddingTop: 40,
    paddingLeft: 15,
    flexDirection: 'row',
  },
  productName: {
    alignSelf: 'flex-start',
  },
  minus: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: 'red',
  },
  containerInfo: {
    paddingTop: 15,
    flexDirection: 'row',
    paddingLeft: 15,
  },
  unityName: {
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  subInfo: {
    color: 'gray',
    paddingLeft: 15,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: 'red',
    justifyContent: 'flex-end',
  },
  container: {
    // paddingTop: metrics.statusBarHeight + metrics.padding,
    // paddingHorizontal: metrics.padding,
    backgroundColor: colors.black,
  },
  headerText: {
    position: 'absolute',
    bottom: 0,
    width: metrics.screenWidth,
    paddingHorizontal: metrics.extraPadding,
    paddingVertical: metrics.lessPadding,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    width: 60,
    height: 60,
    flex: 1,

    right: 0,
    //marginLeft:3,
    //alignItems: 'flex-end',
  },
  profileImgs: {
    width: 20,
    height: 45,
    flex: 0.14,

    left: 0,
    //marginLeft:3,
    //alignItems: 'flex-end',
    marginBottom: 12,
  },
  trackImage: {
    width: 60,
    height: 60,
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
  welcome: {
    color: colors.white,
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
    position: 'absolute',
    width: metrics.screenWidth,
    height: metrics.screenHeight * 2,
    backgroundColor: colors.background,
  },
  page: {
    // paddingTop: metrics.headerHeight,
    marginLeft: '3%',
    width: metrics.screenWidth,
    height: metrics.screenHeight,
    backgroundColor: 'white',
  },
  result: {
    alignItems: 'center',
  },
  categories: {
    // paddingTop: metrics.headerHeightX2 + metrics.padding,
    paddingRight: 20,
    marginBottom: 30,
    backgroundColor: '#000',
  },
  category: {
    width: (metrics.screenWidth - metrics.lessPadding * 2) / 1,
    margin: metrics.lessPadding / 2,
    padding: metrics.lessPadding,
    backgroundColor: colors.white,

    borderRadius: metrics.radius,
  },
  textWhite: {
    color: colors.white,
  },
  footerComponent: {
    height: 100,
  },
});
