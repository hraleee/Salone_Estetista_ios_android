import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();

  const handleLogin = async () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Campo obbligatorio';
    else if (!EMAIL_REGEX.test(email)) newErrors.email = 'Email non valida';
    if (!password) newErrors.password = 'Campo obbligatorio';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      await login(email, password);
    } catch {
      Alert.alert('Errore', 'Credenziali non valide');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Beauty Center</Text>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={[styles.input, errors.email ? styles.inputError : null]} value={email} onChangeText={setEmail} autoCapitalize="none" placeholderTextColor="#666" />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput style={[styles.input, errors.password ? styles.inputError : null]} value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor="#666" />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#d4729c" />
          <Text style={styles.loaderText}>Accesso in corso...</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Accedi</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Non hai un account? Registrati</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#fff' },
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, color: '#d4729c' },
  fieldContainer: { marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, color: '#333' },
  inputError: { borderColor: '#ff4444', borderWidth: 2 },
  errorText: { color: '#ff4444', fontSize: 12, marginTop: 4, marginLeft: 4 },
  button: { backgroundColor: '#d4729c', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  loaderContainer: { alignItems: 'center', padding: 15 },
  loaderText: { marginTop: 10, color: '#d4729c', fontSize: 14 },
  link: { textAlign: 'center', marginTop: 15, color: '#d4729c' },
});
