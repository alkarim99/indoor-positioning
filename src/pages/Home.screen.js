/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
  PermissionsAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addAuth} from '../store/reducers/authSlice';

function Home(props) {
  const {navigation} = props;
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const user = state?.authSlice?.userData;
  const token = state?.authSlice?.token;

  useEffect(() => {
    permission();
  });
  const permission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required  ' +
          'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // You can now use react-native-wifi-reborn
      console.log('granted');
    } else {
      // Permission denied
      console.log('not granted');
    }
  };

  const handleLogout = () => {
    dispatch(
      addAuth({
        userData: {},
        token: '',
      }),
    );
    navigation.navigate('Home');
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <Text style={styles.title}>Indoor Positioning</Text>
            {token != '' ? (
              <Text style={styles.subtitle}>Welcome, {user?.full_name}</Text>
            ) : (
              ''
            )}

            <TouchableHighlight
              style={{...styles.button, marginTop: 15}}
              onPress={() => navigation.navigate('Navigasi')}
              underlayColor="#FFCD4B">
              <Text style={styles.buttonText}>Navigasi</Text>
            </TouchableHighlight>

            {user?.role == 'admin' ? (
              <>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => navigation.navigate('Database')}
                  underlayColor="#FFCD4B">
                  <Text style={styles.buttonText}>Database</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => navigation.navigate('Canvas')}
                  underlayColor="#FFCD4B">
                  <Text style={styles.buttonText}>Canvas</Text>
                </TouchableHighlight>
              </>
            ) : (
              ''
            )}

            {token != '' ? (
              <>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => navigation.navigate('Profile')}
                  underlayColor="#FFCD4B">
                  <Text style={styles.buttonText}>Profile</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.buttonSecond}
                  onPress={handleLogout}
                  underlayColor="#176B87">
                  <Text style={styles.buttonText}>Logout</Text>
                </TouchableHighlight>
              </>
            ) : (
              <>
                <TouchableHighlight
                  style={styles.buttonSecond}
                  onPress={() => navigation.navigate('Login')}
                  underlayColor="#176B87">
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.buttonSecond}
                  onPress={() => navigation.navigate('Register')}
                  underlayColor="#176B87">
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableHighlight>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: '100%',
    resizeMode: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#000',
    fontSize: 38,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#176B87',
    borderRadius: 30,
    marginBottom: 12,
  },
  buttonSecond: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFCD4B',
    borderRadius: 30,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Home;
