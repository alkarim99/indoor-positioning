/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

function Database(props) {
  const {navigation} = props;
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Database</Text>
        <Text style={styles.subTitle}>Gedung AH</Text>
        <TouchableHighlight
          style={styles.buttonMenu}
          onPress={() => navigation.navigate('Home')}
          underlayColor="#176B87">
          <Text style={styles.buttonText}>Back</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigation.navigate('IndexFingerprint', {lantai: 1})}
          underlayColor="#FFCD4B">
          <Text style={styles.buttonText}>Fingerprint</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigation.navigate('IndexNavigation', {lantai: 1})}
          underlayColor="#FFCD4B">
          <Text style={styles.buttonText}>Navigation</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigation.navigate('IndexWeight')}
          underlayColor="#FFCD4B">
          <Text style={styles.buttonText}>Weight</Text>
        </TouchableHighlight>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    marginTop: 20,
    marginBottom: 5,
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: {
    marginBottom: 20,
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    width: '85%',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#176B87',
    borderRadius: 30,
    marginBottom: 12,
  },
  buttonMenu: {
    width: '85%',
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

export default Database;
