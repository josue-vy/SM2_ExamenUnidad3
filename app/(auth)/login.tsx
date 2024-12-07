import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { 
  CustomButton, 
  InputField, 
  BackArrow,
  GoogleSignInButton
} from '../../components/CustomComponents';
import { useRouter } from 'expo-router';

const { height } = Dimensions.get('window');

const MainScreen = () => {
  const router = useRouter();
  const [currentView, setCurrentView] = useState('initial');
  const expandAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const animateExpand = (expand: boolean) => {
    Animated.parallel([
      Animated.timing(expandAnimation, {
        toValue: expand ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnimation, {
        toValue: expand ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      })
    ]).start();
  };

  const handleCreateAccount = () => {
    setCurrentView('register');
    animateExpand(true);
  };

  const handleSignIn = () => {
    setCurrentView('login');
    animateExpand(true);
  };

  const handleBack = () => {
    setCurrentView('initial');
    animateExpand(false);
  };

  const handleLogin = (username: string, password: string) => {
    // Validación temporal de las credenciales
    if (username === 'test' && password === 'password') {
      // Redirigir a la pantalla de tabs
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  const expandHeight = expandAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [200, height - 100]
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {currentView !== 'initial' && <BackArrow onPress={handleBack} />}
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnimation }]}>
        <View style={styles.logoContainer}>
          <View style={styles.logo} />
        </View>
        <Text style={styles.title}>
          Conecta con colegas, comparte experiencias
        </Text>
      </Animated.View>
      <Animated.View 
        style={[
          styles.expandableContainer, 
          { height: expandHeight }
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
        >
          {currentView === 'initial' && (
            <View style={styles.buttonContainer}>
              <CustomButton title="Crear cuenta" onPress={handleCreateAccount} primary />
              <CustomButton title="Inicia sesion" onPress={handleSignIn} />
            </View>
          )}
          {currentView === 'login' && (
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Bienvenido a CcontaPub.</Text>
              <InputField placeholder="Ingrese su correo" label="Correo" />
              <InputField placeholder="Ingrese su contraseña" label="Contraseña" secureTextEntry onSubmitEditing={(e) => handleLogin(e.nativeEvent.text, 'password')} />
              <Text style={styles.forgotPassword}>¿olvidaste tu contraseña?</Text>
              <CustomButton title="Iniciar sesion" onPress={() => handleLogin('test', 'password')} primary />
              <Text style={styles.orText}>o inicia sesion con una cuenta de gmail</Text>
              <GoogleSignInButton />
            </View>
          )}
          {currentView === 'register' && (
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Crear nueva cuenta</Text>
              <InputField placeholder="Ingrese su correo" label="Correo" />
              <InputField placeholder="Ingrese su nombre" label="Nombres" />
              <InputField placeholder="Ingrese su contraseña" label="Contraseña" secureTextEntry />
              <CustomButton title="Registrar" onPress={() => {}} primary />
              <Text style={styles.orText}>o registrate con una cuenta de gmail</Text>
              <GoogleSignInButton />
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#808080',
  },
  title: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  expandableContainer: {
    backgroundColor: '#333',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
  },
  scrollViewContent: {
    padding: 20,
    paddingTop: 30,
  },
  buttonContainer: {
    width: '100%',
  },
  formContainer: {
    width: '100%',
  },
  formTitle: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  forgotPassword: {
    color: '#3498db',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'right',
  },
  orText: {
    color: 'white',
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default MainScreen;
