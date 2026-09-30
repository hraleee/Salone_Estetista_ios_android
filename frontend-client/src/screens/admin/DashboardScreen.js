import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../../services/api';

export default function DashboardScreen() {
  const [stats, setStats] = useState({ clienti: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await api.get('/users/stats');
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.number}>{stats.clienti}</Text>
        <Text style={styles.label}>Clienti totali</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  card: { backgroundColor: '#fff', padding: 30, borderRadius: 10, alignItems: 'center', elevation: 2 },
  number: { fontSize: 48, fontWeight: 'bold', color: '#d4729c' },
  label: { fontSize: 16, color: '#666', marginTop: 5 },
});
