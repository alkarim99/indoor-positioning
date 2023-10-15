/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();

import Login from './pages/Login.screen';
import Home from './pages/Home.screen';
import Navigasi from './pages/Navigasi.screen';
import Database from './pages/Database.screen';
import DetailNavigasi from './pages/DetailNavigasi.screen';
import DetailDatabase from './pages/DetailDatabase.screen';
import CreateDatabase from './pages/CreateDatabase.screen';
import ShowDatabase from './pages/ShowDatabase.screen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Navigasi"
          component={Navigasi}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailNavigasi"
          component={DetailNavigasi}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Database"
          component={Database}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailDatabase"
          component={DetailDatabase}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateDatabase"
          component={CreateDatabase}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShowDatabase"
          component={ShowDatabase}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
