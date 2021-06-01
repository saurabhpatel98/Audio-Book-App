import React from 'react';
import {View, Text, ImageBackground, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';
import Simple from './simple';
import {createAppContainer} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import {colors} from './utils/themes';
import TabbarStack from './tabbar';
import {Provider} from './recontext/store';
const data = [
  {
    text: 'This photo is of Italy.\nBy @peter_mc_greats',
    image: require('./images/welcome.png'),
  },
  {
    text: 'This photo is of Austria.\nBy @8moments',
    image: require('./images/welcome.png'),
  },
  {
    text: 'This photo is of Iceland.\nBy @r3dmax',
    image: require('./images/welcome.png'),
  },
];

type Item = typeof data;

const styles = StyleSheet.create({
 slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  buttonCircle: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Customsli extends React.Component {
	
	constructor(props) {
  super(props);

  this.state = {
    showRealApp: false
  }
}

_onDone = () => {
  this.setState({ showRealApp: true });
}
	
	
  _renderItem = ({item}: {item: Item}) => {
    return (
      <ImageBackground style={styles.slide} source={item.image}>
        <Text style={styles.text}>{item.text}</Text>
      </ImageBackground>
    );
  };

  _keyExtractor = (item: Item) => item.text;
  
  
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
   _gotoSkip = () => {
	  
				return (
				   <Simple/>
					);
			    
	   };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="md-checkmark" 
		color="rgba(255, 255, 255, .9)"
		
		size={24} />
      </View>
    );
  };

  render() {
	  
	  if (this.state.showRealApp) {
		const AppNavigator = createAppContainer(TabbarStack);
		 return (
		<AppNavigator/>
		);
  } else {
	  
	  
	    return (
      <View style={{flex: 1}}>
        {/* <StatusBar translucent backgroundColor="transparent" /> */}
        <AppIntroSlider
          keyExtractor={this._keyExtractor}
		  renderDoneButton={this._renderDoneButton}
          renderItem={this._renderItem}
		  onDone={this._onDone}		  
          data={data}
        />
      </View>
    );
	  
  }
	  
	  
	  
	  
  
  }
}