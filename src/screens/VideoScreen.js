/* eslint-disable react-native/no-inline-styles */
/**
 * @format
 * @flow
 */
import React, {PureComponent} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, Title} from '../components/Typos';
import AnimatedFlatList from '../components/AnimatedFlatList';
import {colors, metrics} from '../utils/themes';
import axios from 'axios';
import {
  playTrack,
  pauseTrack,
  setCurrentTrack,
  endPlayer,
} from '../actions/google';
import {API_URL} from '../config';

const LOGO_SIZE = 24;

const Card = ({item, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#fff',
        marginTop: 10,
        marginBottom: 5,
        marginRight: 10,
        marginLeft: 10,
        padding: 15,
        borderColor: '#f4f5f9',
        borderRadius: 5,
      }}>
      <Image
        source={{uri: item.thumbnail}}
        style={{
          height: 220,
          width: '100%',
          borderRadius: 5,
          marginBottom: 10,
        }}
        resizeMode="stretch"
      />
      <Title
        numberOfLines={2}
        style={{fontSize: 16, marginTop: 0, fontWeight: 'Normal'}}>
        {item.title}
      </Title>
      <Title
        numberOfLines={3}
        style={{
          fontSize: 14,
          marginTop: 5,
          fontWeight: 'Normal',
          color: 'gray',
        }}>
        {item.category}
      </Title>
    </TouchableOpacity>
  );
};

const AllVideo = {
  _id: 1,
  name: 'All Videos',
  colorcode: 'green',
};

class VideoScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.getcate = this.getcate.bind(this);
    this.state = {
      tableDataBack: [],
      tableData: [],
      categorydata: [],
      activeCategory: AllVideo,
      isFocused: false,
      keyword: '',
    };

    this._contentOffset = new Animated.Value(0);
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getcate();
      this.getallcate();
    });
    this.setCurrentTrack();
  }

  getallcate = () => {
    axios
      .get(API_URL + 'videos-category')
      .then(response => {
        const data = [AllVideo].concat(response?.data?.data ?? []);
        this.setState({
          categorydata: data,
        });
      })
      .catch(error => {
        console.log('error');
      });
  };

  getcate() {
    axios
      .get(API_URL + 'videos')
      .then(res => {
        this.setState({
          tableDataBack: res?.data?.data ?? [],
          tableData: res?.data?.data ?? [],
          activeCategory: null,
        });
      })
      .catch(error => console.log(error));
  }

  jewelStyle = ({color, _id}) => {
    const {activeCategory} = this.state;
    return {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: color,
      padding: 10,
      marginTop: activeCategory?._id === _id ? 5 : 10,
      marginBottom: activeCategory?._id === _id ? 10 : 5,
      borderRadius: 5,
      marginRight: 12,
    };
  };

  _doFilter = () => {
    const {tableDataBack, activeCategory} = this.state;
    if (activeCategory?.name === 'All Videos') {
      this.setState({tableData: tableDataBack});
    } else {
      const tableDataTemp = [...tableDataBack];
      const tableData = tableDataTemp.filter(
        e => e.category.indexOf(activeCategory?.name) > -1,
      );
      this.setState({tableData});
    }
  };

  getCategory = () => {
    const {categorydata} = this.state;
    return (
      <View style={{paddingLeft: 10}}>
        <Text style={styles.baseText}>Videos Category</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10}}
          data={categorydata}
          renderItem={({item: rowData}) => {
            return (
              <TouchableOpacity
                style={this.jewelStyle({
                  color: rowData.colorcode,
                  _id: rowData?._id,
                })}
                onPress={() => {
                  this.setState({activeCategory: rowData}, this._doFilter);
                }}>
                {rowData?._id === 1 ? (
                  <Ionicons name="ios-videocam" color="white" size={15} />
                ) : (
                  <Image
                    source={{uri: rowData.icon}}
                    resizeMode="contain"
                    style={styles.profileImg}
                  />
                )}
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

  renderFavouites = props => {
    const {tableData} = this.state;
    return (
      <AnimatedFlatList
        data={tableData}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({item, index}) => (
          <Card
            item={item}
            onPress={() => {
              if (this.props.subscriptionType == 'FREE') {
                this.props.navigation.navigate('SubscribeScreen');
              } else {
                this.props.navigation.navigate('Video', {
                  item: item,
                });
              }
            }}
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
    const {isPlaying} = this.props;
    const {currentAudiobookName} = this.props;
    const {currentTrackTitle} = this.props;

    return (
      <View style={styles.container}>
        {this.getCategory()}
        {this.renderFavouites()}
        <View>
          {isPlaying == 'Play' ||
          isPlaying == 'Pause' ||
          isPlaying == 'STARTED_PLAY' ? (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.push('PlaylistScreen', {
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
              }}>
              <View
                style={{
                  flexDirection: 'row',
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
                <View style={{}}>
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
)(VideoScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  profileImg: {
    width: 20,
    height: 20,
    right: 10,
    left: 5,
  },
  baseText: {
    fontSize: 16,
    fontFamily: 'TTCommons-Regular',
    // padding: 10,
    marginTop: 5,
    fontWeight: 'bold',
    color: colors.black,
  },
});
