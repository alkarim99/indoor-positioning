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
              onPress={() => navigation.navigate('Login')}
              underlayColor="#FFCD4B">
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
    width: 350,
    resizeMode: 'center',
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#176B87',
    borderRadius: 30,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Home;
