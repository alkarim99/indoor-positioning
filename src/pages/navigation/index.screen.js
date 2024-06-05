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

function IndexNavigation(props) {
  const {route, navigation} = props;
  const {lantai} = route?.params;
  const [listData, setListData] = useState([]);
  const [isGetLoading, setIsGetLoading] = useState(false);

  useEffect(() => {
    setListData([]);
    setIsGetLoading(true);
    axios
      .get(
        `https://api-indoor-positioning.vercel.app/navigation/lantai/${lantai}`,
      )
      .then(res => {
        setListData(res?.data?.result);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsGetLoading(false);
      });
  }, [route, lantai]);

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
        <Text style={styles.title}>Detail Navigation Lantai {lantai}</Text>
        <View style={styles.menu}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => navigation.navigate('CreateNavigation', {lantai})}
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
            listData.map((data, index) => {
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
                      From = {data?.start}, To = {data?.end}
                    </Text>
                    <Text style={{color: 'black', textAlign: 'center'}}>
                      Route = {data?.route}
                    </Text>
                    <TouchableHighlight
                      style={styles.buttonEdit}
                      onPress={() =>
                        navigation.navigate('EditNavigation', {
                          navigation_id: data?.navigation_id,
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
        <View style={styles.navbar}>
          <TouchableHighlight
            style={styles.buttonNavbar}
            onPress={() => navigation.navigate('IndexNavigation', {lantai: 1})}
            underlayColor="#FFCD4B">
            <Text style={styles.buttonTextNavbar}>Lantai 1</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonNavbar}
            onPress={() => navigation.navigate('IndexNavigation', {lantai: 2})}
            underlayColor="#FFCD4B">
            <Text style={styles.buttonTextNavbar}>Lantai 2</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonNavbar}
            onPress={() => navigation.navigate('IndexNavigation', {lantai: 3})}
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

export default IndexNavigation;
