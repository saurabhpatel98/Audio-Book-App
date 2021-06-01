import React, {useState,useEffect} from 'react';
import {Animated, Image, SafeAreaView, Text,Alert , View,StyleSheet,TouchableOpacity, Platform} from 'react-native';
import axios from 'axios';
import {NEW_ENV_API_URL} from '../config';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
const {Value, Text: AnimatedText} = Animated;
const CELL_SIZE = 40;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = '#fff';
const NOT_EMPTY_CELL_BG_COLOR = '#30a960';
const ACTIVE_CELL_BG_COLOR = '#f7fafe';
const CELL_COUNT = 6;
const RESEND_OTP_TIME_LIMIT = 30;
const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const OtpScreen = (data) => {
  const { navigate } = data.navigation;
  // const { name } = route.params;
  const [email,setEmail]=useState('')
  useEffect(()=>{
    let data
    AsyncStorage.getItem('email').then(email => {
      data=email
  setEmail(email)
      return email;
    }).done();
    console.log("data-----------------",email)
  },[])
 

  let resendOtpTimerInterval


  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
);

//to start resent otp option
const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
        if (resendButtonDisabledTime <= 0) {
            clearInterval(resendOtpTimerInterval);
        } else {
            setResendButtonDisabledTime(resendButtonDisabledTime - 1);
        }
    }, 1000);
};
const onResendOtpButtonPress = () => {

  //clear input field
  setValue('')
  setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
  startResendOtpTimer(); 
axios.post(NEW_ENV_API_URL + 'auth/resendtoken',{email}).then(res => {
            var result=res.data
           console.log('response',res.data)
           if(result.success){
            
           }})
        .catch(error => console.log("error while sending otp",error));
  // resend OTP Api call
  // todo
  console.log('todo: Resend OTP');
};
const verifyAndContinue=()=>{
  const input={
      "email": email,
      "token": value
  }
  console.log("input",input)
  axios.post(NEW_ENV_API_URL + 'auth/confirmation',input).then(res => {
    var result=res.data
   console.log('response',result)
   if(result?.type==='not-verified'){
    Alert.alert(result?.message);
   }
   if(result?.success||result?.type==='already-verified'){
    navigate('DashboardScreen',{})
   }
  })
.catch(error => console.log("error while vefity otp",error));
}
const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  //start timer on screen on launch
useEffect(() => {
  startResendOtpTimer();
  return () => {
      if (resendOtpTimerInterval) {
          clearInterval(resendOtpTimerInterval);
      }
  };
}, [resendButtonDisabledTime]);

  const renderCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={{
        justifyContent:'center',
        }}>
          <View style={{
             alignItems: 'center',
             justifyContent: 'flex-start'
          }}>
            <MaterialIcons name="lock" color='#30a960' size={50}/>
          </View>
      <Text style={styles.title}>We have sent a verification code to your email</Text>
      
      <Text style={styles.subTitle}>Sent To: {email}</Text>
      </View>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      <View style={{flexDirection:'row'}}>
      <Text style={styles.resendCodeText}>Didn't receive code?</Text>
       {/* View for resend otp  */}
       {resendButtonDisabledTime > 0 ? (
            <Text style={styles.resendCodeText}>{resendButtonDisabledTime} sec</Text>
        ) : (
                <TouchableOpacity
                    onPress={onResendOtpButtonPress}>
                    <View style={styles.resendCodeContainer}>
                        <Text style={styles.resendCode} > Resend Now</Text>
                        {/* <Text style={{ marginTop: 40 }}> in {resendButtonDisabledTime} sec</Text> */}
                    </View>
                </TouchableOpacity >
            )
        }
      </View>
      <TouchableOpacity
      onPress={verifyAndContinue}>
      <View style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Verify & Continue</Text>
      </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  codeFiledRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',

    // marginTop: 40,
    // width: '90%',
    // marginLeft: 20,
    // marginRight: 20,
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#30a960',
    backgroundColor: '#fff',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },
resendCode: {
    color: 'blue',
    marginStart: 20,
    marginTop:40,
},
resendCodeText: {
    marginStart: 20,
    marginTop: 40,
},
resendCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
},
  // =======================

  root: {
    minHeight: 800,
    padding: 20,
    flex: 1,
    backgroundColor:'#f3f6f8'
    // padding: 20,
    // alignContent: 'center',
    // justifyContent: 'center'
  },
  title: {
    paddingTop: 50,
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 40,

    // textAlign: 'left',
    // fontSize: 20,
    // marginStart: 20,
    // fontWeight:'bold'
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subTitle: {
    paddingTop: 30,
    color: '#000',
    textAlign: 'center',
    fontWeight: '700',

  // textAlign: 'left',
  // fontSize: 16,
  // marginStart: 20,
  // marginTop: 10

  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: '#30a960',
    justifyContent: 'center',
    minWidth: 300,
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
});

