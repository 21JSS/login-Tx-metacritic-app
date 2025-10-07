import { AntDesign, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function PantallaCombinadaLibrariis() {

  const [vistaActual, setVistaActual] = useState('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pestañaActiva, setPestañaActiva] = useState('Login');

  const mostrarVistaAuth = () => setVistaActual('auth');
  const mostrarVistaBienvenida = () => setVistaActual('welcome');

  const manejarLogin = () => {
    Alert.alert('Inicio de Sesión', `Email: ${email}\nContraseña: ${password}`);
  };

  const manejarGoogleLogin = () => {
    Alert.alert('Inicio con Google', 'Aquí iría la lógica para el login con Google.');
  };

  if (vistaActual === 'welcome') {
    return (
      <ImageBackground
        source={require('./library-bg.png')}
        style={styles.contenedor}
      >
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)', 'rgba(29, 108, 118, 0.7)']}
          locations={[0, 0.5, 1]}
          style={styles.superposicionDegradado}
        >
          <View style={styles.contenidoBienvenida}>
            <Image
              source={require('./librariis-logo.png')}
              style={styles.logoBienvenida} 
              resizeMode="contain"
            />
            <Text style={styles.tituloBienvenida}>TXTour Guide</Text>
            <Text style={styles.subtituloBienvenida}>Tu guía turística personal a un clic.</Text>
            <TouchableOpacity style={styles.botonBienvenida} onPress={mostrarVistaAuth}>
              <Text style={styles.textoBotonBienvenida}>CREAR CUENTA</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground
        source={require('./reading-bg.png')}
        style={styles.contenedor}
      >
        <StatusBar barStyle="dark-content" />
        <LinearGradient
          colors={['rgba(255,255,255,0.7)', 'rgba(255,255,255,0.9)', 'rgba(255,255,255,0.98)']}
          locations={[0, 0.5, 1]}
          style={styles.superposicionDegradado}
        >

          
          <View style={styles.encabezadoAuth}>
            <Image
              source={require('./librariis-logo.png')}
              style={styles.logoAuth}
              resizeMode="contain"
            />
            <Text style={styles.tituloEncabezadoAuth}>TXTour Guide</Text>
            <Text style={styles.subtituloEncabezadoAuth}>App de Turismo</Text>
          </View>

          <View style={styles.tarjeta}>
            <View style={styles.contenedorPestañas}>
              <TouchableOpacity
                style={[styles.botonPestaña, pestañaActiva === 'Login' && styles.pestañaActiva]}
                onPress={() => setPestañaActiva('Login')}
              >
                <Text style={[styles.textoPestaña, pestañaActiva === 'Login' && styles.textoPestañaActiva]}>
                  Iniciar Sesión
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botonPestaña, pestañaActiva === 'Signup' && styles.pestañaActiva]}
                onPress={() => setPestañaActiva('Signup')}
              >
                <Text style={[styles.textoPestaña, pestañaActiva === 'Signup' && styles.textoPestañaActiva]}>
                  Registrarse
                </Text>
              </TouchableOpacity>
            </View>

            {pestañaActiva === 'Login' && (
              <View>
                <View style={styles.contenedorInput}>
                  <TextInput
                    style={styles.input}
                    placeholder="Correo Electrónico"
                    placeholderTextColor="#888"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.contenedorInput}>
                  <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#888"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                  <TouchableOpacity style={styles.iconoOjo}>
                    <Feather name="eye-off" size={20} color="#888" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.olvidoContraseña}>
                  <Text style={styles.textoOlvidoContraseña}>¡Olvidé mi contraseña!</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botonLogin} onPress={manejarLogin}>
                  <Text style={styles.textoBotonLogin}>INICIAR SESIÓN</Text>
                </TouchableOpacity>
                
                <View style={styles.separadorContenedor}>
                  <View style={styles.lineaSeparadora} />
                  <Text style={styles.textoSeparador}>o</Text>
                  <View style={styles.lineaSeparadora} />
                </View>
                
                <TouchableOpacity style={styles.botonGoogle} onPress={manejarGoogleLogin}>
                  <AntDesign name="google" size={20} color="#030313ff" />
                  <Text style={styles.textoBotonGoogle}>Iniciar sesión con Google</Text>
                </TouchableOpacity>
              </View>
            )}
            {pestañaActiva === 'Signup' && (
              <View>
                <Text style={styles.textoPlaceholderSignup}>
                  Formulario de registro aquí...
                </Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({

  contenedor: { flex: 1 },
  superposicionDegradado: { flex: 1, padding: 30 },
  


  contenidoBienvenida: { 
    flex: 1, 
    justifyContent: 'flex-end', 
    alignItems: 'center', 
    paddingBottom: 20 
  },
  logoBienvenida: { 
    width: 80, 
    height: 80, 
    marginBottom: 10, 
    borderRadius: 40, 
    backgroundColor: 'rgba(255, 255, 255, 0.9)' 
  },
  tituloBienvenida: { 
    fontWeight: 'bold', 
    fontSize: 32, 
    color: '#FFFFFF', 
    marginBottom: 5 
  },
  subtituloBienvenida: { 
    fontSize: 16, 
    color: '#E0E0E0', 
    textAlign: 'center', 
    marginBottom: 40 
  },
  botonBienvenida: { 
    backgroundColor: '#6DD5ED', 
    paddingVertical: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    width: '100%' 
  },
  textoBotonBienvenida: { 
    fontWeight: '600', 
    color: '#000000', 
    fontSize: 16 
  },
  encabezadoAuth: { 
    alignItems: 'center', 
    paddingTop: 60, 
    paddingBottom: 30 
  },
  logoAuth: { 
    width: 60, 
    height: 60, 
    marginBottom: 5, 
    borderRadius: 30, 
    backgroundColor: '#fff' 
  },
  tituloEncabezadoAuth: { 
    fontWeight: 'bold', 
    fontSize: 24, 
    color: '#222' 
  },
  subtituloEncabezadoAuth: { 
    fontSize: 14, 
    color: '#555' 
  },
  tarjeta: { 
    width: '100%', 
    backgroundColor: '#F7F6F3', 
    borderRadius: 20, 
    padding: 25, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 10, 
    elevation: 8 
  },
  contenedorPestañas: { 
    flexDirection: 'row', 
    marginBottom: 30, 
    backgroundColor: '#E0E0E0', 
    borderRadius: 10, 
    padding: 5 
  },
  botonPestaña: { 
    flex: 1, 
    paddingVertical: 10, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  pestañaActiva: { 
    backgroundColor: '#FFFFFF', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 
  },
  textoPestaña: { 
    fontWeight: '500', 
    fontSize: 16, 
    color: '#888' 
  },
  textoPestañaActiva: { 
    color: '#222' 
  },
  contenedorInput: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    marginBottom: 20, 
    height: 50, 
    borderColor: '#E0E0E0', 
    borderWidth: 1 
  },
  input: { 
    flex: 1, 
    fontSize: 16, 
    color: '#333', 
    height: '100%' 
  },
  iconoOjo: { 
    marginLeft: 10 
  },
  olvidoContraseña: { 
    alignSelf: 'flex-end', 
    marginBottom: 30 
  },
  textoOlvidoContraseña: { 
    fontSize: 14, 
    color: '#888' 
  },
  botonLogin: { 
    backgroundColor: '#6DD5ED', 
    paddingVertical: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    width: '100%' 
  },
  textoBotonLogin: { 
    fontWeight: 'bold', 
    color: '#000000ff', 
    fontSize: 18 
  },
  textoPlaceholderSignup: { 
    textAlign: 'center', 
    marginTop: 20, 
    color: '#555' 
  },
  separadorContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  lineaSeparadora: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  textoSeparador: {
    marginHorizontal: 10,
    color: '#888',
    fontSize: 14,
  },
  botonGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  textoBotonGoogle: {
    marginLeft: 10,
    fontWeight: '600',
    color: '#555',
    fontSize: 16,
  },

});
