import React, {PureComponent} from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import {Cotter, Constants} from 'react-native-cotter';
import colors from './assets/colors';
import {Title} from './components/Text';
import {Button, ButtonImage, ButtonContainer} from './components/Button';
import {InputContainer, InputLabel, InputText} from './components/Input';
import {API_KEY_ID, API_SECRET_KEY, USER_ID, COTTER_BASE_URL} from './apiKeys';

const winHeight = Dimensions.get('window').height;
const helloLogo = require('./assets/images/hello-logo.png');

class Logincotter2 extends PureComponent {
  state = {
    email: '',
    loading: false,
    ip: null,
    secKey: null,
    response: null,
    userID: null,
	phone:'',
  };
  
  componentDidMount = async () => {
	 const {navigation} = this.props;
	//  const {navigation} = this.props;
      let cotter = new Cotter(API_KEY_ID);            // your API_KEY_ID
        await cotter.signUpWithPhoneLink(               // use Phone & Magic Link
                 // (setup later) URL Scheme for deep linking
		  (resp) => {console.log(resp)},                // Success Callback Function
		  (err) => {console.log(err)},          // Error Callback Function
		  {phone: this.state.phone, channel: "SMS" },   // (Optional), if you leave this blank, user can enter email in the in-app browser
		);
	
       
	 }
   /* useEffect(() => {
        let cotter = new Cotter(API_KEY_ID);            // your API_KEY_ID
        await cotter.signUpWithPhoneLink(               // use Phone & Magic Link
                 // (setup later) URL Scheme for deep linking
		  (resp) => {console.log(resp)},                // Success Callback Function
		  (err) => {console.log(err)},          // Error Callback Function
		  {phone: this.state.phone, channel: "SMS" },   // (Optional), if you leave this blank, user can enter email in the in-app browser
		);
     }, []);*/

  authenticate = async () => {
    Constants.setBaseURL(COTTER_BASE_URL);
    console.log('Start', new Date().getTime());

    // 1️⃣ Request trusted device authentication
    var cotter = new Cotter("87626d97-3395-43dc-b510-dadcab2c6fe1");
    cotter.signUpWithPhoneLink(               // use Phone & Magic Link
                 // (setup later) URL Scheme for deep linking
  (resp) => {console.log(resp)},                // Success Callback Function
  (err) => {console.log(err)},          // Error Callback Function
  {phone: this.state.phone, channel: "SMS" },   // (Optional), if you leave this blank, user can enter email in the in-app browser
);
  };

  onRequestError = (errorMessage, error) => {
    alert(errorMessage);
    console.log(error);
  };

  onRequestSuccess = response => {
    console.log(response);

    // 3️⃣ Validate the event response
    if (Cotter.validateEventResponse(response)) {
      console.log('Success', new Date().getTime());
      this.props.navigation.navigate('DashboardScreen', {
        userID: this.state.userID,
      });
    } else {
      Alert.alert('Event response is invalid');
    }
  };

  // This is an example on how you can register your user to your backend server
  getUserID = async email => {
    console.log('Getting ID from backend');
    try {
      const response = await fetch(
        'https://0eexu.sse.codesandbox.io/users/login', // This is an example API endpoint. Use your server's endpoint instead
        {
          method: 'POST',
          body: JSON.stringify({email: email}),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw data;
      }

      // Return back the User ID registered in your backend.
      // RECOMMENDED: Use an unchanging user ID so users can
      // update their email/phone number.
      return data.id;
    } catch (err) {
      var errmsg = err.error ? err.error : null;
      throw {msg: errmsg, err: err};
    }
    // return USER_ID;
  };
  render() {
    return (
      <>
        <View>
      {/*  3️⃣  Put a <div> that will contain the form */}
      <View id="cotter-form-container" style={{ width: 300, height: 300 }} />
      
     
    </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: winHeight,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '40%',
    backgroundColor: colors.backgroundColor,
    padding: 20,
  },
  buttonImage: {
    width: 50,
    height: 50,
    marginTop: -5,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0)',
  },
  placeholder: {
    alignSelf: 'center',
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  text: {
    fontSize: 22,
    paddingLeft: 10,
    alignSelf: 'center',
    color: colors.white,
  },
  textSmall: {
    fontSize: 10,
  },
  button: {
    marginTop: 20,
  },
  logo: {
    height: 70,
    width: 70,
    marginBottom: 50,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
});
export default Logincotter2;
