/* eslint-disable react-native/no-inline-styles */
/**
 * @format
 * @flow
 */
import React, {PureComponent, useState} from 'react';
import {
  View,
  StyleSheet,
  SectionList,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import FooterSpace from '../components/FooterSpace';
import {Text} from '../components/Typos';
import {metrics, colors} from '../utils/themes';
import NestedListView, {NestedRow} from 'react-native-nested-listview';
import {Card, Header} from 'react-native-elements';
import {ListItem, Avatar, ListView} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {googleOAuth2} from '../actions/google';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import axios from 'axios';
import {API_URL} from '../config';
import {getVersion} from 'react-native-device-info';
let subscriptionid = '';
let expirydate = '';
let f = '';
GoogleSignin.configure({
  webClientId:
    '259092449158-sdc80kc3mlrl7kv9uail482tkhv146ck.apps.googleusercontent.com',
  offlineAccess: true, // if you want to access Google API on behalf
});

class AccountScreen extends PureComponent {
  constructor(props) {
    super(props);
    console.log(subscriptionid);
    this.signOut = this.signOut.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    AsyncStorage.getItem('subscriptionid').then(subscriptionid => {
      subscriptionid = subscriptionid;
    });
    console.log('kjhjhsjkfk');
    console.log(subscriptionid);
  }
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  async removeItemValue() {
    try {
      await AsyncStorage.removeItem('email');
      return true;
    } catch (exception) {
      return false;
    }
  }
  /*signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
     // setloggedIn(false);
	 // setuserInfo([]);
	  this.setState({ userGoogleInfo: null })
	  try {
		  AsyncStorage.removeItem("name");
		  AsyncStorage.removeItem("email");
		//return true;
		//na
		 this.props.navigation.push('Googlesigninlogin');

	}
	catch(exception) {
		console.error(exception);
	}
    } catch (error) {
      console.error(error);
    }
  };*/

  logouts = async () => {
    await this.props.logout();
    this.props.navigation.navigate('Googlesigninlogin');
    //alert(this.props.error);
    /*if(this.props.error=="SUCCESS"){
alert("s")
   this.props.navigation.navigate('Googlesigninlogin');

 }*/
    //("g")
  };

  async signOut() {
    //alert("hjhj");
    /*  this.setState({ userGoogleInfo: null })
		try {
			AsyncStorage.removeItem("name");
		//	AsyncStorage.removeItem("email");
		  //return true;
		  //na
		   this.props.navigation.push('Googlesigninlogin');

	  }
	  catch(exception) {
		  return exception;
	  }*/
    //remove existing user
    GoogleSignin.isSignedIn().then(isSignedIn => {
      if (isSignedIn) {
        try {
          GoogleSignin.signOut().then(r => {});
        } catch (error) {
          console.error(error);
        }
      }
    });

    try {
      // await GoogleSignin.revokeAccess();
      // await GoogleSignin.signOut();
      GoogleSignin.revokeAccess()
        .then(() => GoogleSignin.signOut())
        .then(() => {
          this.setState({userGoogleInfo: null});
          try {
            AsyncStorage.removeItem('name');
            AsyncStorage.removeItem('email');
            //return true;
            //na
            // this.props.navigation.push('Googlesigninlogin');
          } catch (exception) {
            // return false;
          }
        })
        .done();

      this.setState({user: null, loaded: false});

      // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  }
  plan = () => {
    AsyncStorage.getItem('subscriptionid').then(subscriptionid => {
      subscriptionid = subscriptionid;
    });
    console.log('kjhjhsjkfk');
    console.log(subscriptionid);
    AsyncStorage.getItem('email').then(email => {
      const user = {
        email: email,
        subscriptionid: subscriptionid,
      };
      axios
        .post(API_URL + 'getsubscribtionbyemail', user)
        .then(response => {
          console.log('mysubscrition detail splash screen s');
          console.log(response.data.data);
          console.log(response.data.data[0].subid);
          subscriptionid = response.data.data[0].subid;
          expirydate = response.data.data[0].expby;
          f = 'paid';
          this.setState({free: 'paid'});
          console.log(f);
          console.log(f);
        })
        .catch(error => {
          console.log('error no sub');
          console.log(error);
        });
    });
    if (this.props.subscriptionType == 'FREE') {
      return (
        <View style={{paddingLeft: '9%'}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}
            onPress={() => {
              console.log('A Pressed!');
            }}>
            <View>
              <Text style={{color: '#666b6f', fontSize: 16}}>
                Membership - Free
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}
            onPress={() => {
              this.props.navigation.push('SubscribeScreen');
            }}>
            <View>
              <Text style={{color: 'red', fontSize: 16, fontWeight: 'bold'}}>
                Upgrade Now
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{paddingLeft: '5%'}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}
            onPress={() => {
              console.log('A Pressed!');
            }}>
            <View>
              <Text style={{color: '#666b6f', fontSize: 16}}>
                Membership - Paid
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };
  navigateTo = item => {
    if (item.type == 'Free') {
      // this.props.navigation.navigate('MainView')
      navigation.navigate('PlaylistScreen', {
        id: item.id,
        item: item,
      });
    } else if (type == 'free') {
      navigation.navigate('SubscribeScreen', {
        id: item.id,
        item: item,
      });
    } else if (type == 'paid') {
      navigation.navigate('PlaylistScreen', {
        id: item.id,
        item: item,
      });
    }
  };
  render() {
    return (
      <View style={{backgroundColor: '#000'}}>
        <ScrollView
          style={{backgroundColor: '#000'}}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <View style={{paddingLeft: '9%'}}>
              <Text
                style={{
                  color: '#36cd66',
                  fontSize: 16,
                  padding: 10,
                  fontWeight: 'bold',
                }}>
                Account
              </Text>
            </View>

            <View style={{paddingLeft: '9%'}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
                onPress={() => this.logouts()}>
                <View>
                  <Text style={{color: '#666b6f', fontSize: 16}}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{paddingLeft: '9%'}}>
              <Text
                style={{
                  color: '#36cd66',
                  fontSize: 16,
                  padding: 10,
                  fontWeight: 'bold',
                }}>
                Manage Subscription
              </Text>
            </View>

            {this.plan()}

            <View style={{paddingLeft: '9%'}}>
              <Text
                style={{
                  color: '#36cd66',
                  fontSize: 16,
                  padding: 10,
                  fontWeight: 'bold',
                }}>
                About
              </Text>
              {this.props.subscriptionType == 'FREE' ? (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('FavouriteScreen');
                  }}>
                  <View>
                    <Text style={{color: '#666b6f', fontSize: 16}}>
                      Favourites
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                  }}
                  onPress={() => {
                    Linking.openURL('https://t.me/joinchat/4C2vd9AM1JphYjhl');
                  }}>
                  <View>
                    <Text style={{color: '#666b6f', fontSize: 16}}>
                      Exclusive Telegram Group
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <View style={{paddingLeft: '9%'}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
                onPress={() => {
                  Linking.openURL(
                    'https://roadmap.almosteverythingapp.com/almost-everything-podcast-app#updates',
                  );
                }}>
                <View>
                  <Text style={{color: '#666b6f', fontSize: 16}}>
                    Latest Updates
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
                onPress={() => {
                  Linking.openURL(
                    'https://roadmap.almosteverythingapp.com/almost-everything-podcast-app#ideas',
                  );
                }}>
                <View>
                  <Text style={{color: '#666b6f', fontSize: 16}}>
                    Book Suggestions
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
                onPress={() => {
                  Linking.openURL(
                    'mailto:hellonanba@almosteverythingapp.com?subject=Report/Bugs',
                  );
                }}>
                <View>
                  <Text style={{color: '#666b6f', fontSize: 16}}>
                    Report Issues/Bugs
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
                onPress={() => {
                  Linking.openURL(
                    'https://play.google.com/store/apps/details?id=com.almosteverything.booksummaries.podcasts.audiobooksapp&hl=en',
                  );
                }}>
                <View>
                  <Text style={{color: '#666b6f', fontSize: 16}}>
                    Rate Almost Everything
                  </Text>
                  <Text style={{color: '#9fa0a1', fontSize: 13}}>
                    Enjoying the app? Tell us about it on Google Play
                  </Text>
                </View>
                <View style={{flex: 1}} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
                onPress={() => {
                  Linking.openURL('https://www.youtube.com/almosteverything');
                }}>
                <View>
                  <Text style={{color: '#666b6f', fontSize: 16}}>
                    Follow Us on Youtube
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
                onPress={() => {
                  Linking.openURL(
                    'https://www.instagram.com/_almost.everything',
                  );
                }}>
                <View>
                  <Text style={{color: '#666b6f', fontSize: 16}}>
                    Follow Us on Instagram
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
                onPress={() => {
                  Linking.openURL('https://t.me/almost_everything_official');
                }}>
                <View>
                  <Text style={{color: '#666b6f', fontSize: 16}}>
                    Follow Us on Telegram
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
                onPress={() => {
                  Linking.openURL(
                    'https://almosteverythingapp.com/privacy-policy',
                  );
                }}>
                <View>
                  <Text style={{color: '#666b6f', fontSize: 16}}>
                    Privacy Policy
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
                onPress={() => {
                  Linking.openURL('https://almosteverythingapp.com/terms');
                }}>
                <View>
                  <Text style={{color: '#666b6f', fontSize: 16}}>
                    Terms of Service
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{paddingLeft: '9%'}}>
              <Text
                style={{
                  color: '#36cd66',
                  fontSize: 16,
                  padding: 10,
                  fontWeight: 'bold',
                }}>
                Miscellaneous
              </Text>
            </View>

            <View style={{paddingLeft: '9%'}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
                onPress={() => {
                  console.log('A Pressed!');
                }}>
                <View>
                  <Text style={{color: '#666b6f', fontSize: 16}}>
                    Version {getVersion()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    marginTop: 0,
    paddingHorizontal: metrics.padding,
  },
  lottie: {
    width: 280,
    height: 280,
  },
  welcome: {
    textAlign: 'center',
  },
});
const middleware = () => {
  return dispatch => {
    AsyncStorage.clear();
    dispatch({type: 'SIGN_OUT'});
    dispatch(googleOAuth2.logout());
  };
};

const mapStateToProps = state => {
  console.log(state);
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    logout: async () => dispatch(middleware()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountScreen);
