/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
  PermissionsAndroid,
} from 'react-native';
import {Snackbar} from 'react-native-paper';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {addAuth} from '../store/reducers/authSlice';

function Login(props) {
  useEffect(() => {
    if (state?.authSlice?.token != '') {
      navigation.navigate('Home');
    }
  });

  const {navigation} = props;
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const listCategory = ['Staff', 'Pengunjung'];

  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [errorMessages, setErrorMessages] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    axios
      .post('https://fine-lime-catfish-vest.cyclic.app/auth/login', {
        email: email,
        password: password,
      })
      .then(response => {
        console.log(response);
        const profile = response?.data?.data;
        const token = response?.data?.token;
        dispatch(
          addAuth({
            userData: profile,
            token,
          }),
        );
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

  return (
    <>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.form}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="Email"
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
            />
            {/* <SelectDropdown
              defaultButtonText={'Pilihan'}
              data={listCategory}
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
            /> */}
            <TouchableHighlight
              style={styles.submit}
              onPress={handleLogin}
              disabled={isLoading}
              underlayColor="#FFCD4B">
              <Text style={styles.submitText}>
                {isLoading ? 'Loading...' : 'LOG IN'}
              </Text>
            </TouchableHighlight>
          </View>
          <Snackbar
            visible={isSuccess}
            style={{backgroundColor: '#79C079'}}
            onDismiss={() => navigation.navigate('Home')}
            duration={2000}>
            Login success
          </Snackbar>

          <Snackbar
            visible={Boolean(errorMessages)}
            style={{backgroundColor: '#CB3837'}}
            onDismiss={() => setErrorMessages(null)}
            action={{
              label: 'X',
              onPress: () => {
                setErrorMessages(null);
              },
            }}>
            {errorMessages}
          </Snackbar>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 10,
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
  button: {
    margin: 10,
  },
  dropdown2BtnStyle: {
    marginBottom: 12,
    width: '100%',
    height: 40,
    backgroundColor: '#176B87',
    borderRadius: 30,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
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

export default Login;
