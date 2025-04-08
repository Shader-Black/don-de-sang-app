import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import * as Notifications from 'expo-notifications';
import { ScrollView } from 'react-native';


export default function MedicationReminderScreen() {
  const [med, setMed] = useState('');
  const [delay, setDelay] = useState('');

  const scheduleReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Rappel Médicament 💊',
        body: `Temps de prendre : ${med}`,
      },
      trigger: { seconds: parseInt(delay) },
    });

    Alert.alert("Rappel programmé !");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Créer un rappel</Text>
      <TextInput placeholder="Nom du médicament" style={styles.input} onChangeText={setMed} />
      <TextInput placeholder="Dans combien de secondes ?" keyboardType="numeric" style={styles.input} onChangeText={setDelay} />
      <Button title="Programmer" color="#16a34a" onPress={scheduleReminder} />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 22, marginBottom: 15, color: '#16a34a', fontWeight: 'bold' },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 8 },
});
