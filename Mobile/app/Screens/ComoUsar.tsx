import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { styles } from '../Components/styles';

const ComoUsar = () => {
    return (
        <ScrollView style={styles.containerText}>
            <Image source={require('../Assets/enchente.jpg')} style={styles.logoGrande} />
            <Text style={styles.title}>Como Usar o Aplicativo DisasterHelp</Text>

            <Text style={styles.paragrafo}>
                O DisasterHelp é um aplicativo voltado para o monitoramento e gestão de eventos climáticos. Ele permite que usuários visualizem, cadastrem, editem e excluam registros de desastres naturais com praticidade e segurança.
            </Text>

            <Text style={styles.subtitle}>Login e Segurança:</Text>
            <Text style={styles.paragrafo}>
                Para acessar as funcionalidades, é necessário fazer login. A autenticação é feita via token JWT, garantindo que apenas usuários autorizados possam manipular os dados do sistema.
            </Text>

            <Text style={styles.subtitle}>Cadastro de Usuário:</Text>
            <Text style={styles.paragrafo}>
                Ao se registrar, o sistema salva suas informações no banco de dados com segurança. Isso permite controle de acesso e histórico de ações feitas por cada usuário.
            </Text>

            <Text style={styles.subtitle}>Visualização de Eventos Climáticos:</Text>
            <Text style={styles.paragrafo}>
                A tela principal exibe uma lista paginada de eventos climáticos registrados no sistema, como enchentes, secas e tempestades, com detalhes como região, tipo e data prevista.
            </Text>

            <Text style={styles.subtitle}>Cadastro de Evento Climático:</Text>
            <Text style={styles.paragrafo}>
                Usuários autenticados podem registrar novos eventos preenchendo os campos necessários. Esses dados são enviados para o backend e armazenados no banco de dados.
            </Text>

            <Text style={styles.subtitle}>Edição e Exclusão:</Text>
            <Text style={styles.paragrafo}>
                O sistema também permite atualizar informações de eventos existentes ou excluí-los, utilizando seu respectivo ID. Tudo com verificação de token para manter a segurança dos dados.
            </Text>

            <Text style={styles.subtitle}>Persistência dos Dados:</Text>
            <Text style={styles.paragrafo}>
                Todas as informações são persistidas em banco de dados no backend, garantindo consistência e acessibilidade mesmo após o app ser fechado.
            </Text>

            <Text style={styles.paragrafo}>
                Com o DisasterHelp, você tem uma ferramenta confiável para monitoramento e gestão de desastres naturais de forma segura e prática.
            </Text>

            <Image source={require('../Assets/LOGO.jpg')} style={styles.logoGrande} />
        </ScrollView>
    );
};

export default ComoUsar;
