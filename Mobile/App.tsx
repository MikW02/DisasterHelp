import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Navegador from './app/Screens/Navegador';
import Login from './app/Screens/Login';
import Registro from './app/Screens/Registro';
import ComoUsar from './app/Screens/ComoUsar';
import Detalhes from './app/Screens/Detalhes';
import Eventos from './app/Screens/Eventos';
import CadastrarEvento from './app/Screens/CadastrarEvento';
import EditarEvento from './app/Screens/EditarEvento';
import DeletarEvento from './app/Screens/DeletarEvento';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Navegador" component={Navegador} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Eventos" component={Eventos} />
        <Stack.Screen name="CadastrarEvento" component={CadastrarEvento} />
        <Stack.Screen name="EditarEvento" component={EditarEvento} />
        <Stack.Screen name="DeletarEvento" component={DeletarEvento} />
        <Stack.Screen name="ComoUsar" component={ComoUsar} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};
