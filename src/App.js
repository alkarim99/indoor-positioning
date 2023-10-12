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
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();

import Login from './pages/Login.screen';
import Home from './pages/Home.screen';
import Navigasi from './pages/Navigasi.screen';
import Database from './pages/Database.screen';
import DetailNavigasi from './pages/DetailNavigasi.screen';

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
      <Stack.Navigator initialRouteName="Login">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 10,
  },
  logo: {
    width: 350,
    resizeMode: 'center',
  },
  input: {
    height: 40,
    paddingLeft: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#176B87',
  },
  button: {
    margin: 10,
  },
  dropdown2BtnStyle: {
    marginBottom: 12,
    width: '100%',
    height: 40,
    backgroundColor: '#176B87',
    borderRadius: 30,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 14,
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  submit: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#176B87',
    borderRadius: 30,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default App;
