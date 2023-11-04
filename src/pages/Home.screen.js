/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
} from 'react-native';

function Home(props) {
  const {navigation} = props;

  return (
    <>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <Text style={styles.title}>Indoor Positioning</Text>
            <TouchableHighlight
              style={styles.button}
              onPress={() => navigation.navigate('Navigasi')}
              underlayColor="#FFCD4B">
              <Text style={styles.buttonText}>Navigasi</Text>
            </TouchableHighlight>
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
            <TouchableHighlight
              style={styles.buttonLogout}
              onPress={() => navigation.navigate('Login')}
              underlayColor="#176B87">
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableHighlight>
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
    width: 340,
    resizeMode: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#000',
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#176B87',
    borderRadius: 30,
    marginBottom: 12,
  },
  buttonLogout: {
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
