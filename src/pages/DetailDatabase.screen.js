/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

function DetailDatabase(props) {
  const {route, navigation} = props;
  const {lantaiId} = route?.params;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.menu}>
          <Text style={styles.title}>Lantai {lantaiId}</Text>
          <TouchableHighlight
            style={styles.buttonMenu}
            onPress={() => navigation.navigate('Database')}
            underlayColor="#176B87">
            <Text style={styles.buttonText}>Database</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => navigation.navigate('CreateDatabase', {lantaiId})}
            underlayColor="#FFCD4B">
            <Text style={styles.buttonText}>Add Database</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => navigation.navigate('ShowDatabase', {lantaiId})}
            underlayColor="#FFCD4B">
            <Text style={styles.buttonText}>Show Database</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.navbar}>
          <TouchableHighlight
            style={styles.buttonNavbar}
            onPress={() => navigation.navigate('DetailDatabase', {lantaiId: 1})}
            underlayColor="#FFCD4B">
            <Text style={styles.buttonTextNavbar}>Lantai 1</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonNavbar}
            onPress={() => navigation.navigate('DetailDatabase', {lantaiId: 2})}
            underlayColor="#FFCD4B">
            <Text style={styles.buttonTextNavbar}>Lantai 2</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonNavbar}
            onPress={() => navigation.navigate('DetailDatabase', {lantaiId: 3})}
            underlayColor="#FFCD4B">
            <Text style={styles.buttonTextNavbar}>Lantai 3</Text>
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100vh',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingTop: 20,
  },
  menu: {
    width: '85%',
    padding: 10,
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    marginBottom: 5,
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonMenu: {
    width: '85%',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFCD4B',
    borderRadius: 30,
    marginBottom: 12,
  },
  button: {
    width: '85%',
    padding: 10,
    backgroundColor: '#176B87',
    borderRadius: 30,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  navbar: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  buttonNavbar: {
    width: '35%',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#176B87',
    borderWidth: 1,
    borderColor: '#FFCD4B',
  },
  buttonTextNavbar: {
    color: '#fff',
    textAlign: 'center',
  },
  submit: {
    width: '30%',
    marginBottom: 12,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#176B87',
    borderRadius: 30,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },
  dropdown2BtnStyle: {
    marginBottom: 12,
    width: '35%',
    height: 40,
    borderWidth: 1,
  },
  dropdown2BtnTxtStyle: {
    color: '#000',
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
});

export default DetailDatabase;
