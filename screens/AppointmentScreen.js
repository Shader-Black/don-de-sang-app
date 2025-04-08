import React, { useState } from 'react';
import { View, Text, Button, Platform, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AppointmentScreen() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reason, setReason] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const submitAppointment = () => {
    if (!reason) return Alert.alert("Erreur", "Motif obligatoire !");
    Alert.alert("Rendez-vous réservé !", `Date : ${date.toLocaleString()}\nMotif : ${reason}`);
    setReason('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Prendre un Rendez-vous</Text>

      <TextInput
        placeholder="Motif de consultation"
        style={styles.input}
        value={reason}
        onChangeText={setReason}
      />

      <TouchableOpacity style={styles.pickerButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.buttonText}>Choisir une date</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={onChange}
        />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={submitAppointment}>
        <Text style={styles.buttonText}>Envoyer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  pickerButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});