export default OtpScreen;


// import React, { Component, PureComponent } from "react";
// import { StyleSheet, Text, View, Button, TouchableHighlight, TouchableOpacity, Image, ImageBackground } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {
//   AppRegistry,
//   ScrollView,

//   SafeAreaView,
//   Platform,
// } from 'react-native';
// //import { RaisedTextButton } from 'react-native-material-buttons';
// //import { TextField } from 'react-native-material-textfield';
// import AsyncStorage from '@react-native-community/async-storage';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
// import { SliderBox } from "react-native-image-slider-box";
// import PhoneInput from 'react-native-phone-input';
// import axios from 'axios';
// import {
//   TextField,
//   FilledTextField,
//   OutlinedTextField,
// } from 'react-native-material-textfield';
// //import TabbarStack from '../tabbar';
// //import 'react-phone-number-input/style.css';
// //import Customsli from './customsli';
// import DashboardScreen from "./DashboardScreen";
// import HomeScreen from "./HomeScreen";
// import { createAppContainer } from 'react-navigation';
// import { colors } from "../utils/themes";
// import { API_URL } from "../config";


// let defaults = {
//   firstname: 'Eddard',
//   lastname: 'Stark',
//   about: 'Stoic, dutiful, and honorable man, considered to embody the values of the North',
// };
// export default class OtpScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//     };

//     this.onFocus = this.onFocus.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//     // this.onSubmitButtonPress = this.onSubmitButtonPress.bind(this);
//     this.onChangeText = this.onChangeText.bind(this);
//     this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
//     this.onSubmitLastName = this.onSubmitLastName.bind(this);
//     this.onSubmitAbout = this.onSubmitAbout.bind(this);
//     this.onSubmitEmail = this.onSubmitEmail.bind(this);
//     this.onSubmitPassword = this.onSubmitPassword.bind(this);
//     this.onAccessoryPress = this.onAccessoryPress.bind(this);

//     this.firstnameRef = this.updateRef.bind(this, 'firstname');
//     this.lastnameRef = this.updateRef.bind(this, 'lastname');
//     this.aboutRef = this.updateRef.bind(this, 'about');
//     this.emailRef = this.updateRef.bind(this, 'email');
//     this.passwordRef = this.updateRef.bind(this, 'password');
//     this.houseRef = this.updateRef.bind(this, 'house');

//     this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

//     this.state = {
//       secureTextEntry: true,
//       ...defaults,
//     };
//   }
//   onFocus() {
//     let { errors = {} } = this.state;

//     for (let name in errors) {
//       let ref = this[name];

//       if (ref && ref.isFocused()) {
//         delete errors[name];
//       }
//     }

//     this.setState({ errors });
//   }

//   onChangeText(text) {
//     ['firstname', 'lastname', 'about', 'email', 'password']
//       .map((name) => ({ name, ref: this[name] }))
//       .forEach(({ name, ref }) => {
//         if (ref.isFocused()) {
//           this.setState({ [name]: text });
//         }
//       });
//   }

//   onAccessoryPress() {
//     this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
//   }

//   onSubmitFirstName() {
//     this.lastname.focus();
//   }

//   onSubmitLastName() {
//     this.about.focus();
//   }

//   onSubmitAbout() {
//     this.email.focus();
//   }

//   onSubmitEmail() {
//     this.password.focus();
//   }

//   onSubmitPassword() {
//     this.password.blur();
//   }

//   onSubmit() {
//     let errors = {};

//     /* ['firstname',  'email',]
//        .forEach((name) => {
//          let value = this[name].value();
 
//          if (!value) {
//            errors[name] = 'Should not be empty';
//          } else {
//            if (value.length < 6) {
//              errors[name] = 'Too short';
//            }
//          }
//        });
 
//      this.setState({ errors });*/
//     // API call
//     // todo
//     //alert();
//     AsyncStorage.getItem("mobile").then((value) => {
//       // setUser_id=value;
//       // userid=value;
//       const userf = {
//         mobile: value,
//         firstName: this['firstname'].value(),
//         email: this['email'].value(),



//       };
//       axios.post(API_URL + "updateprofile", userf, {
//       }).then(res => {

//         if (res.data.data['active'] = 'A') {

//           console.log(res.data.data['active'])

//           console.log(res.data.data);
//           AsyncStorage.setItem(
//             'mobile',
//             res.data.data['mobile']
//           );
//           AsyncStorage.setItem(
//             'user',
//             JSON.stringify(res.data.data)
//           );
//           // props.navigation.navigate('otpverfication')
//           navigate('OtpScreen')
//         }

