import React, { useEffect, useState } from 'react';
import {
  View, 
  Text, 
  SafeAreaView,
  StyleSheet,
  FlatList 
} from 'react-native';
import api from '../services/api';

import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentsProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentsProps[]>([]);

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get('plants_environments');
      setEnvironments([
        {
          key: 'all',
          title: 'Todos'
        },
        ... data
      ]);
    }
    fetchEnvironment();

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>
          Em qual ambiente
        </Text>
        <Text style={styles.subtitle}>
          você quer colocar a sua planta?
        </Text>
      </View>
      <View>
        <FlatList
          data={environments}
          renderItem={({ item, index }) => (
            <EnvironmentButton key={item.key} title={item.title} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        >

        </FlatList>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  }
})