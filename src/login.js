import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-community/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SliderBox } from "react-native-image-slider-box";
import axios from 'axios';
import TabbarStack from './tabbar';
//import 'react-phone-number-input/style.css';
import Config, { API_URL } from './config';
import DashboardScreen from "./screens/DashboardScreen";
import OtpScreen from "./screens/OtpScreen";
//import {createAppContainer} from 'react-navigation';
import RNOtpVerify from 'react-native-otp-verify';
import Icon from 'react-native-vector-icons/FontAwesome';
import OtpVerification from './components/otp/OtpVerification';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Cotter } from 'react-native-cotter';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
GoogleSignin.configure({

  webClientId: '259092449158-sdc80kc3mlrl7kv9uail482tkhv146ck.apps.googleusercontent.com',
  offlineAccess: true, // if you want to access Google API on behalf 

});

const Login = (props) => {
  const [value, setValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = React.createRef();

  const [images, setimages] = useState([
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree",
    require('./images/welcome.png'),
  ]);


  const onGoto = () => {
    const checkValid = phoneInput.current?.isValidNumber(value);
    setShowMessage(true);
    setValid(checkValid ? checkValid : false);
    setCountryCode(phoneInput.current?.getCountryCode() || '');
    let getNumberAfterPossiblyEliminatingZero = phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
    console.log(getNumberAfterPossiblyEliminatingZero);

    var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const user = {
      mobile: value,
      status: 'A',
      created: date,

    };
    const formData = new FormData()
    formData.append('mobile', value)

    formData.append('status', 'A')
    formData.append('created', date)
    console.log("mobile");
    console.log(user);
    axios.post(API_URL + "addmember", user, {
    }).then(res => {

      //if(res.data['status']='200'){

      console.log(res.data.data['active'])
      /* RNOtpVerify.getHash()
       .then(hash => {
       console.log('Use this hash to construct otp message', hash);
       console.log('A sample message -');
       console.log(`
       <#> Dear User,
       1091 is your OTP for logging into Ingo-MMT. (Remaining Time: 10 minutes and 0 seconds)
       ${hash[0]}
       `);
       })
       .catch(error => console.log(error));*/

      console.log(res.data.data);
      AsyncStorage.setItem(
        'mobile',
        res.data.data['mobile']
      );
      AsyncStorage.setItem(
        'user',
        JSON.stringify(res.data.data)
      );
      props.navigation.navigate('otpverfication')


    })
      .catch(error => console.log(error));



    //props.navigation.navigate('otpverfication')




  }


  return (

    <>


      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>

        <View style={styles.container}>

          <SliderBox
            images={images}
            sliderBoxHeight={450}
            onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
          />


          <View style={{ alignItems: 'center', marginTop: 30 }}>

            <PhoneInput

              ref={phoneInput}
              defaultValue={value}
              defaultCode="IN"
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
                setCountryCode(phoneInput.current?.getCountryCode() || '');
              }}
              countryPickerProps={{ withAlphaFilter: true }}
              disabled={disabled}
              withDarkTheme
              withShadow
              autoFocus
            />
          </View>
          <TouchableOpacity
            style={styles.buttonFacebookStyle}
            activeOpacity={0.5}
            onPress={() => { onGoto(); }}
          >
            <Icon
              name='mobile'
              size={25}
              color='#fff'
              style={styles.buttonImageIconStyle}
            />

            <Text style={styles.buttonTextStyle}>
              Send OTP
          </Text>
          </TouchableOpacity>
          <View style={styles.bottom}>
            <Text style={{
              alignItems: 'center',
              justifyContent: 'center', textAlign: 'center', color: '#787c8f', paddingTop: 10
            }}>By creating an account,I accept Almost Everything & Terms and Conditions</Text>

          </View>
        </View>
      </KeyboardAvoidingView>

    </>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },

  message: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: '#f1f2f6',
  },

  message: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
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
    marginTop: 10,
    marginBottom: 0
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
  }
});

export default Login;