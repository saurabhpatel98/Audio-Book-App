import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AppgainSDK from 'react-native-appgain-sdk-library';
import Splash from 'react-native-splash-screen';

import axios from 'axios';
import {NavigationActions, StackActions} from 'react-navigation';
import {SUBSCRIPTION_PAID} from './constants';
// import {connect} from './recontext/store';
import {connect} from 'react-redux';
import { API_URL } from './config';
let subscriptionid = '';
let expirydate = '';
let f = '';
let acc = '';
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      username: '',
      free: '',
    };
  }
  Hide_Splash_Screen = async () => {
    // try {
    //   let res = await AppgainSDK.initSDK(
    //     '6060858563b59b000b3c71e5',
    //     '014cc5c652f677316cfbdd7ebe84f22d66a3ca6e75d4c3d9f089a75516ebf603',
    //     true,
    //   );
    //   console.warn('App gain init ', res);
    // } catch (error) {
    //   console.log('Error: ======= ', error);
    // }

  //   try {
  //     let result = await AppgainSDK.matchLink();
  //     Alert.alert('response  ' + result);
  //   } catch (error) {
  //     console.log('Error: ', error);
  //     Alert.alert('Error: ', error);
  //   }

  //   try {
  //     let res = await AppgainSDK.fireAutomator({
  //       triggerPointName: 'triggerPoint',
  //       payload: {key: 'value'},
  //     });
  //     console.warn('Fire automater', res);
  //   } catch (error) {
  //     console.log('Error: ', error);
  //   }
  

      // try {
      //    let res =  await AppgainSDK.addNotificationChannel(
      //         'email',  // 'email' or 'sms'
      //         'test@gmail.com' // user email or phone number
      //     );
      //     console.warn("=======Notification channel email",res)
      // } catch (error) {
      //     console.log("Error: ========= ", error);
      // }


    this.setState({
      isVisible: false,
    });
    AsyncStorage.getItem('subscriptionid').then(subscriptionid => {
      subscriptionid = subscriptionid;
    });
    AsyncStorage.getItem('expirydate').then(expirydate => {
      expirydate = expirydate;
    });
    AsyncStorage.getItem('name').then(name => {
      this.state.username = name;
      if (name != null) {
        console.log('rrrrrrrrrrrrrrr');
        console.log(name);
        AsyncStorage.getItem('email').then(email => {
          const user = {
            email: email,
            subscriptionid: subscriptionid,
          };
          console.log("user =====> ", user);
          let f = '';
          axios
            .post(API_URL + 'getsubscribtionbyemail', user)
            .then(response => {
              console.log('mysubscrition detail splash screen s');
              console.log(response.data.data[0].subid);
              subscriptionid = response.data?.data?.[0]?.subid;
              expirydate = response.data?.data?.[0]?.expby;
              f = 'paid';
              
              console.log(f);
              console.log(f);
              console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
              console.log(expirydate);
              console.log("lllllllllllllllllllllllllllllllllll");
              var today = Math.round((new Date().getTime()));
              console.log(today);


              // console.log(new Date(Math.round(expirydate))) ;
              // console.log(new Date(today)) ;
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

              // console.log(d1);
              // console.log(d2);
              // //console.log(d1===d2);

              // console.log(d1>=d2);
              // //console.log(d1<d2);
              // console.log(d1===d2);


              // console.log(new Date(Math.round(expirydate)).getTime() >= new Date(today).getTime()) ;
              // console.log(new Date(Math.round(expirydate)).getTime() <= new Date(today).getTime()) ;
              // console.log(new Date(Math.round(expirydate)).getTime() === new Date(today).getTime()) ;
              // this.props.navigation.push('DashboardScreen', {
              //   subscriptionid: subscriptionid,
              //   expirydat: expirydate,
              //   acc: f,
              // });
              // console.warn("=========",this.props)
             if(expirydate>=today){
              this.setState({free: 'paid'});
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

             }
             else{
              this.setState({free: 'free'});
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
         
            })
            .catch(error => {
              console.log('error no sub');
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
        });
      } else {
        this.props.navigation.navigate('Googlesigninlogin');
      }
    });

    if (this.state.username == null) {
      this.props.navigation.navigate('Googlesigninlogin');
    }
    Splash.hide();
  };

  componentDidMount() {
    // var that = this;
    // setTimeout(function() {
    this.Hide_Splash_Screen();
    // }, 5000);
  }

  render() {
    return (
      <View style={styles.SplashScreen_RootView}>
        {/* <StatusBar backgroundColor="#000" barStyle="light-content" /> */}
        <View style={styles.SplashScreen_ChildView}>
          <Image
            source={require('./images/open.png')}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    SubscriptionUpdate: async () =>
      dispatch({type: SUBSCRIPTION_PAID, payload: [{payment: 'payment'}]}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreen);

const styles = StyleSheet.create({
  MainContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : 0,
  },

  SplashScreen_RootView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },

  SplashScreen_ChildView: {
    backgroundColor: '#fff',
  },
});
