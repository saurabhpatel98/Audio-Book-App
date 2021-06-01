import React, { Component, PureComponent } from "react";
import { StyleSheet, Text, View, Button, TouchableHighlight, TouchableOpacity, Image, ImageBackground, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  AppRegistry,
  ScrollView,
  Title,
  SafeAreaView,
  Platform,
} from 'react-native';
//import { RaisedTextButton } from 'react-native-material-buttons';
//import { TextField } from 'react-native-material-textfield';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SliderBox } from "react-native-image-slider-box";
import PhoneInput from 'react-native-phone-input';
import axios from 'axios';
import zget from 'zget';
import RazorpayCheckout from 'react-native-razorpay';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
//import TabbarStack from '../tabbar';
//import 'react-phone-number-input/style.css';
//import Customsli from './customsli';
import DashboardScreen from "./DashboardScreen";
import HomeScreen from "./HomeScreen";
import { createAppContainer } from 'react-navigation';
import { colors } from "../utils/themes";
import { API_URL } from "../config";

var expire_bys = "";
var expire_byd = "";
let defaults = {
  firstname: 'Eddard',
  lastname: 'Stark',
  about: 'Stoic, dutiful, and honorable man, considered to embody the values of the North',
};
export default class Success extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subid: '',
      paymentid: '',
      id: '',
      expire_by: '',
    };

    //this.state.subid = zget(this.props, 'navigation.state.params.subid');
    //this,state.paymentid = zget(this.props, 'navigation.state.params.payid');
    //const email = zget(this.props, 'navigation.state.params.email');

  }
  componentDidMount() {
    const { navigation } = this.props;
    /* this._navListener = navigation.addListener('didFocus', () => {
       StatusBar.setBarStyle('light-content', true);
     });*/
    // Api.loadRecentBooks();
    // Api.loadQuotes();

    const name = zget(this.props, 'navigation.state.params.subid');
    const payid = zget(this.props, 'navigation.state.params.payid');
    const email = zget(this.props, 'navigation.state.params.email');
    expire_bys = zget(this.props, 'navigation.state.params.expire_bys');
    expire_byd = zget(this.props, 'navigation.state.params.expire_byd');
    this.state.expire_by = zget(this.props, 'navigation.state.params.expire_by');
    const expire_by = zget(this.props, 'navigation.state.params.expire_by');

    //expire_bys= this.props.navigation.getParam('expire_bys', 'NO-User');
    //expire_byd= this.props.navigation.getParam('expire_by', 'NO-User');

    console.log("kjkljkl payment id" + payid);
    console.log("kjkljkl subscription id" + name);

    console.log("kjkljkl email" + email);
    console.log("kjkljkl expire_by" + expire_by);
    console.log("kjkljkl expire_bys" + expire_bys);

    console.log("kjkljkl expire_byd" + expire_byd);


    AsyncStorage.getItem('id').then(id => {
      console.log('dddddddddddd');
      // console.log(token);
      this.state.id = id;
    });



    const userf = {
      subscriptionid: name,


    };
    this.getcate(userf, expire_by);



  }
  getcate(userf, expire_by) {
    const { navigation } = this.props;
    const name = zget(this.props, 'navigation.state.params.subid');
    const payid = zget(this.props, 'navigation.state.params.payid');
    const email = zget(this.props, 'navigation.state.params.email');
    const expire_byss = zget(this.props, 'navigation.state.params.expire_by');
    //  const expire_by = this.props.navigation.getParam('expire_by', 'NO-User');
    const subscriptiondetails = navigation.getParam(
      'subscriptiondetails',
      'NO-User',
    );


    console.log("ssssssssssssssssssssssssssssssssssssssdd")
    console.log(subscriptiondetails);
    console.log(subscriptiondetails.expire_by);
    console.log("expppprrrrrrrrrrrrrrrrrrrrrrrr");
    console.log(expire_by);
    console.log(this.state.expire_by);
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
    console.log(expire_bys);
    console.log(expire_byd);

    /* axios.post("https://app.almosteverythingapp.com:3002/v2/getSubscriptiondetails", userf, {
  }).then(res => {*/


    /*
      this.state.categorydata=res.data.data;    
      this.setState({
   // tableData: response.data
 tableData :res.data.data
   });*/
    var today = Math.round((new Date()).getTime() / 1000);
    console.log("get subscrition details annnnnnnnnnnnnnnnnnnnnnnnnnn")
    // console.log(res.data);
    console.log(payid);
    const users = {
      subid: name,
      planid: subscriptiondetails.plan_id,
      payid: payid,
      custid: this.state.id,
      expby: expire_byss,
      startat: today,
      status: "PAID",
      email: email,
    }
    console.log("infooooooooooooooooannnnnnnnnnnnnnnnnnnnnnnnnnn")
    console.log(users);
    AsyncStorage.setItem(
      'expirydate',
      String(expire_by)
    );
    console.log(expire_by);
    axios.post(API_URL + 'subscribedusers', users, {
    }).then(res => {

      console.log(res);
    })
      .catch(error => console.log(error));



    // })
    //.catch(error => console.log(error));
    //console.log(data);	 
  }
  onSubmit() {
    let errors = {};
    const { navigation } = this.props;
    navigation.navigate('DashboardScreen');
  }

  render() {

    // let { errors = {}, secureTextEntry, ...data } = this.state;
    const { navigation } = this.props;

    const { subid, paymentid } = this.state;
    const s = zget(this.props, 'navigation.state.params.subid');
    const p = zget(this.props, 'navigation.state.params.payid');
    const paidAmount = zget(this.props, 'navigation.state.params.paidAmount');
    return (

      <>
        <View style={{ backgroundColor: '#000', padding: 8 }} />
        <View style={styles.container}>
          {/* <SafeAreaView > */}
          <ScrollView

            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps='handled'
          >

            <View style={{
              justifyContent: 'center',
              flexDirection: 'row', backgroundColor: '#fff', marginTop: '30%'
            }}>
              <Image
                source={require('./img/successicon.png')}

                resizeMode="cover"
                style={styles.profileImg}
              />
            </View>

            <View style={styles.container, { padding: 13, borderRadius: 5, backgroundColor: '#fff' }}>
              <View style={{
                justifyContent: 'center', flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <Text style={{
                  fontSize: 20, paddingTop: 1, ustifyContent: 'center', alignItems: 'center',
                  color: '#12c54b', fontWeight: 'bold'
                }}>Payment Successful !
					      </Text>
                <Text style={{
                  fontSize: 16, paddingTop: 10,
                  color: '#6f7489', fontWeight: 'bold'
                }}>Transaction Number: {p}
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: '#eff2f6',
                  borderBottomWidth: 1,
                  paddingTop: 10
                }}
              />


              <View style={{
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Text style={{
                  fontSize: 18, paddingTop: 10,
                  color: '#ccc', fontWeight: 'bold'
                }}>Amount Paid : &#8377;{' '}{paidAmount}
                </Text>

              </View>

              <View>

                <TouchableOpacity
                  style={styles.buttonFacebookStyle}
                  activeOpacity={0.5}
                  onPress={() =>

                    // this.props.navigation.navigate('MainView')
                    navigation.navigate('DashboardScreen')

                  }
                >
                  <Text style={styles.buttonTextStyle}>
                    Return to Dashboard
					        </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          {/* </SafeAreaView> */}
          <View style={styles.bottom}>
          </View>
        </View>
      </>
    );
  }
}

Success.navigationOptions = ({ navigation }) => ({
  title: '',
  headerLeft: (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Image
          style={{ width: 15, height: 15, margin: 15 }}
          source={require('../images/backwhite.png')}
        />
      </TouchableOpacity>
    </View>
  ),
  headerTintColor: '#ffffff',
  // style: {
  //   height: 100,
  //   paddingBottom: 80,
  // },
  headerStyle: {
    backgroundColor: '#2F95D6',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 3,
    padding: 10,
  },
  headerTitleStyle: {
    fontSize: 18,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff2f6',
    padding: 10,

  },
  profileImg: {
    marginTop: 50,
    marginBottom: 50,
    justifyContent: 'center',
    width: 80,
    height: 80,
    padding: 20,

    margin: 20
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
    marginTop: 5,
    marginBottom: 1,
  },


  buttonFacebookStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12c54b',

    height: 40,
    borderRadius: 5,
    margin: 15,
    marginTop: 30
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 9,

    resizeMode: 'stretch',
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    justifyContent: 'flex-end',
    marginBottom: 6
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
    fontWeight: "bold",
  },
  buttonIconSeparatorStyle: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  },
  scroll: {
    backgroundColor: '#f3f6f8',
  },

  contentContainer: {
    padding: 0,
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