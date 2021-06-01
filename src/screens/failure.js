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
  TextInput,
} from 'react-native';
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
import {SliderBox} from 'react-native-image-slider-box';
import PhoneInput from 'react-native-phone-input';
import axios from 'axios';

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
import {createAppContainer} from 'react-navigation';
import {colors} from '../utils/themes';
import { StatusBar } from 'react-native';

let defaults = {
  firstname: 'Eddard',
  lastname: 'Stark',
  about:
    'Stoic, dutiful, and honorable man, considered to embody the values of the North',
};
export default class Failure extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // let { errors = {}, secureTextEntry, ...data } = this.state;
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
      {/* <StatusBar backgroundColor="#000" barStyle="light-content" /> */}
        <SafeAreaView>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled">
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                backgroundColor: '#fff',
                marginTop: '30%',
              }}>
              <Image
                source={require('./img/failedicon.png')}
                resizeMode="cover"
                style={styles.profileImg}
              />
            </View>

            <View
              style={
                (styles.container,
                {padding: 13, borderRadius: 5, backgroundColor: '#fff'})
              }>
              <View
                style={{
                  justifyContent: 'center',
                  flex: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    paddingTop: 0,
                    ustifyContent: 'center',
                    alignItems: 'center',
                    color: '#ff1f1f',
                    fontWeight: 'bold',
                  }}>
                  Payment Failed !
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: '#eff2f6',
                  borderBottomWidth: 1,
                  paddingTop: 10,
                }}
              />

              <View>
                <TouchableOpacity
                  style={styles.buttonFacebookStyle}
                  activeOpacity={0.5}
                  onPress={() =>
                    // this.props.navigation.navigate('MainView')
                    navigation.navigate('SubscribeScreen')
                  }>
                  <Text style={styles.buttonTextStyle}>Try Again</Text>
                </TouchableOpacity>
              </View>
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
    marginTop: 30,
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
