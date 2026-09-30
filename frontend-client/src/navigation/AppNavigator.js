import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ServicesScreen from '../screens/ServicesScreen';
import BookingsScreen from '../screens/BookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminDashboard from '../screens/admin/DashboardScreen';
import AdminBookings from '../screens/admin/BookingsScreen';
import AdminServices from '../screens/admin/ServicesScreen';
import AdminClients from '../screens/admin/ClientsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ClientTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Servizi" component={ServicesScreen} />
    <Tab.Screen name="Prenotazioni" component={BookingsScreen} />
    <Tab.Screen name="Profilo" component={ProfileScreen} />
  </Tab.Navigator>
);

const AdminTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={AdminDashboard} />
    <Tab.Screen name="Prenotazioni" component={AdminBookings} />
    <Tab.Screen name="Servizi" component={AdminServices} />
    <Tab.Screen name="Clienti" component={AdminClients} />
  </Tab.Navigator>
);

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        user.ruolo === 'admin' ? (
          <Stack.Screen name="AdminHome" component={AdminTabs} />
        ) : (
          <Stack.Screen name="Home" component={ClientTabs} />
        )
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