//       })
//         .catch(error => console.log(error));
//       // console.log("Get Value >> ", value);
//     }).done();

//     this.props.navigation.navigate('DashboardScreen')
//     //alert("jbjdbf");
//     // return(<OtpScreen/>)
//     console.log('kjbdjkbfjksdbfk');
//   }

//   updateRef(name, ref) {
//     this[name] = ref;
//   }

//   renderPasswordAccessory() {
//     let { secureTextEntry } = this.state;

//     let name = secureTextEntry ?
//       'visibility' :
//       'visibility-off';

//     return (
//       <MaterialIcon
//         size={24}
//         name={name}
//         color={TextField.defaultProps.baseColor}
//         onPress={this.onAccessoryPress}
//         suppressHighlighting={true}
//       />
//     );
//   }

//   render() {

//     let { errors = {}, secureTextEntry, ...data } = this.state;
//     let { firstname, lastname } = data;

//     let defaultEmail = `${firstname || 'name'}@${lastname || 'house'}.com`
//       .replace(/\s+/g, '_')
//       .toLowerCase();
//     return (

//       <View style={styles.container}>
//         <SafeAreaView >
//           <ScrollView
//             contentContainerStyle={styles.contentContainer}
//             keyboardShouldPersistTaps='handled'
//           >
//             <View style={styles.container}>
//               <Text style={{
//                 alignItems: 'center', fontSize: 16,
//                 justifyContent: 'center', textAlign: 'center', color: '#000', fontWeight: 'bold'
//               }}>Tell us a bit more about yourself</Text>
//               <TextField
//                 ref={this.firstnameRef}
//                 tintColor={'#12c54b'}
//                 baseColor={'#7e8396'}
//                 autoCorrect={false}
//                 enablesReturnKeyAutomatically={true}
//                 returnKeyType='next'
//                 label='Name'
//                 error={errors.firstname}
//               />
//               <TextField
//                 ref={this.emailRef}
//                 tintColor={'#12c54b'}
//                 baseColor={'#7e8396'}
//                 keyboardType='email-address'
//                 autoCapitalize='none'
//                 autoCorrect={false}
//                 enablesReturnKeyAutomatically={true}
//                 returnKeyType='next'
//                 label='Email '
//                 error={errors.email}
//               />
//             </View>
//           </ScrollView>
//         </SafeAreaView>

//         <View style={{ paddingTop: 1, backgroundColor: '#f3f6f8', marginTop: 1 }}>
//           <TouchableOpacity
//             style={styles.buttonFacebookStyle}
//             activeOpacity={0.5}
//             onPress={this.onSubmit}
//           >
//             <Text style={styles.buttonTextStyle}>
//               Continue
//           </Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.bottom}>
//         </View>

//       </View>

//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f3f6f8',
//     padding: 10
//   },

//   btnClickContain: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'stretch',
//     alignSelf: 'stretch',
//     backgroundColor: '#009D6E',
//     borderRadius: 5,
//     padding: 20,
//     marginTop: 15,
//     marginBottom: 15,
//   },


//   buttonFacebookStyle: {
//     justifyContent: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#12c54b',
//     borderWidth: 0.5,
//     borderColor: '#fff',
//     height: 40,
//     borderRadius: 5,
//     margin: 15,
//   },
//   buttonImageIconStyle: {
//     padding: 10,
//     margin: 5,

//     resizeMode: 'stretch',
//   },
//   bottom: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 5,
//     justifyContent: 'flex-end',
//     marginBottom: 6
//   },
//   btnIcon: {
//     padding: 1,
//     margin: 5,
//     height: 25,
//     width: 25,
//     resizeMode: 'stretch',
//   },
//   buttonTextStyle: {
//     color: '#fff',
//     marginBottom: 4,
//     marginLeft: 10,
//     fontWeight: "bold",
//   },
//   buttonIconSeparatorStyle: {
//     backgroundColor: '#fff',
//     width: 1,
//     height: 40,
//   },
//   image: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "center"
//   },
//   text: {
//     color: "white",
//     fontSize: 42,
//     fontWeight: "bold",
//     textAlign: "center",
//     backgroundColor: "#000000a0"
//   },
//   scroll: {
//     backgroundColor: '#f3f6f8',
//   },

//   contentContainer: {
//     padding: 2,
//   },

//   buttonContainer: {
//     paddingTop: 1,
//     margin: 1,
//   },

//   safeContainer: {
//     flex: 1,
//     backgroundColor: '#E8EAF6',
//   },
// });