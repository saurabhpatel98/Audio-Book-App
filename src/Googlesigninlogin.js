import React, { Component } from 'react';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { SvgUri } from 'react-native-svg';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ToastAndroid,
  Button,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-community/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SliderBox } from 'react-native-image-slider-box';
import axios from 'axios';
import TabbarStack from './tabbar';
//import 'react-phone-number-input/style.css';
import Config, { API_URL } from './config';
import DashboardScreen from './screens/DashboardScreen';
import OtpScreen from './screens/OtpScreen';
//import {createAppContainer} from 'react-navigation';
import RNOtpVerify from 'react-native-otp-verify';
import Icon from 'react-native-vector-icons/Zocial';
import OtpVerification from './components/otp/OtpVerification';
import {
  createStackNavigator,
  createAppContainer,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import { Cotter } from 'react-native-cotter';
import { SIGN_OUT, SUBSCRIPTION_PAID } from './constants';
import { connect } from 'react-redux';
import { googleOAuth2 } from './actions/google';
GoogleSignin.configure({
  webClientId:
    '259092449158-sdc80kc3mlrl7kv9uail482tkhv146ck.apps.googleusercontent.com',
  offlineAccess: false, // if you want to access Google API on behalf
});

class Googlesigninlogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userGoogleInfo: {},
      images: [],
      loaded: false,
    };
    this.state.images = [
      require('./images/welcome.png'),
      require('./images/welcome.png'),
      require('./images/welcome.png'),
      require('./images/welcome.png'),
    ];
  }

  logins = async () => {
    // await this.props.login();
    this.signIn();
    //   alert(this.props.error);
    console.log('aftersignin' + this.props.error);

    //alert("g")
  };

  signinfun() {
    const { loaded } = this.state;
    this.state.loaded = false;
    return (
      <View style={{ alignItems: 'center', backgroundColor: '#f2f6f9' }}>
        <View
          style={{
            margin: 30,
            // marginTop: 140,
            textAlign: 'center',
            marginBottom: 50,
          }}>
          <Text style={{ color: '#787c8f', textAlign: 'center', }}>
            By creating an account, I accept Almost Everything{' '}
            <Text
              onPress={() => {
                Linking.openURL('https://almosteverythingapp.com/terms');
              }}
              style={{
                color: '#787c8f',
                textAlign: 'center',
                textDecorationLine: 'underline',
              }}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text
              onPress={() => {
                Linking.openURL(
                  'https://almosteverythingapp.com/privacy-policy',
                );
              }}
              style={{
                color: '#787c8f',
                textAlign: 'center',
                textDecorationLine: 'underline',
              }}>
              Privacy policy
            </Text>
          </Text>
        </View>
      </View>
    );
  }

  signIn = async props => {
    //remove existing user
    await GoogleSignin.isSignedIn().then(isSignedIn => {
      if (isSignedIn) {
        try {
          GoogleSignin.signOut().then(r => { });
        } catch (error) {
          console.warn('ErorrrrÃŸ'.error);
        }
      }
    });

    try {
      // console.log('asdsad');
      //remove existing user
      await GoogleSignin.isSignedIn().then(isSignedIn => {
        if (isSignedIn) {
          try {
            GoogleSignin.signOut().then(r => { });
          } catch (error) {
            console.error('jghjghjh'.error);
          }
        }
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.log("userInfo",userInfo);
      this.setState({
        userGoogleInfo: userInfo,
        loaded: true,
      });
      // console.log('asdsad');
      // console.log(this.state.userGoogleInfo);

      if (this.state.userGoogleInfo.user.id != '') {
        //  alert(this.state.userGoogleInfo.user.id);

        var today = new Date(),
          date =
            today.getFullYear() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getDate();

        const user = {
          active: 'A',
          created: date,
          email: this.state.userGoogleInfo.user.email,
          name: this.state.userGoogleInfo.user.name,
        };
        const formData = new FormData();
        formData.append('email', this.state.userGoogleInfo.user.email);
        formData.append('name', this.state.userGoogleInfo.user.name);

        formData.append('active', 'A');
        formData.append('created', date);
        // console.log('mobile');
        console.log('user ', user);
        axios
          .post(API_URL + 'addmember', user, {})
          .then(res => {
            //if(res.data['status']='200'){

            console.log('Add member', res.data);

            AsyncStorage.setItem('email', res.data.data['email']);
            AsyncStorage.setItem('name', res.data.data['firstName']);

            AsyncStorage.setItem('user', JSON.stringify(res.data.data));
            AsyncStorage.setItem('id', JSON.stringify(res.data.data['ai']));

            //	  alert(res.data.data['firstName']);
            //  console.log(res.data.data['firstName']);
            console.log('add member api', res.data);
            //        this.props.navigation.push('DashboardScreen',{
            //  username:res.data.data['firstName']
            //  })
            axios
              .post(API_URL + 'getsubscribtionbyemail', user)
              .then(response => {
                console.warn('subscription by email', response);
                // console.warn('mysubscrition detail on login', user, response);
                // console.log(response.data.data);
                // console.log(response.data.data[0].subid);
                let subscriptionid = response.data.data?.[0]?.subid;
                let expirydate = response.data.data?.[0]?.expby;
                let paymentId = response.data.data?.[0].payid;
                let f = 'paid';

                var today = Math.round((new Date().getTime()));

                // var date1=new Date(Math.round(expirydate));
                // var date2 =new Date(today);
                // let YY= date1.getFullYear();
                // let DD = date1.getMonth();
                // let MM = date1.getDate();
                // var d1=MM+"-"+DD+"-"+YY;
                // let YY1= date2.getFullYear();
                // let DD1 = date2.getMonth()+1;
                // let MM1 = date2.getDate();
                // var d2=MM1+"-"+DD1+"-"+YY1;

                if (expirydate >= today) {
                  this.setState({ free: 'paid' });
                  this.props.SubscriptionUpdate();
                  const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({
                        routeName: 'DashboardScreen',
                        params: {
                          subscriptionid: subscriptionid,
                          expirydat: expirydate,
                          acc: f,
                        },
                      }),
                    ],
                  });
                  this.props.navigation.dispatch(resetAction);
                } else {
                  this.setState({ free: 'free' });
                  const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({
                        routeName: 'DashboardScreen',
                        params: {
                          subscriptionid: '-',
                          expirydate: '-',
                          acc: 'free',
                        },
                      }),
                    ],
                  });
                  this.props.navigation.dispatch(resetAction);
                }
                // this.props.updateSubscription(
                //   subscriptionid,
                //   paymentId,
                //   res.data.data['email'],
                // );
                // console.warn('==========', response.data.data[0]);
                // this.setState({free: 'paid'});
                // console.log(f);
                // console.log(f);

                // this.props.navigation.push('DashboardScreen', {
                //   subscriptionid: subscriptionid,
                //   expirydat: expirydate,
                //   acc: f,
                // });
                // console.warn('========= kmds nc', response.data.data[0]);
                // console.warn('woring before subscription uodate');
                // this.props.SubscriptionUpdate();
                // const resetAction = StackActions.reset({
                //   index: 0,
                //   actions: [
                //     NavigationActions.navigate({
                //       routeName: 'DashboardScreen',
                //       params: {
                //         subscriptionid: subscriptionid,
                //         expirydat: expirydate,
                //         acc: f,
                //       },
                //     }),
                //   ],
                // });
                // console.warn('woring after subscription uodate');
                // this.props.navigation.dispatch(resetAction);
              })
              .catch(error => {
                console.warn('error no sub', error);
                // this.props.navigation.push('DashboardScreen', {
                //   subscriptionid: '-',
                //   expirydate: '-',
                //   acc: 'free',
                // });
                // this.props.SubscriptionUpdate();
                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({
                      routeName: 'DashboardScreen',
                      params: {
                        subscriptionid: '-',
                        expirydate: '-',
                        acc: 'free',
                      },
                    }),
                  ],
                });
                this.props.navigation.dispatch(resetAction);
              });
          })
          .catch(error => console.log('api', error));
      } else {
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('e 1' + error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('e 2' + error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('e 3' + error);
      } else {
        console.log('errrr', error);
      }
    }
  };
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null, loaded: false }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f2f6f9' }}>
        <View style={{ flex: 1 }}>
          <View
            style={
              (styles.SplashScreen_ChildView,
                { alignItems: 'center', justiftyContent: 'center', marginTop: '15%' })
            }>
            <SvgUri
              width="300"
              height="300"
              uri="https://mayduke.in/demo/audiobook/svg/manicon.svg"
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#41454b',
                marginTop: -20,
              }}>
              Listen audiobooks in tamil anywhere
            </Text>
            {/* <GoogleSigninButton
              style={{ width: 300, height: 50, marginTop: 40 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={() => this.logins()}
            /> */}
            <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
              <TouchableOpacity style={[styles.buttonStyle, { borderWidth: 1, backgroundColor: 'white', borderColor: 'rgba(158, 150, 155, 0.5)' }]}
                onPress={() => { this.logins() }}
              >
                <Image source={require('./screens/img/google-logo.png')} style={{ height: 30, width: 30, marginRight: 15 }}></Image>
                <Text style={{ fontWeight: 'bold' }}>Sign in with Google</Text>
              </TouchableOpacity>
              <View style={styles.separator}>
                <View style={styles.hzLine}></View>
                <Text style={{ color: 'rgba(158, 150, 155, 1)' }}>OR</Text>
                <View style={styles.hzLine}></View>
              </View>
              <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: '#30a960', marginTop: 30 }]}
                onPress={() => { this.props.navigation.navigate('RegisterEmail') }}
                // onPress={() => { this.props.navigation.navigate('DashboardScreen') }}

                // onPress={() => { this.props.navigation.navigate('AudioBookDetail') }}
                // onPress={() => { this.props.navigation.navigate('OtpScreen'),{name:"saurabh"}}}
              >
                <Icon name='email' size={27} color='white' style={{ marginRight: 20 }} />
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign up with email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {this.signinfun()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  SplashScreen_ChildView: {
    flex: 1,
    backgroundColor: '#f2f6f9',
  },
  buttonStyle: {
    elevation: 2, width: '80%', height: 45, marginTop: 50,
    borderRadius: 3,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  hzLine: { height: 1.5, backgroundColor: 'rgba(158, 150, 150, .5)', width: '43%' },
  separator: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%', marginTop: 30 }
});

const middleware = () => {
  return dispatch => {
    dispatch({ type: 'LOGIN_START' });
    dispatch(googleOAuth2.login());
  };
};

const mapStateToProps = state => {
  console.log(state);
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    login: async () => dispatch(middleware()),
    SubscriptionUpdate: () =>
      dispatch({ type: SUBSCRIPTION_PAID, payload: [{ payment: 'payment' }] }),
    updateSubscription: (subscription_id, paymentid, email) =>
      dispatch(updateSubscription(subscription_id, paymentid, email)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Googlesigninlogin);
