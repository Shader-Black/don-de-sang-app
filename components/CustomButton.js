// components/CustomButton.js
import React from 'react';
import { Button } from 'react-native-paper';

const CustomButton = ({ title, onPress }) => {
  return (
    <Button mode="contained" onPress={onPress} style={{ margin: 10 }}>
      {title}
    </Button>
  );
};

export default CustomButton;
