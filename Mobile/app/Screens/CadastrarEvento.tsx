import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../Components/styles';
import { useNavigation } from '@react-navigation/native';

const CadastrarEvento = () => {
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [regiao, setRegiao] = useState('');
  const [dataPrevista, setDataPrevista] = useState('');
  const [loadingEnvio, setLoadingEnvio] = useState(false);
  const [carregandoToken, setCarregandoToken] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const verificarLogin = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Acesso negado', 'Você precisa estar logado para acessar esta página.', [
          { text: 'OK', onPress: () => navigation.navigate('Login' as never) },
        ]);
      } else {
        setCarregandoToken(false);
      }
    };

    verificarLogin();
  }, []);

  const handleCadastro = async () => {
    if (!tipo || !descricao || !regiao || !dataPrevista) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos!');
      return;
    }

    setLoadingEnvio(true);

    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Erro', 'Você precisa estar logado para cadastrar um evento.');
        return;
      }

      const response = await fetch('http://10.0.2.2:8080/disasterHelp/api/desastre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ tipo, descricao, regiao, dataPrevista }),
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Evento cadastrado com sucesso!');
        setTipo('');
        setDescricao('');
        setRegiao('');
        setDataPrevista('');
      } else if (response.status === 400) {
        Alert.alert('Erro', 'Dados inválidos!');
      } else {
        const erro = await response.text();
        console.error(erro);
        Alert.alert('Erro', 'Falha ao cadastrar evento.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro de comunicação com o servidor.');
    } finally {
      setLoadingEnvio(false);
    }
  };

  if (carregandoToken) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Verificando autenticação...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.containerText}>
      <Text style={styles.title}>Cadastrar Evento Climático</Text>

      <TextInput
        placeholder="Tipo (Ex: Enchente)"
        style={styles.input}
        value={tipo}
        onChangeText={setTipo}
      />
      <TextInput
        placeholder="Descrição"
        style={styles.input}
        multiline
        numberOfLines={4}
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        placeholder="Região (Ex: São Paulo - Zona Leste)"
        style={styles.input}
        value={regiao}
        onChangeText={setRegiao}
      />
      <TextInput
        placeholder="Data Prevista"
        style={styles.input}
        value={dataPrevista}
        onChangeText={setDataPrevista}
      />

      {loadingEnvio ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Cadastrar" onPress={handleCadastro} />
      )}
    </ScrollView>
  );
};

export default CadastrarEvento;
