/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

function ShowDatabase(props) {
  const {route, navigation} = props;
  const {lantaiId} = route.params;
  const [listWifi, setListWifi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://fine-lime-catfish-vest.cyclic.app/fingerprint')
      .then(res => {
        setListWifi(res?.data?.result);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Database Lantai {lantaiId}</Text>
        <TouchableHighlight
          style={styles.buttonMenu}
          onPress={() => navigation.navigate('DetailDatabase', {lantaiId})}
          underlayColor="#176B87">
          <Text style={styles.buttonText}>Detail Database</Text>
        </TouchableHighlight>
        <View style={{width: '80%'}}>
          {listWifi.map((wifi, index) => {
            return (
              <>
                <View
                  style={{
                    paddingTop: 2,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      padding: 2,
                      backgroundColor: '#176B87',
                      textAlign: 'center',
                    }}>
                    Name = {wifi?.name}, Lantai = {wifi?.lantai}
                  </Text>
                  <Text style={{color: 'black', textAlign: 'center'}}>
                    Coordinate = {wifi?.coord_x}, {wifi?.coord_y} | RSS ={' '}
                    {wifi?.rss}
                  </Text>
                </View>
              </>
            );
          })}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100vh',
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

export default ShowDatabase;
