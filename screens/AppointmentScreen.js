import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
