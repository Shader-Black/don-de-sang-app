import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ProfileScreen({ navigation }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
  
    const handleSave = () => {
      console.log("Profil enregistré:", { name, age, bloodGroup });
      alert("Profil sauvegardé !");
    };
    
    const saveProfile = async (profileData) => {
      try {
        await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
        setUserProfile(profileData);
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du profil :', error);
      }
    };
    
    const loadProfile = async () => {
      try {
        const profile = await AsyncStorage.getItem('userProfile');
        if (profile !== null) {
          setUserProfile(JSON.parse(profile));
        }
      } catch (error) {
        console.error('Erreur lors du chargement du profil :', error);
      }
    };
    
    useEffect(() => {
      loadProfile();
    }, []);


    return (
      <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Profil Utilisateur</Text>
    
          <TextInput
            style={styles.input}
            placeholder="Nom complet"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Âge"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
          <TextInput
            style={styles.input}
            placeholder="Groupe sanguin (ex: A+)"
            value={bloodGroup}
            onChangeText={setBloodGroup}
          />
    
          <Button title="Enregistrer" onPress={handleSave} />
          </ScrollView>
      );
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: '#f9fafb', padding: 20 },
      header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
      },
    });