import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import api from '../../services/api';

export default function ServicesScreen() {
  const [services, setServices] = useState([]);
  const [nome, setNome] = useState('');
  const [prezzo, setPrezzo] = useState('');
  const [durata, setDurata] = useState('');

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

  const createService = async () => {
    try {
      await api.post('/services', { nome, prezzo: Number(prezzo), durata: Number(durata) });
      setNome(''); setPrezzo(''); setDurata('');
      loadServices();
    } catch {
      Alert.alert('Errore', 'Creazione fallita');
    }
  };

  const deleteService = async (id) => {
    try {
      await api.delete(`/services/${id}`);
      loadServices();
    } catch {
      Alert.alert('Errore', 'Eliminazione fallita');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestione Servizi</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Nome servizio" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Prezzo" value={prezzo} onChangeText={setPrezzo} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Durata (min)" value={durata} onChangeText={setDurata} keyboardType="numeric" />
        <TouchableOpacity style={styles.addButton} onPress={createService}>
          <Text style={styles.addButtonText}>Aggiungi</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={services}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.serviceName}>{item.nome}</Text>
            <Text style={styles.details}>€{item.prezzo} - {item.durata} min</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteService(item._id)}>
              <Text style={styles.deleteText}>Elimina</Text>
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
  form: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 2 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 10, fontSize: 14 },
  addButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 8, alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  serviceName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  details: { color: '#666' },
  deleteButton: { backgroundColor: '#ff4444', padding: 8, borderRadius: 6 },
  deleteText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
});
