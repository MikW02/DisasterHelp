import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../Components/styles';

const DeletarEvento = () => {
  const [id, setId] = useState('');
  const [carregando, setCarregando] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const verificarLogin = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Acesso negado', 'Você precisa estar logado para acessar esta tela.', [
          { text: 'OK', onPress: () => navigation.navigate('Login' as never) },
        ]);
      } else {
        setCarregando(false);
      }
    };

    verificarLogin();
  }, []);

  const deletarEvento = async () => {
    if (!id) {
      Alert.alert('Erro', 'Por favor, informe o ID do evento.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Erro', 'Você precisa estar logado para deletar eventos.');
        return;
      }

      const response = await fetch(
        `http://10.0.2.2:8080/disasterHelp/api/desastre/${id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: '*/*',
            Authorization: token,
          },
        }
      );

      if (response.status === 204) {
        Alert.alert('Sucesso', 'Evento deletado com sucesso!');
        setId('');
      } else if (response.status === 403) {
        Alert.alert('Erro', 'Token inválido ou sessão expirada.');
      } else if (response.status === 404) {
        Alert.alert('Erro', 'Evento não encontrado.');
      } else {
        Alert.alert('Erro', 'Não foi possível deletar o evento.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao conectar com o servidor.');
    }
  };

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Verificando autenticação...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.containerText}>
      <Text style={styles.title}>Deletar Evento Climático</Text>

      <Text style={styles.label}>ID do Evento:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite o ID do evento"
        value={id}
        onChangeText={setId}
      />

      <View style={styles.buttonContainer}>
        <Button title="Deletar Evento" color="#d32f2f" onPress={deletarEvento} />
      </View>
    </ScrollView>
  );
};

export default DeletarEvento;
