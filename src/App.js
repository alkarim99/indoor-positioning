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
import IndexFingerprint from './pages/fingerprint/index.screen';
import CreateFingerprint from './pages/fingerprint/create.screen';
import EditFingerprint from './pages/fingerprint/edit.screen';
import IndexNavigation from './pages/navigation/index.screen';
import CreateNavigation from './pages/navigation/create.screen';
import EditNavigation from './pages/navigation/edit.screen';
import IndexWeight from './pages/weight/index.screen';
import CreateWeight from './pages/weight/create.screen';
import EditWeight from './pages/weight/edit.screen';

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
          name="IndexFingerprint"
          component={IndexFingerprint}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateFingerprint"
          component={CreateFingerprint}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditFingerprint"
          component={EditFingerprint}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="IndexNavigation"
          component={IndexNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateNavigation"
          component={CreateNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditNavigation"
          component={EditNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="IndexWeight"
          component={IndexWeight}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateWeight"
          component={CreateWeight}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditWeight"
          component={EditWeight}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
