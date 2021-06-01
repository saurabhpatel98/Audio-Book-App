/**
 * @format
 * @flow
 */
import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import createBottomTabNavigator from './tabNavigator/createTabNavigator';
import HomeScreen from './screens/HomeScreen';
import HomeScreenc from './screens/HomeScreenc';
import DashboardScreen from './screens/DashboardScreen';
import SearchScreen from './screens/SearchScreen';
import AccountScreen from './screens/AccountScreen';
import BookScreen from './screens/BookScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import NewReviewScreen from './screens/NewReviewScreen';
import CategoryScreen from './screens/CategoryScreen';
import SubscribeScreen from './screens/SubscribeScreen';
import SubscribePhoneScreen from './screens/SubscribePhoneScreen';

import OtpScreen from './screens/OtpScreen';
//import Login from '../login';
import Icon from 'react-native-vector-icons/Ionicons';
import OtpVerification from './components/otp/OtpVerification';
import MainView from './screens/MainView';
import PlaylistScreen from './screens/PlaylistScreen';
import VideoScreen from './screens/VideoScreen';
import Video from './screens/Video';
import FavouriteScreen from './screens/FavouriteScreen';
import Success from './screens/success';
import Failure from './screens/failure';
import Login from './login';
import SplashScreen from './SplashScreen';
import Logincotter2 from './logincotter2';
import Logincotter from './logincotter';
import Googlesigninlogin from './Googlesigninlogin';
import Player from './components/Player';
import {colors} from './utils/themes';

const MAP_ROUTER_ICON_NAME = {
  Home: 'book',
  Search: 'search',
  Account: 'user',
};
import {HeaderBackButton} from 'react-navigation';

