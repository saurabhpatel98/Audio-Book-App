import React, { Component, PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppRegistry, ScrollView, SafeAreaView, Platform } from 'react-native';
//import { RaisedTextButton } from 'react-native-material-buttons';
//import { TextField } from 'react-native-material-textfield';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SliderBox } from 'react-native-image-slider-box';
import PhoneInput from 'react-native-phone-input';
import axios from 'axios';
import Success from './success';
import RazorpayCheckout from 'react-native-razorpay';
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
import { createAppContainer } from 'react-navigation';
import { colors } from '../utils/themes';
import { useDispatch, useSelector, connect } from 'react-redux';
import { SUBSCRIPTION_PAID, SUBSCRIPTION_FREE } from '../constants';
import { updateSubscription } from '../../src/actions/google';
import { Alert } from 'react-native';
import { API_URL } from '../config';
let defaults = {
  firstname: 'Eddard',
  lastname: 'Stark',
  about:
    'Stoic, dutiful, and honorable man, considered to embody the values of the North',
};

function capitalize(input) {
  return input
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}

class SubscribePhoneScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      phone: '',
      id: '',
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

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.onSubmitButtonPress = this.onSubmitButtonPress.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
    this.onSubmitLastName = this.onSubmitLastName.bind(this);
    this.onSubmitAbout = this.onSubmitAbout.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);

    this.firstnameRef = this.updateRef.bind(this, 'firstname');
    this.lastnameRef = this.updateRef.bind(this, 'lastname');
    this.aboutRef = this.updateRef.bind(this, 'about');
    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');
    this.houseRef = this.updateRef.bind(this, 'house');

    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

    this.state = {
      secureTextEntry: true,
      ...defaults,
    };
  }
  onFocus() {
    let { errors = {} } = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({ errors });
  }

  onChangeText(text) {
    ['firstname', 'lastname', 'about', 'email', 'password']
      .map(name => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
  }

  onSubmitFirstName() {
    this.lastname.focus();
  }

  onSubmitLastName() {
    this.about.focus();
  }

  onSubmitAbout() {
    this.email.focus();
  }

  onSubmitEmail() {
    this.password.focus();
  }

  onSubmitPassword() {
    this.password.blur();
  }

  async onSubmit() {
    let errors = {};
    const { navigation } = this.props;

    const subscriptionid = navigation.getParam('subid', 'NO-User');
    const subscriptiondetails = navigation.getParam(
      'subscriptiondetails',
      'NO-User',
    );
    const plandet = navigation.getParam('plandet', 'NO-User');
    // console.log("sfsdfsdfsdfsd");console.log(subscriptionid+plandet+subscriptiondetails);
    //  : expdate,
    const expdate = this.props.navigation.getParam('expire_by', 'NO-User');
    console.log('ssssssssssssssssssssssssssssssssss');
    console.log(expdate);
    if (plandet._id != null) {
      var today = Math.round(new Date().getTime() / 1000);
      var order_id = 0;
      const orders = {
        amount: plandet.item.amount, // amount in the smallest currency unit
        currency: 'INR',
        receipt: today,
      };
      try {
        await axios
          .post(API_URL + 'createorder', orders, {})
          .then(res => {
            console.log('mkmkmkmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
            console.log(res.data);
            order_id = res.data.id;
            console.log('Order id =======================', order_id);
          })
          .catch(error =>
            console.log('Creat order errro = ===============', error),
          );
        // console.log(order_id);
      } catch (e) {
        console.log('ERROR', e);
        this.isLoading = false;
      }
      var options = {
        description: plandet,
        image: 'https://almost-everything-s3-bucket.s3.ap-south-1.amazonaws.com/aeapplogo.png',
        order_id: order_id,
        currency: 'INR',
        key: 'rzp_live_1po8erQYrGwMgK',
        amount: '5000',
        name: 'Almost Everything',
        prefill: {
          email: this.state.email,
          contact: this.firstname.value(),
          name: this.state.name,
        },
        theme: { color: '#11c64b' },
      };
      if (this.state.phone) {
        RazorpayCheckout.open(options)
          .then(data => {
            // handle success
            //
            // alert('raazorpay');
            const expdates = this.props.navigation.getParam(
              'expire_by',
              'NO-User',
            );
            console.log('raazorpay');
            console.log(data);
            // alert(`Success: ${data.razorpay_payment_id}`);
            AsyncStorage.setItem('subscriptionid', order_id);
            this.props.updateSubscription(
              order_id,
              data.razorpay_payment_id,
              this.state.email,
              expdates,
              plandet.item.amount / 100,
            );

            console.log('tttttttttttttttttttttttttttttttt');
            console.log(expdates);
            console.log('ggggggggggggggggggggggggggggggggg');
            console.log(expdate);
            console.log('plandet.item.amount / 100', plandet.item.amount / 100);
            navigation.navigate('Success', {
              subid: order_id.toString(),
              payid: data.razorpay_payment_id,
              email: this.state.email,
              expire_bys: expdates,
              expire_by: expdates,
              subscriptiondetails: subscriptiondetails,
              paidAmount: plandet.item.amount / 100,
            });

            /*  const userf = {
        subscriptionid:data.razorpay_subscription_id,
    //razorpay_payment_id:data.razorpay_subscription_id,
    //razorpay_signature:data.razorpay_signature,

      };
         axios.post("https://app.almosteverythingapp.com:3002/v2/getSubscriptiondetails", userf, {
    }).then(res => {

        console.log("sub");
    console.log(res);


    })
    .catch(error => console.log(error));*/
          })
          .catch(error => {
            // handle failure
            //  alert(`Error: ${error.code} | ${error.description}`);
            // console.warn('Error', error.error.description);
            if (error.error?.description?.includes('cancelled by user')) {
              return;
            } else {
              console.log('===================-===========', order_id);
              console.log('Error', error);
              return navigation.navigate('Failure');
            }
          });
      } else {
        Alert.alert('Error', 'Phone number is required');
      }
    } else {
      console.log('====else', subscriptionid);
      var options = {
        description: plandet,
        image: 'https://almost-everything-s3-bucket.s3.ap-south-1.amazonaws.com/aeapplogo.png',
        subscription_id: subscriptionid,
        currency: 'INR',
        key: 'rzp_live_1po8erQYrGwMgK',
        amount: '5000',
        name: 'Almost Everything',
        prefill: {
          email: this.state.email,
          contact: this.firstname.value(),
          name: this.state.name,
        },
        theme: { color: '#11c64b' },
      };
      if (this.state.phone) {
        RazorpayCheckout.open(options)
          .then(data => {
            // handle success
            //
            // alert('raazorpay');
            // console.log('raazorpay');
            // console.log(data);
            // alert(`Success: ${data.razorpay_payment_id}`);
            AsyncStorage.setItem(
              'subscriptionid',
              data.razorpay_subscription_id,
            );
            this.props.updateSubscription(
              data.razorpay_subscription_id,
              data.razorpay_payment_id,
              this.state.email,
              expdates,
              100,
            );
            navigation.navigate('Success', {
              subid: data.razorpay_subscription_id,
              payid: data.razorpay_payment_id,
              email: this.state.email,
              paidAmount: 50,
            });

            /*  const userf = {
        subscriptionid:data.razorpay_subscription_id,
    //razorpay_payment_id:data.razorpay_subscription_id,
    //razorpay_signature:data.razorpay_signature,

      };
         axios.post("https://app.almosteverythingapp.com:3002/v2/getSubscriptiondetails", userf, {
    }).then(res => {

        console.log("sub");
    console.log(res);


    })
    .catch(error => console.log(error));*/
          })
          .catch(error => {
            // handle failure
            //  alert(`Error: ${error.code} | ${error.description}`);
            // console.warn('Error', error.error.description);
            if (error.error?.description?.includes('cancelled by user')) {
              return;
            } else {
              console.log('===================-===========', order_id);
              console.log('Error', error);
              return navigation.navigate('Failure');
            }
          });
      } else {
        Alert.alert('Error', 'Phone number is required');
      }
    }
    /* AsyncStorage.getItem("subscriptionid").then((value) => {
      // setUser_id=value;
      // userid=value;
       const userf = {
        subscriptionid:subscriptionid,

      };
    axios.post("https://app.almosteverythingapp.com:3002/v2/updateprofile", userf, {
    }).then(res => {

        if(res.data.data['active']='A'){

          console.log(res.data.data['active'])

          console.log(res.data.data);
                      AsyncStorage.setItem(
                        'mobile',
                        res.data.data['mobile']
                      );
                      AsyncStorage.setItem(
                        'user',
                        JSON.stringify(res.data.data)
                      );
                    // props.navigation.navigate('otpverfication')
                    navigate('OtpScreen')
        }

    })
    .catch(error => console.log(error));
      // console.log("Get Value >> ", value);
    }).done(); */

    //this.props.navigation.navigate('DashboardScreen')
    //alert("jbjdbf");
    // return(<OtpScreen/>)
    // console.log('kjbdjkbfjksdbfk');
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  renderPasswordAccessory() {
    let { secureTextEntry } = this.state;

    let name = secureTextEntry ? 'visibility' : 'visibility-off';

    return (
      <MaterialIcon
        size={24}
        name={name}
        color={'#fff'}
        onPress={this.onAccessoryPress}
        suppressHighlighting={true}
      />
    );
  }

  render() {
    let { errors = {}, secureTextEntry, ...data } = this.state;
    const { navigation } = this.props;
    const subscriptionid = navigation.getParam('subid', 'NO-User');
    console.log('sfsdfsdfsdfsd');
    console.log(subscriptionid);
    //const subscriptionid = navigation.getParam('subid', 'NO-User');
    const subscriptiondetails = navigation.getParam(
      'subscriptiondetails',
      'NO-User',
    );
    const plandet = navigation.getParam('plandet', 'NO-User');
    console.log('sfsdfsdfsdfsd');
    console.log(plandet);
    let { firstname, lastname } = data;

    let defaultEmail = `${firstname || 'name'}@${lastname || 'house'}.com`
      .replace(/\s+/g, '_')
      .toLowerCase();
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled">
            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
              <Image
                source={require('../images/mobileicon.png')}
                resizeMode="cover"
                style={styles.profileImg}
              />
            </View>

            <View
              style={
                (styles.container,
                  { padding: 13, borderRadius: 5, backgroundColor: '#292929' })
              }>
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    paddingTop: 10,
                    color: '#fff',
                    fontWeight: 'bold',
                  }}>
                  Checkout
                </Text>
              </View>

              <TextField
                ref={this.firstnameRef}
                tintColor={'#12c54b'}
                baseColor={'#ffffff'}
                textColor={'#fff'}
                fontSize={18}
                style={{ color: '#ffffff', fontSize: 18 }}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                returnKeyType="next"
                label="Enter Mobile Number "
                style={{ fontSize: 18 }}
                error={errors.firstname}
                keyboardType="phone-pad"
                onChangeText={phone => this.setState({ phone })}
              />
              <Text style={{ fontSize: 14, paddingTop: 0, color: '#adafb1' }}>
                Phone Number is required For Payment
              </Text>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
                <View style={{ fontWeight: 'bold' }}>
                  <Text
                    style={{
                      color: '#15ac45',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    {plandet.item.name}
                  </Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    right: 20,
                    padding: 0,
                    fontWeight: 'bold',
                  }}>
                  <Text
                    style={{
                      color: '#15ac45',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    {' '}
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
                    </Icon>{' '}
                    {plandet.item.amount / 100}
                  </Text>
                </View>
              </View>
              {/* <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
                <View style={{fontWeight: 'bold'}}>
                  <Text
                    style={{
                      color: '#a1a3a4',
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Have a Coupon code?
                  </Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    right: 0,
                    padding: 0,
                    fontWeight: 'bold',
                  }}>
                  <TextInput
                    style={{
                      borderColor: 'gray',
                      borderWidth: 1,
                      borderRadius: 5,
                      width: 130,
                      height: 30,
                    }}
                    onChangeText={text => onChangeText(text)}
                  />
                </View>
              </View> */}

              <TouchableOpacity
                style={styles.buttonFacebookStyle}
                activeOpacity={0.5}
                onPress={this.onSubmit}>
                <Text style={styles.buttonTextStyle}>Proceed to Payment</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>

        <View style={styles.bottom} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  profileImg: {
    marginTop: 50,
    marginBottom: 50,
    justifyContent: 'center',
    width: 80,
    height: 80,
    padding: 20,

    margin: 20,
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
    marginTop: 40,
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
const mapStateToProps = state => {
  console.log(state);
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    updateSubscription: (
      subscription_id,
      paymentid,
      email,
      expdates,
      paidAmount,
    ) =>
      dispatch(
        updateSubscription(
          subscription_id,
          paymentid,
          email,
          expdates,
          paidAmount,
        ),
      ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubscribePhoneScreen);
