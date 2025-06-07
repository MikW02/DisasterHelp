import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../Components/styles';
import { useNavigation } from '@react-navigation/native';

interface Desastre {
  id: number;
  tipo: string;
  descricao: string;
  regiao: string;
  dataPrevista: string;
}

const Eventos = () => {
  const [desastres, setDesastres] = useState<Desastre[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [carregandoToken, setCarregandoToken] = useState(true);
  const navigation = useNavigation();

  const buscarDesastres = async (paginaAtual: number) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Erro', 'Você precisa estar logado para ver os eventos.', [
          { text: 'OK', onPress: () => navigation.navigate('Login' as never) },
        ]);
        return;
      }

      const response = await fetch(
        `http://10.0.2.2:8080/disasterHelp/api/desastre?page=${paginaAtual}&size=5&sort=dataPrevista`,
        {
          method: 'GET',
          headers: {
            Accept: '*/*',
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setDesastres(data.content);
        setTotalPaginas(data.totalPages);
        setPagina(data.number);
      } else if (response.status === 403) {
        Alert.alert('Erro', 'Token inválido ou sessão expirada.', [
          { text: 'Fazer login', onPress: () => navigation.navigate('Login' as never) },
        ]);
      } else {
        Alert.alert('Erro', 'Erro ao buscar eventos climáticos.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha na conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const verificarToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Acesso negado', 'Você precisa estar logado para acessar esta tela.', [
          { text: 'OK', onPress: () => navigation.navigate('Login' as never) },
        ]);
      } else {
        setCarregandoToken(false);
        buscarDesastres(pagina);
      }
    };

    verificarToken();
  }, []);

  const proximaPagina = () => {
    if (pagina + 1 < totalPaginas) {
      buscarDesastres(pagina + 1);
    }
  };

  const paginaAnterior = () => {
    if (pagina > 0) {
      buscarDesastres(pagina - 1);
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
      <Text style={styles.title}>Eventos Climáticos Próximos</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        desastres.map((desastre) => (
          <View key={desastre.id} style={styles.card}>
            <Text style={styles.cardTitle}>
              Tipo: {desastre.tipo}{' '}
              <Text style={styles.cardId}>({desastre.id})</Text>
            </Text>
            <Text>Região: {desastre.regiao}</Text>
            <Text>Data prevista: {desastre.dataPrevista}</Text>
            <Text>Descrição: {desastre.descricao}</Text>
          </View>
        ))
      )}

      <View style={styles.pagination}>
        <Button title="Anterior" onPress={paginaAnterior} disabled={pagina === 0} />
        <Text>
          Página {pagina + 1} de {totalPaginas}
        </Text>
        <Button title="Próxima" onPress={proximaPagina} disabled={pagina + 1 >= totalPaginas} />
      </View>
    </ScrollView>
  );
};

export default Eventos;
