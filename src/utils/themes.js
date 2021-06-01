/**
 * @format
 * @flow
 */
import {Dimensions, StatusBar, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');
const isIphoneXGen =
  Platform.OS === 'ios' &&
  (height === 812 || width === 812 || height === 896 || width === 896);
const statusBarHeight = Platform.select({
  ios: isIphoneXGen ? 44 : 24,
  android: StatusBar.currentHeight,
});
const headerHeight = isIphoneXGen
  ? 130 - statusBarHeight
  : 84 - statusBarHeight;

const metrics = {
  padding: 15,
  lessPadding: 10,
  extraPadding: 20,
  radius: 8,
  screenWidth: width,
  screenHeight: height,
  coverWidth: 120,
  coverHeight: 158,
  statusBarHeight: statusBarHeight,
  headerHeightHalf: headerHeight / 2,
  headerHeight: headerHeight,
  headerHeightX2: headerHeight * 2,
  headerHeightX3: headerHeight * 3,
  tabbarHeight: 49,
  bottomSpaceHeight: isIphoneXGen ? 34 : 0,
};

const colors = {
  primary: '#eff2f7',
  primaryDark: '#b2caf3',
  primaryLight: '#1ba1f7',
  accent: '#6cbc89',
  text: '#000000',
  textSecondary: '#8D8D92',
  divider: '#BDBDBD',
  white: '#ffffff',
  lightOpacity: 'rgba(255,255,255,0.8)',
  darkOpacity: 'rgba(0, 0, 0, 0.1)',
  black: '#000000',
  red: '#dc3545',
  background: '#f1f1f1',
  star: '#fe8302',
  transparent: 'transparent',
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.9)',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 15,
      },
      android: {
        elevation: 1,
      },
    }),
  },
};

export {metrics, colors};
