// components/CustomCard.js
import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';

const CustomCard = ({ title, content }) => {
  return (
    <Card style={{ margin: 10 }}>
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{content}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default CustomCard;
