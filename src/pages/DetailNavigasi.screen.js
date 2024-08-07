/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ImageBackground,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import wifiReborn from 'react-native-wifi-reborn';
import {Snackbar} from 'react-native-paper';
import Canvas from 'react-native-canvas';

function DetailNavigasi(props) {
  const ref = useRef(null);
  const {route, navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [lantaiId, setLantaiId] = useState(route?.params?.lantaiId);
  const [wifiList, setWifiList] = useState([]);
  const [rss, setRss] = useState('');
  const [listRuang, setListRuang] = useState('');
  const [location, setLocation] = useState('');
  const [end, setEnd] = useState('');
  const [routeNav, setRouteNav] = useState('');

  const [errorMessages, setErrorMessages] = React.useState(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  useEffect(() => {
    getWifiList();
    axios
      .get(
        `https://api-indoor-positioning.vercel.app/fingerprint/lantai/${lantaiId}`,
      )
      .then(res => {
        const data = res?.data?.result;
        let ruang = [];
        data.map(d => {
          ruang.push(d.name);
        });
        setListRuang(ruang);
      })
      .catch(error => {
        console.log(error);
      });
  }, [ref, lantaiId]);

  const handleLocateMe = async () => {
    setIsLoading(true);
    setLocation('');
    const payload = {rss: '9,11,5,2', lantai_id: lantaiId};
    axios
      .post('https://api-indoor-positioning.vercel.app/location', payload)
      .then(res => {
        setIsSuccess(true);
        setLocation(res?.data?.result?.kNN?.kNNLocation);
        setLantaiId(lantaiId);
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

  const handleGo = async () => {
    setIsLoading(true);
    if (location == '' && end == '') {
      setErrorMessages('Please choose your start and destination!');
      setIsLoading(false);
      return;
    }
    const payload = {start: location, end, lantai: lantaiId};
    axios
      .post(
        'https://api-indoor-positioning.vercel.app/navigation/find',
        payload,
      )
      .then(res => {
        setIsSuccess(true);
        setRouteNav(res?.data?.result[0].route);
        drawLine();
      })
      .catch(error => {
        console.log(error?.response?.data?.message);
        setErrorMessages(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const drawLine = () => {
    // const path = '(0, 150); (0, 75); (0, 0)';
    const path = routeNav;
    const coordinate = path.split(';');

    const ctx = ref.current.getContext('2d');
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'black';
    ctx.font = 'bold 16px Arial';
    ctx.beginPath();

    for (let index = 0; index < coordinate.length - 1; index++) {
      const move = coordinate[index]
        .replace(' ', '')
        .replace('(', '')
        .replace(')', '')
        .split(',');
      ctx.moveTo(move[0], move[1]);
      const line = coordinate[index + 1]
        .replace(' ', '')
        .replace('(', '')
        .replace(')', '')
        .split(',');
      ctx.lineTo(line[0], line[1]);
      switch (index) {
        case 0:
          if (parseInt(line[0]) < 75 || parseInt(line[1]) < 75) {
            ctx.fillText('1', parseInt(line[0]) + 5, parseInt(line[1]) - 35);
          } else {
            ctx.fillText('1', parseInt(line[0]) + 5, parseInt(line[1]) + 35);
          }
          break;

        case 1:
          if (parseInt(line[0]) < 75 || parseInt(line[1]) < 75) {
            ctx.fillText('2', parseInt(line[0]) + 25, parseInt(line[1]) - 5);
          } else {
            ctx.fillText('2', parseInt(line[0]) - 15, parseInt(line[1]) + 20);
          }
          break;

        case 2:
          if (parseInt(line[0]) < 75 || parseInt(line[1]) < 75) {
            ctx.fillText('3', parseInt(line[0]) + 5, parseInt(line[1]) + 25);
          } else {
            ctx.fillText('3', parseInt(line[0]) + 5, parseInt(line[1]) + 0);
          }
          break;

        default:
          break;
      }
    }

    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.stroke();
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
              data={listRuang}
              onSelect={(selectedItem, index) => {
                setEnd(selectedItem);
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
              onPress={handleGo}
              underlayColor="#FFCD4B">
              <Text style={styles.submitText}>Go</Text>
            </TouchableHighlight>
          </View>
        </View>
        {location ? <Text>Your location at {location}</Text> : ''}
        {routeNav ? <Text>Your route {routeNav}</Text> : ''}
        {errorMessages ? <Text>{errorMessages}</Text> : ''}
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
        {lantaiId == 1 ? (
          // <Image
          //   style={styles.maps}
          //   source={require('../assets/Denah-Lantai-1.png')}
          // />
          <ImageBackground
            source={require('../assets/Denah-Lantai-1.png')}
            resizeMode="cover"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 300,
            }}>
            <Canvas
              ref={ref}
              style={{
                width: 300,
                height: 150,
                marginTop: 10,
                // backgroundColor: 'yellow',
              }}
            />
          </ImageBackground>
        ) : (
          ''
        )}
        {lantaiId == 2 ? (
          // <Image
          //   style={styles.maps}
          //   source={require('../assets/Denah-Lantai-2.png')}
          // />
          <ImageBackground
            source={require('../assets/Denah-Lantai-2.png')}
            resizeMode="cover"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 300,
            }}>
            <Canvas
              ref={ref}
              style={{
                width: 300,
                height: 150,
                marginTop: 10,
                // backgroundColor: 'yellow',
              }}
            />
          </ImageBackground>
        ) : (
          ''
        )}
        {lantaiId == 3 ? (
          // <Image
          //   style={styles.maps}
          //   source={require('../assets/Denah-Lantai-3.png')}
          // />
          <ImageBackground
            source={require('../assets/Denah-Lantai-3.png')}
            resizeMode="cover"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 300,
            }}>
            <Canvas
              ref={ref}
              style={{
                width: 300,
                height: 150,
                marginTop: 10,
                // backgroundColor: 'yellow',
              }}
            />
          </ImageBackground>
        ) : (
          ''
        )}
        <View style={styles.navbar}>
          <TouchableHighlight
            style={
              lantaiId == 1 ? styles.buttonNavbarActive : styles.buttonNavbar
            }
            onPress={() => navigation.push('DetailNavigasi', {lantaiId: 1})}
            underlayColor="#FFCD4B">
            <Text style={styles.buttonTextNavbar}>Lantai 1</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={
              lantaiId == 2 ? styles.buttonNavbarActive : styles.buttonNavbar
            }
            onPress={() => navigation.push('DetailNavigasi', {lantaiId: 2})}
            underlayColor="#FFCD4B">
            <Text style={styles.buttonTextNavbar}>Lantai 2</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={
              lantaiId == 3 ? styles.buttonNavbarActive : styles.buttonNavbar
            }
            onPress={() => navigation.push('DetailNavigasi', {lantaiId: 3})}
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
    width: 360,
    height: 360,
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
  buttonNavbarActive: {
    width: '35%',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FFCD4B',
    borderWidth: 1,
    borderColor: '#176B87',
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
