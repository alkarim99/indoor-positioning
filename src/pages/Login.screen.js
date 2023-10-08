/* eslint-disable prettier/prettier */
import React from 'react';
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
} from 'react-native';

function Login() {
  const listCategory = ['Staff', 'Pengunjung'];

  return (
    <>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.form}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <TextInput
              style={styles.input}
              // onChangeText=""
              // value=""
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              // onChangeText=""
              // value=""
              placeholder="Phone Number"
              keyboardType="numeric"
            />
            <SelectDropdown
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
            />
            <TouchableHighlight
              style={styles.submit}
              // onPress={() => this.submitSuggestion(this.props)}
              underlayColor="#fff">
              <Text style={styles.submitText}>Login</Text>
            </TouchableHighlight>
          </View>
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
