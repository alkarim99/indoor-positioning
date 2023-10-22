/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Snackbar} from 'react-native-paper';

const listData = [
  {
    fingerprint_id: 6,
    name: 'Ruang A',
    lantai: 1,
    coord_x: 0,
    coord_y: 1,
    rss: '0, 32, 59, 87',
  },
  {
    fingerprint_id: 7,
    name: 'Ruang B',
    lantai: 1,
    coord_x: 0,
    coord_y: 1,
    rss: '0, 32, 59, 87',
  },
  {
    fingerprint_id: 8,
    name: 'Ruang C',
    lantai: 1,
    coord_x: 0,
    coord_y: 1,
    rss: '0, 32, 59, 87',
  },
  {
    fingerprint_id: 9,
    name: 'Ruang D',
    lantai: 1,
    coord_x: 0,
    coord_y: 1,
    rss: '0, 32, 59, 87',
  },
  {
    fingerprint_id: 10,
    name: 'Ruang E',
    lantai: 1,
    coord_x: 0,
    coord_y: 1,
    rss: '0, 32, 59, 87',
  },
];

function IndexFingerprint(props) {
  const {route, navigation} = props;
  const {lantai} = route?.params;
  // const [listData, setListData] = useState([]);
  const [isGetLoading, setIsGetLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessages, setErrorMessages] = React.useState(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  useEffect(() => {
    // setListData([]);
    // setIsGetLoading(true);
    // console.log(lantai);
    // axios
    //   .get(
    //     `https://fine-lime-catfish-vest.cyclic.app/fingerprint/lantai/${lantai}`,
    //   )
    //   .then(res => {
    //     setListData(res?.data?.result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     setIsGetLoading(false);
    //   });
  }, []);

  if (isGetLoading) {
    return (
      <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{marginBottom: 2}}>Get data</Text>
          <ActivityIndicator />
        </View>
      </>
    );
  }

  return (
    <>
      <TouchableHighlight
        style={styles.buttonBack}
        onPress={() => navigation.navigate('Database')}
        underlayColor="#176B87">
        <Text style={styles.buttonText}>Back</Text>
      </TouchableHighlight>
      <View style={styles.container}>
        <Text style={styles.title}>Detail Fingerprint Lantai {lantai}</Text>
        <View style={styles.menu}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => navigation.navigate('CreateFingerprint', {lantai})}
            underlayColor="#FFCD4B">
            <Text style={styles.buttonText}>Add Data</Text>
          </TouchableHighlight>
        </View>
        <ScrollView style={{height: '70%', width: '90%'}}>
          {listData.length == 0 ? (
            <>
              <Text style={{textAlign: 'center'}}>Tidak ada data</Text>
            </>
          ) : (
            listData.map((wifi, index) => {
              return (
                <>
                  <View
                    style={{
                      paddingTop: 2,
                    }}
                    key={index}>
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
                    <TouchableHighlight
                      style={styles.buttonEdit}
                      onPress={() =>
                        navigation.navigate('EditFingerprint', {
                          fingerprint_id: wifi?.fingerprint_id,
                        })
                      }
                      underlayColor="#176B87">
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableHighlight>
                  </View>
                </>
              );
            })
          )}
        </ScrollView>
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
        <View style={styles.navbar}>
          <TouchableHighlight
            style={styles.buttonNavbar}
            onPress={() => navigation.navigate('IndexFingerprint', {lantai: 1})}
            underlayColor="#FFCD4B">
            <Text style={styles.buttonTextNavbar}>Lantai 1</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonNavbar}
            onPress={() => navigation.navigate('IndexFingerprint', {lantai: 2})}
            underlayColor="#FFCD4B">
            <Text style={styles.buttonTextNavbar}>Lantai 2</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonNavbar}
            onPress={() => navigation.navigate('IndexFingerprint', {lantai: 3})}
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
    width: '100%',
    padding: 10,
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 3,
  },
  title: {
    marginBottom: 5,
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonBack: {
    width: '20%',
    marginTop: 3,
    marginLeft: 3,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFCD4B',
    borderRadius: 30,
    marginBottom: 12,
  },
  button: {
    width: '30%',
    padding: 10,
    backgroundColor: '#176B87',
    borderRadius: 30,
    marginBottom: 12,
  },
  buttonEdit: {
    width: '50%',
    alignSelf: 'center',
    padding: 3,
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

export default IndexFingerprint;
