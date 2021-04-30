import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import { Header } from '../components/Header';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

import { PlantProps, loadPlant } from '../libs/storage';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { ScrollView } from 'react-native-gesture-handler';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();
      const nexTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );
      setNextWatered(
        `Não esqueça de regar a ${plantsStoraged[0].name} à ${nexTime} horas`
      )

      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageData();
  },[]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotLight}>
        <Image 
          source={waterdrop} 
          style={styles.spotLightImage}
        />
        <Text style={styles.spotLightText}>
          {nextWatered}
        </Text>
      </View>
      <ScrollView style={styles.plants} showsVerticalScrollIndicator={false}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>
        <FlatList 
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary data={item} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1, }}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  spotLight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 110,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.blue_light
  },
  spotLightImage: {
    width: 60,
    height: 60
  },
  spotLightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  }
});