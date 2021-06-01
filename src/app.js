/**
 * @format
 * @flow
 */

import React from 'react';
import {StatusBar, Platform} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {colors} from './utils/themes';
import TabbarStack from './tabbar';
import TabbarStackLogin from './tabbarlogin';
import axios from 'axios';
import Simple from './simple';
import Customsli from './customsli';
import Login from './login';
import Logincotter from './logincotter';
import Register from './pages/Register';
//import {Provider} from './recontext/store';
import OtpScreen from './screens/OtpScreen';
import DashboardScreen from './screens/DashboardScreen';
import AsyncStorage from '@react-native-community/async-storage';

import {createStackNavigator} from 'react-navigation';
import OtpVerification from './components/otp/OtpVerification';
import {STATE_NONE} from 'react-native-track-player';
import {Provider, useDispatch, useSelector} from 'react-redux';
import configureStore from './store/store';
import NavigationService from './navigationservice';

export const store = configureStore();

async () => {
  console.warn('=====================');
  try {
    let res = await AppgainSDK.initSDK(
      '259092449158',
      'AAAAPFMdB4Y:APA91bFOr6AcZe7oazo_gbadiEmmojL7hi2Izm0FfHC4fawM_S4f0mjez55o9OmWEFwvsMbL6TQd5RI1LDR47MNGz0HL_4D1egmzYspUOCBTUQj5u43PlqXzQ5x8xFr9ds62n0-R5gNn',
      true,
    );
    console.warn('Init ', res);
  } catch (error) {
    console.log('Error: ', error);
  }
};

if (Platform.OS === 'android') {
  StatusBar.setBarStyle('light-content');
  StatusBar.setBackgroundColor(colors.black);
} else {
  StatusBar.setBarStyle('light-content');
}
let subscriptionid = '';
let expirydate = '';
let f = '';
const AppNavigator = createAppContainer(TabbarStack);

const AppNavigatorLogin = createAppContainer(TabbarStackLogin);

const LoginNavigator = createStackNavigator(
  {
    DashboardScreen: {
      screen: DashboardScreen,
      path: '/',
      navigationOptions: {header: null},
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
    login: {screen: Login, navigationOptions: {header: null}},
    logincotter: {screen: Logincotter, navigationOptions: {header: null}},
    Register: {screen: Register, navigationOptions: {header: null}},

    otpverfication: {
      screen: OtpVerification,
      navigationOptions: {header: null},
    },
  },
  {
    //initialRouteName: 'logincotter',
    initialRouteName: 'login',
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

Hide_Splash_Screen = () => {
  f = '';
  let ff = AsyncStorage.getItem('subscriptionid').then(subscriptionid => {
    //subscriptionid=subscriptionid;
    //console.log(subscriptionid);
    return subscriptionid;
  });
  // console.warn('========================', ff);
  if (ff == null) {
    f = 'free';
  } else {
    f = 'paid';
  }
  console.log(f);
  switch (f) {
    case 'paid':
      return (
        <AppNavigatorLogin
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      );
    case 'free':
      return (
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      );
  }
};
Hide_Splash_Screens = () => {
  return <AppNavigator />;
};

//const AppContainer = createAppContainer(LoginNavigator);
//const AppContainer = createAppContainer(LoginNavigator);
/* const { props } = this;
const App = () => (
  
  <Provider store={store} style={{backgroundColor:'#000'}}>
     {Hide_Splash_Screen()}
   
  </Provider>
);

export default App;
 */
function App() {
  const selector = useSelector(state => state.subscriptionType);
  const dispatch = useDispatch();
  let subscriptionId = '';
  useEffect = () => {
    let ff = AsyncStorage.getItem('subscriptionid').then(subscriptionid => {
      //subscriptionid=subscriptionid;
      // console.warn(subscriptionid);
      subscriptionId = subscriptionId;
      // return subscriptionid;
    });
    // console.log("subscriptionid");
    // console.log('selector');
    /* if(ff == null ){
        f='free';
              }
              else{
        f='paid';
              }
              console.log(f); */
    let subscriptionType = selector;
    let expirydate = AsyncStorage.getItem('expirydate').then(expirydate => {
      expirydate = expirydate;
    });
    let today = new Date();
    expirydate = new Date(expirydate);
    if (subscriptionid && expirydate > today) {
      subscriptionType = 'PAID';
    } else if (expirydate < today) {
      subscriptionType = 'FREE';
    }
    // console.warn(
    //   'App js Subscription type =====================',
    //   subscriptionType,
    // );
    switch (subscriptionType) {
      case 'PAID':
        return (
          /* <AppNavigatorLogin ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }} /> */
          <AppNavigatorLogin
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        );
      case 'FREE':
        return (
          <AppNavigator
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        );
    }
  };
  return useEffect();
}
export default () => {
  return (
    <Provider store={store} style={{backgroundColor: '#000'}}>
      <App />
    </Provider>
  );
};
