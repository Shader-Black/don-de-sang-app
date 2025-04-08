import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';


export default function AddDonorScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    bloodType: '',
    phone: '',
    city: '',
  });

  const [coords, setCoords] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission refusée", "La géolocalisation est nécessaire.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCoords({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!coords.latitude || !coords.longitude) {
      Alert.alert("Erreur", "Coordonnées GPS manquantes");
      return;
    }

    try {
      const res = await axios.post('http://192.168.86.42:5000/api/donors', {
        ...form,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      Alert.alert('Succès', 'Donneur ajouté avec succès !');
      navigation.navigate('BloodDonation');
    } catch (error) {
      Alert.alert('Erreur', "Échec de l'ajout du donneur");
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Ajouter un Donneur</Text>

      <TextInput style={styles.input} placeholder="Nom" onChangeText={(text) => handleChange('name', text)} />
      <TextInput style={styles.input} placeholder="Groupe sanguin" onChangeText={(text) => handleChange('bloodType', text)} />
      <TextInput style={styles.input} placeholder="Téléphone" keyboardType="phone-pad" onChangeText={(text) => handleChange('phone', text)} />
      <TextInput style={styles.input} placeholder="Ville" onChangeText={(text) => handleChange('city', text)} />

      <Button title="Ajouter" color="#dc2626" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#dc2626', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10, marginBottom: 15 },
});
