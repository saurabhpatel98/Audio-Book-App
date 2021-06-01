/* eslint-disable react-native/no-inline-styles */
import React, {Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
  AppRegistry,
  ScrollView,
  FlatList,
  SafeAreaView,
  Platform,
} from 'react-native';
//import { RaisedTextButton } from 'react-native-material-buttons';
//import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {SliderBox} from 'react-native-image-slider-box';
import PhoneInput from 'react-native-phone-input';

import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
//import TabbarStack from '../tabbar';
//import 'react-phone-number-input/style.css';
//import Customsli from './customsli';
import DashboardScreen from './DashboardScreen';
import HomeScreen from './HomeScreen';
import {createAppContainer} from 'react-navigation';
import {colors} from '../utils/themes';
import {API_URL} from '../config';

function capitalize(input) {
  return input
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}

export default class SubscribeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.getsubscription = this.getsubscription.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.state = {
      tableData: [],
      email: '',
      name: '',
    };
    AsyncStorage.getItem('email').then(token => {
      console.log('dddddddddddd');
      console.log(token);
      this.state.email = token;
    });
    AsyncStorage.getItem('name').then(name => {
      console.log('dddddddddddd');
      // console.log(token);
      this.state.name = name;
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

    this.getsubscription();
    //console.log(data);
  }
  subscribe(plan_det) {
    console.log('plan details are subscription');
    console.log(plan_det);

    if (plan_det._id != null) {
      console.log('our plan');
      const {navigation} = this.props;
      const planid = plan_det._id;
      console.log(planid);
      const dstr = new Date();
      /* 	const date = dstr.getFullYear() + '-' + (dstr.getMonth() + 1) + '-' + dstr.getDate();
	  const today = (new Date(date).getTime())/1000;
    const year = dstr.getFullYear();
    const month = dstr.getMonth();
    const day = dstr.getDate(); */

      const period = plan_det.period;
      const interval = plan_det.interval;
      var expiry_date = '';
      if (period == 'daily') {
        expiry_date = dstr.setDate(dstr.getDate() + interval);
      } else if (period == 'weekly') {
        expiry_date = dstr.setDate(dstr.getDate() + 7 * interval);
      } else if (period == 'monthly') {
        expiry_date = dstr.setMonth(dstr.getMonth() + interval);
      } else if (period == 'yearly') {
        expiry_date = dstr.setFullYear(dstr.getFullYear() + interval);
      }

      var email = '';
      var name = '';
      const expdate = expiry_date;

      AsyncStorage.getItem('email').then(token => {
        // console.log("dddddddddddd");
        // console.log(token);
        email = token;
      });

      AsyncStorage.getItem('name').then(name => {
        // console.log("dddddddddddd");
        // console.log(name);
        name = name;
      });

      var subids = new Date();

      // console.log(this.state.name);
      const user = {
        subscription_id: subids,
        plan_id: planid,
        total_count: 1,
        quantity: 1,
        customer_notify: 1,
        expire_by: expdate,
      };
      console.log('hvdshbjjjjjjjjjjjjjeeeeeeeeeeeeeeeeeeeee');
      console.log(user);
      console.log('expiryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
      console.log(expdate);
      var subidsd = Math.round(new Date().getTime() / 1000);
      this.props.navigation.navigate('SubscribePhoneScreen', {
        subid: subidsd,
        //  subscriptiondetails:res.data.data,
        subscriptiondetails: user,
        expire_by: expdate,
        plandet: plan_det,
      });

      // original need to activate once logic and api is ready
      /*   axios.post("https://app.almosteverythingapp.com:3002/v2/createsubscription", user, { }).then(res => {
      if(res.data.data.status=='created'){
        // navigate('subscribephone');
        this.props.navigation.navigate('SubscribePhoneScreen', {
          subid: res.data.data._id,
          subscriptiondetails:res.data.data,
          plandet:plan_det,
        })
        // alert(res.data.id);
      }
       console.log("mkmkmkmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
      console.log(res.data);
    })
    .catch(error => console.log(error));*/
    } else {
      const {navigation} = this.props;
      const planid = plan_det.id;
      const dstr = new Date();
      /* 	const date = dstr.getFullYear() + '-' + (dstr.getMonth() + 1) + '-' + dstr.getDate();
	  const today = (new Date(date).getTime())/1000;
    const year = dstr.getFullYear();
    const month = dstr.getMonth();
    const day = dstr.getDate(); */

      const period = plan_det.period;
      const interval = plan_det.interval;
      if (period == 'daily') {
        var expiry_date = dstr.setDate(dstr.getDate() + interval);
      } else if (period == 'weekly') {
        var expiry_date = dstr.setDate(dstr.getDate() + 7 * interval);
      } else if (period == 'monthly') {
        var expiry_date = dstr.setMonth(dstr.getMonth() + interval);
      } else if (period == 'yearly') {
        var expiry_date = dstr.setFullYear(dstr.getFullYear() + interval);
      }

      var email = '';
      var name = '';
      const expdate = expiry_date;

      AsyncStorage.getItem('email').then(token => {
        // console.log("dddddddddddd");
        // console.log(token);
        email = token;
      });

      AsyncStorage.getItem('name').then(name => {
        // console.log("dddddddddddd");
        // console.log(name);
        name = name;
      });

      // var expdate = new Date();
      // console.log(this.state.name);
      const user = {
        plan_id: planid,
        total_count: 1,
        quantity: 1,
        customer_notify: 1,
        expire_by: expdate,
      };
      // console.log("hvdshbjjjjjjjjjjjjj");
      // console.log(user);
      axios
        .post(API_URL + 'createsubscription', user, {})
        .then(res => {
          if (res.data.status == 'created') {
            // navigate('subscribephone');
            this.props.navigation.navigate('SubscribePhoneScreen', {
              subid: res.data.id,
              subscriptiondetails: res.data.data,
              plandet: plan_det,
            });
            // alert(res.data.id);
          }
          // console.log("mkmkmkmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
          console.log(res.data);
        })
        .catch(error => console.log(error));
    }
  }
  getsubscription() {
    axios
      .get(API_URL + 'getallplans')
      .then(response => {
        this.state.data = response.data.data;
        this.setState({
          // tableData: response.data
          tableData: response.data.data,
        });
        console.log(response.data.data);
      })
      .catch(error => {
        console.log('error');
      });
    //console.log(data);
  }

  render() {
    const {tableData} = this.state;
    // console.log(":kjashjhsdnaf");
    console.log('================================', tableData);

    return (
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
              <Text
                style={
                  (styles.btnText,
                  {
                    fontSize: 30,
                    color: '#cecece',
                    fontWeight: 'bold',
                    paddingBottom: 10,
                  })
                }>
                Learn Something New Everyday
              </Text>
              <View style={styles.btnContainer}>
                <Image
                  source={require('../images/bookicon.png')}
                  style={styles.icon}
                />
                <Text style={styles.btnText}>Curated Audiobooks in Tamil</Text>
              </View>

              <View style={styles.btnContainer}>
                <Image
                  source={require('../images/listenicon.png')}
                  style={styles.icon}
                />
                <Text style={styles.btnText}>Listen to Podcasts on the go</Text>
              </View>

              <View style={styles.btnContainer}>
                <Ionicons
                  name="ios-videocam"
                  color="rgba(255, 255, 255, 0.8)"
                  size={15}
                />
                <Text style={styles.btnText}>
                  Exclusive Access to Premium Videos
                </Text>
              </View>

              <FlatList
                contentContainerStyle={{
                  paddingTop: 0,
                  marginTop: 5,
                  flexGrow: 1,
                }}
                data={tableData}
                renderItem={({item: rowData}) => {
                  console.log(rowData);
                  return (
                    <View
                      style={{
                        backgroundColor: '#292929',
                        borderRadius: 5,
                        marginBottom: 10,
                      }}>
                      <TouchableOpacity onPress={() => this.subscribe(rowData)}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                          }}>
                          {rowData.tags ? (
                            <View
                              style={{
                                fontWeight: 'bold',
                                width: 120,
                                marginTop: 10,
                                paddingTop: 0,
                              }}>
                              <Text
                                color="#eab543"
                                style={{
                                  backgroundColor: '#eab543',
                                  position: 'absolute',
                                  left: 0,
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  paddingTop: 5,
                                  paddingBottom: 5,
                                  marginBottom: 10,
                                  color: '#fff',
                                  borderRadius: 2,
                                  fontWeight: 'bold',
                                }}
                                textStyle={{fontWeight: 'bold'}}>
                                {rowData.tags}
                              </Text>
                            </View>
                          ) : null}
                          <View
                            style={{
                              position: 'absolute',
                              right: 0,
                              paddingTop: 10,
                              paddingRight: 10,
                              fontWeight: 'bold',
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                backgroundColor: '#11c64b',
                                color: '#fff',
                                borderRadius: 2,
                                padding: 10,
                              }}>
                              Subscribe Now
                            </Text>
                          </View>
                        </View>

                        <View style={styles.btnContainers}>
                          <Text
                            style={
                              (styles.btnText,
                              {
                                fontSize: 18,
                                color: '#fff',
                                fontWeight: 'bold',
                                paddingTop: 30,
                                paddingLeft: 0,
                              })
                            }>
                            {rowData.item.name}
                          </Text>
                        </View>
                        <View style={styles.btnContainers}>
                          <Icon
                            style={{
                              fontSize: 20,
                              color: '#12c54b',
                              fontSize: 20,
                              fontWeight: 'bold',
                              paddingTop: 3,
                              paddingRight: 0,
                            }}>
                            &#8377;{' '}
                          </Icon>
                          <Text
                            style={
                              (styles.btnText,
                              {
                                paddingLeft: 0,
                                marginLeft: 0,
                                color: '#12c54b',
                                fontSize: 20,
                                fontWeight: 'bold',
                              })
                            }>
                            {rowData.item.amount / 100}
                            {/* /{' '} */}
                            {/* {capitalize(rowData.tags)} */}
                          </Text>
                        </View>

                        <View style={styles.btnContainers}>
                          <Text
                            style={
                              (styles.btnText,
                              {
                                paddingLeft: 0,
                                marginLeft: 0,
                                color: '#fff',
                                fontSize: 15,
                              })
                            }>
                            {rowData.item.description}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                keyExtractor={(item, index) => index}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  btnContainers: {
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 5,
    margin: 0,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  button: {
    borderRadius: 5,
  },
  icon: {
    width: 14,
    height: 14,
  },
  btnText: {
    fontWeight: 'normal',
    fontSize: 16,
    color: '#cecece',
    paddingLeft: 15,
  },

  btnClickContain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    backgroundColor: '#009D6E',
    borderRadius: 5,
    padding: 20,
    marginTop: 15,
    marginBottom: 15,
  },

  buttonFacebookStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12c54b',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5,
    margin: 15,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,

    resizeMode: 'stretch',
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    justifyContent: 'flex-end',
    marginBottom: 6,
  },
  btnIcon: {
    padding: 1,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  buttonTextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  buttonIconSeparatorStyle: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
  scroll: {
    backgroundColor: '#f3f6f8',
  },

  contentContainer: {
    padding: 2,
  },

  buttonContainer: {
    paddingTop: 1,
    margin: 1,
  },

  safeContainer: {
    flex: 1,
    backgroundColor: '#E8EAF6',
  },
});
