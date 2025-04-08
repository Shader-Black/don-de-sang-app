import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

export default function BloodDonationScreen() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();

  // Récupération des donneurs depuis le backend
  useEffect(() => {
    axios.get('http://192.168.86.42:5000/api/donors')
      .then((res) => {
        setDonors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des donneurs:', err);
        setLoading(false);
      });
  }, []);

  // Demande de permission et localisation automatique de l’utilisateur
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission refusée pour la localisation');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#dc2626" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donneurs de sang</Text>

      {/* Carte avec marqueurs des donneurs */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude || 6.1725,
          longitude: location?.longitude || 1.2314,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        showsUserLocation={true}
      >
        {donors.map((donor) => (
          <Marker
            key={donor._id}
            coordinate={{
              latitude: donor.location.latitude,
              longitude: donor.location.longitude,
            }}
            title={donor.name}
            description={`Groupe : ${donor.bloodType}`}
          />
        ))}
      </MapView>

      {/* Liste des donneurs */}
      <FlatList
        data={donors}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Groupe sanguin : {item.bloodType}</Text>
            <Text>Ville : {item.city}</Text>
            <Text>Téléphone : {item.phone}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Bouton pour ajouter un donneur */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddDonor')}
      >
        <Text style={styles.buttonText}>Ajouter un donneur</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#dc2626',
    margin: 20,
  },
  map: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  card: {
    backgroundColor: '#fef2f2',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 15,
    elevation: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
