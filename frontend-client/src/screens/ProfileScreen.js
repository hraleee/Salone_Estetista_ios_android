import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Il Mio Profilo</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>{user?.nome}</Text>
        <Text style={styles.label}>Cognome</Text>
        <Text style={styles.value}>{user?.cognome}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email}</Text>
        <Text style={styles.label}>Telefono</Text>
        <Text style={styles.value}>{user?.telefono || 'Non specificato'}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Esci</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, elevation: 2 },
  label: { fontSize: 12, color: '#888', marginTop: 10 },
  value: { fontSize: 16, color: '#333', marginBottom: 5 },
  logoutButton: { backgroundColor: '#ff4444', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
