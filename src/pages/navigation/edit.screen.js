/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Snackbar} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

function EditNavigation(props) {
  const {navigation, route} = props;
  const {navigation_id} = route.params;
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [routeData, setRouteData] = useState('');
  const [lantai, setLantai] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGetLoading, setIsGetLoading] = useState(false);

  const [errorMessages, setErrorMessages] = React.useState(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  useEffect(() => {
    setIsGetLoading(true);
    axios
      .get(
        `https://api-indoor-positioning.vercel.app/navigation/${navigation_id}`,
      )
      .then(res => {
        const data = res?.data?.result[0];
        setStart(data?.start);
        setEnd(data?.end);
        setRouteData(data?.route);
        setLantai(data?.lantai);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsGetLoading(false);
      });
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const payload = {start, lantai, end, route: routeData};
    axios
      .patch(
        `https://api-indoor-positioning.vercel.app/navigation/${navigation_id}`,
        payload,
      )
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

  const handleDelete = async () => {
    setIsLoading(true);
    axios
      .delete(
        `https://api-indoor-positioning.vercel.app/navigation/${navigation_id}`,
      )
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

  if (isGetLoading) {
    return (
      <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{marginBottom: 2}}>Get database</Text>
          <ActivityIndicator />
        </View>
      </>
    );
  }

  return (
    <>
      <View style={styles.form}>
        <Text style={styles.title}>Update Navigation Lantai {lantai}</Text>
        <TouchableHighlight
          style={styles.buttonMenu}
          onPress={() => navigation.navigate('IndexNavigation', {lantai})}
          underlayColor="#176B87">
          <Text style={styles.buttonText}>Back</Text>
        </TouchableHighlight>
        <View
          style={{
            width: '100%',
            display: 'flex',
            gap: 2,
            flexDirection: 'row',
          }}>
          <TextInput
            style={{...styles.input, width: '50%'}}
            onChangeText={setStart}
            value={start}
            placeholder="Start"
          />
          <TextInput
            style={{...styles.input, width: '50%'}}
            onChangeText={setEnd}
            value={end}
            placeholder="End"
          />
        </View>
        <TextInput
          style={{...styles.input, height: '20%'}}
          multiline={true}
          onChangeText={setRouteData}
          value={routeData}
          placeholder="Route (x,y)"
          textAlignVertical="top"
        />

        <TouchableHighlight
          style={styles.submit}
          onPress={handleSubmit}
          underlayColor="#FFCD4B">
          <Text style={styles.submitText}>
            {isLoading ? 'Loading...' : 'Submit'}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonDelete}
          onPress={() => {
            handleDelete();
          }}
          underlayColor="#176B87">
          <Text style={styles.buttonText}>
            {isLoading ? 'Loading...' : 'Delete'}
          </Text>
        </TouchableHighlight>
        <Snackbar
          visible={isSuccess}
          style={{width: '100%', backgroundColor: '#79C079'}}
          onDismiss={() => navigation.navigate('IndexNavigation', {lantai: 1})}
          duration={2000}>
          Success
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
  buttonDelete: {
    padding: 10,
    backgroundColor: '#D80032',
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
    marginBottom: 5,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default EditNavigation;
