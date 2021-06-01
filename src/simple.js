import { Image } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
//const AppNavigator = createAppContainer(Simple);

const Simple = () => (
  <Onboarding
    onDone={() => console.log('done')}
    pages={[
      {
        backgroundColor: '#f2f6f9',
		bottomBarColor :'transparent',
        image: <Image source={require('./images/welcome.png')} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#f2f6f9',
        image: <Image source={require('./images/welcome.png')} />,
        title: 'The Title',
        subtitle: 'This is the subtitle that sumplements the title.',
      },
      {
        backgroundColor: '#f2f6f9',
        image: <Image source={require('./images/welcome.png')} />,
        title: 'Triangle',
        subtitle: "Beautiful, isn't it?",
      },
    ]}
  />
);

export default Simple;