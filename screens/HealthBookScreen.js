import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';


export default function HealthBookScreen() {
  const [entry, setEntry] = useState('');
  const [records, setRecords] = useState([
    { text: 'Vaccin Covid-19 - 12/03/2023' },
    { text: 'Allergie : Pollen' }
  ]);

  const handleAdd = () => {
    if (entry) {
      setRecords([...records, { text: entry }]);
      setEntry('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carnet Sanitaire</Text>
      <TextInput
        placeholder="Ajouter une entrée (ex: vaccination...)"
        style={styles.input}
        value={entry}
        onChangeText={setEntry}
      />
      <Button title="Ajouter" onPress={handleAdd} />
      <FlatList
        data={records}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.text}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  item: { backgroundColor: '#f3f4f6', padding: 10, marginTop: 10, borderRadius: 5 }
});
