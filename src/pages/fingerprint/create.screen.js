/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import {Snackbar} from 'react-native-paper';
import wifiReborn from 'react-native-wifi-reborn';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';

function CreateFingerprint(props) {
  const {navigation, route} = props;
  const listCategory = ['Lantai 1', 'Lantai 2', 'Lantai 3'];
  const {lantai} = route.params;
  const [name, setName] = useState('');
  const [coordX, setCoordX] = useState('');
  const [coordY, setCoordY] = useState('');
  const [rss, setRss] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [wifiList, setWifiList] = useState([]);

  const [errorMessages, setErrorMessages] = React.useState(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  useEffect(() => {
    getWifiList();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const payload = {name, lantai, coord_x: coordX, coord_y: coordY, rss};
    axios
      .post('https://fine-lime-catfish-vest.cyclic.app/fingerprint', payload)
      .then(res => {
        console.log(res?.data?.message);
        setIsSuccess(true);
      })
      .catch(error => {
        console.log(error?.response?.data?.message);
        setErrorMessages(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getWifiList = () => {
    wifiReborn.loadWifiList().then(wifi => {
      setWifiList(wifi);
      let rssList = [];
      wifi.map(w => {
        rssList.push(w?.level);
      });
      setRss(rssList);
    });
  };

  return (
    <>
      <View style={styles.form}>
        <Text style={styles.title}>Add Fingerprint Lantai {lantai}</Text>
        <TouchableHighlight
          style={styles.buttonMenu}
          onPress={() => navigation.navigate('IndexFingerprint', {lantai})}
          underlayColor="#176B87">
          <Text style={styles.buttonText}>Back</Text>
        </TouchableHighlight>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Name"
        />
        <View
          style={{
            width: '100%',
            display: 'flex',
            gap: 2,
            flexDirection: 'row',
          }}>
          <TextInput
            style={{...styles.input, width: '50%'}}
            onChangeText={setCoordX}
            value={coordX}
            placeholder="Coordinate X"
            keyboardType="numeric"
          />
          <TextInput
            style={{...styles.input, width: '50%'}}
            onChangeText={setCoordY}
            value={coordY}
            placeholder="Coordinate Y"
            keyboardType="numeric"
          />
        </View>
        <View style={{width: '80%'}}>
          {wifiList.length == 0 ? (
            <>
              <Text>Tidak ada data</Text>
            </>
          ) : (
            wifiList.map((wifi, index) => {
              return (
                <>
                  <View
                    style={{
                      paddingTop: 2,
                      paddingBottom: 2,
                    }}
                    key={index}>
                    <Text
                      style={{
                        color: 'black',
                        padding: 2,
                      }}>
                      SSID = {wifi?.SSID}, RSS = {wifi?.level} dBm
                    </Text>
                  </View>
                </>
              );
            })
          )}
        </View>
        <TouchableHighlight
          style={styles.submit}
          onPress={handleSubmit}
          underlayColor="#FFCD4B">
          <Text style={styles.submitText}>
            {isLoading ? 'Loading...' : 'Submit'}
          </Text>
        </TouchableHighlight>
        <Snackbar
          visible={isSuccess}
          style={{width: '100%', backgroundColor: '#79C079'}}
          onDismiss={() => navigation.navigate('CreateFingerprint', lantai)}
          duration={2000}>
          Success add database
        </Snackbar>
        <Snackbar
          visible={Boolean(errorMessages)}
          style={{width: '100%', backgroundColor: '#CB3837'}}
          onDismiss={() => setErrorMessages(null)}
          action={{
            label: 'X',
            onPress: () => {
              setErrorMessages(null);
            },
          }}>
          {errorMessages}
        </Snackbar>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
  buttonMenu: {
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
  title: {
    marginBottom: 5,
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    margin: 10,
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

export default CreateFingerprint;
