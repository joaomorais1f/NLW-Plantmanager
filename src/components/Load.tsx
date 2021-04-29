import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import LoadAnimantion from '../assets/load.json';

export function Load() {
  return (
    <View style={styles.container}>
      <LottieView
        source={LoadAnimantion}
        autoPlay
        loop
        style={styles.animation}
      >

      </LottieView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation: {
    width: 200,
    height: 200,
    backgroundColor: 'transparent'
  }
})