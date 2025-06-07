import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { styles } from '../Components/styles';

const Detalhes = () => {
    return (
        <ScrollView style={styles.containerText}>
            <Image source={require('../Assets/LOGO.jpg')} style={styles.logoGrande} />
            <Text style={styles.title}>Sobre Nós – DisasterHelp</Text>

            <Text style={styles.paragrafo}>
                O DisasterHelp é um aplicativo criado com a missão de **reduzir os impactos causados por desastres naturais** como enchentes, deslizamentos, tempestades e outros eventos extremos.
            </Text>

            <Text style={styles.paragrafo}>
                Acreditamos que **a informação salva vidas**. Por isso, nossa plataforma foi desenvolvida para **alertar a população em tempo real** sobre situações de risco nas suas regiões, ajudando na prevenção e resposta rápida.
            </Text>

            <Text style={styles.paragrafo}>
                Funcionalidades principais do nosso aplicativo:
            </Text>

            <Text style={styles.paragrafo}>
                <Text style={{ fontWeight: 'bold' }}>Alertas Personalizados por Região: </Text>
                Receba notificações sobre desastres naturais que estão prestes a acontecer ou já estão ocorrendo na sua cidade ou bairro.
            </Text>

            <Text style={styles.paragrafo}>
                <Text style={{ fontWeight: 'bold' }}>Cadastro de Usuários Afetados: </Text>
                Permite que cidadãos relatem situações de risco ou ocorrências em tempo real, ajudando as autoridades e comunidades a tomarem decisões com mais agilidade.
            </Text>

            <Text style={styles.paragrafo}>
                <Text style={{ fontWeight: 'bold' }}>Mapeamento e Visualização de Áreas de Risco: </Text>
                Consulte no mapa as áreas com maior índice de desastres, para planejar rotas seguras ou evitar deslocamentos desnecessários.
            </Text>

            <Text style={styles.paragrafo}>
                O DisasterHelp é uma iniciativa que busca **salvar vidas, proteger comunidades e fortalecer a comunicação** entre população e órgãos responsáveis por emergências.
            </Text>

            <Text style={styles.paragrafo }>
                Juntos, podemos enfrentar desastres de forma mais inteligente, conectada e preventiva.
            </Text>
        </ScrollView>
    );
};

export default Detalhes;
