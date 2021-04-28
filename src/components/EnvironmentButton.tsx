import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function EnvironmentButton({ 
  title, 
  active = false,
  ... rest 
}: EnvironmentButtonProps) {
  return (
    <RectButton
      style={[
        styles.container,
        active && styles.containerActive
      ]}
      {... rest}
    >
      <Text style={[
        styles.title,
        active && styles.titleActive 
        ]}> {title} </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 76,
    height: 40,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.shape
  },
  containerActive: {
    backgroundColor: colors.green_light
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.text
  },
  titleActive: {
    fontFamily: fonts.text,
    color: colors.green_dark,
  }
})