import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";
import { styles } from "../Components/styles";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Navegador = ({ navigation }: RouterProps) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const carregarToken = async () => {
      const t = await AsyncStorage.getItem("authToken");
      setToken(t);
    };

    const unsubscribe = navigation.addListener("focus", carregarToken);
    return unsubscribe;
  }, [navigation]);

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    setToken(null);
    navigation.navigate("Login"); 
  };

  return (
    <View style={styles.containerNav}>
      <ImageBackground
        source={require("../Assets/RioGrandedoSul.jpg")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <Text style={{ color: "white", marginTop: 10 }}>
            Token atual:
          </Text>
          <Text
            style={{
              color: "white",
              marginBottom: 10,
              paddingHorizontal: 10,
              fontSize: 12,
              textAlign: "center",
            }}
          >
            {token || "Nenhum token salvo"}
          </Text>

          <Text style={{ color: "white", marginBottom: 10, fontWeight: "bold" }}>
            {token ? "LOGADO" : "NÃO LOGADO"}
          </Text>

          <View style={styles.button}>
            <Button onPress={() => navigation.navigate("Eventos")} title="Eventos" />
            <Button onPress={() => navigation.navigate("CadastrarEvento")} title="Cadastrar Eventos Climaticos" />   
            <Button onPress={() => navigation.navigate("EditarEvento")} title="Editar Eventos Climaticos" />  
            <Button onPress={() => navigation.navigate("DeletarEvento")} title="Deletar Eventos Climaticos" />  
            <Button onPress={() => navigation.navigate("ComoUsar")} title="Como utilizar o app" />
            <Button onPress={() => navigation.navigate("Detalhes")} title="Sobre nós" />
            
            <Button
                onPress={async () => { await AsyncStorage.removeItem('authToken'); navigation.navigate('Login');  }}title="Voltar ao início (Logout)" />
                
          </View>

          <Image source={require("../Assets/LOGO.jpg")} style={styles.logoNav} />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Navegador;
