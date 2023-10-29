/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import wifiReborn from 'react-native-wifi-reborn';
import {Snackbar} from 'react-native-paper';

function DetailNavigasi(props) {
  const {route, navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [lantaiId, setLantaiId] = useState(route.params.lantaiId);
  const [wifiList, setWifiList] = useState([]);
  const [rss, setRss] = useState('');
  const [location, setLocation] = useState('');
  const listCategory = {
    1: [
      'Ruang A',
      'Ruang B',
      'Tangga',
      'Ruang C',
      'Ruang D',
      'Ruang E',
      'Ruang F',
      'Pintu Masuk',
      'Ruang G',
      'Ruang H',
    ],
    2: [
      'Ruang I',
      'Ruang J',
      'Tangga',
      'Ruang K',
      'Ruang L',
      'Ruang M',
      'Ruang N',
      'Ruang O',
      'Ruang P',
      'Ruang Q',
    ],
    3: [
      'Ruang R',
      'Ruang S',
      'Tangga',
      'Ruang T',
      'Ruang U',
      'Ruang V',
      'Ruang W',
      'Ruang X',
      'Ruang Y',
      'Ruang Z',
    ],
  };

  const [errorMessages, setErrorMessages] = React.useState(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  useEffect(() => {
    getWifiList();
    setLantaiId(route.params.lantaiId);
  }, [route, lantaiId]);

  const handleLocateMe = async () => {
    setIsLoading(true);
    const payload = {rss: '9,11,5,2', lantai_id: lantaiId};
    axios
      .post(`https://fine-lime-catfish-vest.cyclic.app/location`, payload)
      .then(res => {
        setIsSuccess(true);
        console.log(res?.data?.result);
        setLocation(res?.data?.result?.kNN?.kNNLocation);
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
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableHighlight
            style={styles.buttonMenu}
            onPress={() => navigation.navigate('Navigasi')}
            underlayColor="#176B87">
            <Text style={styles.buttonText}>Back</Text>
          </TouchableHighlight>
          <Text style={styles.title}>Detail Navigasi Lantai {lantaiId}</Text>
          <View
            style={{
              padding: 20,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableHighlight
              style={styles.submit}
              onPress={handleLocateMe}
              underlayColor="#FFCD4B">
              <Text style={styles.submitText}>
                {isLoading ? 'Loading...' : 'Locate Me!'}
              </Text>
            </TouchableHighlight>
            <SelectDropdown
              defaultButtonText={'Pilihan'}
              data={listCategory[lantaiId]}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown2BtnStyle}
              buttonTextStyle={styles.dropdown2BtnTxtStyle}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={styles.dropdown2RowTxtStyle}
            />
            <TouchableHighlight
              style={styles.submit}
              // onPress={() => navigation.navigate('Home')}
              underlayColor="#FFCD4B">
              <Text style={styles.submitText}>Go</Text>
            </TouchableHighlight>
          </View>
        </View>
        {location ? <Text>Your location at {location}</Text> : ''}
        <ScrollView>
          {lantaiId == 1 ? (
            <Image
              style={styles.maps}
              source={require('../assets/Denah-Lantai-1.png')}
            />
          ) : (
            ''
          )}
          {lantaiId == 2 ? (
            <Image
              style={styles.maps}
              source={require('../assets/Denah-Lantai-2.png')}
            />
          ) : (
            ''
          )}
          {lantaiId == 3 ? (
            <Image
              style={styles.maps}
              source={require('../assets/Denah-Lantai-3.png')}
            />
          ) : (
            ''
          )}
        </ScrollView>
        <Snackbar
          visible={isSuccess}
          style={{width: '100%', backgroundColor: '#79C079'}}
          onDismiss={() => {
            navigation.navigate('DetailNavigasi', lantaiId);
          }}
          duration={2000}>
          <Text>Your location at {location}</Text>
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
        <View style={styles.navbar}>
          <TouchableHighlight
            style={styles.buttonNavbar}
            onPress={() => navigation.navigate('DetailNavigasi', {lantaiId: 1})}
            underlayColor="#FFCD4B">
            <Text style={styles.buttonTextNavbar}>Lantai 1</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonNavbar}
            onPress={() => navigation.navigate('DetailNavigasi', {lantaiId: 2})}
            underlayColor="#FFCD4B">
            <Text style={styles.buttonTextNavbar}>Lantai 2</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonNavbar}
            onPress={() => navigation.navigate('DetailNavigasi', {lantaiId: 3})}
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
  maps: {
    width: 340,
    resizeMode: 'center',
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

export default DetailNavigasi;
