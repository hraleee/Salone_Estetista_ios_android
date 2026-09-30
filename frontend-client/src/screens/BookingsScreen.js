import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import api from '../services/api';

export default function BookingsScreen({ route }) {
  const [bookings, setBookings] = useState([]);
  const servizio = route.params?.servizio;

  useEffect(() => {
    if (servizio) {
      prenotaServizio();
    } else {
      loadBookings();
    }
  }, []);

  const loadBookings = async () => {
    try {
      const res = await api.get('/bookings/mie');
      setBookings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const prenotaServizio = () => {
    Alert.alert(
      'Conferma prenotazione',
      `Prenotare ${servizio.nome}?`,
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Conferma',
          onPress: async () => {
            try {
              await api.post('/bookings', {
                servizio: servizio._id,
                data: new Date().toISOString().split('T')[0],
                ora: '10:00',
              });
              Alert.alert('Successo', 'Prenotazione confermata!');
            } catch {
              Alert.alert('Errore', 'Prenotazione fallita');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Le Mie Prenotazioni</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.serviceName}>{item.servizio?.nome}</Text>
            <Text style={styles.date}>{new Date(item.data).toLocaleDateString('it-IT')} - {item.ora}</Text>
            <Text style={[styles.status, { color: item.stato === 'confermato' ? '#4CAF50' : '#888' }]}>
              {item.stato}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  serviceName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  date: { color: '#666', marginVertical: 5 },
  status: { fontWeight: 'bold', textTransform: 'capitalize' },
});
