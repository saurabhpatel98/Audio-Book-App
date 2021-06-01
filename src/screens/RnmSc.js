import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import PlayerScreen from './PlayerScreen';

export default function RnmSc() {
  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="#000" barStyle="light-content" /> */}
      <PlayerScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030303',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});