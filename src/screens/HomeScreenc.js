/**
 * @format
 * @flow
 */
import React, {PureComponent} from 'react';
import {Animated, StatusBar, View, StyleSheet} from 'react-native';
import {connect} from '../recontext/store';
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
import { API_URL } from '../config';
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

const LOGO_SIZE = 24;
const HEADER_OFFSET = metrics.screenWidth / 2 - 20;
const PAGE_SIZE = 10;

class HomeScreenc extends PureComponent {
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
    const userf = {
      term: name,
    };
    this.getcate(userf);
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
        console.log('jhhhj' + this.state.tableData);
      })
      .catch(error => console.log(error));
    //console.log(data);
  }
  componentWillUnmount() {
    // this._navListener.remove();
  }

  render() {
    const {navigation, quotes} = this.props;
    const randomQuoteKey = pickRandomProperty(quotes);
    //const categorydata=this.state;
    const {tableData} = this.state;
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
        <Header
          title={navigation.state.params.id}
          style={{textAlign: 'left'}}
        />
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
    );
  }
}

const mapStateToProps = state => ({
  books: state.categorydata,
  quotes: state.quotes,
  subscriptionType: state.subscriptionType,
});

export default connect(mapStateToProps)(HomeScreenc);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: '#fff',
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
