// screens/DashboardScreen.js
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CustomButton from '../components/CustomButton'; // Importer le composant CustomButton
import CustomCard from '../components/CustomCard'; // Importer le composant CustomCard



export default function DashboardScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>SanTo Dashboard</Text>

      <CustomCard
  title="Bienvenue !"
  content="Consultez vos rendez-vous, carnet et profil depuis ce tableau de bord."
     />

      <CustomCard
  title="Conseil Santé"
  content="N’oubliez pas de boire suffisamment d’eau aujourd’hui ! 💧"
     />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Appointment')}
      >
        <Ionicons name="calendar-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Prise de Rendez-vous</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HealthBook')}
      >
        <Ionicons name="document-text-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Carnet Sanitaire</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}
      >
        <Ionicons name="person-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Suivi personnalisé</Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('MedicationReminder')}
>
  <Ionicons name="medkit-outline" size={24} color="white" />
  <Text style={styles.buttonText}>Rappels Médicaments</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('BloodDonation')}
>
  <Ionicons name="water-outline" size={24} color="white" />
  <Text style={styles.buttonText}>Don de sang</Text>
</TouchableOpacity>
 
<TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('BloodDonation')}
>
  <Ionicons name="heart-outline" size={24} color="white" />
  <Text style={styles.buttonText}>Donneurs de sang</Text>
</TouchableOpacity>


</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '600',
  },
});
