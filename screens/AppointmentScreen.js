import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';

const AppointmentScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    hideDatePicker();
    showTimePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    const newDate = new Date(selectedDate);
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    setSelectedDate(newDate);
    hideTimePicker();
    // Ici, tu peux envoyer `newDate` à ton API ou effectuer d'autres actions nécessaires
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.86.42:5000/api/appointments', {
        // données du rendez-vous
      });
      if (response.status === 201) {
        alert('Rendez-vous enregistré avec succès');
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du rendez-vous :', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://192.168.86.42:5000/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous :', error);
      }
    };
  
    fetchAppointments();
  }, []);
  
  
  return (
    <View>
      <Button title="Choisir une date" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />
      <Text>Date sélectionnée : {selectedDate.toLocaleString()}</Text>
    </View>
  );
};

export default AppointmentScreen;
