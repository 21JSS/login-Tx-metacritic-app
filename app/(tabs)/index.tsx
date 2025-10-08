import { Arimo_400Regular, Arimo_700Bold, useFonts as useArimo } from '@expo-google-fonts/arimo';
import { Caveat_700Bold, useFonts as useCaveat } from '@expo-google-fonts/caveat';
import { Feather } from '@expo/vector-icons';
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

  // Estados para el foco de los inputs
  const [focusedInput, setFocusedInput] = useState(null);
  const handleFocus = (inputName) => setFocusedInput(inputName);
  const handleBlur = () => setFocusedInput(null);
  const getInputBorderColor = (inputName) => {
    return focusedInput === inputName ? '#be3c6cff' : 'rgba(0, 0, 0, 1)';
  };
  const getInputIconColor = (inputName) => {
    return focusedInput === inputName ? '#be3c6cff' : '#555';
  };

  const [pestañaActiva, setPestañaActiva] = useState('Login');
  const [tabContainerWidth, setTabContainerWidth] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (tabContainerWidth > 0) {
      Animated.spring(slideAnim, {
        toValue: pestañaActiva === 'Login' ? 0 : tabContainerWidth / 2,
        useNativeDriver: false, 
      }).start();
    }
  }, [pestañaActiva, tabContainerWidth]);

  const [arimoLoaded] = useArimo({
    Arimo_400Regular,
    Arimo_700Bold,
  });

  const [caveatLoaded] = useCaveat({
    Caveat_700Bold,
  });

  if (!arimoLoaded || !caveatLoaded) {
    return null; // O un componente de carga mientras las fuentes se cargan
  }

  const handleTabPress = (tab) => { 
    if (tabContainerWidth > 0) { 
      setPestañaActiva(tab);
    }
  };


  const mostrarVistaAuth = () => setVistaActual('auth');
  const mostrarVistaBienvenida = () => setVistaActual('welcome');

  const manejarLogin = () => {
    // Aquí iría la lógica de inicio de sesión
    Alert.alert('Inicio de Sesión', `Email: ${email}\nContraseña: ${password}`);
  };

  const manejarRegistro = () => {
    if (passwordRegistro !== confirmarPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    // Aquí iría la lógica de registro
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
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)', '#620457']}
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
                <Text style={styles.textoBotonBienvenida}>¡BIENVENIDO!</Text>
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
                    <BlurView intensity={90} tint="light" style={[styles.contenedorInputGlass, { borderColor: getInputBorderColor('loginEmail') }]}>
                      <View style={styles.contenidoInputGlass}>
                        <Feather name="mail" size={20} color={getInputIconColor('loginEmail')} style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          placeholder="Correo Electrónico"
                          placeholderTextColor="#555"
                          value={email}
                          onChangeText={setEmail}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          onFocus={() => handleFocus('loginEmail')}
                          onBlur={handleBlur}
                        />
                      </View>
                    </BlurView>
                    <BlurView intensity={90} tint="light" style={[styles.contenedorInputGlass, { borderColor: getInputBorderColor('loginPassword') }]}>
                      <View style={styles.contenidoInputGlass}>
                        <Feather name="lock" size={20} color={getInputIconColor('loginPassword')} style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          placeholder="Contraseña"
                          placeholderTextColor="#555"
                          value={password}
                          onChangeText={setPassword}
                          secureTextEntry
                          onFocus={() => handleFocus('loginPassword')}
                          onBlur={handleBlur}
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
                      <Image source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }} style={styles.googleIcon} />
                      <Text style={styles.textoBotonGoogle}>Iniciar sesión con Google</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {pestañaActiva === 'Signup' && (
                  <View>
                    <Text style={styles.textoPlaceholderSignup}>
                      Bienvenido, crea tu cuenta:
                    </Text>
                    <BlurView intensity={90} tint="light" style={[styles.contenedorInputGlass, { borderColor: getInputBorderColor('signupName') }]}>
                      <View style={styles.contenidoInputGlass}>
                        <Feather name="user" size={20} color={getInputIconColor('signupName')} style={styles.inputIcon} />
                        <TextInput style={styles.input} placeholder="Nombre Completo" placeholderTextColor="#555" value={nombreRegistro} onChangeText={setNombreRegistro} autoCapitalize="words" onFocus={() => handleFocus('signupName')} onBlur={handleBlur} />
                      </View>
                    </BlurView>
                    <BlurView intensity={90} tint="light" style={[styles.contenedorInputGlass, { borderColor: getInputBorderColor('signupPhone') }]}>
                      <View style={styles.contenidoInputGlass}>
                        <Feather name="phone" size={20} color={getInputIconColor('signupPhone')} style={styles.inputIcon} />
                        <TextInput style={styles.input} placeholder="Número de Teléfono" placeholderTextColor="#555" value={telefonoRegistro} onChangeText={setTelefonoRegistro} keyboardType="phone-pad" autoCapitalize="none" onFocus={() => handleFocus('signupPhone')} onBlur={handleBlur} />
                      </View>
                    </BlurView>
                    <BlurView intensity={90} tint="light" style={[styles.contenedorInputGlass, { borderColor: getInputBorderColor('signupEmail') }]}>
                      <View style={styles.contenidoInputGlass}>
                        <Feather name="mail" size={20} color={getInputIconColor('signupEmail')} style={styles.inputIcon} />
                        <TextInput style={styles.input} placeholder="Correo Electrónico" placeholderTextColor="#555" value={emailRegistro} onChangeText={setEmailRegistro} keyboardType="email-address" autoCapitalize="none" onFocus={() => handleFocus('signupEmail')} onBlur={handleBlur} />
                      </View>
                    </BlurView>
                    <BlurView intensity={90} tint="light" style={[styles.contenedorInputGlass, { borderColor: getInputBorderColor('signupPassword') }]}>
                      <View style={styles.contenidoInputGlass}>
                        <Feather name="lock" size={20} color={getInputIconColor('signupPassword')} style={styles.inputIcon} />
                        <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor="#555" value={passwordRegistro} onChangeText={setPasswordRegistro} secureTextEntry onFocus={() => handleFocus('signupPassword')} onBlur={handleBlur} />
                      </View>
                    </BlurView>
                    <BlurView intensity={90} tint="light" style={[styles.contenedorInputGlass, { borderColor: getInputBorderColor('signupConfirmPassword') }]}>
                      <View style={styles.contenidoInputGlass}>
                        <Feather name="lock" size={20} color={getInputIconColor('signupConfirmPassword')} style={styles.inputIcon} />
                        <TextInput style={styles.input} placeholder="Confirmar Contraseña" placeholderTextColor="#555" value={confirmarPassword} onChangeText={setConfirmarPassword} secureTextEntry onFocus={() => handleFocus('signupConfirmPassword')} onBlur={handleBlur} />
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
                      <Image source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }} style={styles.googleIcon} />
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
    fontFamily: 'Arimo400Regular',
    fontSize: 32, 
    color: '#FFFFFF', 
    marginBottom: 5 
  },
  subtituloBienvenida: { 
    fontFamily: 'Arimo_400Regular',
    fontSize: 23, 
    color: '#E0E0E0', 
    textAlign: 'center', 
    marginBottom: 40,
    fontVariant: ['small-caps'],
  },
  botonBienvenida: { 
    paddingVertical: 15, 
    alignItems: 'center', 
    width: '100%' 
  },
  botonBienvenidaGlass: {
    borderRadius: 30,
    width: '50%',
    borderColor: "#f8eff7ff",
    shadowOffset:{width: 3, height: 3},
    shadowOpacity: 0.9,
    shadowColor: "#ffffffff",
    borderWidth: 1.5,
    overflow: 'hidden',
    backgroundColor:"#620457",
    marginTop: 20, 
  },
  textoBotonBienvenida: { 
    fontFamily: 'Arimo_700Bold',
    color: "#ffffffff", 
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 0, 1)", 
    textShadowOffset: { width: 2, height: 1 }
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
    backgroundColor: "#1a181862", 
  },
  tituloEncabezadoAuth: { 
    fontFamily: 'Arimo_700Bold',
    fontSize: 24, 
    color: '#222' 
  },
  subtituloEncabezadoAuth: { 
    fontSize: 14, 
    fontFamily: 'Arimo_700Bold',
    color: '#555' 
  },
  tarjeta: { 
    width: '100%',
    borderRadius: 20, 
    padding: 25,
    shadowColor: '#ffffff', 
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
    zIndex: 1, 
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
    fontFamily: 'Arimo_700bold',
    fontSize: 16, 
    color: '#000000ff' 
  },
  textoPestañaActiva: { 
    fontFamily: 'Arimo_700Bold',
    color: '#000',
  },
  contenedorInputGlass: {
    borderRadius: 21,
    marginBottom: 26,
    height: 50,
    borderColor: 'rgba(0, 0, 0, 1)',
    borderWidth: 1,
    overflow: 'hidden',
    shadowRadius: 4,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 6, height: 7 },
    shadowOpacity: 0.7, 
    
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
    fontFamily: 'Arimo_700bold',
    color: '#020202ff', 
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
    fontFamily: 'Arimo_700bold',
    color: '#888' 
  },
  botonLogin: { 
    backgroundColor: "#750931de", 
    borderColor: 'rgba(0, 0, 0, 1)', 
    paddingVertical: 15, 
    borderRadius: 21, 
    alignItems: 'center', 
    width: '100%',
    shadowOffset: {width:1, height:1},
    shadowOpacity: 0.10,
    shadowColor: "rgba(15, 15, 15, 1)", 
  },
  textoBotonLogin: { 
    fontFamily: 'Arimo_700Bold',
    color: '#fffdfdff', 
    fontSize: 18 
  },
  textoPlaceholderSignup: { 
    textAlign: 'center', 
    color: '#000000ff', 
    fontFamily: 'Arimo_700bold',
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
    fontFamily: 'Arimo_700bold',
    color: '#888',
    fontSize: 14,
  },
  botonGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffffbd',
    paddingVertical: 15,
    borderRadius: 29,
    width: '100%',
    borderColor: '#020202bd',
    borderWidth: 1,
    shadowColor: "rgba(15, 15, 15, 1)",
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1
  },
  textoBotonGoogle: {
    marginLeft: 10,
    fontFamily: 'Arimo_700bold',
    color: '#000000ff',
    fontSize: 16,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },

});
