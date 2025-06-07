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
import { styles } from '../Components/styles';
import { useNavigation } from '@react-navigation/native';

const EditarEvento = () => {
  const [id, setId] = useState('');
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [regiao, setRegiao] = useState('');
  const [dataPrevista, setDataPrevista] = useState('');
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

  const editarEvento = async () => {
    if (!id || !tipo || !descricao || !regiao || !dataPrevista) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Erro', 'Você precisa estar logado para editar um evento.');
        return;
      }

      const response = await fetch(`http://10.0.2.2:8080/disasterHelp/api/desastre/${id}`, {
        method: 'PUT',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          id: parseInt(id),
          tipo,
          descricao,
          regiao,
          dataPrevista,
        }),
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Evento atualizado com sucesso!');
        setId('');
        setTipo('');
        setDescricao('');
        setRegiao('');
        setDataPrevista('');
      } else if (response.status === 404) {
        Alert.alert('Erro', 'Evento não encontrado.');
      } else {
        Alert.alert('Erro', 'Erro ao atualizar o evento.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro de conexão com o servidor.');
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
      <Text style={styles.title}>Editar Evento Climático</Text>

      <TextInput
        style={styles.input}
        placeholder="ID do Evento"
        keyboardType="numeric"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={tipo}
        onChangeText={setTipo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Região"
        value={regiao}
        onChangeText={setRegiao}
      />
      <TextInput
        style={styles.input}
        placeholder="Data Prevista"
        value={dataPrevista}
        onChangeText={setDataPrevista}
      />

      <View style={styles.buttonContainer}>
        <Button title="Atualizar Evento" onPress={editarEvento} />
      </View>
    </ScrollView>
  );
};

export default EditarEvento;