const navigationOptions = ({navigation}) => ({
  headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
});
const DashboardNavi = createStackNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
      path: '/',
    },
    Homec: {
      screen: HomeScreenc,
      path: '/homec',
    },
    Home: {
      screen: HomeScreen,
      path: '/home',
    },
    BookScreen: {
      screen: BookScreen,
      path: '/book/:id',
    },
    ReviewsScreen: {
      screen: ReviewsScreen,
      path: '/review/:id',
    },
    NewReviewScreen: {
      screen: NewReviewScreen,
      path: '/new-review',
    },
    MainView: {
      screen: MainView,
      path: '/mainview',
    },
    AccountScreen: {
      screen: AccountScreen,
      path: '/AccountScreen',
      navigationOptions: {
        title: 'Personal Details',
        headerTintColor: 'red',
        headerStyle: {
          backgroundColor: 'red',
          paddingTop: 30,
          borderBottomWidth: 0,
          borderColor: '#f3f6f8',
          borderWidth: 0,
          TextColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff',
        },
      },
    },

    PlaylistScreen: {
      screen: PlaylistScreen,
      path: '/PlaylistScreen',
    },
  },
  {
    headerMode: 'none',
  },
  {
    initialRouteName: 'login',
  },
);
const authScreens = createStackNavigator({
  VideoScreen: {
    screen: VideoScreen,
    navigationOptions: ({navigation}) => ({
      //don't forget parentheses around the object notation
      title: 'Premium Videos',
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      headerStyle: {
        backgroundColor: '#FFF',
        marginTop: 20,
        paddingLeft: -10,
        TextColor: '#000',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitleStyle: {
        fontSize: 16,
        letterSpacing: 0.5,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: -3,
      },
    }),
  },
  Video: {
    screen: Video,
    navigationOptions: ({navigation}) => ({
      //don't forget parentheses around the object notation
      title: 'Premium Video',
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      headerStyle: {
        backgroundColor: '#FFF',
        marginTop: 20,
        paddingLeft: -10,
        TextColor: '#000',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitleStyle: {
        fontSize: 16,
        letterSpacing: 0.5,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: -3,
      },
    }),
  },
  playlist: PlaylistScreen,
});

authScreens.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  //  let premiums=navigation.state.routes[navigation.state.index].params.acc;

  /*if(premiums=='paid')
{
premium.focused=false;
//alert(premium);
console.log(premiums);
}*/

  if (routeName == 'Video') {
    tabBarVisible = false;
  }
  // tabBarVisible = false

  return {
    tabBarVisible,
  };
};

const favouriteScreens = createStackNavigator({
  favourites: {
    screen: FavouriteScreen,
    navigationOptions: ({navigation}) => ({
      //don't forget parentheses around the object notation
      title: 'Favourites',
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      headerStyle: {
        backgroundColor: '#FFF',
        marginTop: 30,
        paddingLeft: -10,
        TextColor: '#000',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: -3,
      },
    }),
  },
});

/*
const premium = createStackNavigator({
  SubscribeScreen : {
    screen: SubscribeScreen,
    path: '/subscribe',
    navigationOptions: ({navigation}) => ({ //don't forget parentheses around the object notation
      title: 'Subscribe',
     headerTintColor: '#fff',
   headerLeft: <HeaderBackButton  tintColor={'white'} onPress={() => navigation.goBack(null)} />,
  headerStyle: {
      backgroundColor: '#000',marginTop:20,
      TextColor:'#fff',
      elevation: 0,
    shadowOpacity: 0,
    },
    headerTitleStyle:{
      fontSize:14,
      fontWeight:'bold',
      color:'#000',
      marginLeft:-10

    },
    })

  },
  SubscribePhoneScreen : {
    screen: SubscribePhoneScreen,
    path: '/subscribephone',
    navigationOptions: {

      headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#000',paddingTop:0,borderBottomWidth: 0, borderColor: '#f3f6f8',
      borderWidth: 0,
      TextColor:'#fff',
      elevation: 0,
      marginTop:10,
    shadowOpacity: 0,
    },
    headerTitleStyle:{
      fontSize:16,
      fontWeight:'bold',
      color:'#fff'

    },

  }
  },
Failure : {
    screen: Failure,
    path: '/Failure',
    navigationOptions: {

      headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#000',paddingTop:30,borderBottomWidth: 0, borderColor: '#f3f6f8',
      borderWidth: 0,
      TextColor:'#fff',
      elevation: 0,
    shadowOpacity: 0,
    },
    headerTitleStyle:{
      fontSize:16,
      fontWeight:'bold',
      color:'#fff'

    },

  }
  },
Success : {
    screen: Success,
    path: '/Success',
    navigationOptions: {

      headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#000',paddingTop:30,borderBottomWidth: 0, borderColor: '#f3f6f8',
      borderWidth: 0,
      TextColor:'#fff',
      elevation: 0,
    shadowOpacity: 0,
    },
    headerTitleStyle:{
      fontSize:16,
      fontWeight:'bold',
      color:'#fff'

    },

  }
  },
});*/
const searchicons = createStackNavigator({
  search: {
    screen: SearchScreen,
    navigationOptions: ({navigation}) => ({
      //don't forget parentheses around the object notation
      title: `${navigation.state.routeName}`,
      headerTintColor: '#000',
      headerLeft: (
        <HeaderBackButton
          tintColor={'black'}
          onPress={() => navigation.goBack(null)}
        />
      ),
      headerStyle: {
        backgroundColor: '#000',
        marginTop: -10,
        TextColor: '#000',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitleStyle: {
        fontSize: 16,
        letterSpacing: 0.5,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: -3,
      },
    }),
  },
  homex: HomeScreen,
});

const SearchNavigator = createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
      path: '/',
      navigationOptions: {
        title: 'Personal Details',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#fff',
          paddingTop: 30,
          borderBottomWidth: 0,
          borderColor: '#f3f6f8',
          borderWidth: 0,
          TextColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff',
        },
      },
    },
    AccountScreen: {
      screen: AccountScreen,
      path: '/AccountScreen',
      navigationOptions: {
        title: 'Personal Details',
        headerTintColor: 'red',
        headerStyle: {
          backgroundColor: 'red',
          paddingTop: 30,
          borderBottomWidth: 0,
          borderColor: '#f3f6f8',
          borderWidth: 0,
          TextColor: 'red',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff',
        },
      },
    },
    Homec: {
      screen: HomeScreenc,
      path: '/homec',
    },
    CategoryScreen: {
      screen: CategoryScreen,
      path: '/category/:id',
    },
    BookScreen: {
      screen: BookScreen,
      path: '/book/:id',
    },
    ReviewsScreen: {
      screen: ReviewsScreen,
      path: '/review/:id',
    },
    NewReviewScreen: {
      screen: NewReviewScreen,
      path: '/new-review',
    },
  },
  {
    headerMode: 'none',
  },
);
const LoginNavigator = createStackNavigator(
  {
    DashboardScreen: {
      screen: DashboardScreen,
      path: '/',
      navigationOptions: {header: null, tabBarVisible: true},
    },
    Search: {
      screen: SearchScreen,
      path: '/SearchScreen/',
      navigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#000',
          paddingTop: 30,
          borderBottomWidth: 0,
          borderColor: '#f3f6f8',
          borderWidth: 0,
          TextColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff',
        },
      },
    },
    OtpScreen: {
      screen: OtpScreen,
      navigationOptions: {
        title: 'Personal Details',
        headerStyle: {
          backgroundColor: '#f3f6f8',
          paddingTop: 20,
          borderBottomWidth: 0,
          borderColor: '#f3f6f8',
          borderWidth: 0,
          TextColor: '#000',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        style: {
          elevation: 0,
          shadowOpacity: 0,
        },
      },
    },
    login: {
      screen: Login,
      navigationOptions: {header: null, tabBarVisible: false},
      path: '/',
    },
    logincotter: {screen: Logincotter, navigationOptions: {header: null}},
    logincotter2: {screen: Logincotter2, navigationOptions: {header: null}},
    otpverfication: {
      screen: OtpVerification,
      navigationOptions: {header: null},
    },
    Home: {
      screen: HomeScreen,
      path: '/home',
      navigationOptions: ({navigation}) => ({
        //don't forget parentheses around the object notation
        title: `${navigation.state.params.id}`,
        headerLeft: (
          <HeaderBackButton onPress={() => navigation.goBack(null)} />
        ),
        headerStyle: {
          backgroundColor: '#fff',
          marginTop: 30,
          paddingLeft: -10,
          TextColor: '#000',

          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#000',
          letterSpacing: 0.5,
          marginLeft: -3,
        },
      }),
      /* navigationOptions: { headerTintColor: 'black',
      headerStyle: {
        backgroundColor: '#f4f5f9',paddingTop:30,marginTop:0,borderBottomWidth: 0, borderColor: '#f3f6f8',
        borderWidth: 0,
        TextColor:'#fff',
        elevation: 0,
      shadowOpacity: 0,
      },
      headerTitleStyle:{
        fontSize:16,
        fontWeight:'bold',
        color:'#000',
    paddingTop:20

      },
  }*/
    },

    SubscribeScreen: {
      screen: SubscribeScreen,
      path: '/subscribe',
      navigationOptions: ({navigation}) => ({
        //don't forget parentheses around the object notation
        title: 'Subscribe',
        headerTintColor: '#fff',
        headerLeft: (
          <HeaderBackButton
            tintColor={'white'}
            onPress={() => navigation.goBack(null)}
          />
        ),
        headerStyle: {
          backgroundColor: '#000',
          marginTop: 20,
          TextColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          color: '#000',
          marginLeft: -10,
        },
      }),
    },
    SubscribePhoneScreen: {
      screen: SubscribePhoneScreen,
      path: '/subscribephone',
      navigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#000',
          paddingTop: 0,
          borderBottomWidth: 0,
          borderColor: '#f3f6f8',
          borderWidth: 0,
          TextColor: '#fff',
          elevation: 0,
          marginTop: 10,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff',
        },
      },
    },
    Failure: {
      screen: Failure,
      path: '/Failure',
      navigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#000',
          paddingTop: 30,
          borderBottomWidth: 0,
          borderColor: '#f3f6f8',
          borderWidth: 0,
          TextColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff',
        },
      },
    },
    Success: {
      screen: Success,
      path: '/Success',
      navigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#000',
          paddingTop: 30,
          borderBottomWidth: 0,
          borderColor: '#f3f6f8',
          borderWidth: 0,
          TextColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff',
        },
      },
    },
    BookScreen: {
      screen: BookScreen,
      path: '/book/:id',
      navigationOptions: {header: null},
    },
    ReviewsScreen: {
      screen: ReviewsScreen,
      path: '/review/:id',
    },
    NewReviewScreen: {
      screen: NewReviewScreen,
      path: '/new-review',
    },
    MainView: {
      screen: MainView,
      path: '/mainview',
    },

    PlaylistScreen: {
      screen: PlaylistScreen,
      path: '/PlaylistScreen',
      navigationOptions: ({navigation}) => ({
        //don't forget parentheses around the object notation
        title: '',
        headerTintColor: '#fff',
        headerLeft: (
          <HeaderBackButton
            tintColor={'white'}
            onPress={() => navigation.goBack(null)}
          />
        ),
        headerStyle: {
          backgroundColor: '#000',
          marginTop: 20,
          TextColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
        },
      }),
    },
    AccountScreen: {
      screen: AccountScreen,
      path: '/AccountScreen',
      navigationOptions: ({navigation}) => ({
        //don't forget parentheses around the object notation
        title: 'Settings',
        headerTintColor: '#000',
        headerLeft: (
          <HeaderBackButton onPress={() => navigation.goBack(null)} />
        ),
        headerStyle: {
          backgroundColor: '#fff',
          marginTop: 30,
          paddingLeft: -10,
          TextColor: '#000',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#000',
          letterSpacing: 0.5,
          marginLeft: -3,
        },
      }),
      /*  navigationOptions: {
      title: 'Settings',
        headerTintColor: 'black',
      headerStyle: {
        backgroundColor: '#fff',paddingTop:35,paddingBottom:30,borderBottomWidth: 0, borderColor: '#f3f6f8',
        borderWidth: 0,
        TextColor:'#000',
        elevation: 0,
      shadowOpacity: 0,
  marginTop:20

      },
      headerTitleStyle:{
        fontSize:14,
        fontWeight:'bold',
        color:'#000',

      },
     },*/
    },
    Googlesigninlogin: {
      screen: Googlesigninlogin,
      path: '/Googlesigninlogin',
      navigationOptions: {
        header: null,
        headerTintColor: 'black',
        headerStyle: {
          backgroundColor: 'red',
        },
      },
    },

    SplashScreen: {
      screen: SplashScreen,
      path: '/SplashScreen',
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        headerTintColor: 'black',
        headerStyle: {
          backgroundColor: 'red',
        },
      },
    },
  },
  {
    //  initialRouteName: 'SplashScreen',
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);
//const AppContainer = createAppContainer(LoginNavigator);

