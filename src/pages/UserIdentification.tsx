import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput, 
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>('');
  const handleInputBlur = () => {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  const handleInputFocus = () => {
    setIsFocused(true);
  }

  const handleInputChange = (value: string) => {
    setIsFocused(!!value);
    setName(value);
  }

  const handleSubmit = () => {
    navigation.navigate('Confirmation')
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.form}>
            <View style={styles.header}>
              <Text style={styles.emoji}>
                { isFilled ? '😁' : '😀'}
              </Text>
              <Text style={styles.label}> Como podemos {'\n'} chamar você? </Text>
            </View>
            <TextInput 
              style={[
                styles.input,
                (isFocused || isFilled) && { borderColor: colors.green }
              ]}
              placeholder="Digite um nome" 
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onChangeText={handleInputChange}
            />
            <View style={styles.footer}>
              <Button title="Confirmar" onPress={handleSubmit} />  
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 54,
  },
  header: {
    alignItems: 'center'
  },
  emoji: {
    fontSize: 44,
  },
  label: {
    fontSize: 24,
    lineHeight: 32,
    marginTop: 20,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading
  },
  input: {
    width: '100%',
    fontSize: 18,
    color: colors.heading,
    padding: 10,
    marginTop: 50,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    textAlign: 'center'
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20
  }
})