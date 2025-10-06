import { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
  const inputBackgroundColor = useThemeColor(
    { light: '#F0F0F0', dark: '#2A2D30' },
    'background'
  );
  const inputBorderColor = useThemeColor({ light: '#D0D0D0', dark: '#444' }, 'background');

  const handleLogin = () => {
    // Aquí iría tu lógica de autenticación
    Alert.alert('Inicio de Sesión', `Email: ${email}\nContraseña: ${password}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Inicia sesion</ThemedText>
      </ThemedView>

      <TextInput
        style={[
          styles.input,
          { color: textColor, backgroundColor: inputBackgroundColor, borderColor: inputBorderColor },
        ]}
        placeholder="Correo electrónico"
        placeholderTextColor={Colors.light.icon}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[
          styles.input,
          { color: textColor, backgroundColor: inputBackgroundColor, borderColor: inputBorderColor },
        ]}
        placeholder="Contraseña"
        placeholderTextColor={Colors.light.icon}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <ThemedText style={styles.buttonText}>Iniciar Sesión</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity>
        <ThemedText type="link">¿Olvidaste tu contraseña?</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
