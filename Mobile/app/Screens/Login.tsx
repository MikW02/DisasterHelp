import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Button,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { styles } from '../Components/styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenAtual, setTokenAtual] = useState('');
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    const verificarLoginSalvo = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setTokenAtual(token);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Navegador' }],
        });
      }
    };
    verificarLoginSalvo();
  }, []);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:8080/DisasterHelp/api/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const tokenCompleto = `${data.prefix} ${data.token}`;
        await AsyncStorage.setItem('authToken', tokenCompleto);
        setTokenAtual(tokenCompleto);
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Navegador' }],
        });
      } else if (response.status === 403) {
        Alert.alert('Erro', 'Email ou senha inválidos.');
      } else {
        const errorText = await response.text();
        console.error('Erro inesperado:', errorText);
        Alert.alert('Erro', 'Falha ao fazer login');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro de comunicação com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setTokenAtual('');
    Alert.alert('Logout', 'Você saiu com sucesso!');
  };

  const irParaRegistro = () => {
    navigation.navigate('Registro');
  };


  return (
    <View style={styles.containerText}>
      <Image source={require('../Assets/LOGO.jpg')} style={styles.logoGrande} />
      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Login</Text>

      <TextInput
        value={email}
        style={styles.input}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        value={password}
        secureTextEntry
        style={styles.input}
        placeholder="Senha"
        autoCapitalize="none"
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.button}>
            <Button title="Login" onPress={signIn} />
          </View>
          <View style={styles.button}>
            <Button title="Registrar-se" onPress={irParaRegistro} />
          </View>
          {tokenAtual && (
            <View style={styles.button}>
              <Button title="Logout" onPress={logout} color="#F44336" />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default Login;
