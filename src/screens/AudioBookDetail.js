/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
// import {connect} from '../recontext/store';
import {connect} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  TouchableOpacity,
  Animated,
  Text,
  Keyboard,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import {Icon} from 'native-base';
// import Icon from 'react-native-vector-icons/AntDesign';
import AnimatedFlatList from '../components/AnimatedFlatList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconHeart from 'react-native-vector-icons/AntDesign';
import TabbarStack from '../tabbar';
import {Title} from '../components/Typos';
import {metrics} from '../utils/themes';
import {Card, Header} from 'react-native-elements';
import zget from 'zget';
import {
  playTrack,
  pauseTrack,
  setCurrentTrack,
  endPlayer,
} from '../../src/actions/google';
import {NEW_ENV_API_URL} from '../config';

var subscriptionid = '';
var expirydate = '';
var acc = '';
var subid = '';
var expirydat = '';
let config 

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);

    acc = zget(props, 'navigation.state.params.acc');
    subid = zget(props, 'navigation.state.params.subscriptionid');
    expirydat = zget(props, 'navigation.state.params.expirydat');
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
      tokenId:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWE3OTkyODAxZGMyMzM1YWZlOThiMCIsImlhdCI6MTYyMjM0MTEwOCwiZXhwIjoxNjI0OTMzMTA4fQ.7ASNhzegLWDNsk0FzJHy0RK9ENelsz0ayVHvjDQQ53g'
    };
    this._contentOffset = new Animated.Value(0);
    console.log(AsyncStorage.getItem('email'));
    console.log(AsyncStorage.getItem('user'));
    //this.state.name=AsyncStorage.getItem('email');
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
    AsyncStorage.getItem('email').then(token => {
   
      this.state.email = token;
    });
    AsyncStorage.getItem('name').then(name => {
      this.state.username = name;
    });
  
    config = {
      headers: {
        'Authorization': 'Bearer ' + this.state.tokenId
      }
    }
    this.setCurrentTrack();
  }
  onListenClick=()=>{
      console.log("listen Clicked")
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

  render() {
    const AppNavigator = createAppContainer(TabbarStack);
    const {isPlaying} = this.props;
    const {currentAudiobookName} = this.props;
    const {currentTrackTitle} = this.props;
    const {tableData} = this.state;

    AsyncStorage.getItem('email').then(token => {
      this.state.email = token;
    });
    AsyncStorage.getItem('name').then(name => {
      this.state.username = name;
    });
    const {navigation, books, quotes} = this.props;

    return (
    <View style={{backgroundColor:'#f2f6f9',flex:1}}>
      <View style={{marginRight:20,marginLeft:20}}>
        <ScrollView>
            <View style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.SquareShapeView} />
                </View>
            </View>
            <View>
                <View style={{
                    flexDirection:'row',
                    // backgroundColor:'red',
                    justifyContent:'space-around',
                    marginTop:20
                    }}>
                        <View style={styles.heartButton}>
                            <View style={{justifyContent:'center',flexDirection:'row'}}>
                                <TouchableOpacity style={{margin:3}}onPress={this.onLikePress}>
                                    <IconHeart name='hearto' size={20} />
                                </TouchableOpacity>
                                <Text style={{fontSize:18}}>1234</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <View style={styles.heartButton}>
                                <View style={{flexDirection:'row',justifyContent:'space-around'}}>                      
                                        <MaterialCommunityIcons name='cart-outline' color={'green'} size={25} />
                                        <Text style={{fontSize:18,color:'green',textDecorationLine: 'underline'}}>Buy Now</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                </View>
            </View>
            <View>
                <View style={{
                    flexDirection:'row',
                    // backgroundColor:'red',
                    justifyContent:'space-around',
                    marginTop:20
                    }}>
                        <TouchableOpacity onPress={this.onListenClick}>
                        <View style={styles.ListenButton}>
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:20,color:'white'}}>Listen</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                        <View>
                        <TouchableOpacity style={{marginTop:2}}>
                            <View style={styles.innerRectangleShapeView}>
                                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>  
                                <View style={{marginTop:6}}>
                                        <MaterialIcons name='headset' color='blue' size={25} />
                                </View>
                                        <Text style={{fontSize:20}}>1234</Text>
                                </View>
                            </View>
                        </TouchableOpacity>     
                        </View>
                        
                </View>
            </View>
            <View style={{
                flex:1,
                // backgroundColor:'yellow',
                marginTop:20,
                marginBottom:10}}>
                <Text style={{fontSize:20}}>About Book</Text>
            </View>
            <View>
             <Text>
                 dfgegegegcegeggegcegeegegscgegge
             </Text>
            </View> 
            <View style={{marginTop:10}}>
                <View style={{flexDirection:'row'}}>
                <MaterialIcons name='thumb-up' size={25} />
                <Text style={{fontSize:20,marginLeft:5}}>Recommended by AE Team</Text>
                </View>
                
                <View
                    style={{
                        borderBottomColor: 'lightgrey',
                        borderBottomWidth: 1,
                        marginRight:'10%',
                        marginTop:4
                    }}/>
            </View>
            <View>
            <AnimatedFlatList
          data={tableData}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <CardBook
              item={item}
              index={index % PAGE_SIZE}
              onPress={() =>
                // this.props.navigation.navigate('MainView')
                navigation.navigate('PlaylistScreen', {
                  id: item.id,
                  item: item,
                })
              }
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f6f9',
  },
 
  SquareShapeView: {
      marginTop:'15%',
    width: 220,
    height: 300,
    backgroundColor: '#00BCD4',
    borderRadius:10
  },
  ListenButton:{
    width: 240,
    height: 40,
    backgroundColor: 'green',
    borderRadius:30,
    justifyContent:'center'
  },
  RectangleShapeView: {
  marginTop: 20,
  width: 120 * 2,
  height: 120,
//   backgroundColor: '#FFC107'
  },
  heartButton:{
    borderRadius:15,
    width: 100,
    height: 30,
    // backgroundColor: '#D3D3D3'
  },
  innerRectangleShapeView: {
    borderRadius:20,
    width: 100,
    height: 35,
    backgroundColor: '#D3D3D3'
    },
});
