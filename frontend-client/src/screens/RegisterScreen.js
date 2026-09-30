import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { useAuth } from '../context/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_REGEX =
  /^(\+39)?\s?3\d{2}\s?\d{3}\s?\d{4}$/;

// IMPORTANTE:
// Questo componente deve stare fuori da RegisterScreen.
// Se lo dichiari dentro RegisterScreen, può essere ricreato
// ad ogni digitazione e il TextInput può perdere il focus.
const Field = ({
  label,
  value,
  onChangeText,
  error,
  ...props
}) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#666"
        autoCorrect={false}
        {...props}
      />

      {error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confermaPassword, setConfermaPassword] =
    useState('');
  const [telefono, setTelefono] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

  const handleRegister = async () => {
    const newErrors = {};

    const nomePulito = nome.trim();
    const cognomePulito = cognome.trim();
    const emailPulita = email.trim().toLowerCase();
    const telefonoPulito = telefono.trim();

    if (!nomePulito) {
      newErrors.nome = 'Campo obbligatorio';
    } else if (nomePulito.length < 3) {
      newErrors.nome = 'Minimo 3 caratteri';
    }

    if (!cognomePulito) {
      newErrors.cognome = 'Campo obbligatorio';
    } else if (cognomePulito.length < 3) {
      newErrors.cognome = 'Minimo 3 caratteri';
    }

    if (!emailPulita) {
      newErrors.email = 'Campo obbligatorio';
    } else if (!EMAIL_REGEX.test(emailPulita)) {
      newErrors.email = 'Email non valida';
    }

    if (!password) {
      newErrors.password = 'Campo obbligatorio';
    } else if (password.length < 8) {
      newErrors.password = 'Minimo 8 caratteri';
    }

    if (!confermaPassword) {
      newErrors.confermaPassword = 'Campo obbligatorio';
    } else if (password !== confermaPassword) {
      newErrors.confermaPassword = 'Le password non coincidono';
    }

    if (!telefonoPulito) {
      newErrors.telefono = 'Campo obbligatorio';
    } else if (!PHONE_REGEX.test(telefonoPulito)) {
      newErrors.telefono = 'Formato: 3331234567';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      await register(
        nomePulito,
        emailPulita,
        password,
        telefonoPulito,
        cognomePulito
      );
    } catch (e) {
      const msg = e?.response?.data?.errore;

      if (msg?.includes('Email')) {
        setErrors({
          email: msg,
        });
      } else if (msg?.includes('Telefono')) {
        setErrors({
          telefono: msg,
        });
      } else {
        Alert.alert(
          'Errore',
          msg || 'Registrazione fallita'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="none"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        Registrati
      </Text>

      <Field
        label="Nome"
        value={nome}
        onChangeText={setNome}
        placeholder="Mario"
        autoCapitalize="words"
        returnKeyType="next"
        error={errors.nome}
      />

      <Field
        label="Cognome"
        value={cognome}
        onChangeText={setCognome}
        placeholder="Rossi"
        autoCapitalize="words"
        returnKeyType="next"
        error={errors.cognome}
      />

      <Field
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="mario.rossi@gmail.com"
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        returnKeyType="next"
        error={errors.email}
      />

      <Field
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Minimo 8 caratteri"
        autoCapitalize="none"
        secureTextEntry={true}
        autoComplete="new-password"
        returnKeyType="next"
        error={errors.password}
      />

      <Field
        label="Conferma Password"
        value={confermaPassword}
        onChangeText={setConfermaPassword}
        placeholder="Ripeti la password"
        autoCapitalize="none"
        secureTextEntry={true}
        autoComplete="new-password"
        returnKeyType="next"
        error={errors.confermaPassword}
      />

      <Field
        label="Telefono"
        value={telefono}
        onChangeText={setTelefono}
        placeholder="3331234567"
        keyboardType="phone-pad"
        autoComplete="tel"
        returnKeyType="done"
        error={errors.telefono}
      />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#d4729c" />
          <Text style={styles.loaderText}>Registrazione in corso...</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            Registrati
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        activeOpacity={0.7}
      >
        <Text style={styles.link}>
          Hai già un account? Accedi
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#d4729c',
  },

  fieldContainer: {
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },

  inputError: {
    borderColor: '#ff4444',
    borderWidth: 2,
  },

  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },

  button: {
    backgroundColor: '#d4729c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loaderContainer: { alignItems: 'center', padding: 15 },
  loaderText: { marginTop: 10, color: '#d4729c', fontSize: 14 },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  link: {
    textAlign: 'center',
    marginTop: 15,
    color: '#d4729c',
    fontSize: 14,
  },
});