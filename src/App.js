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
import {StatusBar} from 'react-native';

import {store} from './store/index';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import axios from 'axios';

const Stack = createNativeStackNavigator();

import Login from './pages/auth/Login.screen';
import Register from './pages/auth/Register.screen';
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
import CanvasScreen from './pages/canvas.screen';
import Profile from './pages/Profile.screen';

function App() {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <RunApp persistor={persistor}></RunApp>
    </Provider>
  );
}

function RunApp({persistor}) {
  const state = useSelector(state => state);
  axios.interceptors.request.use(
    config => {
      if (state?.authSlice?.token != '') {
        config.headers['Authorization'] = `Bearer ${state?.authSlice?.token}`;
      }
      return config;
    },
    error => {
      console.log(error);
      Promise.reject(error);
    },
  );

  return (
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <StatusBar barStyle={'dark-content'} />
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
          <Stack.Screen
            name="Canvas"
            component={CanvasScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PersistGate>
  );
}

export default App;
