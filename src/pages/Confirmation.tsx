import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, SafeAreaViewBase } from 'react-native';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Confirmation() { 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          😁
        </Text>
        <Text style={styles.title}>
          Prontinho
        </Text>
        <Text style={styles.subtitle}>
          Agora, vamos começar a cuidar das suas {'\n'}
          plantinhas com muito cuidado.
        </Text>
        <View style={styles.footer}>
          <Button title="Começar" />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emoji: {
    fontSize: 78
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15
  },
  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    textAlign: 'center',
    paddingVertical: 10,
    color: colors.heading
  },
  footer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 50
  },
})