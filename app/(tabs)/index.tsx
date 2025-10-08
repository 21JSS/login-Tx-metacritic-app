import { AntDesign, Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function PantallaCombinadaLibrariis() {

  const [vistaActual, setVistaActual] = useState('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estados para el formulario de registro
  const [nombreRegistro, setNombreRegistro] = useState('');
  const [emailRegistro, setEmailRegistro] = useState('');
  const [telefonoRegistro, setTelefonoRegistro] = useState('');
  const [passwordRegistro, setPasswordRegistro] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');

  const [pestañaActiva, setPestañaActiva] = useState('Login');
  const [tabContainerWidth, setTabContainerWidth] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: pestañaActiva === 'Login' ? 0 : tabContainerWidth / 2,
      useNativeDriver: false, // 'left' property is not supported by native driver
    }).start();
  }, [pestañaActiva, tabContainerWidth]);

  const handleTabPress = (tab) => {
    if (tabContainerWidth > 0) { // Ensure width is measured before allowing press
      setPestañaActiva(tab);
    }
  };


  const mostrarVistaAuth = () => setVistaActual('auth');
  const mostrarVistaBienvenida = () => setVistaActual('welcome');

  const manejarLogin = () => {
    // Aquí iría tu lógica de inicio de sesión
    Alert.alert('Inicio de Sesión', `Email: ${email}\nContraseña: ${password}`);
  };

  const manejarRegistro = () => {
    if (passwordRegistro !== confirmarPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    // Aquí iría tu lógica de registro
    Alert.alert('Cuenta Creada', `Nombre: ${nombreRegistro}\nEmail: ${emailRegistro}\nTeléfono: ${telefonoRegistro}`);
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
            <BlurView intensity={90} tint="light" style={styles.botonBienvenidaGlass}>
              <TouchableOpacity style={styles.botonBienvenida} onPress={mostrarVistaAuth}>
                <Text style={styles.textoBotonBienvenida}>CREAR CUENTA</Text>
              </TouchableOpacity>
            </BlurView>
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.encabezadoAuth}>
              <Image
                source={require('./librariis-logo.png')}
                style={styles.logoAuth}
                resizeMode="contain"
              />
              <Text style={styles.tituloEncabezadoAuth}>TXTour Guide</Text>
              <Text style={styles.subtituloEncabezadoAuth}>App de Turismo</Text>
            </View>

            <BlurView
              intensity={90}
              tint="light"
              style={styles.tarjeta}
            >
                <View 
                  style={styles.contenedorPestañas}
                  onLayout={(event) => setTabContainerWidth(event.nativeEvent.layout.width)}
                >
                  <AnimatedBlurView
                    intensity={90}
                    tint="light"
                    style={[styles.pestañaActiva, { left: slideAnim }]}
                  />
                  <TouchableOpacity
                    style={styles.botonPestaña}
                    onPress={() => handleTabPress('Login')}
                  >
                    <Text style={[styles.textoPestaña, pestañaActiva === 'Login' && styles.textoPestañaActiva]}>
                      Iniciar Sesión
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.botonPestaña}
                    onPress={() => handleTabPress('Signup')}
                  >
                    <Text style={[styles.textoPestaña, pestañaActiva === 'Signup' && styles.textoPestañaActiva]}>
                      Registrarse
                    </Text>
                  </TouchableOpacity>
                </View>

                {pestañaActiva === 'Login' && (
                  <View>
                    <BlurView intensity={90} tint="light" style={styles.contenedorInputGlass}>
                      <View style={styles.contenidoInputGlass}>
                        <Feather name="mail" size={20} color="#555" style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          placeholder="Correo Electrónico"
                          placeholderTextColor="#555"
                          value={email}
                          onChangeText={setEmail}
                          keyboardType="email-address"
                          autoCapitalize="none"
                        />
                      </View>
                    </BlurView>
                    <BlurView intensity={90} tint="light" style={styles.contenedorInputGlass}>
                      <View style={styles.contenidoInputGlass}>
                        <Feather name="lock" size={20} color="#555" style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          placeholder="Contraseña"
                          placeholderTextColor="#555"
                          value={password}
                          onChangeText={setPassword}
                          secureTextEntry
                        />
                        <TouchableOpacity style={styles.iconoOjo}>
                          <Feather name="eye-off" size={20} color="#555" />
                        </TouchableOpacity>
                      </View>
                    </BlurView>

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
                      Bienvenido, crea tu cuenta:
                    </Text>
                    <BlurView intensity={90} tint="light" style={styles.contenedorInputGlass}>
                      <View style={styles.contenidoInputGlass}>
                        <Feather name="user" size={20} color="#555" style={styles.inputIcon} />
                        <TextInput style={styles.input} placeholder="Nombre Completo" placeholderTextColor="#555" value={nombreRegistro} onChangeText={setNombreRegistro} autoCapitalize="words" />
                      </View>
                    </BlurView>
                    <BlurView intensity={90} tint="light" style={styles.contenedorInputGlass}>
                      <View style={styles.contenidoInputGlass}>
                        <Feather name="phone" size={20} color="#555" style={styles.inputIcon} />
                        <TextInput style={styles.input} placeholder="Número de Teléfono" placeholderTextColor="#555" value={telefonoRegistro} onChangeText={setTelefonoRegistro} keyboardType="phone-pad" autoCapitalize="none" />
                      </View>
                    </BlurView>
                    <BlurView intensity={90} tint="light" style={styles.contenedorInputGlass}>
                      <View style={styles.contenidoInputGlass}>
                        <Feather name="mail" size={20} color="#555" style={styles.inputIcon} />
                        <TextInput style={styles.input} placeholder="Correo Electrónico" placeholderTextColor="#555" value={emailRegistro} onChangeText={setEmailRegistro} keyboardType="email-address" autoCapitalize="none" />
                      </View>
                    </BlurView>
                    <BlurView intensity={90} tint="light" style={styles.contenedorInputGlass}>
                      <View style={styles.contenidoInputGlass}>
                        <Feather name="lock" size={20} color="#555" style={styles.inputIcon} />
                        <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor="#555" value={passwordRegistro} onChangeText={setPasswordRegistro} secureTextEntry />
                      </View>
                    </BlurView>
                    <BlurView intensity={90} tint="light" style={styles.contenedorInputGlass}>
                      <View style={styles.contenidoInputGlass}>
                        <Feather name="lock" size={20} color="#555" style={styles.inputIcon} />
                        <TextInput style={styles.input} placeholder="Confirmar Contraseña" placeholderTextColor="#555" value={confirmarPassword} onChangeText={setConfirmarPassword} secureTextEntry />
                      </View>
                    </BlurView>

                    <TouchableOpacity style={styles.botonLogin} onPress={manejarRegistro}>
                      <Text style={styles.textoBotonLogin}>CREAR CUENTA</Text>
                    </TouchableOpacity>

                    <View style={styles.separadorContenedor}>
                      <View style={styles.lineaSeparadora} />
                      <Text style={styles.textoSeparador}>o</Text>
                      <View style={styles.lineaSeparadora} />
                    </View>
                    <TouchableOpacity style={styles.botonGoogle} onPress={manejarGoogleLogin}>
                      <AntDesign name="google" size={20} color="#030313ff" />
                      <Text style={styles.textoBotonGoogle}>Registrarse con Google</Text>
                    </TouchableOpacity>
                  </View>
                )}
            </BlurView>
          </ScrollView>
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
    fontSize: 23, 
    color: '#E0E0E0', 
    textAlign: 'center', 
    marginBottom: 40,
    fontVariant: ['small-caps']
  },
  botonBienvenida: { 
    paddingVertical: 15, 
    alignItems: 'center', 
    width: '100%' 
  },
  botonBienvenidaGlass: {
    borderRadius: 8,
    width: '100%',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 20, // Added margin to separate from text
  },
  textoBotonBienvenida: { 
    fontWeight: '600', 
    color: '#000000', 
    fontSize: 16 
  },
  encabezadoAuth: { 
    alignItems: 'center', 
    paddingTop: 30, 
    paddingBottom: 20 
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
    borderRadius: 20, 
    padding: 25,
    shadowColor: '#000', 
    shadowOffset: { width: 5, height: 0 }, 
    shadowOpacity: 0, 
    shadowRadius: 0.1, 
    elevation: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    overflow: 'hidden',
  },
  

  contenedorPestañas: { 
    flexDirection: 'row', 
    marginBottom: 30, 
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10, 
    position: 'relative',
  },
  botonPestaña: { 
    flex: 1, 
    paddingVertical: 12, 
    alignItems: 'center',
    zIndex: 1, // Asegura que el texto esté sobre el fondo deslizante
  },
  pestañaActiva: { 
    position: 'absolute',
    width: '50%',
    height: '100%',
    borderRadius: 10,
    shadowColor: '#000000ff', 
    shadowOffset: { width: 9, height: 3 }, 
    shadowOpacity: 0.6, 
    shadowRadius: 9, 
    elevation: 2,
    backgroundColor: Platform.OS === 'android' ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
  },
  textoPestaña: { 
    fontWeight: '500', 
    fontSize: 16, 
    color: '#333' 
  },
  textoPestañaActiva: { 
    color: '#000',
    fontWeight: 'bold',
  },
  contenedorInputGlass: {
    borderRadius: 19,
    marginBottom: 26,
    height: 50,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    overflow: 'hidden',
    shadowRadius: 4,
    shadowColor: 'rgba(0, 0, 0, 1.2)',
    shadowOffset: { width: 6, height: 7 },
    shadowOpacity: 0.7, 
    // Crucial para que BlurView respete el borderRadius
    // El backgroundColor es manejado por el tint y la intensidad del BlurView
  },
  contenidoInputGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: '100%',
  },
  input: { 
    flex: 1, 
    fontSize: 16, 
    color: '#3333331a', 
    height: '100%' 
  },
  inputIcon: {
    marginRight: 10,
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
    backgroundColor: '#5addfabd', 
    paddingVertical: 15, 
    borderRadius: 29, 
    alignItems: 'center', 
    width: '100%',
    shadowOffset: {width:8, height:8},
    shadowColor: "rgba(15, 15, 15, 1)",
    shadowOpacity: 0.9 
  },
  textoBotonLogin: { 
    fontWeight: 'bold', 
    color: '#000000ff', 
    fontSize: 18 
  },
  textoPlaceholderSignup: { 
    textAlign: 'center', 
    color: '#000000ff', 
    marginBottom: 25 
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
    backgroundColor: '#38ca58bd',
    paddingVertical: 15,
    borderRadius: 29,
    width: '100%',
    borderColor: '#38ac58bd',
    borderWidth: 1,
    shadowColor: "rgba(15, 15, 15, 1)",
    shadowOffset: {width: 8, height: 8},
    shadowOpacity: 0.7
  },
  textoBotonGoogle: {
    marginLeft: 10,
    fontWeight: '600',
    color: '#000000ff',
    fontSize: 16,
  },

});
