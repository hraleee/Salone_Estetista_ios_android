import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import api from '../../services/api';

export default function BookingsScreen() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await api.get('/bookings');
      setBookings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, stato) => {
    try {
      await api.put(`/bookings/${id}/stato`, { stato });
      loadBookings();
    } catch {
      Alert.alert('Errore', 'Aggiornamento fallito');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prenotazioni</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.client}>{item.cliente?.nome}</Text>
            <Text style={styles.service}>{item.servizio?.nome}</Text>
            <Text style={styles.date}>{new Date(item.data).toLocaleDateString('it-IT')} - {item.ora}</Text>
            <View style={styles.actions}>
              <TouchableOpacity style={[styles.btn, { backgroundColor: '#4CAF50' }]} onPress={() => updateStatus(item._id, 'completato')}>
                <Text style={styles.btnText}>Completa</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, { backgroundColor: '#ff4444' }]} onPress={() => updateStatus(item._id, 'cancellato')}>
                <Text style={styles.btnText}>Cancella</Text>
              </TouchableOpacity>
            </View>
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
  client: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  service: { color: '#666', marginVertical: 3 },
  date: { color: '#888', marginBottom: 10 },
  actions: { flexDirection: 'row', gap: 10 },
  btn: { flex: 1, padding: 8, borderRadius: 6, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
});
