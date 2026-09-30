import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function ServicesScreen({ navigation }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await api.get('/services');
      setServices(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const prenota = (servizio) => {
    navigation.navigate('Prenotazioni', { servizio });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I Nostri Servizi</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.serviceName}>{item.nome}</Text>
            <Text style={styles.description}>{item.descrizione}</Text>
            <View style={styles.row}>
              <Text style={styles.price}>€{item.prezzo}</Text>
              <Text style={styles.duration}>{item.durata} min</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => prenota(item)}>
              <Text style={styles.buttonText}>Prenota</Text>
            </TouchableOpacity>
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
  serviceName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  description: { color: '#666', marginVertical: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#d4729c' },
  duration: { color: '#888' },
  button: { backgroundColor: '#d4729c', padding: 10, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