const TabbarStackLogin = createBottomTabNavigator(
  {
    Home: {
      screen: LoginNavigator,
      path: '/login/',
      navigationOptions: {
        tabBarLabel: 'Home',

        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-home" color={tintColor} size={25} />
        ),
      },
    },

    searchicons: {
      screen: searchicons,
      path: '/searchicons/',
      navigationOptions: {
        tabBarLabel: 'Search',

        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-search" color={tintColor} size={25} />
        ),
      },
    },
    authScreens: {
      screen: authScreens,
      path: '/authScreens/',
      navigationOptions: {
        tabBarLabel: 'Videos',

        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-videocam" color={tintColor} size={25} />
        ),
      },
    },

    favourite: {
      screen: favouriteScreens,
      path: '/favourite/',
      navigationOptions: {
        tabBarLabel: 'Favourites',

        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-heart" color={tintColor} size={25} />
        ),
      },
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => (
        <Feather
          name={MAP_ROUTER_ICON_NAME[navigation.state.routeName]}
          size={25}
          color={tintColor}
        />
      ),
    }),
    tabBarOptions: {
      showLabel: true,
      activeTintColor: '#fff',
      inactiveTintColor: colors.textSecondary,
      activeBackgroundColor: '#292929',
      inactiveBackgroundColor: '#292929',
      style: {
        borderTopWidth: 0,
        backgroundColor: '#292929',
        height: 60,
        paddingBottom: 8,
        paddingTop: 5,
      },
    },
  },

  (LoginNavigator.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName;

    //  let premiums=navigation.state.routes[navigation.state.index].params.acc;

    /*if(premiums=='paid')
{
  premium.focused=false;
  //alert(premium);
console.log(premiums);
}*/

    if (
      routeName == 'PlaylistScreen' ||
      routeName == 'SplashScreen' ||
      routeName == 'OtpScreen' ||
      routeName == 'SubscribeScreen' ||
      routeName == 'SubscribePhoneScreen' ||
      routeName == 'Googlesigninlogin' ||
      routeName == 'Video'
    ) {
      tabBarVisible = false;
    }
    // tabBarVisible = false

    return {
      tabBarVisible,
    };
  }),
);

export default TabbarStackLogin;
