import React, { useEffect, useState } from 'react';
import {
  View, 
  Text, 
  StyleSheet,
  FlatList,
  ActivityIndicator 
} from 'react-native';
import api from '../services/api';

import { Header } from '../components/Header';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
interface EnvironmentsProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string],
  frequency: {
    times: number;
    repeat_every: string;
  }
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentsProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);


  const handleEnvironmentSelected = (environment: string) => {
    setEnvironmentSelected(environment);
    if (environment === 'all') {
      return setFilteredPlants(plants);
    }
    const filtered = plants.filter(plant => 
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }

  async function fetchPlants() {
    const { data } = await api
    .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
    if (!data) {
      return setLoading(true);
    }
    if (page > 1) {
      setPlants(oldValue => [... oldValue, ... data])
      setFilteredPlants(oldValue => [... oldValue, ... data]);
    } else {
      setPlants(data);
      setFilteredPlants(plants);
    }
    setLoading(false);
    setLoadingMore(false);
  }

  const handleFetchMore = (distance: number) => {
    if (distance < 1) {
      return;
    }
    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get('plants_environments?_sort=title&_order=asc');
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

  useEffect(() => {
    

    fetchPlants();
  }, []);

  if (loading) {
    return <Load />
  }

  return (
    <View style={styles.container}>
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
          renderItem={({ item }) => (
            <EnvironmentButton 
              key={item.key}
              title={item.title}
              active={item.key == environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)} 
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />

      </View>

      <View style={styles.plants}>
        <FlatList 
          data={filteredPlants}
          renderItem={({ item }) => (
            <PlantCardPrimary data={item} />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.contentContainer}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd}) => {
            handleFetchMore(distanceFromEnd);
          }}
          ListFooterComponent={<ActivityIndicator color={colors.green} />}
        />
      </View>
    </View>
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
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  },
  contentContainer: {}
})