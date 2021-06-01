import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';

import {GenericStyles} from '../styles/GenericStyles';

const CustomScreenContainer = props => {
  const {children} = props;

  return (
    <>
      {/* <StatusBar backgroundColor="#000" barStyle="light-content" /> */}
      <SafeAreaView style={GenericStyles.whiteBackgroundContainer}>
        {children}
      </SafeAreaView>
    </>
  );
};

export default CustomScreenContainer;
