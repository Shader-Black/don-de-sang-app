// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import des écrans
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import HealthBookScreen from './screens/HealthBookScreen';
import MedicationReminderScreen from './screens/MedicationReminderScreen';
import BloodDonationScreen from './screens/BloodDonationScreen';
import AddDonorScreen from './screens/AddDonorScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Dashboard" 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
          <Stack.Screen 
            name="MedicationReminder" 
            component={MedicationReminderScreen} 
            />
         <Stack.Screen 
          name="BloodDonation" 
          component={BloodDonationScreen} 
          />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ title: 'Dashboard' }} 
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Profile' }} 
        />
        <Stack.Screen 
          name="Appointment" 
          component={AppointmentScreen} 
          options={{ title: 'Appointments' }} 
        />
        <Stack.Screen 
          name="HealthBook" 
          component={HealthBookScreen} 
          options={{ title: 'Health Book' }} 
        />

        <Stack.Screen 
          name="AddDonor" 
          component={AddDonorScreen} 
          options={{ title: 'Nouveau donneur' }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

